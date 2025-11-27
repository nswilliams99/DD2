-- Enable Row Level Security on page_sections
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to page_sections
CREATE POLICY "Public can read page sections" 
  ON public.page_sections 
  FOR SELECT 
  TO public
  USING (true);