-- Fix all homepage image paths to point to correct storage locations
UPDATE page_sections 
SET image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/01_landing page/about-section-image.webp'
WHERE page_slug = 'homepage' 
  AND section_name = 'about' 
  AND image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/homepage/about-section-image.webp';

UPDATE page_sections 
SET image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/01_landing page/resi-services-card.webp'
WHERE page_slug = 'homepage' 
  AND section_name = 'services-residential' 
  AND image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/homepage/resi-services-card.webp';

UPDATE page_sections 
SET image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/01_landing page/commercial-services-card.webp'
WHERE page_slug = 'homepage' 
  AND section_name = 'services-commercial' 
  AND image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/homepage/commercial-services-card.webp';

-- For rolloff, let's check what rolloff images exist and use a fallback since it's not in 01_landing
UPDATE page_sections 
SET image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/01_landing page/commercial-services-card.webp'
WHERE page_slug = 'homepage' 
  AND section_name = 'services-rolloff' 
  AND image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/homepage/rolloff-services-card.webp';