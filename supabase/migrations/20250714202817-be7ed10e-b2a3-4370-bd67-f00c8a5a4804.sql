-- Create improved email notification system with comprehensive logging and error handling (Fixed version)

-- Create a table to track email attempts and failures
CREATE TABLE IF NOT EXISTS email_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID, -- Made nullable to allow test records
  attempt_number INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, success, failed, retrying
  error_message TEXT,
  http_status_code INTEGER,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  edge_function_response JSONB
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_email_attempts_quote_id ON email_attempts(quote_id);
CREATE INDEX IF NOT EXISTS idx_email_attempts_status ON email_attempts(status);

-- Create a function to test basic HTTP connectivity
CREATE OR REPLACE FUNCTION test_http_connectivity()
RETURNS JSONB AS $$
DECLARE
  response_data JSONB;
BEGIN
  -- Test basic HTTP connectivity
  SELECT net.http_get('https://httpbin.org/get') INTO response_data;
  
  -- Log the test result (using NULL for quote_id for test records)
  INSERT INTO email_attempts (quote_id, attempt_number, status, error_message, attempted_at)
  VALUES (NULL, 0, 'connectivity_test', 
          'HTTP connectivity test: ' || COALESCE(response_data::text, 'null'), now());
  
  RETURN response_data;
EXCEPTION WHEN OTHERS THEN
  -- Log the error (using NULL for quote_id for test records)
  INSERT INTO email_attempts (quote_id, attempt_number, status, error_message, attempted_at)
  VALUES (NULL, 0, 'connectivity_failed', 
          'HTTP connectivity failed: ' || SQLSTATE || ' - ' || SQLERRM, now());
  
  RETURN jsonb_build_object('error', SQLERRM, 'sqlstate', SQLSTATE);
END;
$$ LANGUAGE plpgsql;

-- Create improved quote request notification function
CREATE OR REPLACE FUNCTION notify_quote_request_improved()
RETURNS TRIGGER AS $$
DECLARE
  request_id UUID;
  response_data JSONB;
  attempt_count INTEGER;
  error_details TEXT;
BEGIN
  -- Get current attempt count for this quote
  SELECT COALESCE(MAX(attempt_number), 0) + 1 
  INTO attempt_count 
  FROM email_attempts 
  WHERE quote_id = NEW.id;
  
  -- Create initial attempt record
  INSERT INTO email_attempts (quote_id, attempt_number, status, attempted_at)
  VALUES (NEW.id, attempt_count, 'pending', now())
  RETURNING id INTO request_id;
  
  -- Log the attempt
  RAISE NOTICE 'Starting email notification for quote %, attempt %', NEW.id, attempt_count;
  
  BEGIN
    -- Call the edge function to send email notification
    SELECT net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/send-quote-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
      ),
      body := jsonb_build_object(
        'record', to_jsonb(NEW)
      )
    ) INTO response_data;
    
    -- Log successful response
    RAISE NOTICE 'Email notification response for quote %: %', NEW.id, response_data;
    
    -- Update attempt record with success
    UPDATE email_attempts 
    SET status = 'success', 
        completed_at = now(),
        edge_function_response = response_data,
        http_status_code = COALESCE((response_data->>'status_code')::integer, 200)
    WHERE id = request_id;
    
  EXCEPTION WHEN OTHERS THEN
    -- Capture detailed error information
    error_details := 'SQLSTATE: ' || SQLSTATE || ', SQLERRM: ' || SQLERRM;
    
    -- Log the error
    RAISE NOTICE 'Email notification failed for quote %: %', NEW.id, error_details;
    
    -- Update attempt record with failure
    UPDATE email_attempts 
    SET status = 'failed', 
        completed_at = now(),
        error_message = error_details
    WHERE id = request_id;
    
    -- For critical errors, also log to a separate error table
    INSERT INTO email_attempts (quote_id, attempt_number, status, error_message, attempted_at)
    VALUES (NEW.id, 999, 'critical_error', 
            'Critical error in trigger: ' || error_details, now());
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a manual email sending function for testing and retries
CREATE OR REPLACE FUNCTION send_quote_email_manual(quote_uuid UUID)
RETURNS JSONB AS $$
DECLARE
  quote_record RECORD;
  response_data JSONB;
  request_id UUID;
  attempt_count INTEGER;
