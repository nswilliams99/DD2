-- Update North County hero image to use the proper residential hero image
UPDATE residential_towns 
SET hero_image_url = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/media/02_r1r2/residential-hero.webp'
WHERE slug = 'north-county';