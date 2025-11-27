import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Suggest correct URLs based on the attempted path
  const getSuggestions = () => {
    const suggestions = [];

    if (path.includes('rolloff') || path.includes('dumpster')) {
      suggestions.push({
        title: 'Roll-Off Dumpster Rentals',
        path: '/roll-off-dumpsters',
        description: 'Temporary dumpster rentals for construction and cleanup projects'
      });
    }

    if (path.includes('residential')) {
      suggestions.push({
        title: 'Residential Waste Services',
        path: '/residential',
        description: 'Weekly pickup services for homes and communities'
      });
    }

    if (path.includes('commercial')) {
      suggestions.push({
        title: 'Commercial Waste Services', 
        path: '/commercial',
        description: 'Regular waste collection for businesses'
      });
    }

    if (path.includes('windsor')) {
      suggestions.push({
        title: 'Windsor Residential Service',
        path: '/residential/windsor',
        description: 'Weekly residential pickup in Windsor, CO'
      });
    }

    if (path.includes('fort-collins') || path.includes('fortcollins')) {
      suggestions.push({
        title: 'Fort Collins Residential Service',
        path: '/residential/fort-collins', 
        description: 'Weekly residential pickup in Fort Collins, CO'
      });
    }

    if (path.includes('greeley')) {
      suggestions.push({
        title: 'Greeley Residential Service',
        path: '/residential/greeley',
        description: 'Weekly residential pickup in Greeley, CO'
      });
    }

    if (path.includes('wellington')) {
      suggestions.push({
        title: 'Wellington Residential Service',
        path: '/residential/wellington',
        description: 'Weekly residential pickup in Wellington, CO'
      });
    }

    // Default suggestions if no matches
    if (suggestions.length === 0) {
      suggestions.push(
        {
          title: 'Home',
          path: '/',
          description: 'Return to our homepage'
        },
        {
          title: 'All Services',
          path: '/services',
          description: 'View all our waste management services'
        },
        {
          title: 'Contact Us',
          path: '/contact',
          description: 'Get in touch for personalized assistance'
        }
      );
    }

    return suggestions;
  };

  const suggestions = getSuggestions();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl font-bold text-primary-pink mb-4">404</CardTitle>
          <h1 className="text-2xl font-semibold text-dark-neutral mb-2">Page Not Found</h1>
          <p className="text-dark-neutral/70">
            Sorry, we couldn't find the page you're looking for: <code className="text-primary-pink">{location.pathname}</code>
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-dark-neutral mb-3">Did you mean one of these?</h2>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <Link key={index} to={suggestion.path} className="block">
                  <div className="p-4 border border-light-neutral rounded-lg hover:border-primary-pink transition-colors">
                    <h3 className="font-medium text-dark-neutral mb-1">{suggestion.title}</h3>
                    <p className="text-sm text-dark-neutral/70">{suggestion.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1">
              <Link to="/">Return Home</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <a href="tel:(970) 888-7274">Call (970) 888-7274</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
