-- Fix RLS policy for email attempts table completely
DROP POLICY IF EXISTS "Service role, internal users, and triggers can manage email attempts" ON email_attempts;

-- Create a comprehensive policy that allows all necessary contexts
CREATE POLICY "Allow email attempts management" ON email_attempts
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    auth.role() = 'postgres' OR
    is_internal_user(auth.uid()) OR
    auth.uid() IS NULL
  );

-- Test the manual email function
SELECT send_quote_email_manual('36092023-d05d-40b3-9cb3-8f8f642cd2fe');