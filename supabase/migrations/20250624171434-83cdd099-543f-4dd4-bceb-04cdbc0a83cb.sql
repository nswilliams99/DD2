
-- Update Greeley residential town data with unique, locally-relevant content
UPDATE public.residential_towns 
SET 
  hero_subheading = 'Affordable trash and recycling pickup for Greeley families, students, and growing neighborhoods. Flexible service where city pickup doesn''t reach.',
  
  local_blurb = 'Dumpster Diverz serves Greeley neighborhoods like West Greeley, Kelly Farm, St. Michaels, and Promontory with reliable weekly trash pickup and optional recycling. Perfect for University of Northern Colorado students, new subdivisions, and families who want local flexibility beyond city limits. We''re your hometown waste company for affordable, no-hassle service.',
  
  meta_title = 'Greeley CO Trash & Recycling | Affordable Weekly Pickup | Dumpster Diverz',
  
  meta_description = 'Affordable trash and recycling in Greeley, CO. Dumpster Diverz serves UNC students, families, and new neighborhoods with flexible pickup and local support.',
  
  pricing_info = 'Greeley residential service: $29/month (65-gallon), $33/month (96-gallon). Optional recycling: $10/month. Perfect for students, families, and new builds — flexible scheduling with no long-term contracts.',
  
  hero_alt_text = 'Dumpster Diverz residential trash service in Greeley, Colorado neighborhood',
  
  updated_at = now()
WHERE slug = 'greeley';

-- Update existing Greeley FAQs with local context
UPDATE public.residential_faqs 
SET 
  answer = 'Most Greeley customers are on Tuesday or Friday pickup routes, depending on your neighborhood. We serve West Greeley, Kelly Farm, St. Michaels, Promontory, and Evans. We''ll confirm your specific day when you sign up.'
WHERE town_slug = 'greeley' AND question LIKE '%day%trash%pickup%';

UPDATE public.residential_faqs 
SET 
  answer = 'Yes! Many Greeley neighborhoods don''t have city recycling, especially new developments and areas near UNC. Our convenient curbside recycling service is $10/month and picked up the same day as your trash.'
WHERE town_slug = 'greeley' AND question LIKE '%recycling%';

-- Add new Greeley-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active)
VALUES 
(
  'Do you serve UNC students and rental properties?',
  'Absolutely! We''re popular with University of Northern Colorado students and rental properties throughout Greeley. Our flexible month-to-month service works great for college schedules, and we can coordinate with landlords for seamless move-in/move-out transitions.',
  'Service Information',
  'greeley',
  10,
  true
),
(
  'Which Greeley neighborhoods do you serve?',
  'We provide trash and recycling pickup throughout Greeley, including West Greeley, East Greeley, Kelly Farm, St. Michaels, Promontory, Bittersweet, and Evans. We especially serve new developments and areas outside city pickup zones.',
  'Service Information',
  'greeley',
  11,
  true
),
(
  'Why choose private trash service in Greeley?',
  'While Greeley offers municipal service in some areas, many residents choose us for flexibility, better customer service, and coverage in new subdivisions where city pickup isn''t available. We''re also ideal for UNC students who need month-to-month service.',
  'Service Information',
  'greeley',
  12,
  true
)
ON CONFLICT DO NOTHING;
