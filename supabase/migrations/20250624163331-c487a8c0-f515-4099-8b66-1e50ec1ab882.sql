
-- Update Windsor residential town data with SEO-optimized, locally-relevant content
UPDATE public.residential_towns 
SET 
  local_blurb = 'Reliable residential trash and recycling services for Windsor''s 45,000+ residents. As a growing family-friendly community with a 78% homeownership rate, Windsor families trust Dumpster Diverz for weekly curbside pickup. Serving all Windsor neighborhoods from downtown to newer developments with flexible cart sizes and no long-term contracts.',
  
  meta_title = 'Windsor CO Residential Trash Pickup & Recycling | Dumpster Diverz',
  
  meta_description = 'Professional residential trash and recycling services in Windsor, Colorado. Weekly pickup for 45,000+ residents with 65 & 96-gallon carts. No contracts, local drivers, online billing.',
  
  pricing_info = 'Windsor residential service: $29/month (65-gallon cart), $33/month (96-gallon cart). Optional recycling service: $10/month. No setup fees or long-term contracts for Windsor homeowners.',
  
  hero_alt_text = 'Dumpster Diverz residential trash service cart on driveway in Windsor, Colorado neighborhood',
  
  updated_at = now()
WHERE slug = 'windsor';

-- Update Windsor-specific FAQs with local context
UPDATE public.residential_faqs 
SET 
  answer = 'Trash pickup in Windsor is every Monday. Please have your cart at the curb by 7:00 AM. Our local drivers know Windsor neighborhoods well and provide reliable service to all areas of town.'
WHERE town_slug = 'windsor' AND question LIKE '%day%trash%pickup%';

UPDATE public.residential_faqs 
SET 
  answer = 'Yes! Since Windsor doesn''t provide municipal recycling, many residents choose our optional recycling service for $10/month. We pick up recycling on the same day as your trash service.'
WHERE town_slug = 'windsor' AND question LIKE '%recycling%service%';

-- Add new Windsor-specific FAQ if it doesn't exist
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active)
VALUES (
  'Do you serve all Windsor neighborhoods?',
  'Yes! We provide residential trash and recycling pickup throughout Windsor, from established neighborhoods near downtown to newer developments. Our local drivers are familiar with Windsor''s growing community and provide reliable service to all areas.',
  'Service Information',
  'windsor',
  3,
  true
) ON CONFLICT DO NOTHING;

-- Add another Windsor-specific FAQ about the growing community
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active)
VALUES (
  'Why do Windsor residents choose Dumpster Diverz?',
  'Windsor homeowners appreciate our local service, flexible cart sizes, and no-contract approach. With Windsor''s high homeownership rate and family-friendly community, residents want reliable waste management they can count on. We provide personalized service with online account management.',
  'Service Information',
  'windsor',
  4,
  true
) ON CONFLICT DO NOTHING;
