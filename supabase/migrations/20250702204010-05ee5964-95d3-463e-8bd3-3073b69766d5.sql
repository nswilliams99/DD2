-- Update Windsor residential page hero image
UPDATE public.residential_towns 
SET 
  hero_image_url = '/lovable-uploads/windsor-hero-employee.png',
  hero_alt_text = 'Dumpster Diverz employee in Windsor, Colorado providing friendly residential trash service'
WHERE slug = 'windsor';