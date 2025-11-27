
import { Badge } from '@/components/ui/badge';
import { Truck } from 'lucide-react';
import { getTownContent } from './utils/townContent';
import RolloffStatsGrid from './components/RolloffStatsGrid';
import RolloffActionButtons from './components/RolloffActionButtons';
import RolloffFloatingBadge from './components/RolloffFloatingBadge';
import RolloffTownHeading from './components/RolloffTownHeading';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface RolloffHeroProps {
  townName: string;
  heroImage?: string;
  heroAltText?: string;
}

const RolloffHero = ({
  townName,
  heroImage,
  heroAltText
}: RolloffHeroProps) => {
  const defaultImage = '/lovable-uploads/83de10f7-82de-45c2-81a2-3e6a4d347744.jpg';
  const imageUrl = heroImage || defaultImage;
  const altText = heroAltText || `Roll-off dumpster rental service in ${townName}, Colorado - Professional construction and cleanout containers`;

  const content = getTownContent(townName);

  return (
    <section className="relative bg-gradient-to-br from-professional-dark via-professional-medium to-diverz-purple text-white py-12 overflow-hidden" role="region" aria-labelledby="hero-heading">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-diverz-purple/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            {/* Service badge */}
            <div className="flex items-center gap-4">
              <Badge className="bg-diverz-purple text-white font-inter border-2 border-white/30">
                <Truck className="w-4 h-4 mr-2" aria-hidden="true" />
                Roll-Off Dumpsters
              </Badge>
            </div>

            {/* Town-specific heading */}
            <div className="space-y-4">
              <RolloffTownHeading townName={townName} />
              
              <p className="text-lg text-gray-200 font-medium font-inter">
                {content.subheading}
              </p>
            </div>

            {/* Quick Stats */}
            <RolloffStatsGrid content={content} />

            {/* Action buttons */}
            <RolloffActionButtons townName={townName} />
          </div>

          {/* Image Side */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-lg aspect-[4/3] bg-white/10 rounded-xl overflow-hidden border border-white/20">
              <OptimizedImage 
                src={imageUrl} 
                alt={altText} 
                className="w-full h-full object-cover rounded-xl motion-safe:hover:scale-105 motion-safe:transition-transform motion-safe:duration-500 motion-reduce:transform-none" 
                priority={true}
                width={683}
                height={512}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 683px"
              />
            </div>

            {/* Floating Badge */}
            <RolloffFloatingBadge />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolloffHero;
