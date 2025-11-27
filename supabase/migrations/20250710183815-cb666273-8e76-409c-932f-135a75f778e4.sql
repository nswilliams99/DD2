-- Set the service role key for this session and test
SET app.service_role_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0';

-- Test the vectorize-content edge function again with proper service role key
SELECT net.http_post(
  url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
  headers := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer ' || current_setting('app.service_role_key', true)
  ),
  body := jsonb_build_object(
    'content', 'Test content for vectorization - second attempt',
    'contentType', 'test',
    'title', 'Test Title 2',
    'metadata', jsonb_build_object('test', true, 'attempt', 2)
  )
) as test_request_2;