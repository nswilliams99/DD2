import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GenerateImageParams {
  prompt?: string;
  section?: string;
}

export interface GeneratedImageResult {
  success: boolean;
  imageUrl?: string;
  fileName?: string;
  prompt?: string;
  error?: string;
  message: string;
}

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<GeneratedImageResult | null>(null);

  const generateImage = async (params: GenerateImageParams = {}): Promise<GeneratedImageResult> => {
    setIsGenerating(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('generate-hero-image', {
        body: {
          prompt: params.prompt || 'default',
          section: params.section || 'about-hero'
        }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Image generation failed');
      }

      const result: GeneratedImageResult = {
        success: true,
        imageUrl: data.imageUrl,
        fileName: data.fileName,
        prompt: data.prompt,
        message: data.message
      };

      setLastGenerated(result);
      
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Image generation failed';
      const errorResult: GeneratedImageResult = {
        success: false,
        error: errorMessage,
        message: 'Failed to generate image'
      };
      
      setError(errorMessage);
      setLastGenerated(errorResult);
      console.error('Image generation error:', err);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateImage,
    isGenerating,
    error,
    lastGenerated
  };
};
