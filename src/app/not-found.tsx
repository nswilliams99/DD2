"use client";

import Link from 'next/link';
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route");
  }, []);

  const suggestions = [
    {
      title: 'Home',
      path: '/',
      description: 'Return to our homepage'
    },
    {
      title: 'Residential Services',
      path: '/residential',
      description: 'Weekly pickup services for homes'
    },
    {
      title: 'Commercial Services',
      path: '/commercial',
      description: 'Regular waste collection for businesses'
    },
    {
      title: 'Roll-Off Dumpsters',
      path: '/roll-off-dumpsters',
      description: 'Temporary dumpster rentals for projects'
    },
    {
      title: 'Contact Us',
      path: '/contact',
      description: 'Get in touch for personalized assistance'
    }
  ];

  return (
    <div className="flex items-center justify-center p-4 py-16">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl font-bold text-primary mb-4">404</CardTitle>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Here are some helpful links:</h2>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <Link key={index} href={suggestion.path} className="block">
                  <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                    <h3 className="font-medium text-foreground mb-1">{suggestion.title}</h3>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1">
              <Link href="/">Return Home</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <a href="tel:970-888-7274">Call (970) 888-7274</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
