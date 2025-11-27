-- Update the trigger function to use the correct service role key
CREATE OR REPLACE FUNCTION public.trigger_page_section_vectorization()
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
  
  -- Call vectorization edge function asynchronously with correct service role key
  PERFORM net.http_post(
    url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
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