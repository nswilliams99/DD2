
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Service {
  title: string;
  features: string[];
  badge?: string;
  link?: string;
}

interface FeatureComparisonTableProps {
  services: Service[];
  allFeatures: string[];
  className?: string;
}

const FeatureComparisonTable = ({ services, allFeatures, className }: FeatureComparisonTableProps) => {
  const hasFeature = (service: Service, feature: string): boolean => {
    return service.features.some(f => 
      f.toLowerCase().includes(feature.toLowerCase()) || 
      feature.toLowerCase().includes(f.toLowerCase())
    );
  };

  return (
    <Card className={className}>
      <div className="overflow-x-auto">
        <Table role="table" aria-label="Service features comparison">
          <TableHeader>
            <TableRow>
              <TableHead scope="col" className="min-w-[200px] font-semibold text-industrial-dark">
                Feature
              </TableHead>
              {services.map((service) => (
                <TableHead 
                  key={service.title} 
                  scope="col" 
                  className="text-center min-w-[150px] font-semibold text-industrial-dark"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{service.title}</span>
                    {service.badge && (
                      <span className="text-xs bg-diverz-purple text-white px-2 py-1 rounded-full">
                        {service.badge}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {allFeatures.map((feature, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium text-industrial-dark">
                  {feature}
                </TableCell>
                {services.map((service) => (
                  <TableCell key={`${service.title}-${index}`} className="text-center">
                    {hasFeature(service, feature) ? (
                      <CheckCircle 
                        className="w-5 h-5 text-accent-success mx-auto" 
                        aria-label={`${service.title} includes ${feature}`}
                      />
                    ) : (
                      <X 
                        className="w-5 h-5 text-gray-400 mx-auto" 
                        aria-label={`${service.title} does not include ${feature}`}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Schema.org structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Table",
            "about": "Waste Management Service Features Comparison",
            "description": "Comparison of features across residential, commercial, and roll-off dumpster services",
            "provider": {
              "@type": "Organization",
              "name": "Dumpster Diverz"
            }
          })
        }}
      />
    </Card>
  );
};

export default FeatureComparisonTable;
