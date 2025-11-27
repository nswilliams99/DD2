-- Re-enable the trigger for quote email notifications
ALTER TABLE quote_requests ENABLE TRIGGER trigger_quote_email_notification;

-- Also create a trigger for rolloff quote requests if it doesn't exist
CREATE OR REPLACE TRIGGER trigger_rolloff_quote_email_notification
  AFTER INSERT ON rolloff_quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_quote_request();