import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Phone, MessageCircle, Bot } from 'lucide-react';
import Link from 'next/link';
import { useCommercialSizes } from '@/hooks/useCommercialSizes';
import { usePageSection } from '@/hooks/usePageSections';
import OptimizedImage from '@/components/ui/OptimizedImage';

const DynamicCommercialSizeCard = ({ size, fallbackImage }: { size: any; fallbackImage?: string }) => {
  return (
    <Link href={`/commercial/${size.size_value}-yard`}
      className="block group transform transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-diverz-purple/20 rounded-xl"
      aria-label={`Learn more about ${size.title} for ${size.ideal_for.join(', ')}`}
    >
      <Card className="rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:border-primary-pink/30 transition-all duration-300 bg-white overflow-hidden h-full flex flex-col">
        
        <CardContent className="p-6 flex flex-col h-full space-y-4">
          {/* Image Section */}
          <div className="aspect-[4/3] overflow-hidden rounded-lg mb-2 relative">
            <OptimizedImage
              src='https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/commercial/comm_dumpster_cards.webp'
              alt={size.hero_alt_text || `${size.title} for commercial waste management`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={400}
              height={300}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Size Badge */}
            <div className="absolute top-3 left-3 bg-primary-pink text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {size.size_label}
            </div>
          </div>
          
          {/* Content Section */}
          <div className="flex-1 flex flex-col justify-between space-y-3">
            {/* Title */}
            <h3 className="text-xl font-bold text-professional-dark font-poppins group-hover:text-primary-pink transition-colors">
              {size.title}
            </h3>
            
            {/* Use Case */}
            <p className="text-sm text-gray-600 font-inter leading-relaxed">
              {size.description}
            </p>
            
            {/* Capacity and Pricing Info */}
            <div className="space-y-2 py-3 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Capacity:</span>
                <span className="font-semibold text-professional-dark">~{size.capacity_bags} bags</span>
              </div>
              {size.pricing_range && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Starting at:</span>
                  <span className="font-semibold text-primary-pink">{size.pricing_range}</span>
                </div>
              )}
            </div>
            
            {/* CTA Button */}
            <Button 
              className="w-full mt-3 bg-primary-pink hover:bg-primary-pink/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-md"
              asChild
            >
              <span className="inline-flex items-center justify-center">
                View Details
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const DynamicCommercialSizeCards = () => {
  const { data: commercialSizes, isLoading, error } = useCommercialSizes();
  const { section } = usePageSection('commercial', 'dumpster-size-cards');

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-professional-light via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-professional-dark font-poppins">
                Explore Commercial Dumpster Sizes
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-3xl h-96"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-professional-light via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-professional-dark font-poppins">
              Commercial Dumpster Sizes
            </h2>
            <p className="text-professional-medium">
              Unable to load dumpster sizes at this time. Please call us at{' '}
              <a href="tel:970-888-7274" className="text-diverz-purple hover:underline font-semibold">
                970-888-7274
              </a>{' '}
              for assistance.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-professional-light via-white to-gray-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(160,33,165,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(160,33,165,0.02),transparent_50%)]"></div>
      
      {/* AI Assistant Container - Enhanced for Future Implementation */}
      <div 
        id="ai-assistant-container" 
        className="fixed bottom-24 right-6 z-[45] opacity-0 pointer-events-none transition-all duration-500 ease-out transform translate-y-4"
        data-ai-assistant="ready"
        role="complementary"
        aria-label="AI dumpster size assistant (coming soon)"
      >
        <div className="bg-gradient-to-br from-diverz-purple to-diverz-purple-dark text-white p-5 rounded-3xl shadow-2xl border border-white/20 max-w-sm backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 rounded-full p-2">
              <Bot className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="font-bold text-sm font-poppins">Dumpster Size Assistant</span>
          </div>
          <p className="text-sm text-white/95 mb-4 font-inter leading-relaxed">
            Need help choosing the right commercial dumpster size for your business?
          </p>
          <Button size="sm" className="w-full bg-white text-diverz-purple hover:bg-gray-100 hover:scale-105 transition-all duration-200 font-semibold font-inter">
            <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
            Get Size Recommendation
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-primary-pink/10 rounded-full mb-6">
            <span className="text-primary-pink font-semibold text-sm font-inter">Commercial Solutions</span>
          </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-professional-dark font-poppins leading-tight">
              {section?.title || "Explore Commercial Dumpster Sizes"}
            </h2>
            <p className="text-xl text-professional-medium font-inter max-w-3xl mx-auto leading-relaxed">
              {section?.description || "Choose the perfect dumpster size for your business needs. Compare features, capacity, and pricing options from small businesses to enterprise-level operations."}
            </p>
          </div>
          
          {/* Responsive Cards Grid - Max 3 per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {commercialSizes?.map((size) => (
              <DynamicCommercialSizeCard key={size.id} size={size} fallbackImage={section?.image_path ?? undefined} />
            ))}
          </div>

          {/* Enhanced Call-to-Action Section */}
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50">
            <h3 className="text-2xl font-bold text-professional-dark mb-4 font-poppins">
              Still Not Sure Which Size Is Right for Your Business?
            </h3>
            <p className="text-professional-medium font-inter mb-6 text-lg">
              Our dumpster experts can help you choose the perfect commercial waste solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="border-2 border-primary-pink text-primary-pink hover:bg-primary-pink hover:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <a href="tel:970-888-7274">
                  <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                  Call for Expert Advice: 970-888-7274
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-professional-dark hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/contact">
                  Request Custom Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicCommercialSizeCards;
