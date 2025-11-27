UPDATE page_sections 
SET image_path = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/01_landing%20page/1truck%20on%20street.jpg',
    updated_at = now()
WHERE page_slug = 'homepage' AND section_name = 'hero';