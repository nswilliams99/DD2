-- Update batch function with correct service role key
CREATE OR REPLACE FUNCTION public.batch_vectorize_page_sections()
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
    
    -- Call vectorization edge function with correct service role key
    PERFORM net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
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

-- Run the updated batch function
SELECT batch_vectorize_page_sections() as sections_processed;