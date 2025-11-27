
-- Update Windsor residential town data with new SEO-optimized content
UPDATE public.residential_towns 
SET 
  meta_title = 'Windsor CO Trash & Recycling | Weekly Pickup | Dumpster Diverz',
  
  meta_description = 'Reliable trash and recycling in Windsor, CO. Dumpster Diverz offers affordable weekly pickup, friendly local service, and no hidden fees. Get started today.',
  
  local_blurb = 'Dumpster Diverz proudly serves Windsor neighborhoods like Water Valley, Raindance, and Highland Meadows with clean, dependable weekly trash pickup and optional recycling. We''re locally owned, HOA-friendly, and deliver small-town service with big-time reliability.',
  
  updated_at = now()
WHERE slug = 'windsor';

-- Add new pricing_intro field if it doesn't exist (this field may not exist in the current schema)
-- We'll handle this in the application code if the field doesn't exist

-- Add Windsor-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active)
VALUES 
(
  'What day is trash picked up in Windsor?',
  'Pickup days vary by neighborhood, but most Windsor customers are on Thursday or Friday routes. We''ll confirm your day when you sign up — or just give us a call!',
  'Schedule',
  'windsor',
  10,
  true
),
(
  'Can I get trash and recycling in Windsor?',
  'Yes — we offer weekly trash pickup and optional recycling service for Windsor residents. You can add or remove recycling at any time through your customer portal.',
  'Service Information',
  'windsor',
  11,
  true
),
(
  'Does Dumpster Diverz serve HOAs in Windsor?',
  'Absolutely. We''re experienced with Windsor-area HOAs and provide clean carts and discreet placement that meets community guidelines. Let us know if your HOA has specific requirements.',
  'Service Information',
  'windsor',
  12,
  true
)
ON CONFLICT DO NOTHING;
