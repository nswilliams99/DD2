-- Create trigger to automatically send email when new quote request is inserted
CREATE OR REPLACE TRIGGER quote_request_email_trigger
    AFTER INSERT ON quote_requests
    FOR EACH ROW
    EXECUTE FUNCTION notify_quote_request_improved();