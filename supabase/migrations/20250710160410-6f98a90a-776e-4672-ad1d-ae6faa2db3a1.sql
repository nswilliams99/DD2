-- Create function to trigger vectorization for page sections
CREATE OR REPLACE FUNCTION trigger_page_section_vectorization()
RETURNS TRIGGER AS $$
DECLARE
  section_content TEXT;
  section_metadata JSONB;
BEGIN
  -- Combine title and description for vectorization
  section_content := COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.description, '');
  
  -- Create metadata object
  section_metadata := jsonb_build_object(
    'page_slug', NEW.page_slug,
    'section_name', NEW.section_name,
    'display_order', NEW.display_order,
    'section_id', NEW.id
  );
  
  -- Call vectorization edge function asynchronously
  PERFORM net.http_post(
    url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.service_role_key', true)
    ),
    body := jsonb_build_object(
      'content', section_content,
      'contentType', 'page_section',
      'title', NEW.title,
      'metadata', section_metadata || jsonb_build_object(
        'page_slug', NEW.page_slug,
        'section_name', NEW.section_name,
        'updated_at', NEW.updated_at::text
      )
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for page sections
DROP TRIGGER IF EXISTS page_sections_vectorization_trigger ON page_sections;
CREATE TRIGGER page_sections_vectorization_trigger
  AFTER INSERT OR UPDATE
  ON page_sections
  FOR EACH ROW
  EXECUTE FUNCTION trigger_page_section_vectorization();

-- Create function to batch vectorize existing page sections
CREATE OR REPLACE FUNCTION batch_vectorize_page_sections()
RETURNS INTEGER AS $$
DECLARE
  section_record RECORD;
  section_content TEXT;
  section_metadata JSONB;
  vectorized_count INTEGER := 0;
BEGIN
  -- Loop through all page sections with null embeddings
  FOR section_record IN 
    SELECT * FROM page_sections 
    WHERE embedding IS NULL
    ORDER BY page_slug, display_order
  LOOP
    -- Combine title and description for vectorization
    section_content := COALESCE(section_record.title, '') || ' ' || COALESCE(section_record.description, '');
    
    -- Create metadata object
    section_metadata := jsonb_build_object(
      'page_slug', section_record.page_slug,
      'section_name', section_record.section_name,
      'display_order', section_record.display_order,
      'section_id', section_record.id,
      'updated_at', section_record.updated_at::text
    );
    
    -- Call vectorization edge function
    PERFORM net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.service_role_key', true)
      ),
      body := jsonb_build_object(
        'content', section_content,
        'contentType', 'page_section',
        'title', section_record.title,
        'metadata', section_metadata
      )
    );
    
    vectorized_count := vectorized_count + 1;
    
    -- Add small delay to avoid overwhelming the API
    PERFORM pg_sleep(0.1);
  END LOOP;
  
  RETURN vectorized_count;
END;
$$ LANGUAGE plpgsql;

-- Enable the required extensions for HTTP calls
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Set service role key for the session (this needs to be set when calling the function)
-- ALTER DATABASE postgres SET app.service_role_key = 'your_service_role_key_here';