-- Create size_calculator_logic table for storing recommendation logic
CREATE TABLE public.size_calculator_logic (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_type TEXT NOT NULL,
  volume_level TEXT NOT NULL,
  pickup_frequency TEXT NOT NULL,
  recommended_size TEXT NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create size_calculator_results table for logging user interactions
CREATE TABLE public.size_calculator_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_type TEXT NOT NULL,
  volume_level TEXT NOT NULL,
  pickup_frequency TEXT NOT NULL,
  town_slug TEXT,
  result_size TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_uuid TEXT,
  user_ip TEXT
);

-- Enable Row Level Security
ALTER TABLE public.size_calculator_logic ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.size_calculator_results ENABLE ROW LEVEL SECURITY;

-- Create policies for size_calculator_logic (public read access)
CREATE POLICY "Public can read calculator logic" 
ON public.size_calculator_logic 
FOR SELECT 
USING (true);

-- Create policies for size_calculator_results (public insert, authenticated manage)
CREATE POLICY "Public can insert calculator results" 
ON public.size_calculator_results 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage calculator results" 
ON public.size_calculator_results 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_size_calculator_logic_updated_at
BEFORE UPDATE ON public.size_calculator_logic
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Populate size_calculator_logic with recommendation data
INSERT INTO public.size_calculator_logic (project_type, volume_level, pickup_frequency, recommended_size, explanation) VALUES
-- Residential cleanout combinations
('residential_cleanout', 'few_bags', 'one_time', '2 Yard Dumpster', 'Perfect for small household cleanouts and decluttering projects'),
('residential_cleanout', 'few_bags', 'weekly', '2 Yard Dumpster', 'Ideal for regular household waste with weekly pickup'),
('residential_cleanout', 'few_bags', 'bi_weekly', '2 Yard Dumpster', 'Great for moderate household waste with bi-weekly service'),
('residential_cleanout', 'few_bags', 'monthly', '3 Yard Dumpster', 'Better capacity for monthly pickup of household items'),
('residential_cleanout', 'few_bulky', 'one_time', '3 Yard Dumpster', 'Right size for furniture and larger household items'),
('residential_cleanout', 'few_bulky', 'weekly', '3 Yard Dumpster', 'Accommodates bulky items with regular weekly service'),
('residential_cleanout', 'few_bulky', 'bi_weekly', '4 Yard Dumpster', 'Extra space for bulky items between pickups'),
('residential_cleanout', 'few_bulky', 'monthly', '4 Yard Dumpster', 'Ample space for monthly disposal of larger items'),
('residential_cleanout', 'full_room', 'one_time', '6 Yard Dumpster', 'Perfect for complete room cleanouts and renovations'),
('residential_cleanout', 'full_room', 'weekly', '4 Yard Dumpster', 'Efficient for ongoing room projects with weekly pickup'),
('residential_cleanout', 'whole_house', 'one_time', '8 Yard Dumpster', 'Maximum capacity for whole house cleanouts'),

-- Business pickup combinations
('business_pickup', 'few_bags', 'weekly', '2 Yard Dumpster', 'Ideal for small offices and retail businesses'),
('business_pickup', 'few_bags', 'bi_weekly', '3 Yard Dumpster', 'Good for businesses with moderate waste generation'),
('business_pickup', 'few_bags', 'monthly', '4 Yard Dumpster', 'Accommodates monthly business waste accumulation'),
('business_pickup', 'few_bulky', 'weekly', '3 Yard Dumpster', 'Handles business equipment and packaging materials'),
('business_pickup', 'few_bulky', 'bi_weekly', '4 Yard Dumpster', 'Perfect for businesses with larger disposal needs'),
('business_pickup', 'few_bulky', 'monthly', '6 Yard Dumpster', 'Ample space for monthly business cleanouts'),
('business_pickup', 'full_room', 'weekly', '6 Yard Dumpster', 'Ideal for restaurants and high-volume businesses'),
('business_pickup', 'full_room', 'bi_weekly', '8 Yard Dumpster', 'Maximum capacity for large business operations'),
('business_pickup', 'whole_house', 'weekly', '8 Yard Dumpster', 'Premium service for large commercial facilities'),

-- Construction combinations
('construction', 'few_bags', 'one_time', '4 Yard Dumpster', 'Good for small repair projects and minor renovations'),
('construction', 'few_bulky', 'one_time', '6 Yard Dumpster', 'Handles construction debris and renovation materials'),
('construction', 'full_room', 'one_time', '8 Yard Dumpster', 'Perfect for room renovations and remodeling projects'),
('construction', 'whole_house', 'one_time', '8 Yard Dumpster', 'Maximum capacity for major construction projects'),

-- Landscaping combinations
('landscaping', 'few_bags', 'one_time', '2 Yard Dumpster', 'Perfect for garden cleanup and small yard projects'),
('landscaping', 'few_bulky', 'one_time', '4 Yard Dumpster', 'Ideal for tree trimming and landscape renovation'),
('landscaping', 'full_room', 'one_time', '6 Yard Dumpster', 'Great for large landscaping and outdoor projects'),
('landscaping', 'whole_house', 'one_time', '8 Yard Dumpster', 'Maximum capacity for complete yard overhauls'),

-- Other project combinations
('other', 'few_bags', 'one_time', '3 Yard Dumpster', 'Versatile size for various small projects'),
('other', 'few_bulky', 'one_time', '4 Yard Dumpster', 'Good general purpose size for mixed materials'),
('other', 'full_room', 'one_time', '6 Yard Dumpster', 'Accommodates larger miscellaneous projects'),
('other', 'whole_house', 'one_time', '8 Yard Dumpster', 'Maximum capacity for large mixed projects');