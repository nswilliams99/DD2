
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type PageMetadata = Tables<'page_metadata'>;

export const usePageMetadata = (pagePath: string) => {
  return useQuery({
    queryKey: ['pageMetadata', pagePath],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_metadata')
        .select('*')
        .eq('page_path', pagePath)
        .maybeSingle();
      
      if (error) throw error;
      return data as PageMetadata | null;
    },
  });
};
