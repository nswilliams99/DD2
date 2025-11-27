
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CommercialSpec {
  id: string;
  size_slug: string;
  label: string;
  dimensions: string;
  capacity: string;
  ideal_use: string;
  is_active: boolean;
  sort_order: number;
}

export const useCommercialSpecs = () => {
  return useQuery({
    queryKey: ['commercial-specs'],
    queryFn: async (): Promise<CommercialSpec[]> => {
      const { data, error } = await supabase
        .from('commercial_specs')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching commercial specs:', error);
        throw error;
      }

      return data || [];
    },
  });
};
