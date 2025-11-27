-- Enable required extensions for HTTP requests and ensure trigger is properly configured
SELECT pg_net.http_post(
  'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/send-quote-email',
  jsonb_build_object(
    'record', jsonb_build_object(
      'id', gen_random_uuid()::text,
      'name', 'Test User',
      'email', 'test@example.com',
      'service_type', 'test',
      'created_at', now()::text
    )
  ),
  jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
  )
) as test_result;