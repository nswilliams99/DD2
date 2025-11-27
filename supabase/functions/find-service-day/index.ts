import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as turf from 'https://esm.sh/@turf/turf@6.5.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting - in-memory counter (resets when function restarts)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_REQUESTS = 5
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute

interface GeocodeResponse {
  results: Array<{
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
  }>
  status: string
}

interface ServiceAreaPolygon {
  id: string
  service_day: string
  label: string
  town_slug: string
  polygon: any // GeoJSON polygon
}

function checkRateLimit(clientIp: string): boolean {
  const now = Date.now()
  const clientData = rateLimitMap.get(clientIp)

  if (!clientData || now > clientData.resetTime) {
    // First request or window expired - reset
    rateLimitMap.set(clientIp, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    })
    return true
  }

  if (clientData.count >= RATE_LIMIT_REQUESTS) {
    return false // Rate limit exceeded
  }

  // Increment counter
  clientData.count++
  return true
}

async function geocodeAddress(address: string, apiKey: string): Promise<{ lat: number; lng: number } | null> {
  const encodedAddress = encodeURIComponent(address)
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
  
  try {
    const response = await fetch(geocodeUrl)
    const data: GeocodeResponse = await response.json()
    
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location
      return { lat: location.lat, lng: location.lng }
    }
    
    console.error('Geocoding failed:', data.status)
    return null
  } catch (error) {
    console.error('Geocoding API error:', error)
    return null
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Rate limiting check
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    
    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parse request body
    const { address } = await req.json()
    
    if (!address || typeof address !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Address is required and must be a string' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get environment variables
    const googleMapsApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    if (!googleMapsApiKey) {
      return new Response(
        JSON.stringify({ error: 'Google Maps API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Geocode the address
    console.log('Geocoding address:', address)
    const coordinates = await geocodeAddress(address, googleMapsApiKey)
    
    if (!coordinates) {
      return new Response(
        JSON.stringify({ error: 'Unable to geocode address. Please check the address and try again.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Geocoded coordinates:', coordinates)

    // Fetch all service area polygons
    const { data: polygons, error: polygonError } = await supabase
      .from('service_area_polygons')
      .select('id, service_day, label, town_slug, polygon')

    if (polygonError) {
      console.error('Error fetching polygons:', polygonError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch service areas' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!polygons || polygons.length === 0) {
      console.log('No service area polygons found')
      return new Response(
        JSON.stringify({ not_covered: true }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create a point from the geocoded coordinates
    const point = turf.point([coordinates.lng, coordinates.lat])

    // Check each polygon to see if it contains the point
    for (const polygonData of polygons as ServiceAreaPolygon[]) {
      try {
        const polygon = polygonData.polygon
        
        // Ensure we have a valid GeoJSON polygon
        if (!polygon || !polygon.coordinates) {
          console.warn('Invalid polygon data for:', polygonData.label)
          continue
        }

        // Use turf.js to check if point is within polygon
        const isInside = turf.booleanPointInPolygon(point, polygon)
        
        if (isInside) {
          console.log('Found matching service area:', polygonData.label)
          return new Response(
            JSON.stringify({
              service_day: polygonData.service_day,
              label: polygonData.label,
              town_slug: polygonData.town_slug
            }),
            { 
              status: 200, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }
      } catch (error) {
        console.error('Error checking polygon:', polygonData.label, error)
        // Continue to next polygon instead of failing entirely
      }
    }

    // No polygon contained the point
    console.log('Address not covered by any service area')
    return new Response(
      JSON.stringify({ not_covered: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})