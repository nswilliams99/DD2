UPDATE residential_towns 
SET hero_image_url = 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/residential-windsor/resi_town_heroimg.jpeg',
    hero_alt_text = 'Dumpster Diverz providing reliable residential trash and recycling services in Windsor, Colorado',
    updated_at = now()
WHERE slug = 'windsor';