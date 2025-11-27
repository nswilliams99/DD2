-- Create function to send quote email notification
CREATE OR REPLACE FUNCTION notify_quote_request()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the edge function to send email notification
  PERFORM net.http_post(
    url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/send-quote-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
    ),
    body := jsonb_build_object(
      'record', to_jsonb(NEW)
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically send email when new quote is inserted
CREATE TRIGGER trigger_quote_email_notification
  AFTER INSERT ON quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_quote_request();