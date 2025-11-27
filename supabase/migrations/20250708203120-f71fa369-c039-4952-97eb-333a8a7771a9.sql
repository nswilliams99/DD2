-- Fix the page_slug to match the correct format
UPDATE page_sections 
SET page_slug = 'residential-north-county' 
WHERE page_slug = 'residential-northern-communities';

-- Update North County pricing_info to JSON format for dynamic rendering
UPDATE residential_towns 
SET pricing_info = '{"items": [{"service": "65-gallon residential service", "price": "$29/month"}, {"service": "96-gallon residential service", "price": "$33/month"}, {"service": "Curbside recycling (optional)", "price": "$10/month"}]}'
WHERE slug = 'north-county';