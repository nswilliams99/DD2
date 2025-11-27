-- Fix image URLs in page_sections to use full Supabase storage URLs
UPDATE page_sections 
SET image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/' || image_path
WHERE image_path IS NOT NULL 
  AND image_path NOT LIKE 'https://%'
  AND image_path NOT LIKE 'http://%';

-- Remove any invalid fallback paths that don't exist
UPDATE page_sections 
SET image_path = NULL
WHERE image_path LIKE '%/placeholder.svg%' 
   OR image_path LIKE '%undefined%'
   OR image_path = '';