UPDATE page_sections 
SET image_path = 'website_pics/pages/residential-windsor/resi_town_weekly_pickup.webp',
    updated_at = now()
WHERE page_slug = 'residential-windsor' AND section_name = 'weekly-pickup';