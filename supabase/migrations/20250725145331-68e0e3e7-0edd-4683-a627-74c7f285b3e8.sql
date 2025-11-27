-- Comprehensive RLS fix for all public content tables
-- This will enable RLS and create appropriate public read policies

-- 1. Enable RLS on all tables that need it
ALTER TABLE public.rolloff_towns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rolloff_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rolloff_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rolloff_size_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commercial_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commercial_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commercial_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kb_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kb_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.residential_faqs ENABLE ROW LEVEL SECURITY;

-- 2. Create public read policies for content tables

-- Rolloff towns - public read for active towns
CREATE POLICY "Public can read active rolloff towns" 
ON public.rolloff_towns 
FOR SELECT 
USING (is_active = true);

-- Rolloff FAQs - public read for active FAQs
CREATE POLICY "Public can read active rolloff FAQs" 
ON public.rolloff_faqs 
FOR SELECT 
USING (is_active = true);

-- Rolloff sizes - public read access
CREATE POLICY "Public can read rolloff sizes" 
ON public.rolloff_sizes 
FOR SELECT 
USING (true);

-- Rolloff size FAQs - public read for active FAQs
CREATE POLICY "Public can read active rolloff size FAQs" 
ON public.rolloff_size_faqs 
FOR SELECT 
USING (is_active = true);

-- Commercial FAQs - public read for active FAQs
CREATE POLICY "Public can read active commercial FAQs" 
ON public.commercial_faqs 
FOR SELECT 
USING (is_active = true);

-- Commercial sizes - public read for active sizes
CREATE POLICY "Public can read active commercial sizes" 
ON public.commercial_sizes 
FOR SELECT 
USING (is_active = true);

-- Commercial specs - public read for active specs
CREATE POLICY "Public can read active commercial specs" 
ON public.commercial_specs 
FOR SELECT 
USING (is_active = true);

-- General FAQs - public read for active FAQs
CREATE POLICY "Public can read active FAQs" 
ON public.faqs 
FOR SELECT 
USING (is_active = true);

-- Services - public read for active services
CREATE POLICY "Public can read active services" 
ON public.services 
FOR SELECT 
USING (is_active = true);

-- Knowledge base articles - public read for published articles
CREATE POLICY "Public can read published KB articles" 
ON public.kb_articles 
FOR SELECT 
USING (is_published = true);

-- Knowledge base categories - public read for active categories
CREATE POLICY "Public can read active KB categories" 
ON public.kb_categories 
FOR SELECT 
USING (is_active = true);

-- Page sections - public read access
CREATE POLICY "Public can read page sections" 
ON public.page_sections 
FOR SELECT 
USING (true);

-- Page metadata - public read access
CREATE POLICY "Public can read page metadata" 
ON public.page_metadata 
FOR SELECT 
USING (true);

-- Residential FAQs - public read for active FAQs
CREATE POLICY "Public can read active residential FAQs" 
ON public.residential_faqs 
FOR SELECT 
USING (is_active = true);