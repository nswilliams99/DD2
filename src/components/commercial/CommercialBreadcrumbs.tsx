import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CommercialBreadcrumbsProps {
  sizeName?: string;
  sizeValue?: number;
}

const CommercialBreadcrumbs = ({ sizeName, sizeValue }: CommercialBreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm font-inter">
          <li>
            <Link href="/" 
              className="text-professional-medium hover:text-diverz-purple transition-colors"
              aria-label="Go to home page"
            >
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4 text-professional-medium" aria-hidden="true" />
          </li>
          <li>
            <Link href="/commercial" 
              className="text-professional-medium hover:text-diverz-purple transition-colors"
              aria-label="Go to commercial services page"
            >
              Commercial Services
            </Link>
          </li>
          {sizeName && sizeValue && (
            <>
              <li>
                <ChevronRight className="w-4 h-4 text-professional-medium" aria-hidden="true" />
              </li>
              <li>
                <span className="text-professional-dark font-medium" aria-current="page">
                  {sizeValue} Yard Dumpster
                </span>
              </li>
            </>
          )}
        </ol>
      </div>
    </nav>
  );
};

export default CommercialBreadcrumbs;
