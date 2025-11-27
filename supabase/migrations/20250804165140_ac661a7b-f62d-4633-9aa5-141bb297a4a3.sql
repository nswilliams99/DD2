-- Temporarily disable the trigger that's causing issues
ALTER TABLE page_sections DISABLE TRIGGER ALL;

-- Update the hero section with new image and improved content
UPDATE page_sections 
SET 
  image_path = '/lovable-uploads/21272c53-bde3-4b3a-abe0-59afacf77af0.png',
  title = 'Professional Waste Management with Text Notifications',
  description = 'Family-owned Dumpster Diverz provides reliable trash pickup and dumpster rental services in Northern Colorado. Stay updated with every pickup through our text notification system. No contracts required.',
  updated_at = now()
WHERE page_slug = 'home' AND section_name = 'hero';

-- If the hero section doesn't exist, create it
INSERT INTO page_sections (page_slug, section_name, title, description, image_path, display_order, created_at, updated_at)
SELECT 'home', 'hero', 
       'Professional Waste Management with Text Notifications',
       'Family-owned Dumpster Diverz provides reliable trash pickup and dumpster rental services in Northern Colorado. Stay updated with every pickup through our text notification system. No contracts required.',
       '/lovable-uploads/21272c53-bde3-4b3a-abe0-59afacf77af0.png',
       1,
       now(),
       now()
WHERE NOT EXISTS (
  SELECT 1 FROM page_sections WHERE page_slug = 'home' AND section_name = 'hero'
);

-- Re-enable the triggers
ALTER TABLE page_sections ENABLE TRIGGER ALL;