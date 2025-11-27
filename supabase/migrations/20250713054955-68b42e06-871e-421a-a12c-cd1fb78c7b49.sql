-- Create batch vectorization function for all content tables
CREATE OR REPLACE FUNCTION batch_vectorize_all_content()
RETURNS TABLE(table_name text, total_records integer, processed_records integer) AS $$
DECLARE
  record_count INTEGER;
  processed_count INTEGER;
BEGIN
  -- Process page_sections (existing batch function)
  PERFORM net.http_post(
    url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
    ),
    body := jsonb_build_object('batch', true)
  );

  -- Process residential_faqs
  SELECT COUNT(*) INTO record_count FROM residential_faqs WHERE embedding IS NULL;
  IF record_count > 0 THEN
    INSERT INTO vectorization_jobs (source_type, source_path, status)
    VALUES ('batch_residential_faqs', 'residential_faqs', 'processing');
    
    PERFORM net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
      ),
      body := jsonb_build_object(
        'content', '',
        'contentType', 'batch_residential_faqs',
        'batch', true
      )
    );
  END IF;

  -- Process commercial_faqs
  SELECT COUNT(*) INTO record_count FROM commercial_faqs WHERE embedding IS NULL;
  IF record_count > 0 THEN
    INSERT INTO vectorization_jobs (source_type, source_path, status)
    VALUES ('batch_commercial_faqs', 'commercial_faqs', 'processing');
    
    PERFORM net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
      ),
      body := jsonb_build_object(
        'content', '',
        'contentType', 'batch_commercial_faqs',
        'batch', true
      )
    );
  END IF;

  -- Process faqs
  SELECT COUNT(*) INTO record_count FROM faqs WHERE embedding IS NULL;
  IF record_count > 0 THEN
    INSERT INTO vectorization_jobs (source_type, source_path, status)
    VALUES ('batch_faqs', 'faqs', 'processing');
    
    PERFORM net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
      ),
      body := jsonb_build_object(
        'content', '',
        'contentType', 'batch_faqs',
        'batch', true
      )
    );
  END IF;

  -- Process rolloff_faqs
  SELECT COUNT(*) INTO record_count FROM rolloff_faqs WHERE embedding IS NULL;
  IF record_count > 0 THEN
    INSERT INTO vectorization_jobs (source_type, source_path, status)
    VALUES ('batch_rolloff_faqs', 'rolloff_faqs', 'processing');
    
    PERFORM net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
      ),
      body := jsonb_build_object(
        'content', '',
        'contentType', 'batch_rolloff_faqs',
        'batch', true
      )
    );
  END IF;

  -- Process services
  SELECT COUNT(*) INTO record_count FROM services WHERE embedding IS NULL AND is_active = true;
  IF record_count > 0 THEN
    INSERT INTO vectorization_jobs (source_type, source_path, status)
    VALUES ('batch_services', 'services', 'processing');
    
    PERFORM net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
      ),
      body := jsonb_build_object(
        'content', '',
        'contentType', 'batch_services',
        'batch', true
      )
    );
  END IF;

  -- Process residential_towns
  SELECT COUNT(*) INTO record_count FROM residential_towns WHERE embedding IS NULL AND is_active = true;
  IF record_count > 0 THEN
    INSERT INTO vectorization_jobs (source_type, source_path, status)
    VALUES ('batch_residential_towns', 'residential_towns', 'processing');
    
    PERFORM net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
      ),
      body := jsonb_build_object(
        'content', '',
        'contentType', 'batch_residential_towns',
        'batch', true
      )
    );
  END IF;

  -- Process rolloff_towns
  SELECT COUNT(*) INTO record_count FROM rolloff_towns WHERE embedding IS NULL AND is_active = true;
  IF record_count > 0 THEN
    INSERT INTO vectorization_jobs (source_type, source_path, status)
    VALUES ('batch_rolloff_towns', 'rolloff_towns', 'processing');
    
    PERFORM net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
      ),
      body := jsonb_build_object(
        'content', '',
        'contentType', 'batch_rolloff_towns',
        'batch', true
      )
    );
  END IF;

  -- Process commercial_sizes
  SELECT COUNT(*) INTO record_count FROM commercial_sizes WHERE embedding IS NULL AND is_active = true;
  IF record_count > 0 THEN
    INSERT INTO vectorization_jobs (source_type, source_path, status)
    VALUES ('batch_commercial_sizes', 'commercial_sizes', 'processing');
    
    PERFORM net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
      ),
      body := jsonb_build_object(
        'content', '',
        'contentType', 'batch_commercial_sizes',
        'batch', true
      )
    );
  END IF;

  -- Process rolloff_sizes
  SELECT COUNT(*) INTO record_count FROM rolloff_sizes WHERE embedding IS NULL;
  IF record_count > 0 THEN
    INSERT INTO vectorization_jobs (source_type, source_path, status)
    VALUES ('batch_rolloff_sizes', 'rolloff_sizes', 'processing');
    
    PERFORM net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
      ),
      body := jsonb_build_object(
        'content', '',
        'contentType', 'batch_rolloff_sizes',
        'batch', true
      )
    );
  END IF;

  -- Return summary (simplified for now)
  RETURN QUERY SELECT 'batch_processing' as table_name, 0 as total_records, 0 as processed_records;
END;
$$ LANGUAGE plpgsql;

-- Run the batch vectorization
SELECT batch_vectorize_all_content();