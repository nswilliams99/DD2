-- First drop the problematic trigger for rolloff_sizes if it exists
DROP TRIGGER IF EXISTS trigger_content_vectorization_rolloff_sizes ON rolloff_sizes;

-- Add missing rolloff sizes without the problematic trigger
INSERT INTO rolloff_sizes (
  size_label, 
  cubic_yards, 
  slug, 
  description, 
  display_order,
  dimensions,
  weight_limit,
  pricing_range,
  ideal_for,
  use_cases,
  detailed_description,
  meta_title,
  meta_description,
  seo_keywords
) VALUES 
(
  '10 Yard',
  10,
  '10-yard',
  'Perfect for small home projects and cleanouts',
  0,
  '12 ft L x 8 ft W x 3.5 ft H',
  '2-3 tons',
  '$350 - $450',
  'Small home cleanouts, garage cleaning, small renovation debris',
  ARRAY['home cleanout', 'garage cleaning', 'small renovation', 'yard waste', 'furniture disposal'],
  'Our 10-yard dumpster is the perfect solution for small home projects, garage cleanouts, and minor renovations. With a compact size that fits in most driveways, it can handle 2-3 tons of debris while being easy to load.',
  '10 Yard Dumpster Rental | Small Project Cleanup | Dumpster Diverz',
  'Rent a 10-yard dumpster for small home projects, garage cleanouts, and minor renovations. Perfect for residential use with easy driveway placement.',
  ARRAY['10 yard dumpster', 'small dumpster rental', 'home cleanout', 'garage cleaning', 'residential dumpster']
),
(
  '40 Yard',
  40,
  '40-yard',
  'Large commercial projects and major construction jobs',
  50,
  '22 ft L x 8 ft W x 8 ft H',
  '5-6 tons',
  '$550 - $750',
  'Large commercial projects, major construction, industrial cleanouts',
  ARRAY['commercial construction', 'large renovation', 'industrial cleanout', 'office building cleanout', 'warehouse cleanup'],
  'Our largest 40-yard dumpster is designed for major commercial and construction projects. With maximum capacity for 5-6 tons of debris, it handles the biggest jobs efficiently.',
  '40 Yard Dumpster Rental | Large Commercial Projects | Dumpster Diverz',
  'Rent a 40-yard dumpster for large commercial projects, major construction jobs, and industrial cleanouts. Maximum capacity for big projects.',
  ARRAY['40 yard dumpster', 'large dumpster rental', 'commercial dumpster', 'construction dumpster', 'industrial cleanup']
);