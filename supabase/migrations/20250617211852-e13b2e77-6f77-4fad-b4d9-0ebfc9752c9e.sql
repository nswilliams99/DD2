
-- Create rolloff_faqs table for FAQ management
CREATE TABLE public.rolloff_faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rolloff_towns table for town-specific content
CREATE TABLE public.rolloff_towns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  state TEXT DEFAULT 'CO',
  hero_image_url TEXT,
  hero_alt_text TEXT,
  local_blurb TEXT,
  meta_title TEXT,
  meta_description TEXT,
  kml_polygon_data TEXT,
  map_center_lat DECIMAL,
  map_center_lng DECIMAL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rolloff_quote_requests table for form submissions
CREATE TABLE public.rolloff_quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  business_name TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  dumpster_sizes TEXT[],
  material_types TEXT,
  project_duration TEXT,
  best_contact_time TEXT,
  notes TEXT,
  town_slug TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create FAQ embeddings table for AI vectorization
CREATE TABLE public.rolloff_faq_embeddings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  faq_id UUID REFERENCES public.rolloff_faqs(id) ON DELETE CASCADE,
  embedding vector(1536),
  content_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page embeddings table for full-page vectorization
CREATE TABLE public.rolloff_page_embeddings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  town_slug TEXT NOT NULL,
  content_chunk TEXT NOT NULL,
  chunk_type TEXT NOT NULL, -- 'blurb', 'hero', 'faq', 'full_page'
  embedding vector(1536),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for vector similarity search
CREATE INDEX rolloff_faq_embeddings_embedding_idx ON public.rolloff_faq_embeddings 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX rolloff_page_embeddings_embedding_idx ON public.rolloff_page_embeddings 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Create indexes for performance
CREATE INDEX rolloff_towns_slug_idx ON public.rolloff_towns (slug);
CREATE INDEX rolloff_quote_requests_town_slug_idx ON public.rolloff_quote_requests (town_slug);
CREATE INDEX rolloff_page_embeddings_town_slug_idx ON public.rolloff_page_embeddings (town_slug);

-- Enable Row Level Security
ALTER TABLE public.rolloff_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rolloff_towns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rolloff_quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rolloff_faq_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rolloff_page_embeddings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read active rolloff FAQs" 
  ON public.rolloff_faqs 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Public can read active rolloff towns" 
  ON public.rolloff_towns 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Public can insert quote requests" 
  ON public.rolloff_quote_requests 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public can read FAQ embeddings" 
  ON public.rolloff_faq_embeddings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public can read page embeddings" 
  ON public.rolloff_page_embeddings 
  FOR SELECT 
  USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Authenticated users can manage rolloff FAQs" 
  ON public.rolloff_faqs 
  FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage rolloff towns" 
  ON public.rolloff_towns 
  FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage quote requests" 
  ON public.rolloff_quote_requests 
  FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage FAQ embeddings" 
  ON public.rolloff_faq_embeddings 
  FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage page embeddings" 
  ON public.rolloff_page_embeddings 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_rolloff_faqs_updated_at 
  BEFORE UPDATE ON public.rolloff_faqs 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rolloff_towns_updated_at 
  BEFORE UPDATE ON public.rolloff_towns 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial town data
INSERT INTO public.rolloff_towns (name, slug, meta_title, meta_description, local_blurb) VALUES
('Fort Collins', 'fort-collins', 
 'Rolloff Dumpster Rentals in Fort Collins, CO | Dumpster Diverz',
 'Professional rolloff dumpster rentals in Fort Collins, Colorado. 12-30 yard containers for construction, renovation, and cleanup projects. Same-day delivery available.',
 'Fort Collins residents and contractors trust Dumpster Diverz for reliable rolloff dumpster rentals. From home renovations to construction sites, our 12-30 yard containers handle projects of all sizes across Fort Collins and Northern Colorado.'),

('Loveland', 'loveland',
 'Rolloff Dumpster Rentals in Loveland, CO | Dumpster Diverz', 
 'Affordable rolloff dumpster rentals in Loveland, Colorado. Construction debris, home cleanouts, roofing projects. Multiple sizes available with flexible scheduling.',
 'Serving Loveland with professional rolloff dumpster services for over a decade. Whether you''re tackling a kitchen remodel or managing a construction project, our containers are perfect for debris removal in Loveland and surrounding areas.'),

