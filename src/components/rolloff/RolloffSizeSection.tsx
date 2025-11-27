import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, FileText, CheckCircle, Truck, Clock } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface RolloffSizeSectionProps {
  size: {
    size: string;
    dimensions: string;
    capacity: string;
    weight: string;
    ideal: string;
    image: string;
    title: string;
    description: string;
    useCases: string[];
    pricing: string;
  };
}

const RolloffSizeSection = ({ size }: RolloffSizeSectionProps) => {
  const slug = size.size.toLowerCase().replace(' ', '-');
  
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="bg-professional-lighter py-3" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-primary-pink hover:text-primary-pink/80 font-medium">Home</a>
            </li>
            <li className="text-professional-medium">/</li>
            <li>
              <a href="/roll-off-dumpsters" className="text-primary-pink hover:text-primary-pink/80 font-medium">Roll-Off Dumpsters</a>
            </li>
            <li className="text-professional-medium">/</li>
            <li className="text-dark-neutral font-medium">{size.size} Dumpster</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section - 2-column layout with berry pink gradient */}
      <section className="relative bg-gradient-to-br from-professional-dark via-professional-medium to-primary-pink py-12 lg:py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 text-white">
              <Badge className="mb-3 bg-white/20 text-white border-white/30 font-medium">
                <Truck className="w-4 h-4 mr-2" />
                Same-Day Delivery Available
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-poppins">
                {size.title} Rental
              </h1>
              
              <p className="text-lg lg:text-xl text-white/90 font-medium leading-relaxed max-w-lg">
                {size.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  size="lg"
                  className="bg-white text-primary-pink hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  asChild
                >
                  <a href={`#quote-form?rolloffSize=${encodeURIComponent(size.size)}`}>
                    <FileText className="w-5 h-5 mr-2" />
                    Order Online
                  </a>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-pink font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  asChild
                >
                  <a href="tel:970-888-7274">
                    <Phone className="w-5 h-5 mr-2" />
                    Call for Pricing
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column - Product Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-lg aspect-video bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={size.image}
                  alt={`${size.size} roll-off dumpster container for rent in Northern Colorado`}
                  className="w-full h-full object-cover"
                  priority={true}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-xl border hidden md:block">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-pink">{size.pricing}</div>
                  <div className="text-sm text-professional-medium">All-inclusive pricing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section - Tightened spacing */}
      <section className="py-10 bg-professional-lighter">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-dark-neutral mb-8 font-poppins">
              {size.size} Dumpster Specifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="text-center shadow-md border border-light-neutral hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-base font-semibold text-primary-pink">Dimensions</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="text-xl font-bold text-dark-neutral">{size.dimensions}</div>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-md border border-light-neutral hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-base font-semibold text-primary-pink">Capacity</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="text-xl font-bold text-dark-neutral">{size.capacity}</div>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-md border border-light-neutral hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-base font-semibold text-primary-pink">Weight Limit</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="text-xl font-bold text-dark-neutral">{size.weight}</div>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-md border border-light-neutral hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-base font-semibold text-primary-pink">Pricing</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="text-xl font-bold text-dark-neutral">{size.pricing}</div>
                </CardContent>
              </Card>
            </div>

            {/* Best Use Cases - Tight horizontal card */}
            <Card className="bg-white shadow-lg border border-light-neutral">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-dark-neutral text-center font-poppins">
                  Perfect For These Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {size.useCases.map((useCase, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-primary-pink flex-shrink-0" />
                      <span className="text-professional-medium font-medium">{useCase}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Features - Charcoal gray background */}
      <section className="py-10 bg-dark-neutral">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 font-poppins">
            Why Choose Dumpster Diverz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardHeader className="pb-3">
                <Clock className="w-10 h-10 text-primary-pink mx-auto mb-3" />
                <CardTitle className="text-white text-lg">Same-Day Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-sm">
                  Need it fast? We offer same-day delivery throughout Northern Colorado for urgent projects.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardHeader className="pb-3">
                <Truck className="w-10 h-10 text-primary-pink mx-auto mb-3" />
                <CardTitle className="text-white text-lg">Local Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-sm">
                  Locally owned and operated in Northern Colorado. We know the area and provide personalized service.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardHeader className="pb-3">
                <CheckCircle className="w-10 h-10 text-primary-pink mx-auto mb-3" />
                <CardTitle className="text-white text-lg">All-Inclusive Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-sm">
                  No hidden fees. Our pricing includes delivery, pickup, disposal, and all applicable taxes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated to match commercial styling */}
      <section className="py-12 bg-primary-pink">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-poppins">
            Ready to Get Your {size.size} Dumpster?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Get an instant quote or call our team for expert advice on your project needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              size="lg"
              className="bg-white text-primary-pink hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              asChild
            >
              <a href={`#quote-form?rolloffSize=${encodeURIComponent(size.size)}`}>
                <FileText className="w-5 h-5 mr-2" />
                Get Instant Quote
              </a>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-pink font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              asChild
            >
              <a href="tel:970-888-7274">
                <Phone className="w-5 h-5 mr-2" />
                Call (970) 888-7274
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RolloffSizeSection;
