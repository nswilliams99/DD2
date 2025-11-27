
-- Update Greeley rolloff town data with enhanced local content and SEO optimization
UPDATE rolloff_towns 
SET 
  local_blurb = 'Dumpster Diverz provides professional roll-off dumpster rental services throughout Greeley, Colorado''s largest city and home to the University of Northern Colorado. Our 10-40 yard containers serve all of Greeley proper including West Greeley, Kelly Farm, Promontory, and St. Michaels neighborhoods, plus the UNC campus area for student housing cleanouts and rental property projects. We extend service to Evans, Garden City, and new builds north toward CR 66. Unlike national haulers like Waste Management and Republic Services, we''re locally owned and based right here in Northern Colorado - which means no contracts, no hidden fuel surcharges, no call centers, and real customer service from people who understand local project needs. We proudly serve all of Greeley and most surrounding neighborhoods - if you''re outside city limits, give us a call to confirm service availability. From UNC student moves and agricultural projects to new subdivision development and established neighborhood renovations, our team provides same-day delivery and flexible scheduling that big corporations simply can''t match.',
  
  meta_title = 'Roll-Off Dumpster Rental in Greeley, CO | UNC Campus Area | Same-Day Delivery | Dumpster Diverz',
  
  meta_description = 'Professional roll-off dumpster rentals in Greeley, Colorado. Serving UNC campus, West Greeley, Kelly Farm, Promontory areas. 10-40 yard containers, no contracts, no hidden fees. Locally owned Northern Colorado company vs national haulers.',
  
  hero_image_url = '/lovable-uploads/83de10f7-82de-45c2-81a2-3e6a4d347744.jpg',
  
  hero_alt_text = 'Roll-off dumpster rental service in Greeley, Colorado - Professional containers for construction and renovation projects near University of Northern Colorado and West Greeley neighborhoods',
  
  updated_at = now()
WHERE slug = 'greeley';
