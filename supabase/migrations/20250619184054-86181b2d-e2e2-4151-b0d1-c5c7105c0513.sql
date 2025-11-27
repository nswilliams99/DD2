
-- Insert Windsor town data into residential_towns table
INSERT INTO public.residential_towns (
  name, 
  slug, 
  state, 
  hero_image_url, 
  hero_alt_text, 
  local_blurb, 
  pricing_info, 
  service_availability, 
  meta_title, 
  meta_description, 
  is_active
) VALUES (
  'Windsor',
  'windsor',
  'CO',
  'https://your-s3-or-cdn-link.com/windsor-cart-hero.jpg',
  'Dumpster Diverz purple trash cart at curb in Windsor, Colorado',
  'Dumpster Diverz proudly serves Windsor with reliable weekly trash pickup and optional recycling. Choose between 65 or 96-gallon carts with no contracts and flexible service.',
  'Monthly service: $29 (65-gallon), $33 (96-gallon). Recycling add-on: $10/month.',
  ARRAY['trash', 'recycling'],
  'Residential Trash & Recycling Services in Windsor | Dumpster Diverz',
  'Dumpster Diverz provides reliable residential waste and recycling services in Windsor, Colorado. Weekly pickup, online management, and no contracts.',
  true
);

-- Insert global residential FAQs (town_slug = null)
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active) VALUES
(
  'What size trash carts do you offer?',
  'We offer both 65-gallon and 96-gallon carts for residential trash service.',
  'Service Information',
  NULL,
  1,
  true
),
(
  'How do I manage my account?',
  'You can log in online to manage billing, service changes, or request support anytime.',
  'Billing & Payments',
  NULL,
  2,
  true
);

-- Insert Windsor-specific FAQs
INSERT INTO public.residential_faqs (question, answer, category, town_slug, sort_order, is_active) VALUES
(
  'Is recycling available in Windsor?',
  'Yes, Windsor residents can add curbside recycling for $10/month alongside regular trash service.',
  'Service Information',
  'windsor',
  1,
  true
),
(
  'What day is pickup in Windsor?',
  'Pickup in Windsor occurs every Tuesday. Set carts out by 7:00 AM.',
  'Schedule',
  'windsor',
  2,
  true
);
