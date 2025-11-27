-- Add embedding columns to tables that need vectorization
ALTER TABLE residential_faqs ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE commercial_faqs ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE services ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE residential_towns ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE rolloff_towns ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE commercial_sizes ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE rolloff_sizes ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE kb_articles ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Create indexes for vector similarity search
CREATE INDEX IF NOT EXISTS residential_faqs_embedding_idx ON residential_faqs USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS commercial_faqs_embedding_idx ON commercial_faqs USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS faqs_embedding_idx ON faqs USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS services_embedding_idx ON services USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS residential_towns_embedding_idx ON residential_towns USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS rolloff_towns_embedding_idx ON rolloff_towns USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS commercial_sizes_embedding_idx ON commercial_sizes USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS rolloff_sizes_embedding_idx ON rolloff_sizes USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS testimonials_embedding_idx ON testimonials USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS kb_articles_embedding_idx ON kb_articles USING hnsw (embedding vector_cosine_ops);

-- Create universal vectorization trigger function
CREATE OR REPLACE FUNCTION trigger_content_vectorization()
RETURNS TRIGGER AS $$
DECLARE
  content_text TEXT;
  content_metadata JSONB;
  table_name TEXT := TG_TABLE_NAME;
  record_id TEXT;
BEGIN
  -- Get record ID (handle different ID column types)
  IF table_name = 'page_sections' THEN
    record_id := NEW.id::text;
  ELSE
    record_id := NEW.id::text;
  END IF;

  -- Build content text based on table type
  CASE table_name
    WHEN 'residential_faqs', 'commercial_faqs', 'faqs', 'rolloff_size_faqs' THEN
      content_text := COALESCE(NEW.question, '') || ' ' || COALESCE(NEW.answer, '');
    WHEN 'rolloff_faqs' THEN
      content_text := COALESCE(NEW.question, '') || ' ' || COALESCE(NEW.answer, '');
    WHEN 'services' THEN
      content_text := COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.description, '') || ' ' || COALESCE(NEW.content, '');
    WHEN 'residential_towns', 'rolloff_towns' THEN
      content_text := COALESCE(NEW.name, '') || ' ' || COALESCE(NEW.local_blurb, '') || ' ' || COALESCE(NEW.meta_description, '');
    WHEN 'commercial_sizes' THEN
      content_text := COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.description, '');
    WHEN 'rolloff_sizes' THEN
      content_text := COALESCE(NEW.size_label, '') || ' ' || COALESCE(NEW.description, '') || ' ' || COALESCE(NEW.detailed_description, '');
    WHEN 'testimonials' THEN
      content_text := COALESCE(NEW.content, '') || ' ' || COALESCE(NEW.customer_name, '');
    WHEN 'kb_articles' THEN
      content_text := COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.content, '') || ' ' || COALESCE(NEW.excerpt, '');
    WHEN 'page_sections' THEN
      content_text := COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.description, '');
    ELSE
      content_text := '';
  END CASE;

  -- Skip if no content
  IF content_text IS NULL OR TRIM(content_text) = '' THEN
    RETURN NEW;
  END IF;

  -- Create metadata object
  content_metadata := jsonb_build_object(
    'table_name', table_name,
    'record_id', record_id,
    'updated_at', NEW.updated_at::text
  );

  -- Add table-specific metadata
  CASE table_name
    WHEN 'page_sections' THEN
      content_metadata := content_metadata || jsonb_build_object(
        'page_slug', NEW.page_slug,
        'section_name', NEW.section_name,
        'display_order', NEW.display_order
      );
    WHEN 'residential_faqs', 'commercial_faqs', 'faqs', 'rolloff_faqs', 'rolloff_size_faqs' THEN
      content_metadata := content_metadata || jsonb_build_object(
        'category', COALESCE(NEW.category, 'general'),
        'is_active', COALESCE(NEW.is_active, true)
      );
    WHEN 'residential_towns', 'rolloff_towns' THEN
      content_metadata := content_metadata || jsonb_build_object(
        'town_name', NEW.name,
        'slug', NEW.slug,
        'state', COALESCE(NEW.state, 'CO')
      );
  END CASE;

  -- Call vectorization edge function asynchronously
  PERFORM net.http_post(
    url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
    ),
    body := jsonb_build_object(
      'content', content_text,
      'contentType', table_name,
      'title', CASE 
        WHEN table_name IN ('services', 'kb_articles') THEN NEW.title
        WHEN table_name IN ('residential_faqs', 'commercial_faqs', 'faqs', 'rolloff_faqs', 'rolloff_size_faqs') THEN NEW.question
        WHEN table_name IN ('residential_towns', 'rolloff_towns') THEN NEW.name
        WHEN table_name = 'commercial_sizes' THEN NEW.title
        WHEN table_name = 'rolloff_sizes' THEN NEW.size_label
        WHEN table_name = 'page_sections' THEN NEW.title
        ELSE NULL
      END,
      'metadata', content_metadata
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all content tables
DROP TRIGGER IF EXISTS vectorize_residential_faqs_trigger ON residential_faqs;
CREATE TRIGGER vectorize_residential_faqs_trigger
  AFTER INSERT OR UPDATE OF question, answer
  ON residential_faqs
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();

DROP TRIGGER IF EXISTS vectorize_commercial_faqs_trigger ON commercial_faqs;
CREATE TRIGGER vectorize_commercial_faqs_trigger
  AFTER INSERT OR UPDATE OF question, answer
  ON commercial_faqs
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();

DROP TRIGGER IF EXISTS vectorize_faqs_trigger ON faqs;
CREATE TRIGGER vectorize_faqs_trigger
  AFTER INSERT OR UPDATE OF question, answer
  ON faqs
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();

DROP TRIGGER IF EXISTS vectorize_rolloff_faqs_trigger ON rolloff_faqs;
CREATE TRIGGER vectorize_rolloff_faqs_trigger
  AFTER INSERT OR UPDATE OF question, answer
  ON rolloff_faqs
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();

DROP TRIGGER IF EXISTS vectorize_services_trigger ON services;
CREATE TRIGGER vectorize_services_trigger
  AFTER INSERT OR UPDATE OF title, description, content
  ON services
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();

DROP TRIGGER IF EXISTS vectorize_residential_towns_trigger ON residential_towns;
CREATE TRIGGER vectorize_residential_towns_trigger
  AFTER INSERT OR UPDATE OF name, local_blurb, meta_description
  ON residential_towns
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();

DROP TRIGGER IF EXISTS vectorize_rolloff_towns_trigger ON rolloff_towns;
CREATE TRIGGER vectorize_rolloff_towns_trigger
  AFTER INSERT OR UPDATE OF name, local_blurb, meta_description
  ON rolloff_towns
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();

DROP TRIGGER IF EXISTS vectorize_commercial_sizes_trigger ON commercial_sizes;
CREATE TRIGGER vectorize_commercial_sizes_trigger
  AFTER INSERT OR UPDATE OF title, description
  ON commercial_sizes
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();

DROP TRIGGER IF EXISTS vectorize_rolloff_sizes_trigger ON rolloff_sizes;
CREATE TRIGGER vectorize_rolloff_sizes_trigger
  AFTER INSERT OR UPDATE OF size_label, description, detailed_description
  ON rolloff_sizes
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();

DROP TRIGGER IF EXISTS vectorize_testimonials_trigger ON testimonials;
CREATE TRIGGER vectorize_testimonials_trigger
  AFTER INSERT OR UPDATE OF content, customer_name
  ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();

DROP TRIGGER IF EXISTS vectorize_kb_articles_trigger ON kb_articles;
CREATE TRIGGER vectorize_kb_articles_trigger
  AFTER INSERT OR UPDATE OF title, content, excerpt
  ON kb_articles
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();

-- Update the existing page sections trigger to use the new function
DROP TRIGGER IF EXISTS page_sections_vectorization_trigger ON page_sections;
CREATE TRIGGER page_sections_vectorization_trigger
  AFTER INSERT OR UPDATE OF title, description
  ON page_sections
  FOR EACH ROW
  EXECUTE FUNCTION trigger_content_vectorization();