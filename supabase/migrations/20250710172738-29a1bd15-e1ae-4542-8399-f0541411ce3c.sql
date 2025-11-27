-- Fix the hero image path to point to an image that actually exists
UPDATE page_sections 
SET image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/01_landing page/resi_hero_image_reference.webp'
WHERE page_slug = 'homepage' 
  AND section_name = 'hero' 
  AND image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/04_ro/ChatGPT_Image_fortcolllins_hero.png';