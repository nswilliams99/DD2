
"use client";

import { useQuery } from '@tanstack/react-query';
import { commercialFaqsData, getAllCommercialFaqs, getCommercialFaqsByCategory, type CommercialFAQ } from '@/data/commercialFaqsData';

// Use hardcoded data instead of Supabase to avoid database dependency
export type { CommercialFAQ };

export const useCommercialFAQs = () => {
  return useQuery({
    queryKey: ['commercial-faqs'],
    queryFn: async (): Promise<CommercialFAQ[]> => {
      // Simulate async behavior and return hardcoded data
      await new Promise(resolve => setTimeout(resolve, 10));
      return getAllCommercialFaqs();
    },
  });
};
