
-- Update North County residential town data with unique, locally-relevant content
UPDATE public.residential_towns 
SET 
  hero_subheading = 'Rural trash and recycling pickup for Laporte, Bellvue, and Northern Colorado foothills. Bear-safe service for mountain living.',
  
  local_blurb = 'Dumpster Diverz serves North County communities like Laporte, Bellvue, Pleasant Valley, and Rist Canyon with dependable trash pickup designed for rural mountain living. From Rolling Hills Estates to Poudre Canyon Road, we navigate unpaved roads and seasonal access challenges. Since these areas have no municipal pickup, residents rely on our bear-safe containers and local expertise for reliable waste management.',
  
  meta_title = 'North County CO Trash Service | Laporte & Bellvue Rural Pickup | Dumpster Diverz',
  
  meta_description = 'Rural trash and recycling in North County Colorado. Serving Laporte, Bellvue, and foothills with bear-safe containers and reliable pickup on mountain roads.',
  
  pricing_info = 'North County rural service: $29/month (65-gallon), $33/month (96-gallon). Optional recycling: $10/month. Bear-safe containers and seasonal access flexibility — trusted by mountain residents for over a decade.',
  
  hero_alt_text = 'Dumpster Diverz rural trash service in North County Colorado foothills',
  
  updated_at = now()
WHERE slug = 'north-county';

-- Update Fort Collins residential town data with unique, locally-relevant content  
UPDATE public.residential_towns 
SET 
  hero_subheading = 'Flexible trash and recycling pickup for Fort Collins families, students, and growing neighborhoods. No contracts, online billing.',
  
  local_blurb = 'Dumpster Diverz provides residential trash and recycling throughout Fort Collins, from Old Town and Midtown to Rigden Farm, Fossil Creek, and the Harmony Corridor. Perfect for CSU students, tech workers, and families in HOA neighborhoods who need flexible service without city restrictions. Our local drivers know Fort Collins streets and provide clean, professional pickup that works with your lifestyle.',
  
  meta_title = 'Fort Collins Trash & Recycling | Flexible Residential Pickup | Dumpster Diverz',
  
  meta_description = 'Residential trash and recycling in Fort Collins, CO. Serving Old Town, Midtown, Rigden Farm, and CSU areas with flexible pickup and online billing.',
  
  pricing_info = 'Fort Collins residential service: $29/month (65-gallon), $33/month (96-gallon). Optional recycling: $10/month. Perfect for students and families — no contracts required, online account management included.',
  
  hero_alt_text = 'Dumpster Diverz residential trash service in Fort Collins, Colorado neighborhood',
  
  updated_at = now()
WHERE slug = 'fort-collins';

-- Update existing North County FAQs with local context
UPDATE public.residential_faqs 
SET 
  answer = 'Most North County customers are on Tuesday pickup routes, including Laporte, Bellvue, and Rist Canyon areas. Remote locations along Poudre Canyon Road may have slightly different scheduling. We''ll confirm your specific day and discuss any seasonal access considerations when you sign up.'
WHERE town_slug = 'north-county' AND question LIKE '%day%trash%pickup%';

UPDATE public.residential_faqs 
SET 
  answer = 'Yes! Since North County areas have no municipal recycling, many residents choose our curbside recycling service for $10/month. We pick up recycling on the same day as trash, and our bear-safe containers work for both services.'
WHERE town_slug = 'north-county' AND question LIKE '%recycling%';

-- Update existing Fort Collins FAQs with local context
UPDATE public.residential_faqs 
SET 
  answer = 'Fort Collins customers are typically on Monday or Tuesday pickup routes, depending on your neighborhood and ZIP code. We serve Old Town, Midtown, Rigden Farm, Fossil Creek, Harmony Corridor, and surrounding areas. Your specific pickup day will be confirmed when you sign up.'
WHERE town_slug = 'fort-collins' AND question LIKE '%day%trash%pickup%';

UPDATE public.residential_faqs 
SET 
  answer = 'Absolutely! Many Fort Collins residents prefer our recycling service over city options. We provide convenient curbside recycling pickup for $10/month on the same day as your trash service, perfect for busy families and students.'
WHERE town_slug = 'fort-collins' AND question LIKE '%recycling%';

-- Add new North County-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active)
VALUES 
(
  'Do you provide bear-safe containers in North County?',
  'Yes! All our containers in Laporte, Bellvue, and foothills areas are bear-resistant. We understand mountain living and provide secure lids and proper placement to keep wildlife away from your trash and recycling.',
  'Service Information',
  'north-county',
  10,
  true
),
(
  'Can you access unpaved and mountain roads?',
  'Absolutely! Our drivers are experienced with North County''s rural roads, including unpaved driveways along Rist Canyon Road, Poudre Canyon, and Pleasant Valley. We handle seasonal access challenges and work with you on placement during winter months.',
  'Service Information',
  'north-county',
  11,
  true
),
(
  'Which North County areas do you serve?',
  'We provide trash and recycling pickup throughout North County, including Laporte, Bellvue, Pleasant Valley, areas along Overland Trail, Rist Canyon Road, Poudre Canyon Road, and Rolling Hills Estates. If you''re outside city limits, we can help.',
  'Service Information',
  'north-county',
  12,
  true
),

-- Add new Fort Collins-specific FAQs  
(
  'Do you serve CSU students and rental properties?',
  'Yes! We''re perfect for CSU students and renters because we don''t require long-term contracts. Whether you''re in University Acres, near campus, or in a rental home, you can start and stop service as needed with flexible monthly billing.',
  'Service Information',
  'fort-collins',
  10,
  true
),
(
  'Which Fort Collins neighborhoods do you serve?',
  'We provide trash and recycling pickup throughout Fort Collins, including Old Town, Midtown, Rigden Farm, Fossil Creek, Harmony Corridor, University Acres, and surrounding subdivisions. We also serve student housing and rental properties near CSU.',
  'Service Information',
  'fort-collins',
  11,
  true
),
(
  'Do you work with HOA neighborhoods in Fort Collins?',
  'Absolutely! We provide clean, professional service that meets HOA standards in Rigden Farm, Fossil Creek, and other Fort Collins subdivisions. Our drivers understand placement requirements and maintain the neat appearance HOAs expect.',
  'Service Information',
  'fort-collins',
  12,
  true
),
(
  'Can I manage my account online?',
  'Yes! Fort Collins customers love our online account management system. You can view billing, update service, request extra pickups, and make payments online — perfect for busy professionals, students, and tech-savvy residents.',
  'Service Information',
  'fort-collins',
  13,
  true
)
ON CONFLICT DO NOTHING;
