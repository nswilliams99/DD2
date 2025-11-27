UPDATE page_sections 
SET title = 'Trash service that doesn''t suck',
    updated_at = now()
WHERE page_slug = 'homepage' 
  AND section_name = 'hero';