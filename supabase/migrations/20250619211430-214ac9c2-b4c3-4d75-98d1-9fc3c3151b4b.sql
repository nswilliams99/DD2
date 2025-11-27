
-- Insert Fort Collins town data into residential_towns table
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
  'Fort Collins',
  'fort-collins', 
  'CO',
  '/lovable-uploads/placeholder-fort-collins.jpg',
  'Dumpster Diverz purple trash cart on residential street in Fort Collins, Colorado',
  'Dumpster Diverz provides weekly residential trash pickup and optional recycling in Fort Collins, Colorado. Two cart sizes, no contracts, and fast local support.',
  'Residential Trash & Recycling Services in Fort Collins | Dumpster Diverz',
  'Dumpster Diverz provides reliable residential waste and recycling services in Fort Collins, Colorado. Weekly pickup, online management, and no contracts.',
  'Monthly service: $29 (65-gallon), $33 (96-gallon). Recycling add-on: $10/month.',
  ARRAY['trash', 'recycling'],
  true
);

-- Insert Fort Collins-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active) VALUES
(
  'What day is trash pickup in Fort Collins?',
  'Trash is picked up every Friday. Please have carts at the curb by 7:00 AM.',
  'Schedule',
  'fort-collins',
  1,
  true
),
(
  'Can I add curbside recycling in Fort Collins?',
  'Yes, recycling is available for an additional $10/month.',
  'Service Information',
  'fort-collins',
  2,
  true
);
