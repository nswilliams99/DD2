-- Fix the page_sections.embedding column to use proper vector type with 1536 dimensions
ALTER TABLE page_sections 
ALTER COLUMN embedding TYPE VECTOR(1536) 
USING embedding::vector(1536);