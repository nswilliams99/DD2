-- Temporarily disable triggers
ALTER TABLE page_sections DISABLE TRIGGER ALL;

-- Update the correct hero section with the new image
UPDATE page_sections 
SET 
  image_path = '/lovable-uploads/21272c53-bde3-4b3a-abe0-59afacf77af0.png',
  title = 'Professional Waste Management with Text Notifications',
  description = 'Family-owned Dumpster Diverz provides reliable trash pickup and dumpster rental services in Northern Colorado. Stay updated with every pickup through our text notification system. No contracts required.',
  updated_at = now()
WHERE page_slug = 'homepage' AND section_name = 'hero';

-- Re-enable triggers
ALTER TABLE page_sections ENABLE TRIGGER ALL;