UPDATE residential_towns 
SET hero_image_url = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/residential-fort-collins/resi_town_heroimg.jpeg',
    hero_alt_text = 'Fort Collins residential trash pickup service with reliable weekly collection',
    updated_at = now()
WHERE slug = 'fort-collins';