
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, MapPin, Users, Building, Truck } from 'lucide-react';
import FeatureComparisonTable from '@/components/FeatureComparisonTable';
import { serviceFeatures, allServiceFeatures } from '@/data/serviceFeatures';
import OptimizedImage from '@/components/ui/OptimizedImage';

const ServiceShowcase = () => {
  const services = [
    {
      title: "Residential",
      description: "Weekly trash pickup with 96-gallon and 64-gallon carts for your home. Includes recycling service and convenient online scheduling.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
      badge: "Easy Online Ordering",
      features: ["Weekly pickup", "Multiple cart sizes", "Recycling included"],
      link: "/residential"
    },
    {
      title: "Commercial", 
      description: "Flexible dumpster rental for businesses with multiple size options. Professional waste management solutions with reliable pickup schedules.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      icon: <Building className="w-6 h-6 md:w-8 md:h-8" />,
      badge: "Business Solutions",
      features: ["2-3 yard dumpsters", "Flexible schedules", "600 lbs limit"],
      link: "/commercial"
    },
    {
      title: "Roll-off",
      description: "Construction, remodeling, and junk removal dumpsters for large projects. Same-day delivery available with flexible rental periods.",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80", 
      icon: <Truck className="w-6 h-6 md:w-8 md:h-8" />,
      badge: "Construction Ready",
      features: ["10-40 yard containers", "Same-day delivery", "Flexible rental periods"],
      link: "/roll-off"
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Excellent service! Always on time and professional.",
      date: "2 weeks ago"
    },
    {
      name: "Mike Thompson", 
      rating: 5,
      text: "Great pricing and reliable pickup. Highly recommend!",
      date: "1 month ago"
    },
    {
      name: "Lisa Chen",
      rating: 5,
      text: "Best waste management company in Northern Colorado.",
      date: "3 weeks ago"
    },
    {
      name: "David Wilson",
      rating: 5,
      text: "Professional team, fair prices, excellent communication.",
      date: "2 months ago"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-industrial-dark via-gray-800 to-industrial-dark relative overflow-hidden" aria-label="Service showcase and testimonials">
      {/* Background overlay with tech/industrial feel */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/91df8bdb-05c3-437e-a0be-bec01d76ebeb.png')] bg-cover bg-center opacity-10" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-diverz-purple/20 text-diverz-purple px-3 py-2 md:px-4 rounded-full mb-4 md:mb-6">
            <MapPin className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
            <span className="text-xs md:text-sm font-medium">Local Northern Colorado</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Comprehensive waste management solutions for Windsor, Fort Collins, Wellington 
            and surrounding areas.
          </p>
        </div>

        {/* Service Carousel */}
        <div className="max-w-5xl mx-auto mb-12 md:mb-16">
          <Carousel className="w-full">
            <CarouselContent className="-ml-1 md:-ml-2 lg:-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-1 md:pl-2 lg:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group h-full">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <OptimizedImage
                        src={service.image}
                        alt={`${service.title} waste management service - Professional dumpster rental in Northern Colorado`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={800}
                        height={450}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-diverz-purple text-white px-2 py-1 md:px-3 rounded-full text-xs font-medium">
                        {service.badge}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                        <div className="flex items-center gap-2 md:gap-3 text-white mb-2">
                          <span aria-hidden="true">{service.icon}</span>
                          <h3 className="text-lg md:text-xl font-bold">{service.title}</h3>
                        </div>
                        <p className="text-xs md:text-sm text-gray-200 line-clamp-2">{service.description}</p>
                      </div>
                    </div>
                    <CardContent className="p-4 md:p-6">
                      <ul className="text-xs md:text-sm text-gray-300 space-y-1 md:space-y-2 mb-4">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-diverz-purple rounded-full mr-2 md:mr-3 flex-shrink-0" aria-hidden="true"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        asChild 
                        className="w-full bg-diverz-purple hover:bg-diverz-purple/90 text-white text-sm md:text-base"
                        aria-label={`Learn more about ${service.title} service`}
                      >
                        <a href={service.link}>Learn More</a>
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex text-white border-white/20 hover:bg-white/10" aria-label="Previous service" />
            <CarouselNext className="hidden md:flex text-white border-white/20 hover:bg-white/10" aria-label="Next service" />
          </Carousel>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Service Features Comparison</h3>
            <p className="text-gray-300 text-sm md:text-base">Compare what's included with each service</p>
          </div>
          <FeatureComparisonTable 
            services={serviceFeatures}
            allFeatures={allServiceFeatures}
            className="bg-white/10 backdrop-blur-md border-white/20"
          />
        </div>

        {/* Google Reviews Section - Static for SEO */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">What Our Customers Say</h3>
            <div className="flex items-center justify-center gap-1 mb-4" role="img" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              ))}
              <span className="text-white ml-2 text-sm md:text-base">4.9/5 based on 150+ reviews</span>
            </div>
          </div>
          
          {/* Static testimonials for SEO - visible text */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 p-3 md:p-4">
                <div className="flex items-center gap-1 mb-2" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-gray-200 text-xs md:text-sm mb-3">"{review.text}"</blockquote>
                <div className="flex justify-between items-center">
                  <cite className="text-white font-medium text-xs md:text-sm not-italic">{review.name}</cite>
                  <time className="text-gray-400 text-xs">{review.date}</time>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Area Map Placeholder */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Our Service Area</h3>
            <p className="text-gray-300 text-sm md:text-base mb-4">We proudly serve Northern Colorado communities</p>
            <div className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
              <p>Dumpster Diverz provides comprehensive waste management services throughout Northern Colorado, including residential trash pickup, commercial dumpster rental, and roll-off container services. Our service area covers Windsor, Fort Collins, Wellington, Greeley, and surrounding communities in Weld and Larimer counties.</p>
            </div>
          </div>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 md:p-6">
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-diverz-purple/20 to-transparent" aria-hidden="true"></div>
              <div className="text-center z-10 px-4">
                <MapPin className="w-8 h-8 md:w-12 md:h-12 text-diverz-purple mx-auto mb-3 md:mb-4" aria-hidden="true" />
                <h4 className="text-white text-base md:text-lg font-semibold mb-2">Service Area Coverage</h4>
                <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4">
                  Windsor • Fort Collins • Wellington • Greeley<br />
                  And surrounding Northern Colorado areas
                </p>
                <Button 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10 text-sm md:text-base"
                  aria-label="View full service coverage area details"
                >
                  View Full Coverage Area
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;
