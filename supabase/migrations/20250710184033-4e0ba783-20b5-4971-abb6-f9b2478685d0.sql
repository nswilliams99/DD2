-- Let's test the search function directly to verify OpenAI API is working
-- First, insert a test embedding manually
INSERT INTO document_embeddings (
  content,
  content_type,
  title,
  metadata,
  embedding,
  word_count
) VALUES (
  'Test content about dumpster rental services in Colorado',
  'test',
  'Test Document',
  '{"test": true}',
  '[0.1, 0.2, 0.3]', -- Dummy embedding for testing
  8
);

-- Check if the insert worked
SELECT COUNT(*) as test_embeddings FROM document_embeddings WHERE content_type = 'test';