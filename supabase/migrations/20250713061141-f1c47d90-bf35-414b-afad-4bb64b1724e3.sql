-- Create vectorization test table
CREATE TABLE public.vectorization_test (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vectorization_test ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for testing)
CREATE POLICY "Public can read test data" 
ON public.vectorization_test 
FOR SELECT 
USING (true);

CREATE POLICY "Public can insert test data" 
ON public.vectorization_test 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can update test data" 
ON public.vectorization_test 
FOR UPDATE 
USING (true);

-- Insert test data
INSERT INTO public.vectorization_test (title, content) VALUES
('Test FAQ 1', 'What is dumpster rental? Dumpster rental is a service where we provide temporary waste containers for construction, renovation, or cleanup projects.'),
('Test FAQ 2', 'How much does it cost? Pricing varies based on dumpster size, rental duration, and location. Contact us for a custom quote.'),
('Test FAQ 3', 'What can I put in the dumpster? You can dispose of most construction debris, household items, and yard waste. Hazardous materials are not allowed.');