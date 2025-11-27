
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

const CommercialCard2Yard = () => {
  const cardData = {
    size: "2-Yard",
    title: "2 Yard Dumpster",
    description: "Best for small businesses and coffee shops",
    image: "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/commercial/comm_dumpster_cards.webp",
    alt: "Dumpster Diverz 2-yard commercial dumpster perfect for small businesses, coffee shops, and retail stores - compact size ideal for urban locations",
    link: "/commercial/2-yard-dumpster",
    ariaLabel: "Learn more about 2-yard commercial dumpsters for small businesses"
  };

  return (
    <a
      href={cardData.link}
      aria-label={cardData.ariaLabel}
      className="block group transform transition-all duration-500 hover:scale-[1.02] focus:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary-pink/20 rounded-3xl"
    >
      <Card className="rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl hover:border-primary-pink/20 transition-all duration-500 p-8 bg-white/95 backdrop-blur-sm overflow-hidden relative group-hover:bg-white group-focus:bg-white">
        {/* Card Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
        
        <CardContent className="p-0 relative z-10">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6 relative group">
            <OptimizedImage
              src={cardData.image}
              alt={cardData.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              width={400}
              height={300}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Enhanced Size Badge */}
            <div className="absolute top-4 left-4 bg-primary-pink text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-white/20">
              {cardData.size}
            </div>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <ArrowRight className="w-6 h-6 text-primary-pink" aria-hidden="true" />
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-professional-dark mb-4 font-poppins group-hover:text-primary-pink transition-colors duration-300">
            {cardData.title}
          </h3>
          <p className="text-professional-medium mb-8 font-inter text-lg leading-relaxed">
            {cardData.description}
          </p>
          
          {/* Enhanced CTA Button */}
          <Button 
            className="w-full text-lg py-6 bg-primary-pink hover:bg-primary-pink/90 text-white font-bold group-hover:translate-x-2 group-focus:translate-x-2 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl border border-white/20"
            asChild
          >
            <span className="inline-flex items-center justify-center">
              See Complete Details & Pricing
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 group-focus:translate-x-2 transition-transform duration-300" aria-hidden="true" />
            </span>
          </Button>
        </CardContent>
      </Card>
    </a>
  );
};

export default CommercialCard2Yard;
