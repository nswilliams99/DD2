-- Update the existing page_sections record with the missing content
UPDATE page_sections 
SET 
  title = 'Flexible Pickup Schedules',
  description = 'Choose from daily, weekly, or bi-weekly pickup schedules to match your business needs. Our reliable commercial service ensures your dumpsters are emptied on time, keeping your business operations running smoothly.',
  button_text = 'Schedule Service',
  button_url = '/contact'
WHERE page_slug = 'commercial' AND section_name = 'flexible-pickup-schedules';