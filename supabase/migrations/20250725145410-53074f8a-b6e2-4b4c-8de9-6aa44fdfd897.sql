-- Enable RLS on tables that don't have it yet and create missing policies
-- First, enable RLS on tables that need it (skipping ones that already have it)

-- Check and enable RLS where needed
DO $$
BEGIN
    -- Enable RLS on tables that don't have policies yet
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'residential_faqs') THEN
        ALTER TABLE public.residential_faqs ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Public can read active residential FAQs" 
        ON public.residential_faqs 
        FOR SELECT 
        USING (is_active = true);
    END IF;

    -- Some tables might need RLS enabled but not have any policies
    PERFORM 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('page_sections', 'page_metadata')
    AND NOT EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' 
        AND c.relname = table_name
        AND c.relrowsecurity = true
    );
    
    -- Enable RLS on page_sections if not already enabled
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'page_sections') THEN
        EXECUTE 'ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY';
        -- Only create policy if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'page_sections' AND policyname = 'Public can read page sections') THEN
            CREATE POLICY "Public can read page sections" 
            ON public.page_sections 
            FOR SELECT 
            USING (true);
        END IF;
    END IF;

    -- Enable RLS on page_metadata if not already enabled  
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'page_metadata') THEN
        EXECUTE 'ALTER TABLE public.page_metadata ENABLE ROW LEVEL SECURITY';
        -- Only create policy if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'page_metadata' AND policyname = 'Public can read page metadata') THEN
            CREATE POLICY "Public can read page metadata" 
            ON public.page_metadata 
            FOR SELECT 
            USING (true);
        END IF;
    END IF;

END $$;