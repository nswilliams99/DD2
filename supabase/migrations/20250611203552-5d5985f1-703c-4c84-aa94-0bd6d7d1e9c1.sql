
-- Create content management tables for Phase 1

-- Services management table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  pricing_info JSONB DEFAULT '{}'::jsonb,
  service_areas TEXT[],
  featured_image TEXT,
  gallery_images TEXT[],
  is_active BOOLEAN DEFAULT true,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Knowledge base categories
CREATE TABLE IF NOT EXISTS public.kb_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Knowledge base articles
CREATE TABLE IF NOT EXISTS public.kb_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES kb_categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- FAQ management
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Testimonials management
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_title TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  service_type TEXT,
  location TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Page metadata for SEO
CREATE TABLE IF NOT EXISTS public.page_metadata (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  keywords TEXT[],
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  schema_markup JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_kb_articles_slug ON public.kb_articles(slug);
CREATE INDEX IF NOT EXISTS idx_kb_articles_published ON public.kb_articles(is_published);
CREATE INDEX IF NOT EXISTS idx_kb_articles_category ON public.kb_articles(category_id);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON public.faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_page_metadata_path ON public.page_metadata(page_path);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kb_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kb_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_metadata ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read kb_categories" ON public.kb_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published articles" ON public.kb_articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read active FAQs" ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read approved testimonials" ON public.testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can read page metadata" ON public.page_metadata FOR SELECT USING (true);

-- Create policies for authenticated users (admin) to manage content
CREATE POLICY "Authenticated users can manage services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage kb_categories" ON public.kb_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage kb_articles" ON public.kb_articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage FAQs" ON public.faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage page metadata" ON public.page_metadata FOR ALL USING (auth.role() = 'authenticated');

-- Create update triggers
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_kb_articles_updated_at BEFORE UPDATE ON public.kb_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_metadata_updated_at BEFORE UPDATE ON public.page_metadata FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial service data
INSERT INTO public.services (slug, title, description, content, service_areas, is_active) VALUES
('residential', 'Residential Waste Management', 'Reliable waste collection services for homes and residential properties', 'Comprehensive residential waste management services including weekly pickup, recycling, and special waste disposal.', ARRAY['Windsor', 'Fort Collins', 'Wellington'], true),
('commercial', 'Commercial Waste Solutions', 'Professional waste management for businesses of all sizes', 'Tailored commercial waste solutions with flexible scheduling, multiple container sizes, and specialized disposal services.', ARRAY['Windsor', 'Fort Collins', 'Wellington'], true),
('roll-off', 'Roll-Off Dumpster Rental', 'Temporary dumpsters for construction and large cleanups', 'Roll-off dumpster rentals for construction projects, home renovations, and large-scale cleanups with various sizes available.', ARRAY['Windsor', 'Fort Collins', 'Wellington'], true)
ON CONFLICT (slug) DO NOTHING;

-- Insert initial KB categories
INSERT INTO public.kb_categories (name, slug, description, icon) VALUES
('Getting Started', 'getting-started', 'Everything you need to know to get started with our services', 'play-circle'),
('Billing & Payments', 'billing-payments', 'Information about billing, payments, and account management', 'credit-card'),
('Service Information', 'service-info', 'Details about our waste management services', 'truck'),
('Troubleshooting', 'troubleshooting', 'Common issues and how to resolve them', 'wrench'),
('Policies & Guidelines', 'policies-guidelines', 'Company policies and waste disposal guidelines', 'file-text')
ON CONFLICT (slug) DO NOTHING;

-- Insert some initial FAQs
INSERT INTO public.faqs (question, answer, category, is_active) VALUES
('What areas do you service?', 'We provide waste management services in Windsor, Fort Collins, and Wellington, Colorado.', 'Service Information', true),
('When is my pickup day?', 'Pickup days vary by location. Please check your service agreement or contact us for your specific pickup schedule.', 'Service Information', true),
('What can I put in my trash bin?', 'Most household waste is acceptable. Please avoid hazardous materials, electronics, and items larger than the bin. See our guidelines for details.', 'Service Information', true),
('How do I pay my bill?', 'You can pay online through our customer portal, by phone, or by mail. We accept various payment methods for your convenience.', 'Billing & Payments', true),
('What if my bin is missed?', 'If your bin is missed, please contact us within 24 hours and we will arrange for pickup as soon as possible.', 'Troubleshooting', true)
ON CONFLICT DO NOTHING;
