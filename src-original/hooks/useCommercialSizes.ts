import { useQuery } from '@tanstack/react-query';
import { commercialSizesData, getAllCommercialSizes, getCommercialSizeByValue, type CommercialSize } from '@/data/commercialSizesData';

// Use hardcoded data instead of Supabase to avoid database dependency
export type { CommercialSize };

export const useCommercialSizes = () => {
  return useQuery({
    queryKey: ['commercial-sizes'],
    queryFn: async () => {
      // Simulate async behavior and return hardcoded data
      await new Promise(resolve => setTimeout(resolve, 10));
      return getAllCommercialSizes();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};