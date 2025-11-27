import React, { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorFallback from '@/components/ErrorFallback';
import HOAQuoteForm from '@/components/HOAQuoteForm';

const LoadingFallback = () => (
  <div className="py-16 bg-background">
    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded w-80 mx-auto animate-pulse"></div>
        </div>
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-10 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const EnhancedHOAQuoteForm = () => {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback message="Unable to load the quote form" />}
    >
      <Suspense fallback={<LoadingFallback />}>
        <HOAQuoteForm />
      </Suspense>
    </ErrorBoundary>
  );
};

export default EnhancedHOAQuoteForm;