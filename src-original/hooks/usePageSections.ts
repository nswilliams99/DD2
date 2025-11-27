import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PageSection {
  id: number;
  page_slug: string;
  section_name: string;
  title: string | null;
  description: string | null;
  image_path: string | null;
  button_text: string | null;
  button_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const usePageSections = (pageSlug: string, sectionName?: string) => {
  return useQuery({
    queryKey: ['page-sections', pageSlug, sectionName],
    queryFn: async () => {
      let query = supabase
        .from('page_sections')
        .select('*')
        .eq('page_slug', pageSlug);
      
      if (sectionName) {
        query = query.eq('section_name', sectionName);
      }
      
      const { data, error } = await query.order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as PageSection[];
    },
  });
};

export const usePageSection = (pageSlug: string, sectionName: string) => {
  const { data, isLoading, error } = usePageSections(pageSlug, sectionName);
  return {
    section: data?.[0] || null,
    isLoading,
    error
  };
};