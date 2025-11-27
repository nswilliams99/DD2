-- Update commercial page section image paths
INSERT INTO page_sections (page_slug, section_name, image_path, display_order, updated_at)
VALUES 
  ('commercial', 'hero', 'media/03_c1c2/commercial-hero.webp', 1, now()),
  ('commercial', 'flexible-pickup-top', 'media/03_c1c2/commercial-flexible-pickup-top.webp', 2, now()),
  ('commercial', 'right-size', 'media/03_c1c2/commercial-right-size.webp', 3, now()),
  ('commercial', 'flexible-pickup-bottom', 'media/03_c1c2/commercial-flexible-pickup-bottom.webp', 4, now()),
  ('commercial', 'dumpster-size-cards', 'media/03_c1c2/commercial-dumpster-default.webp', 5, now())
ON CONFLICT (page_slug, section_name) 
DO UPDATE SET 
  image_path = EXCLUDED.image_path,
  updated_at = now();