BEGIN
  -- Get the quote record
  SELECT * INTO quote_record FROM quote_requests WHERE id = quote_uuid;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Quote not found', 'quote_id', quote_uuid);
  END IF;
  
  -- Get current attempt count
  SELECT COALESCE(MAX(attempt_number), 0) + 1 
  INTO attempt_count 
  FROM email_attempts 
  WHERE quote_id = quote_uuid;
  
  -- Create attempt record
  INSERT INTO email_attempts (quote_id, attempt_number, status, attempted_at)
  VALUES (quote_uuid, attempt_count, 'manual_pending', now())
  RETURNING id INTO request_id;
  
  BEGIN
    -- Call the edge function
    SELECT net.http_post(
      url := 'https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/send-quote-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0'
      ),
      body := jsonb_build_object(
        'record', to_jsonb(quote_record)
      )
    ) INTO response_data;
    
    -- Update attempt record with success
    UPDATE email_attempts 
    SET status = 'manual_success', 
        completed_at = now(),
        edge_function_response = response_data,
        http_status_code = COALESCE((response_data->>'status_code')::integer, 200)
    WHERE id = request_id;
    
    RETURN jsonb_build_object(
      'success', true, 
      'quote_id', quote_uuid,
      'attempt_number', attempt_count,
      'response', response_data
    );
    
  EXCEPTION WHEN OTHERS THEN
    -- Update attempt record with failure
    UPDATE email_attempts 
    SET status = 'manual_failed', 
        completed_at = now(),
        error_message = 'SQLSTATE: ' || SQLSTATE || ', SQLERRM: ' || SQLERRM
    WHERE id = request_id;
    
    RETURN jsonb_build_object(
      'success', false, 
      'quote_id', quote_uuid,
      'attempt_number', attempt_count,
      'error', SQLERRM,
      'sqlstate', SQLSTATE
    );
  END;
END;
$$ LANGUAGE plpgsql;

-- Create a function to retry failed emails
CREATE OR REPLACE FUNCTION retry_failed_emails()
RETURNS JSONB AS $$
DECLARE
  failed_quote RECORD;
  retry_result JSONB;
  total_retried INTEGER := 0;
  results JSONB := '[]'::jsonb;
BEGIN
  -- Get quotes with failed email attempts (max 3 attempts)
  FOR failed_quote IN
    SELECT DISTINCT q.id, q.name, q.email, q.service_type,
           COUNT(ea.id) as attempt_count
    FROM quote_requests q
    JOIN email_attempts ea ON q.id = ea.quote_id
    WHERE ea.status IN ('failed', 'manual_failed')
    GROUP BY q.id, q.name, q.email, q.service_type
    HAVING COUNT(ea.id) < 3
    ORDER BY q.created_at DESC
    LIMIT 5
  LOOP
    -- Retry the email
    SELECT send_quote_email_manual(failed_quote.id) INTO retry_result;
    
    -- Add to results
    results := results || jsonb_build_array(retry_result);
    total_retried := total_retried + 1;
  END LOOP;
  
  RETURN jsonb_build_object(
    'total_retried', total_retried,
    'results', results
  );
END;
$$ LANGUAGE plpgsql;

-- Update the existing trigger to use the improved function
DROP TRIGGER IF EXISTS trigger_quote_email_notification ON quote_requests;
CREATE TRIGGER trigger_quote_email_notification
  AFTER INSERT ON quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_quote_request_improved();

-- Also create trigger for rolloff quotes
DROP TRIGGER IF EXISTS trigger_rolloff_quote_email_notification ON rolloff_quote_requests;
CREATE TRIGGER trigger_rolloff_quote_email_notification
  AFTER INSERT ON rolloff_quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_quote_request_improved();

-- Enable RLS on the new table
ALTER TABLE email_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy for email attempts
CREATE POLICY "Internal users can manage email attempts" ON email_attempts
  FOR ALL USING (is_internal_user(auth.uid()));

-- Test connectivity immediately
SELECT test_http_connectivity();