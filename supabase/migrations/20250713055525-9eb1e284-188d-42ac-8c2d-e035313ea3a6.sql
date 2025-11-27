-- Process commercial FAQs manually by calling a simpler version
DO $$
DECLARE
  faq_record RECORD;
  processed_count INTEGER := 0;
BEGIN
  -- Loop through commercial FAQs and trigger them individually  
  FOR faq_record IN 
    SELECT id, question, answer FROM commercial_faqs WHERE embedding IS NULL
  LOOP
    BEGIN
      -- Try to call the edge function for each FAQ
      PERFORM net.http_post(
        url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
        ),
        body := jsonb_build_object(
          'content', COALESCE(faq_record.question, '') || ' ' || COALESCE(faq_record.answer, ''),
          'contentType', 'commercial_faqs',
          'title', faq_record.question,
          'metadata', jsonb_build_object(
            'table_name', 'commercial_faqs',
            'record_id', faq_record.id
          )
        )
      );
      
      processed_count := processed_count + 1;
      
      -- Small delay
      PERFORM pg_sleep(1);
      
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Failed to process FAQ %: %', faq_record.id, SQLERRM;
    END;
  END LOOP;
  
  RAISE NOTICE 'Processed % commercial FAQs', processed_count;
END $$;