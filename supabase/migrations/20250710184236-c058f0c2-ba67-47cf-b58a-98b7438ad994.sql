-- Insert a test embedding with correct dimensions (1536)
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
  -- Create a 1536-dimension vector filled with small random values
  ('[' || array_to_string(array(select random()::text from generate_series(1, 1536)), ',') || ']')::vector,
  8
);

-- Check if the insert worked
SELECT COUNT(*) as test_embeddings FROM document_embeddings WHERE content_type = 'test';