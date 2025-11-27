
-- Update Severance residential town data with unique, locally-relevant content
UPDATE public.residential_towns 
SET 
  hero_subheading = 'Dependable trash and recycling pickup for Severance''s growing neighborhoods. Hometown service for both rural roads and new developments.',
  
  local_blurb = 'Dumpster Diverz serves Severance neighborhoods like Hidden Valley Farm, Tailholt, Hunters Crossing, and Timber Ridge with flexible weekly trash pickup and optional recycling. Since the Town of Severance doesn''t provide waste service, residents count on us for reliable pickup whether you''re in a tight subdivision or on a rural lot. Perfect for families seeking space and affordable hometown service.',
  
  meta_title = 'Severance CO Trash & Recycling | Hometown Weekly Pickup | Dumpster Diverz',
  
  meta_description = 'Dependable trash and recycling in Severance, CO. Dumpster Diverz serves both rural roads and new developments with flexible pickup and hometown service.',
  
  pricing_info = 'Severance residential service: $29/month (65-gallon), $33/month (96-gallon). Optional recycling: $10/month. Flexible service for growing families — no hidden fees, just honest hometown pricing.',
  
  hero_alt_text = 'Dumpster Diverz residential trash service in Severance, Colorado rural neighborhood',
  
  updated_at = now()
WHERE slug = 'severance';

-- Update existing Severance FAQs with local context
UPDATE public.residential_faqs 
SET 
  answer = 'Most Severance customers are on Thursday pickup routes, though it may vary slightly by neighborhood. We serve Hidden Valley Farm, Tailholt, Hunters Crossing, Timber Ridge, and all Severance areas including rural roads. We''ll confirm your specific day when you sign up.'
WHERE town_slug = 'severance' AND question LIKE '%day%trash%pickup%';

UPDATE public.residential_faqs 
SET 
  answer = 'Yes! Since Severance doesn''t provide city recycling, many residents add our convenient curbside recycling service for $10/month. We pick up recycling on the same day as your trash, whether you''re in a subdivision or on a rural lot.'
WHERE town_slug = 'severance' AND question LIKE '%recycling%';

-- Add new Severance-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active)
VALUES 
(
  'Do you serve both rural roads and subdivisions in Severance?',
  'Absolutely! We''re experienced with Severance''s mix of tight subdivisions and rural properties. Whether you''re in Hidden Valley Farm, Timber Ridge, or on a long driveway in the outskirts, our drivers know how to navigate Severance''s diverse neighborhoods.',
  'Service Information',
  'severance',
  10,
  true
),
(
  'Which Severance neighborhoods do you serve?',
  'We provide trash and recycling pickup throughout Severance, including Hidden Valley Farm, Tailholt, Hunters Crossing, Baldridge, Overlook, Lakeview, Timber Ridge, Fox Ridge, and Saddler Ridge. Our local drivers understand both new developments and established rural areas.',
  'Service Information',
  'severance',
  11,
  true
),
(
  'Why do Severance residents choose Dumpster Diverz?',
  'Since Severance doesn''t provide city trash pickup, residents need a reliable private hauler. We''re the hometown choice that understands Severance''s rural-suburban character — from tight HOA subdivisions to wide-open lots. Honest pricing, no hidden fees.',
  'Service Information',
  'severance',
  12,
  true
)
ON CONFLICT DO NOTHING;
