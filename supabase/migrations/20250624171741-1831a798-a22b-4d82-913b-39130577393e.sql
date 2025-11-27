
-- Update Wellington residential town data with unique, locally-relevant content
UPDATE public.residential_towns 
SET 
  hero_subheading = 'Trusted trash and recycling pickup for Wellington families and new homeowners. Reliable local service for all neighborhoods.',
  
  local_blurb = 'Dumpster Diverz proudly serves Wellington neighborhoods like The Meadows, Buffalo Creek, Viewpointe, and Wellington Downs with dependable weekly trash pickup and optional recycling. Since Wellington doesn''t provide city waste service, residents rely on us for clean, HOA-friendly pickup with local drivers who know your community. Perfect for growing families and new developments.',
  
  meta_title = 'Wellington CO Trash & Recycling | Reliable Weekly Pickup | Dumpster Diverz',
  
  meta_description = 'Reliable trash and recycling in Wellington, CO. Dumpster Diverz offers trusted weekly pickup for all Wellington neighborhoods with local service and HOA-friendly carts.',
  
  pricing_info = 'Wellington residential service: $29/month (65-gallon), $33/month (96-gallon). Optional recycling: $10/month. Trusted by Wellington families and HOAs — no contracts, just dependable local service.',
  
  hero_alt_text = 'Dumpster Diverz residential trash service in Wellington, Colorado neighborhood',
  
  updated_at = now()
WHERE slug = 'wellington';

-- Update existing Wellington FAQs with local context
UPDATE public.residential_faqs 
SET 
  answer = 'Most Wellington customers are on Monday or Thursday pickup routes, depending on your subdivision. We serve The Meadows, Buffalo Creek, Viewpointe, Wellington Downs, and all Wellington neighborhoods. We''ll confirm your specific day when you sign up.'
WHERE town_slug = 'wellington' AND question LIKE '%day%trash%pickup%';

UPDATE public.residential_faqs 
SET 
  answer = 'Yes! Since Wellington doesn''t provide city recycling, many residents choose our convenient curbside recycling service for $10/month. We pick up recycling on the same day as your trash for maximum convenience.'
WHERE town_slug = 'wellington' AND question LIKE '%recycling%';

-- Add new Wellington-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active)
VALUES 
(
  'Does Dumpster Diverz work with Wellington HOAs?',
  'Absolutely! We''re experienced with Wellington-area HOAs and provide clean carts and professional placement that meets community standards. Many subdivisions like The Meadows, Buffalo Creek, and Viewpointe trust us for HOA-compliant service.',
  'Service Information',
  'wellington',
  10,
  true
),
(
  'Which Wellington neighborhoods do you serve?',
  'We provide trash and recycling pickup throughout Wellington, including The Meadows, Buffalo Creek, Viewpointe, Wellington Downs, Park Meadows, Sage Meadows, and Poudre Trails. Our local drivers know Wellington well.',
  'Service Information',
  'wellington',
  11,
  true
),
(
  'Why do Wellington residents choose Dumpster Diverz?',
  'Since Wellington doesn''t provide city trash pickup, residents rely on private haulers. We''re the trusted local choice for dependable service, clean equipment, and responsive support from your hometown waste company.',
  'Service Information',
  'wellington',
  12,
  true
)
ON CONFLICT DO NOTHING;
