
import { MapPin, Shield, User, Leaf, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { usePageSection } from '@/hooks/usePageSections';

const AboutAdvantages = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const { section: advantagesIntro } = usePageSection('about', 'advantages-intro');
  const { section: localKnowledge } = usePageSection('about', 'advantage-local-knowledge');
  const { section: noSurprises } = usePageSection('about', 'advantage-no-surprises');
  const { section: personalAccountability } = usePageSection('about', 'advantage-personal-accountability');
  const { section: sustainability } = usePageSection('about', 'advantage-sustainability');

  // Create advantages array from dynamic content with fallbacks
  const advantages = [
    {
      icon: MapPin,
      title: localKnowledge?.title || "Local Knowledge",
      description: localKnowledge?.description?.split('. ')[0] + '.' || "We know Northern Colorado inside and out — from navigating snow delays to understanding HOA trash restrictions. Our team lives here, so your pickup runs on time, every time.",
      expandedContent: localKnowledge?.description?.split('. ').slice(1).join('. ') || "We live and work in Northern Colorado — so we know what it's like to deal with steep driveways, ice-packed alleys, HOA limits, and county-specific landfill rules. That knowledge isn't just local—it's personal. Our routes, timing, and support are tailored to the neighborhoods we actually live in."
    },
    {
      icon: Shield,
      title: noSurprises?.title || "No Hidden Surprises",
      description: noSurprises?.description?.split('. ')[0] + '.' || "We believe in transparent pricing, dependable service, and real communication. No 800 numbers. No unexpected charges. Just honest waste service you can rely on.",
      expandedContent: noSurprises?.description?.split('. ').slice(1).join('. ') || "You won't find 800-numbers, vague fees, or confusing contracts here. We're upfront about what it costs and what you get. Our bills are clear, our support is real, and our team actually answers the phone. What we quote is what you pay — no tricks."
    },
    {
      icon: User,
      title: personalAccountability?.title || "Personal Accountability",
      description: personalAccountability?.description?.split('. ')[0] + '.' || "Our customers know our names. If something ever goes wrong, we fix it fast — because our trucks, our brand, and our reputation are part of this community.",
      expandedContent: personalAccountability?.description?.split('. ').slice(1).join('. ') || "This isn't a franchise. If something goes wrong, you're not getting bounced to corporate — you're getting a fix from someone who probably lives down the street. Our trucks, our names, our town. We show up because our reputation is on the line."
    },
    {
      icon: Leaf,
      title: sustainability?.title || "Sustainability-Minded",
      description: sustainability?.description?.split('. ')[0] + '.' || "We minimize landfill waste through efficient routing, responsible disposal, and recycling partnerships with local providers. Cleaner service, cleaner streets.",
      expandedContent: sustainability?.description?.split('. ').slice(1).join('. ') || "We don't just haul trash — we help reduce it. From smarter routing and fuel-efficient trucks to local recycling partnerships and construction debris sorting, we do everything we can to cut landfill waste and keep streets cleaner."
    }
  ];

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-12 font-poppins text-center">
          {advantagesIntro?.title || "The Local Advantage"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            const isExpanded = expandedCard === index;
            
            return (
              <div
                key={index}
                className={`advantage-card bg-white rounded-xl shadow-sm p-6 text-left border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group ${
                  isExpanded ? 'shadow-md' : ''
                }`}
                onClick={() => handleCardClick(index)}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                aria-label={`${advantage.title} advantage - ${isExpanded ? 'expanded' : 'collapsed'}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(index);
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <Icon 
                        className="w-8 h-8 text-diverz-purple group-hover:text-diverz-purple-dark transition-colors duration-300" 
                        aria-hidden="true" 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-professional-dark mb-3 font-poppins group-hover:text-diverz-purple transition-colors duration-300">
                        {advantage.title}
                      </h3>
                      <p className="text-professional-medium font-inter leading-relaxed group-hover:text-professional-dark transition-colors duration-300">
                        {advantage.description}
                      </p>
                      
                      {/* Expanded Content */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="bg-gray-900 p-4 rounded-lg shadow-inner">
                          <div className="bg-gradient-to-r from-diverz-purple to-diverz-pink h-[2px] w-full mb-3 rounded-full"></div>
                          <p className="text-gray-100 text-base leading-relaxed font-inter">
                            {advantage.expandedContent}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand/Collapse Icon */}
                  <div className="flex-shrink-0 ml-4">
                    <ChevronDown 
                      className={`w-5 h-5 text-professional-medium transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutAdvantages;
