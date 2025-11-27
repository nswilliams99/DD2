-- Fix vectorization plan: Clear incorrect data and run complete vectorization

-- Step 1: Clear incorrectly stored embeddings from document_embeddings table
DELETE FROM document_embeddings 
WHERE content_type = 'page_section';

-- Step 2: Clear any existing embeddings from page_sections to start fresh
UPDATE page_sections SET embedding = NULL;

-- Step 3: Run the batch vectorization function to process all sections correctly
SELECT batch_vectorize_page_sections() as sections_processed;