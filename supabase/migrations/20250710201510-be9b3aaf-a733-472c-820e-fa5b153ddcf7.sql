-- Test vectorization by calling the edge function for a single section
SELECT 
  id,
  page_slug,
  section_name,
  title,
  description
FROM page_sections 
WHERE embedding IS NULL 
LIMIT 1;