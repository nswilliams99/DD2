
-- Update Fort Collins residential town data with unique, locally-relevant content
UPDATE public.residential_towns 
SET 
  hero_subheading = 'Fast, reliable trash pickup for Fort Collins students, families, and professionals. Local drivers who know your neighborhood.',
  
  local_blurb = 'Serving Fort Collins'' diverse neighborhoods from Old Town to Harmony Corridor, Dumpster Diverz provides dependable weekly trash and recycling pickup for Colorado State University students, young professionals, and growing families. Our local team understands Fort Collins'' unique needs — from quick student move-out cleanups to consistent service for busy tech workers and retirees in Fossil Creek and Rigden Farm.',
  
  meta_title = 'Fort Collins CO Trash Pickup | Student & Family Service | Dumpster Diverz',
  
  meta_description = 'Local trash and recycling pickup in Fort Collins, CO. Serving CSU students, families, and professionals in Old Town, Harmony, and Midtown with flexible weekly service.',
  
  pricing_info = 'Fort Collins residential service: $29/month (65-gallon), $33/month (96-gallon). Optional recycling: $10/month. Perfect for students, renters, and homeowners — no long-term contracts required.',
  
  hero_alt_text = 'Dumpster Diverz trash cart on residential street in Fort Collins, Colorado near Colorado State University',
  
  updated_at = now()
WHERE slug = 'fort-collins';

-- Update existing Fort Collins FAQs with local context
UPDATE public.residential_faqs 
SET 
  answer = 'Most Fort Collins customers are on Monday or Tuesday pickup routes, depending on your neighborhood. We serve Old Town, Harmony Corridor, Midtown, Fossil Creek, Rigden Farm, and University Acres. We''ll confirm your specific day when you sign up.'
WHERE town_slug = 'fort-collins' AND question LIKE '%day%trash%pickup%';

UPDATE public.residential_faqs 
SET 
  answer = 'Yes! Fort Collins offers some city recycling, but many residents — especially in HOAs, student housing, and newer developments — prefer our convenient curbside recycling service for $10/month. We pick up recycling on the same day as your trash.'
WHERE town_slug = 'fort-collins' AND question LIKE '%recycling%';

-- Add new Fort Collins-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active)
VALUES 
(
  'Do you serve CSU students and rental properties?',
  'Absolutely! We''re experienced with Fort Collins rental properties and student housing near Colorado State University. Our flexible monthly service works great for student move-ins/outs, and we provide fast setup for new renters throughout the city.',
  'Service Information',
  'fort-collins',
  10,
  true
),
(
  'Which Fort Collins neighborhoods do you serve?',
  'We provide trash and recycling pickup throughout Fort Collins, including Old Town, Harmony Corridor, Midtown, Fossil Creek, Rigden Farm, University Acres, and expanding areas toward Timnath. Our local drivers know Fort Collins well.',
  'Service Information',
  'fort-collins',
  11,
  true
),
(
  'Why choose Dumpster Diverz over Fort Collins city services?',
  'While Fort Collins offers some municipal waste services, many residents prefer our personalized local service, especially in HOAs and rental properties. We offer flexible cart sizes, online account management, and responsive customer support from people who live here.',
  'Service Information',
  'fort-collins',
  12,
  true
)
ON CONFLICT DO NOTHING;
