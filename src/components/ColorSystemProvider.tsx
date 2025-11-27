import { useEffect, ReactNode } from 'react';
import { useColorPalette } from '@/hooks/useColorPalette';

interface ColorSystemProviderProps {
  children: ReactNode;
}

export const ColorSystemProvider = ({ children }: ColorSystemProviderProps) => {
  const { palette, loading, error } = useColorPalette();

  useEffect(() => {
    if (!palette || !palette.variables) return;

    // Inject CSS custom properties into the document root
    const root = document.documentElement;
    
    // Clear any existing dynamic color variables first
    const existingVars = Array.from(document.documentElement.style)
      .filter(prop => prop.startsWith('--'));
    
    existingVars.forEach(varName => {
      if (varName.startsWith('--primary') || 
          varName.startsWith('--secondary') || 
          varName.startsWith('--accent') ||
          varName.startsWith('--background') ||
          varName.startsWith('--foreground') ||
          varName.startsWith('--muted') ||
          varName.startsWith('--border') ||
          varName.startsWith('--input') ||
          varName.startsWith('--ring') ||
          varName.startsWith('--destructive') ||
          varName.startsWith('--warning') ||
          varName.startsWith('--success') ||
          varName.startsWith('--color-')) {
        root.style.removeProperty(varName);
      }
    });

    // Set new color variables with highest priority
    palette.variables.forEach(variable => {
      root.style.setProperty(variable.css_variable_name, variable.hsl_value, 'important');
    });
  }, [palette]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading color system...</p>
        </div>
      </div>
    );
  }

  // Show error state with fallback colors
  if (error) {
    console.error('Color system error:', error, '- Using fallback colors');
    // Don't block the app, just log the error and continue
  }

  return <>{children}</>;
};
