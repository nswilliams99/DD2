-- Update Fort Collins pricing_info to JSON format for dynamic rendering
UPDATE residential_towns 
SET pricing_info = '{"items": [{"service": "65-gallon residential service", "price": "$29/month"}, {"service": "96-gallon residential service", "price": "$33/month"}, {"service": "Curbside recycling (optional)", "price": "$10/month"}]}'
WHERE slug = 'fort-collins';