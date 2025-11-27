-- Test the vectorize-content edge function directly
SELECT net.http_post(
  url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
  headers := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer ' || current_setting('app.service_role_key', true)
  ),
  body := jsonb_build_object(
    'content', 'Test content for vectorization',
    'contentType', 'test',
    'title', 'Test Title',
    'metadata', jsonb_build_object('test', true)
  )
) as test_request;