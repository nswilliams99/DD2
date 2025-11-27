-- Create HOA quote requests table
CREATE TABLE public.hoa_quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hoa_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  town TEXT,
  num_units INTEGER,
  notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hoa_quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert access (anyone can submit a quote request)
CREATE POLICY "Anyone can submit HOA quote requests" 
ON public.hoa_quote_requests 
FOR INSERT 
WITH CHECK (true);

-- Create policy for authenticated users to view all requests (for admin purposes)
CREATE POLICY "Authenticated users can view HOA quote requests" 
ON public.hoa_quote_requests 
FOR SELECT 
USING (auth.role() = 'authenticated');