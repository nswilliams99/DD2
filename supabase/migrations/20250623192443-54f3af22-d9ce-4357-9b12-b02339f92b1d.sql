
-- Create commercial_specs table to store dumpster specifications
CREATE TABLE public.commercial_specs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  size_slug text NOT NULL UNIQUE,
  label text NOT NULL,
  dimensions text NOT NULL,
  capacity text NOT NULL,
  ideal_use text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add trigger to update the updated_at column
CREATE TRIGGER update_commercial_specs_updated_at
  BEFORE UPDATE ON public.commercial_specs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the existing hardcoded data
INSERT INTO public.commercial_specs (size_slug, label, dimensions, capacity, ideal_use, sort_order) VALUES
  ('2-yard', '2-Yard', '6'' L x 3'' W x 3'' H', '~16 bags', 'Small offices, retail', 1),
  ('3-yard', '3-Yard', '6'' L x 3.5'' W x 3.5'' H', '~24 bags', 'Small restaurants', 2);

-- Enable Row Level Security (RLS) - making it publicly readable since it's reference data
ALTER TABLE public.commercial_specs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access for commercial specs" 
  ON public.commercial_specs 
  FOR SELECT 
  TO public
  USING (is_active = true);
