
import { useQuery } from '@tanstack/react-query';
import { rolloffTownsData, getRolloffTownBySlug, getAllRolloffTowns, type RolloffTown } from '@/data/rolloffTownData';

// Use hardcoded data instead of Supabase to avoid database dependency
export const useRolloffTowns = () => {
  return useQuery({
    queryKey: ['rolloff-towns'],
    queryFn: async () => {
      // Simulate async behavior and return hardcoded data
      await new Promise(resolve => setTimeout(resolve, 10));
      return getAllRolloffTowns().sort((a, b) => a.name.localeCompare(b.name));
    },
  });
};

export const useRolloffTownBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['rolloff-town', slug],
    queryFn: async () => {
      // Simulate async behavior and return hardcoded data
      await new Promise(resolve => setTimeout(resolve, 10));
      return getRolloffTownBySlug(slug);
    },
    enabled: !!slug,
  });
};

// Mutation functions removed - using static data only
