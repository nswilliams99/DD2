
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  message?: string;
}

const ErrorFallback = ({ 
  error, 
  resetError, 
  message = "Something went wrong loading this section." 
}: ErrorFallbackProps) => {
  return (
    <div 
      className="flex flex-col items-center justify-center p-8 bg-professional-lighter rounded-lg border border-border"
      role="alert"
      aria-live="assertive"
    >
      <AlertTriangle className="w-12 h-12 text-destructive mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-dark-neutral mb-2 font-poppins">
        Oops! {message}
      </h3>
      <p className="text-professional-medium text-center mb-4 font-inter">
        Please try refreshing this section or contact us if the problem persists.
      </p>
      
      {resetError && (
        <Button
          onClick={resetError}
          variant="outline"
          size="sm"
          className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-primary/20"
          aria-label="Try to reload this section"
        >
          <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
          Try Again
        </Button>
      )}
      
      {process.env.NODE_ENV === 'development' && error && (
        <details className="mt-4 w-full">
          <summary className="cursor-pointer text-sm font-medium text-professional-medium">
            Error Details (Development)
          </summary>
          <pre className="mt-2 text-xs bg-white p-3 rounded overflow-auto max-h-32 border">
            {error.toString()}
          </pre>
        </details>
      )}
    </div>
  );
};

export default ErrorFallback;
