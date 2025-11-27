
-- Create residential_towns table
CREATE TABLE public.residential_towns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL DEFAULT 'CO',
  hero_image_url TEXT,
  hero_alt_text TEXT,
  local_blurb TEXT,
  pricing_info TEXT,
  service_availability TEXT[] DEFAULT ARRAY['trash', 'recycling'],
  meta_title TEXT,
  meta_description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create residential_faqs table
CREATE TABLE public.residential_faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  town_slug TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key constraint for town_slug to ensure data integrity
ALTER TABLE public.residential_faqs 
ADD CONSTRAINT fk_residential_faqs_town_slug 
FOREIGN KEY (town_slug) REFERENCES public.residential_towns(slug) 
ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX idx_residential_towns_slug ON public.residential_towns(slug);
CREATE INDEX idx_residential_towns_active ON public.residential_towns(is_active);
CREATE INDEX idx_residential_faqs_town_slug ON public.residential_faqs(town_slug);
CREATE INDEX idx_residential_faqs_active ON public.residential_faqs(is_active);
CREATE INDEX idx_residential_faqs_sort_order ON public.residential_faqs(sort_order);

-- Create updated_at trigger for residential_towns
CREATE TRIGGER update_residential_towns_updated_at
  BEFORE UPDATE ON public.residential_towns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create updated_at trigger for residential_faqs
CREATE TRIGGER update_residential_faqs_updated_at
  BEFORE UPDATE ON public.residential_faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security (optional - can be added later if needed)
-- ALTER TABLE public.residential_towns ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.residential_faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since these are public pages)
-- CREATE POLICY "Public can view active residential towns" 
--   ON public.residential_towns 
--   FOR SELECT 
--   USING (is_active = true);

-- CREATE POLICY "Public can view active residential FAQs" 
--   ON public.residential_faqs 
--   FOR SELECT 
--   USING (is_active = true);
