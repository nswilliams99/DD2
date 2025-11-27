-- Update Fort Collins residential page hero image
UPDATE public.residential_towns 
SET 
  hero_image_url = '/lovable-uploads/955d4b7c-09aa-4192-9ea2-9fa3300ea555.png',
  hero_alt_text = 'Friendly Dumpster Diverz employee with trash cart and service truck in Fort Collins neighborhood'
WHERE slug = 'fort-collins';