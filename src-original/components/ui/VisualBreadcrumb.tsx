
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url?: string;
  isCurrentPage?: boolean;
}

interface VisualBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const VisualBreadcrumb = ({ items, className = "" }: VisualBreadcrumbProps) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb navigation" className={`py-4 ${className}`}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link 
                to="/" 
                className="flex items-center text-professional-medium hover:text-primary transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:outline-none rounded"
                aria-label="Go to homepage"
              >
                <Home className="w-4 h-4 mr-1" aria-hidden="true" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {items.map((item, index) => (
            <React.Fragment key={item.name}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.isCurrentPage || !item.url ? (
                  <BreadcrumbPage className="text-dark-neutral font-medium">
                    {item.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link 
                      to={item.url} 
                      className="text-professional-medium hover:text-primary transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:outline-none rounded"
                    >
                      {item.name}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default VisualBreadcrumb;
