
-- Update Fort Collins rolloff town data with enhanced content
UPDATE rolloff_towns 
SET 
  local_blurb = 'Dumpster Diverz provides professional roll-off dumpster rental services throughout Fort Collins, the vibrant college town home to Colorado State University and a thriving tech corridor. Our 12-30 yard containers are perfect for construction projects, home renovations, and cleanouts in neighborhoods like Old Town, Midtown, Harmony Corridor, Rigden Farm, and Fossil Creek. We understand the unique needs of Fort Collins residents, from kitchen remodels and roofing jobs in established neighborhoods to landlord cleanouts near CSU and light commercial builds in the growing tech campuses. With same-day delivery available throughout Fort Collins and Northern Colorado, we serve homeowners, contractors, and property managers who need reliable, contract-free roll-off solutions for their projects.',
  
  meta_title = 'Roll-Off Dumpster Rental in Fort Collins, CO | Same-Day Delivery | Dumpster Diverz',
  
  meta_description = 'Professional roll-off dumpster rentals in Fort Collins, Colorado. 12-30 yard containers for construction, remodeling, and cleanouts in Old Town, Midtown, CSU area. Same-day delivery, no contracts. Serving homeowners, contractors, and property managers.',
  
  hero_image_url = '/lovable-uploads/fort-collins-rolloff-hero.jpg',
  
  hero_alt_text = 'Roll-off dumpster rental service in Fort Collins, Colorado - Professional containers for construction and renovation projects near Old Town and Colorado State University',
  
  updated_at = now()
WHERE slug = 'fort-collins';
