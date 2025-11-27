-- Add email tracking fields to quote_requests table
ALTER TABLE quote_requests 
ADD COLUMN email_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN email_status TEXT DEFAULT 'pending',
ADD COLUMN email_error_message TEXT,
ADD COLUMN postmark_message_id TEXT;