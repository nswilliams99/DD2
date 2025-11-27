
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-lg shadow-xl p-8 border border-border">
              <div className="mb-6">
                <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" aria-hidden="true" />
                <h1 className="text-2xl font-bold text-dark-neutral mb-2 font-poppins">
                  Something went wrong
                </h1>
                <p className="text-professional-medium font-inter">
                  We apologize for the inconvenience. Please try refreshing the page or return to the homepage.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={this.handleRetry}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-primary/20"
                  aria-label="Try again to reload the page"
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  Try Again
                </Button>
                
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="w-full border-border text-dark-neutral hover:bg-professional-lighter transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-primary/20"
                  aria-label="Go back to homepage"
                >
                  <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                  Go Home
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-professional-medium">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 text-xs bg-professional-lighter p-3 rounded overflow-auto max-h-40">
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
