"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ColorVariable {
  id: string;
  css_variable_name: string;
  hsl_value: string;
  variable_name: string;
  category: string | null;
  description: string | null;
}

interface ColorPalette {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  is_default: boolean;
  variables: ColorVariable[];
}

export const useColorPalette = () => {
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivePalette = async () => {
    try {
      setLoading(true);
      setError(null);

      // First get the active palette
      const { data: paletteData, error: paletteError } = await supabase
        .from('color_palettes')
        .select('*')
        .eq('is_active', true)
        .single();

      if (paletteError) {
        console.error('Error fetching palette:', paletteError);
        setError('Failed to fetch color palette');
        return;
      }

      if (!paletteData) {
        setError('No active color palette found');
        return;
      }

      // Then get the color variables for this palette
      const { data: variablesData, error: variablesError } = await supabase
        .from('color_variables')
        .select('*')
        .eq('palette_id', paletteData.id)
        .order('sort_order', { ascending: true });

      if (variablesError) {
        console.error('Error fetching variables:', variablesError);
        setError('Failed to fetch color variables');
        return;
      }

      setPalette({
        ...paletteData,
        variables: variablesData || []
      });
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivePalette();

    // Set up real-time subscriptions for both tables
    const paletteChannel = supabase
      .channel('color_palette_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'color_palettes'
        },
        () => {
          fetchActivePalette();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'color_variables'
        },
        () => {
          fetchActivePalette();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(paletteChannel);
    };
  }, []);

  return { palette, loading, error, refetch: fetchActivePalette };
};
