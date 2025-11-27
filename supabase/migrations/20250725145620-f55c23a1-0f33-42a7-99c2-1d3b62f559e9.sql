-- Enable RLS on all remaining tables and create appropriate policies
-- These tables are mostly internal/admin data or competitor analysis data

-- Enable RLS on all remaining tables
ALTER TABLE public.competitor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_scraped_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_seo_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hauler_company ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hauler_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hauler_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_page_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_types ENABLE ROW LEVEL SECURITY;

-- Handle any additional tables that might exist
DO $$
BEGIN
    -- Enable RLS on website related tables if they exist
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'website_punchlist') THEN
        EXECUTE 'ALTER TABLE public.website_punchlist ENABLE ROW LEVEL SECURITY';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'website_punchlist_steps') THEN
        EXECUTE 'ALTER TABLE public.website_punchlist_steps ENABLE ROW LEVEL SECURITY';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'websites') THEN
        EXECUTE 'ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY';
    END IF;
END $$;

-- Create policies for tables that should have restricted access (admin/internal only)
-- Most of these tables should only be accessible to internal users or service role

-- Competitor analysis tables - internal use only
CREATE POLICY "Internal users can manage competitor reviews" 
ON public.competitor_reviews 
FOR ALL 
USING (is_internal_user(auth.uid()));

CREATE POLICY "Internal users can manage competitor pages" 
ON public.competitor_scraped_pages 
FOR ALL 
USING (is_internal_user(auth.uid()));

CREATE POLICY "Internal users can manage competitor insights" 
ON public.competitor_seo_insights 
FOR ALL 
USING (is_internal_user(auth.uid()));

CREATE POLICY "Internal users can manage competitor websites" 
ON public.competitor_websites 
FOR ALL 
USING (is_internal_user(auth.uid()));

-- Customer data - very sensitive, internal only
CREATE POLICY "Internal users can manage customers" 
ON public.customers 
FOR ALL 
USING (is_internal_user(auth.uid()));

-- Hauler/company data - internal only  
CREATE POLICY "Internal users can manage hauler companies" 
ON public.hauler_company 
FOR ALL 
USING (is_internal_user(auth.uid()));

CREATE POLICY "Internal users can manage hauler locations" 
ON public.hauler_locations 
FOR ALL 
USING (is_internal_user(auth.uid()));

CREATE POLICY "Internal users can manage hauler services" 
ON public.hauler_services 
FOR ALL 
USING (is_internal_user(auth.uid()));

-- Service configuration tables - can be public read for dropdown options
CREATE POLICY "Public can read service page requirements" 
ON public.service_page_requirements 
FOR SELECT 
USING (true);

CREATE POLICY "Public can read service types" 
ON public.service_types 
FOR SELECT 
USING (true);

-- Website management tables (if they exist) - internal only
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'website_punchlist') THEN
        EXECUTE 'CREATE POLICY "Internal users can manage website punchlist" ON public.website_punchlist FOR ALL USING (is_internal_user(auth.uid()))';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'website_punchlist_steps') THEN
        EXECUTE 'CREATE POLICY "Internal users can manage punchlist steps" ON public.website_punchlist_steps FOR ALL USING (is_internal_user(auth.uid()))';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'websites') THEN
        EXECUTE 'CREATE POLICY "Internal users can manage websites" ON public.websites FOR ALL USING (is_internal_user(auth.uid()))';
    END IF;
END $$;