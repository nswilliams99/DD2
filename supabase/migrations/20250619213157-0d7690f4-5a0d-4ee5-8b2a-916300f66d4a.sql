
-- Insert Wellington town data into residential_towns table
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
  'Wellington',
  'wellington', 
  'CO',
  '/lovable-uploads/placeholder-wellington.jpg',
  'Dumpster Diverz residential trash service in Wellington, Colorado',
  'Dumpster Diverz provides weekly trash pickup and optional curbside recycling in Wellington, CO. Choose from two cart sizes and enjoy local support with no contracts.',
  'Residential Trash & Recycling Services in Wellington | Dumpster Diverz',
  'Dumpster Diverz offers dependable trash and recycling service in Wellington, Colorado. Affordable rates, weekly pickup, and hassle-free online management.',
  'Monthly service: $29 (65-gallon), $33 (96-gallon). Recycling add-on: $10/month.',
  ARRAY['trash', 'recycling'],
  true
);

-- Insert Wellington-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active) VALUES
(
  'When is trash pickup in Wellington?',
  'Pickup in Wellington is every Thursday. Please set out your cart by 7:00 AM.',
  'Schedule',
  'wellington',
  1,
  true
),
(
  'Is recycling available in Wellington?',
  'Yes, we offer curbside recycling in Wellington for an additional $10/month.',
  'Service Information',
  'wellington',
  2,
  true
);
