
-- Update Windsor residential town data with unique, locally-relevant content
UPDATE public.residential_towns 
SET 
  hero_subheading = 'Trusted trash and recycling pickup for Windsor families and homeowners. HOA-friendly service with local drivers.',
  
  local_blurb = 'Dumpster Diverz proudly serves Windsor neighborhoods like Water Valley, Raindance, and Highland Meadows with clean, dependable weekly trash pickup and optional recycling. We''re locally owned, HOA-friendly, and deliver small-town service with big-time reliability for Windsor''s growing families and golf communities.',
  
  meta_title = 'Windsor CO Trash & Recycling | Weekly Pickup | Dumpster Diverz',
  
  meta_description = 'Reliable trash and recycling in Windsor, CO. Dumpster Diverz offers affordable weekly pickup, friendly local service, and no hidden fees. Get started today.',
  
  pricing_info = 'Windsor residential service: $29/month (65-gallon), $33/month (96-gallon). Optional recycling: $10/month. Perfect for homeowners and families — no long-term contracts required.',
  
  hero_alt_text = 'Dumpster Diverz residential trash service in Windsor, Colorado neighborhood',
  
  updated_at = now()
WHERE slug = 'windsor';

-- Update existing Windsor FAQs with local context
UPDATE public.residential_faqs 
SET 
  answer = 'Most Windsor customers are on Monday or Thursday pickup routes, depending on your neighborhood. We serve Water Valley, Raindance, Highland Meadows, and all Windsor areas. We''ll confirm your specific day when you sign up.'
WHERE town_slug = 'windsor' AND question LIKE '%day%trash%pickup%';

UPDATE public.residential_faqs 
SET 
  answer = 'Yes! Since Windsor doesn''t provide city-run recycling for most residents, many homeowners choose our convenient curbside recycling service for $10/month. We pick up recycling on the same day as your trash.'
WHERE town_slug = 'windsor' AND question LIKE '%recycling%';

-- Add new Windsor-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active)
VALUES 
(
  'Does Dumpster Diverz work with Windsor HOAs?',
  'Absolutely! We''re experienced with Windsor-area HOAs and provide clean carts and discreet placement that meets community guidelines. Many Water Valley, Raindance, and Highland Meadows residents choose us for HOA-compliant service.',
  'Service Information',
  'windsor',
  10,
  true
),
(
  'Which Windsor neighborhoods do you serve?',
  'We provide trash and recycling pickup throughout Windsor, including Water Valley, Raindance, Highland Meadows, Windsor Lake, Downtown Windsor, Brunner Farm, and Poudre Heights. Our local drivers know Windsor well.',
  'Service Information',
  'windsor',
  11,
  true
),
(
  'Why do Windsor residents choose Dumpster Diverz?',
  'Since Windsor doesn''t provide city trash pickup for most areas, residents rely on us for dependable local service. We offer flexible cart sizes, online account management, and responsive support from your hometown waste company.',
  'Service Information',
  'windsor',
  12,
  true
)
ON CONFLICT DO NOTHING;
