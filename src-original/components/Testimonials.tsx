
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import { useFeaturedTestimonials } from '@/hooks/useTestimonials';
import OptimizedImage from '@/components/ui/OptimizedImage';

const Testimonials = () => {
  const { data: testimonials, isLoading } = useFeaturedTestimonials(6);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white" aria-label="Customer testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-professional-dark mb-6 font-poppins">
            What Our Customers Say
          </h2>
          <p className="text-xl text-professional-medium max-w-3xl mx-auto font-inter">
            Don't just take our word for it. See what our satisfied customers 
            have to say about our reliable waste management services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="bg-white hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-professional-light animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <Quote className="h-8 w-8 text-diverz-purple mr-3 flex-shrink-0 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="flex-1">
                    {testimonial.rating && (
                      <div className="flex items-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 transition-transform duration-200 hover:scale-110" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <blockquote className="text-professional-dark leading-relaxed mb-6 font-inter group-hover:text-professional-dark transition-colors duration-300">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {testimonial.image_url ? (
                      <OptimizedImage
                        src={testimonial.image_url}
                        alt={testimonial.customer_name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-professional-light group-hover:border-diverz-purple transition-colors duration-300"
                        width={48}
                        height={48}
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-diverz-purple text-white flex items-center justify-center font-semibold font-poppins group-hover:bg-diverz-purple-dark transition-colors duration-300">
                        {testimonial.customer_name.charAt(0)}
                      </div>
                    )}
                    
                    <div>
                      <div className="font-semibold text-professional-dark font-poppins">
                        {testimonial.customer_name}
                      </div>
                      <div className="text-sm text-professional-medium font-inter">
                        {testimonial.customer_title && testimonial.company
                          ? `${testimonial.customer_title}, ${testimonial.company}`
                          : testimonial.customer_title || testimonial.company
                        }
                        {testimonial.location && (
                          <>
                            {(testimonial.customer_title || testimonial.company) && ' • '}
                            {testimonial.location}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {testimonial.service_type && (
                    <Badge variant="outline" className="text-xs border-diverz-purple text-diverz-purple hover:bg-diverz-purple hover:text-white transition-colors duration-300">
                      {testimonial.service_type}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
