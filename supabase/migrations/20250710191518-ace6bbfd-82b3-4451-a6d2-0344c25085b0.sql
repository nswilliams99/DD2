-- Test calling the edge function directly for one section
SELECT net.http_post(
  url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
  headers := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
  ),
  body := jsonb_build_object(
    'content', 'Flexible Pickup Schedules Choose from daily, weekly, or bi-weekly pickup schedules to match your business needs. Our reliable commercial service ensures your dumpsters are emptied on time, keeping your business operations running smoothly.',
    'contentType', 'page_section',
    'title', 'Flexible Pickup Schedules',
    'metadata', jsonb_build_object(
      'page_slug', 'commercial',
      'section_name', 'flexible-pickup-schedules',
      'display_order', 0,
      'section_id', 1
    )
  )
) AS response;