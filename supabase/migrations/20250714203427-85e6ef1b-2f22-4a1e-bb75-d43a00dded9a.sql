-- Fix RLS policy for email attempts table to allow trigger context
DROP POLICY IF EXISTS "Service role and internal users can manage email attempts" ON email_attempts;

-- Create policy that allows service role, internal users, and database triggers
CREATE POLICY "Service role, internal users, and triggers can manage email attempts" ON email_attempts
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    is_internal_user(auth.uid()) OR
    auth.uid() IS NULL  -- Allow trigger context where auth.uid() is null
  );

-- Test the manual email function again
SELECT send_quote_email_manual('28eaa217-03ad-4840-b398-1633c65178cd');