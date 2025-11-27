-- Update business hours to 7:00 AM - 4:00 PM Monday-Friday
UPDATE page_sections 
SET description = 'Monday – Friday: 7:00 AM – 4:00 PM, Saturday: Closed, Sunday: Emergency service only (upon availability)',
    updated_at = now()
WHERE page_slug = 'contact' AND section_name = 'business-hours';