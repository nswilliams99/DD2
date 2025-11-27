UPDATE page_sections 
SET image_path = 'website_pics/pages/residential-fort-collins/resi_town_weekly_pickup.webp',
    updated_at = now()
WHERE page_slug = 'residential-fort-collins' AND section_name = 'weekly-pickup';