('Greeley', 'greeley',
 'Rolloff Dumpster Rentals in Greeley, CO | Dumpster Diverz',
 'Greeley rolloff dumpster rentals for construction, renovation, and cleanup projects. Professional service with competitive pricing and flexible terms.',
 'Greeley homeowners and contractors choose Dumpster Diverz for efficient waste management solutions. Our rolloff containers are ideal for roofing projects, home additions, and large cleanouts throughout Greeley and Weld County.'),

('Longmont', 'longmont', 
 'Rolloff Dumpster Rentals in Longmont, CO | Dumpster Diverz',
 'Longmont dumpster rental services for residential and commercial projects. Same-day delivery, competitive rates, and reliable pickup scheduling.',
 'From Boulder County to Longmont, our rolloff dumpsters support your biggest projects. Perfect for home renovations, landscaping debris, and construction waste removal with convenient delivery throughout Longmont.'),

('Windsor', 'windsor',
 'Rolloff Dumpster Rentals in Windsor, CO | Dumpster Diverz', 
 'Windsor rolloff dumpster rentals with local expertise. Construction debris removal, home cleanouts, and renovation projects. Professional service guaranteed.',
 'Windsor residents know Dumpster Diverz for dependable rolloff dumpster rentals. Our local team understands Windsor''s unique needs, providing efficient waste solutions for residential and commercial projects.'),

('Berthoud', 'berthoud',
 'Rolloff Dumpster Rentals in Berthoud, CO | Dumpster Diverz',
 'Berthoud dumpster rental services for construction and home improvement projects. Flexible scheduling and competitive pricing for all container sizes.',
 'Serving Berthoud with reliable rolloff dumpster rentals for construction debris, home cleanouts, and renovation projects. Our containers fit perfectly in Berthoud''s residential areas with professional delivery service.'),

('Severance', 'severance',
 'Rolloff Dumpster Rentals in Severance, CO | Dumpster Diverz',
 'Severance rolloff dumpster rentals for residential and commercial waste removal. Multiple container sizes with same-day delivery available.',
 'Severance contractors and homeowners rely on Dumpster Diverz for efficient rolloff dumpster services. From small home projects to large commercial cleanouts, we serve all of Severance with professional waste management.'),

('Wellington', 'wellington', 
 'Rolloff Dumpster Rentals in Wellington, CO | Dumpster Diverz',
 'Wellington dumpster rental services with local expertise. Construction debris, roofing projects, and home renovations. Professional delivery and pickup.',
 'Wellington''s trusted source for rolloff dumpster rentals. Our containers are perfect for construction sites, home improvements, and large cleanout projects throughout Wellington and Northern Larimer County.'),

('Northern Communities', 'northern-communities',
 'Rolloff Dumpster Rentals | Bellvue, Laporte, Masonville & More | Dumpster Diverz',
 'Rolloff dumpster rentals serving Bellvue, Laporte, Masonville, Nunn, Pierce, Drake, and Crystal Lakes. Professional waste management for Northern Colorado communities.',
 'Serving the unique communities of Northern Colorado including Bellvue, Laporte, Masonville, Nunn, Pierce, Drake, and Crystal Lakes. Our rolloff dumpsters reach every corner of these beautiful areas with reliable, professional service.');

-- Insert initial FAQ data
INSERT INTO public.rolloff_faqs (question, answer, sort_order) VALUES
('What sizes of rolloff dumpsters do you offer?', 'We offer 12, 15, 20, and 30-yard rolloff dumpsters. Our 12-yard is perfect for small home projects, 15-yard for medium renovations, 20-yard for large cleanouts, and 30-yard for major construction projects.', 1),
('How much does a rolloff dumpster rental cost?', 'Pricing varies by container size, rental duration, and location. Contact us for a free quote tailored to your specific project needs. We offer competitive rates with no hidden fees.', 2),
('How long can I keep the dumpster?', 'Standard rental periods are 7-10 days, with extensions available. We work with your project timeline to ensure you have the container as long as needed.', 3),
('What can I put in a rolloff dumpster?', 'You can dispose of construction debris, household junk, furniture, appliances, yard waste, and most renovation materials. Hazardous materials, liquids, and electronics are not permitted.', 4),
('Do I need a permit for a rolloff dumpster?', 'Permits are typically required if the dumpster will be placed on public property like streets or sidewalks. We can help guide you through the permit process for your local area.', 5),
('How much notice do you need for delivery?', 'We can often provide same-day or next-day delivery depending on availability. For guaranteed delivery times, we recommend booking 24-48 hours in advance.', 6);
