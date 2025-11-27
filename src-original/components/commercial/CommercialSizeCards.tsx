
import { Button } from '@/components/ui/button';
import { Bot, MessageCircle, Phone } from 'lucide-react';
import CommercialCard2Yard from './CommercialCard2Yard';
import CommercialCard3Yard from './CommercialCard3Yard';

const CommercialSizeCards = () => {
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
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-diverz-purple/10 rounded-full mb-6">
              <span className="text-diverz-purple font-semibold text-sm font-inter">Commercial Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-professional-dark font-poppins leading-tight">
              Explore Commercial Dumpster Sizes
            </h2>
            <p className="text-xl text-professional-medium font-inter max-w-3xl mx-auto leading-relaxed">
              Choose the perfect dumpster size for your business needs. Compare features, capacity, and pricing options for small businesses and restaurants.
            </p>
          </div>
          
          {/* Enhanced Cards Grid */}
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-12">
            <CommercialCard2Yard />
            <CommercialCard3Yard />
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
                className="border-2 border-diverz-purple text-diverz-purple hover:bg-diverz-purple hover:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <a href="tel:970-888-7274">
                  <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                  Call for Expert Advice: 970-888-7274
                </a>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-professional-dark hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Request Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommercialSizeCards;
