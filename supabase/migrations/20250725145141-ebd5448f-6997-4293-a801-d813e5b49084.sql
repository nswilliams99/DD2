-- Fix RLS issue for residential_towns table
-- Enable Row Level Security
ALTER TABLE public.residential_towns ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to active towns
CREATE POLICY "Allow public read access to active residential towns" 
ON public.residential_towns 
FOR SELECT 
USING (is_active = true);