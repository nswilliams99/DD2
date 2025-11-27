import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt = "default" } = await req.json()
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Default optimized prompt for the About section image
    const imagePrompt = prompt === "default" 
      ? "A professional, realistic photograph showing a modern purple and white waste management truck with 'Dumpster Diverz' style branding parked in a beautiful Northern Colorado suburban neighborhood. In the background, show the foothills and mountains with clear blue skies. Include eco-friendly elements like recycling bins, healthy green landscaping, and solar panels on nearby homes. The scene should convey reliability, environmental responsibility, and local community service. Style: high-quality commercial photography, bright natural lighting, square aspect ratio composition."
      : prompt

    // Generate image with OpenAI
    const openAIResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'url'
      }),
    })

    if (!openAIResponse.ok) {
      throw new Error(`OpenAI API error: ${openAIResponse.statusText}`)
    }

    const openAIResult = await openAIResponse.json()
    const imageUrl = openAIResult.data[0].url

    // Download the generated image
    const imageResponse = await fetch(imageUrl)
    const imageBuffer = await imageResponse.arrayBuffer()

    // Convert to WebP for optimization
    const fileName = `about-hero-${Date.now()}.webp`
    const filePath = `generated-images/${fileName}`

    // Upload to Supabase storage
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('media')
      .upload(filePath, imageBuffer, {
        contentType: 'image/webp',
        upsert: false,
      })

    if (uploadError) {
      throw new Error(`Upload error: ${uploadError.message}`)
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('media')
      .getPublicUrl(filePath)

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: publicUrl,
        fileName,
        prompt: imagePrompt,
        message: 'Image generated and uploaded successfully'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error generating image:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: 'Failed to generate image'
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})