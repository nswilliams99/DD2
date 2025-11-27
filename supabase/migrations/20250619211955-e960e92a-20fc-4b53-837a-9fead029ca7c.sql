
-- Insert Severance town data into residential_towns table
INSERT INTO public.residential_towns (
  name, 
  slug, 
  state, 
  hero_image_url, 
  hero_alt_text, 
  local_blurb, 
  meta_title, 
  meta_description,
  pricing_info,
  service_availability,
  is_active
) VALUES (
  'Severance',
  'severance', 
  'CO',
  '/lovable-uploads/placeholder-severance.jpg',
  'Dumpster Diverz purple trash cart on driveway in Severance, Colorado',
  'Dumpster Diverz proudly serves Severance with weekly trash pickup and optional recycling. Simple pricing, no contracts, and fast customer service.',
  'Residential Trash & Recycling Services in Severance | Dumpster Diverz',
  'Dumpster Diverz offers reliable weekly residential trash and recycling in Severance, Colorado. Choose from two cart sizes and manage your service online.',
  'Monthly service: $29 (65-gallon), $33 (96-gallon). Recycling add-on: $10/month.',
  ARRAY['trash', 'recycling'],
  true
);

-- Insert Severance-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active) VALUES
(
  'What day is trash pickup in Severance?',
  'Pickup in Severance is every Thursday. Please have carts at the curb by 7:00 AM.',
  'Schedule',
  'severance',
  1,
  true
),
(
  'Does Severance include recycling service?',
  'Yes! Recycling pickup is available for an additional $10/month.',
  'Service Information',
  'severance',
  2,
  true
);
