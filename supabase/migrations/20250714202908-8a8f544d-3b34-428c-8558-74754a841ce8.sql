-- Fix RLS policy for email attempts table
DROP POLICY IF EXISTS "Internal users can manage email attempts" ON email_attempts;

-- Create policy that allows service role and internal users
CREATE POLICY "Service role and internal users can manage email attempts" ON email_attempts
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    is_internal_user(auth.uid())
  );

-- Test the manual email function again
SELECT send_quote_email_manual('28eaa217-03ad-4840-b398-1633c65178cd');