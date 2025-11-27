import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Building, Truck, Clock, Shield, MapPin, ExternalLink } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import CommercialBreadcrumbs from './CommercialBreadcrumbs';
import SkipLink from '@/components/SkipLink';
import type { CommercialSize } from '@/hooks/useCommercialSizes';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface CommercialSizeSectionProps {
  size: CommercialSize;
}

const CommercialSizeSection = ({ size }: CommercialSizeSectionProps) => {
  // Map icon strings to Lucide components
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Building,
      Truck,
      Clock,
      Shield,
      MapPin,
    };
    return iconMap[iconName] || Building;
  };

  return (
    <>
      <SkipLink />
      <CommercialBreadcrumbs sizeName={size.title} sizeValue={size.size_value} />
      <main id="main" className="scroll-mt-20">
      {/* Hero Block */}
      <div className="py-16 md:py-20 bg-gradient-to-br from-professional-dark to-gray-800 relative overflow-hidden mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <Badge className="bg-diverz-purple text-white mb-6 font-inter">
                  <Building className="w-4 h-4 mr-2" aria-hidden="true" />
                  {size.size_label} Commercial
                </Badge>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-poppins leading-tight">
                  {size.title}
                </h2>
                <p className="text-xl text-white mb-8 leading-relaxed font-inter">
                  {size.description} with reliable service in Windsor, Fort Collins, and Wellington. 
                  {size.pricing_range && ` Starting at ${size.pricing_range}.`}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-diverz-purple hover:bg-diverz-purple-dark text-white font-semibold font-inter text-lg px-8 py-4"
                    aria-label={`Call Dumpster Diverz now for ${size.title} service`}
                  >
                    <a href="tel:970-888-7274">
                      <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                      Call Now 970-888-7274
                    </a>
                  </Button>
                  <Button 
                    asChild
                    size="lg" 
                    variant="outline" 
                    className="text-white border-white hover:bg-white hover:text-professional-dark font-semibold font-inter text-lg px-8 py-4"
                    aria-label={`Get a free quote for ${size.title} service`}
                  >
                    <a href="#contact-form">
                      Get Free Quote for {size.title}
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <OptimizedImage
                    src={size.hero_image_url || 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&h=600&fit=crop&auto=format&q=80'}
                    alt={size.hero_alt_text || `${size.title} for commercial waste management`}
                    className="w-full h-auto object-contain"
                    priority={true}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-professional-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-professional-dark mb-12 text-center font-poppins">
              Why Choose Our {size.title}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {size.features.map((feature, index) => {
                const IconComponent = getIconComponent(feature.icon);
                return (
                  <Card key={index} className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="bg-diverz-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-diverz-purple" aria-hidden="true" />
                      </div>
                      <h4 className="text-xl font-bold text-professional-dark mb-3 font-poppins">
                        {feature.title}
                      </h4>
                      <p className="text-professional-medium font-inter">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
              {size.title} Specifications
            </h3>
            <Card className="bg-background shadow-xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full" role="table" aria-label={`${size.title} specifications and details`}>
                    <caption className="sr-only">Complete specifications for {size.title} including dimensions, capacity, and ideal business uses</caption>
                    <thead>
                      <tr className="bg-diverz-purple text-white">
                        <th className="px-6 py-4 text-left font-semibold font-poppins text-lg" scope="col">Specification</th>
                        <th className="px-6 py-4 text-left font-semibold font-poppins text-lg" scope="col">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(size.specifications).map(([spec, value], index) => (
                        <tr key={spec} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-4 font-medium text-professional-dark font-inter text-base">{spec}</td>
                          <td className="px-6 py-4 text-professional-medium font-inter text-base">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      {size.faqs.length > 0 && (
        <div className="py-16 bg-professional-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-professional-dark mb-8 text-center font-poppins">
                Frequently Asked Questions About {size.title}s
              </h3>
              <div className="space-y-6">
                {size.faqs.map((faq, index) => (
                  <Card key={index} className="bg-background shadow-md">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-professional-dark mb-3 font-poppins">
                        {faq.question}
                      </h4>
                      <p className="text-professional-medium font-inter leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Areas */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-professional-dark mb-6 font-poppins">
              {size.title} Service Areas
            </h3>
            <p className="text-lg text-professional-dark mb-8 font-inter">
              Professional {size.title.toLowerCase()} service available throughout <strong>Windsor</strong>, <strong>Fort Collins</strong>, and <strong>Wellington</strong>, Colorado with reliable pickup schedules.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {['Windsor', 'Fort Collins', 'Wellington'].map((city) => (
                <Card key={city} className="bg-background shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-diverz-purple mx-auto mb-3" aria-hidden="true" />
                    <h4 className="text-xl font-semibold text-professional-dark font-poppins">
                      {city}
                    </h4>
                    <p className="text-professional-medium font-inter">
                      Professional {size.title.toLowerCase()} service
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="py-16 bg-diverz-purple">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-poppins">
              Ready for Professional {size.title} Service?
            </h3>
            <p className="text-xl text-purple-100 mb-8 font-inter">
              Get your customized {size.title.toLowerCase()} quote today for reliable commercial waste management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-diverz-purple hover:bg-gray-100 font-semibold font-inter text-lg px-8 py-4"
                aria-label={`Call Dumpster Diverz for immediate ${size.title} service quote`}
              >
                <a href="tel:970-888-7274">
                  <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                  Call Now for {size.title} Quote
                </a>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-diverz-purple font-semibold font-inter text-lg px-8 py-4"
                aria-label={`Email Dumpster Diverz for ${size.title} service quote`}
              >
                <a href="mailto:info@dumpsterdiverz.com?subject=Quote Request for {size.title}">
                  <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                  Email {size.title} Quote
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
};

export default CommercialSizeSection;
