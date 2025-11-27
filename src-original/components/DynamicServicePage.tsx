import { useParams } from 'react-router-dom';
import { useService } from '@/hooks/useServices';
import { useServiceTestimonials } from '@/hooks/useTestimonials';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, CheckCircle, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import FeatureComparisonTable from '@/components/FeatureComparisonTable';
import { serviceFeatures, allServiceFeatures } from '@/data/serviceFeatures';

const DynamicServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading, error } = useService(slug || '');
  const { data: testimonials } = useServiceTestimonials(service?.title || '', 3);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-industrial-dark mb-6">
              Service Not Found
            </h1>
            <p className="text-lg text-industrial-gray mb-8">
              The service you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const features = service.content ? service.content.split('\n').filter(line => line.trim()) : [];
  const serviceAreas = service.service_areas || ['Windsor', 'Fort Collins', 'Wellington', 'Greeley'];
  const pricingPlans = service.pricing_info as any || {};

  // Find the current service in our feature data
  const currentServiceFeature = serviceFeatures.find(s => 
    s.title.toLowerCase() === service.title.toLowerCase()
  );

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{service.seo_title || service.title}</title>
        <meta name="description" content={service.seo_description || service.description} />
        {service.seo_keywords && (
          <meta name="keywords" content={service.seo_keywords.join(', ')} />
        )}
        <meta property="og:title" content={service.seo_title || service.title} />
        <meta property="og:description" content={service.seo_description || service.description} />
        {service.featured_image && <meta property="og:image" content={service.featured_image} />}
        <meta property="og:type" content="service" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "provider": {
              "@type": "Organization",
              "name": "Dumpster Diverz",
              "telephone": "970-888-7274"
            },
            "areaServed": serviceAreas.map(area => ({
              "@type": "City",
              "name": area
            }))
          })}
        </script>
      </Helmet>
      
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-industrial-dark to-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="bg-diverz-purple text-white mb-6">
                {service.title}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-diverz-purple hover:bg-diverz-purple/90 text-white">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 970-888-7274
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-industrial-dark">
                  Get Quote Online
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {service.featured_image && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <img
                  src={service.featured_image}
                  alt={service.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <section className="py-16 bg-industrial-light">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
                    What's Included
                  </h2>
                  <p className="text-lg text-industrial-gray">
                    Everything you need for reliable waste management
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <Card key={index} className="border-l-4 border-l-diverz-purple bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <CheckCircle className="w-6 h-6 text-diverz-purple mr-3 flex-shrink-0" />
                          <span className="text-industrial-dark font-medium">{feature}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Service Comparison Table - Show if current service exists in our feature data */}
        {currentServiceFeature && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
                    Compare Our Services
                  </h2>
                  <p className="text-lg text-industrial-gray">
                    See how {service.title.toLowerCase()} compares to our other services
                  </p>
                </div>
                
                <FeatureComparisonTable 
                  services={serviceFeatures}
                  allFeatures={allServiceFeatures}
                  className="bg-white border border-gray-200"
                />
              </div>
            </div>
          </section>
        )}

        {/* Pricing Section */}
        {Object.keys(pricingPlans).length > 0 && (
          <section className="py-16 bg-industrial-light">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
                    Pricing Options
                  </h2>
                  <p className="text-lg text-industrial-gray">
                    Choose the option that fits your needs
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {Object.entries(pricingPlans).map(([planName, planData]: [string, any], index) => (
                    <Card key={index} className={planData.popular ? 'ring-2 ring-diverz-purple' : ''}>
                      {planData.popular && (
                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-diverz-purple text-white">
                          Most Popular
                        </Badge>
                      )}
                      <CardContent className="p-8 text-center relative">
                        <h3 className="text-2xl font-bold text-industrial-dark mb-2">{planName}</h3>
                        <div className="text-4xl font-bold text-diverz-purple mb-2">
                          {planData.price}<span className="text-lg text-industrial-gray">/month</span>
                        </div>
                        <p className="text-industrial-gray mb-6">{planData.description}</p>
                        <Button className="w-full bg-diverz-purple hover:bg-diverz-purple/90 text-white">
                          Select Plan
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {testimonials && testimonials.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
                    Customer Reviews
                  </h2>
                  <p className="text-lg text-industrial-gray">
                    See what our customers say about our {service.title.toLowerCase()} service
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="bg-white">
                      <CardContent className="p-6">
                        {testimonial.rating && (
                          <div className="flex items-center mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                        <blockquote className="text-industrial-dark mb-4">
                          "{testimonial.content}"
                        </blockquote>
                        <div className="text-sm">
                          <div className="font-semibold text-industrial-dark">
                            {testimonial.customer_name}
                          </div>
                          {testimonial.location && (
                            <div className="text-industrial-gray">{testimonial.location}</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Service Areas */}
        <section className="py-16 bg-industrial-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-6">
                Service Areas
              </h2>
              <p className="text-lg text-industrial-gray mb-8">
                We proudly serve customers throughout Northern Colorado
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {serviceAreas.map((area) => (
                  <div key={area} className="bg-white p-4 rounded-lg">
                    <span className="font-medium text-industrial-dark">{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-industrial-gray">
                Plus surrounding Northern Colorado communities
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-diverz-purple">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Contact us today for reliable {service.title.toLowerCase()} service
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-diverz-purple hover:bg-gray-100">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 970-888-7274
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-diverz-purple">
                  <Mail className="w-5 h-5 mr-2" />
                  Get Quote Online
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DynamicServicePage;
