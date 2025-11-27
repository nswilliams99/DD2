
-- Insert Greeley town data into residential_towns table
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
  'Greeley',
  'greeley', 
  'CO',
  '/lovable-uploads/placeholder-greeley.jpg',
  'Dumpster Diverz residential trash cart in Greeley, Colorado',
  'Dumpster Diverz provides weekly residential trash pickup and optional recycling in Greeley. Enjoy flexible service, online account access, and no contracts.',
  'Residential Trash & Recycling Services in Greeley | Dumpster Diverz',
  'Dumpster Diverz offers weekly trash and recycling services for homes in Greeley, CO. Flexible carts, text alerts, and local support.',
  'Monthly service: $29 (65-gallon), $33 (96-gallon). Recycling add-on: $10/month.',
  ARRAY['trash', 'recycling'],
  true
);

-- Insert Greeley-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active) VALUES
(
  'What day is trash pickup in Greeley?',
  'Trash is collected every Tuesday. Please place your cart out by 7:00 AM.',
  'Schedule',
  'greeley',
  1,
  true
),
(
  'Can I get a larger trash cart in Greeley?',
  'Yes, we offer both 65-gallon and 96-gallon options. You can upgrade anytime.',
  'Service Options',
  'greeley',
  2,
  true
);
