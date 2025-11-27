
"use client";

import { useQuery } from '@tanstack/react-query';
import { residentialFaqsData, getAllResidentialFaqs, getResidentialFaqsByTown, type ResidentialFaq } from '@/data/residentialFaqsData';

// Use hardcoded data instead of Supabase to avoid database dependency
export type { ResidentialFaq };

export const useResidentialFaqs = () => {
  return useQuery({
    queryKey: ['residential-faqs'],
    queryFn: async () => {
      // Simulate async behavior and return hardcoded data
      await new Promise(resolve => setTimeout(resolve, 10));
      return getAllResidentialFaqs();
    },
  });
};

export const useResidentialFaqsByTown = (townSlug: string | null) => {
  return useQuery({
    queryKey: ['residential-faqs', townSlug],
    queryFn: async () => {
      // Simulate async behavior and return hardcoded data
      await new Promise(resolve => setTimeout(resolve, 10));
      return getResidentialFaqsByTown(townSlug);
    },
  });
};

// Mutation functions removed - using static data only
