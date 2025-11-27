import type { Tables } from '@/integrations/supabase/types';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Link from 'next/link';

type ResidentialTown = Tables<'residential_towns'>;

interface TownSEOSectionProps {
  town: ResidentialTown;
  customTitle?: string;
  customContent?: string;
}

// Related town suggestions for internal linking
const getRelatedTowns = (currentSlug: string) => {
  const allTowns = [
    { name: "Windsor", slug: "windsor" },
    { name: "Fort Collins", slug: "fort-collins" },
    { name: "Wellington", slug: "wellington" },
    { name: "Greeley", slug: "greeley" },
    { name: "Severance", slug: "severance" }
  ];
  
  return allTowns.filter(town => town.slug !== currentSlug).slice(0, 3);
};

const TownSEOSection = ({ town, customTitle, customContent }: TownSEOSectionProps) => {
  const sectionId = `${town.slug}-intro`;
  const fallbackText = `Dumpster Diverz provides weekly trash pickup in ${town.name}, Colorado with reliable service, online billing, and no contracts.`;
  
  // Use specific images for Windsor and Fort Collins, otherwise use hero image
  const imageSrc = town.slug === 'windsor' 
    ? '/lovable-uploads/4dbeaca8-8312-4455-a6b0-30c7d06c3e16.png'
    : town.slug === 'fort-collins'
    ? '/lovable-uploads/4d8e5dc1-8e69-44fd-ae11-604a056173da.png'
    : town.hero_image_url?.trim() || '/lovable-uploads/4a0801f5-adb6-4586-aac5-552831ee7ebd.png';
  const altText = town.slug === 'windsor'
    ? 'Dumpster Diverz employee providing residential trash service with truck in Windsor neighborhood'
    : town.slug === 'fort-collins'
    ? 'Dumpster Diverz employee with trash cart and service truck in Fort Collins residential area'
    : town.hero_alt_text?.trim() || 'Dumpster Diverz residential trash service photo';
  
  const displayTitle = customTitle || `Residential Trash Pickup in ${town.name}`;
  const displayContent = customContent || town.local_blurb || fallbackText;
  const relatedTowns = getRelatedTowns(town.slug);
  
  return (
    <section className="py-16 bg-white" aria-labelledby={sectionId}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 id={sectionId} className="text-3xl font-bold mb-4 text-professional-dark font-poppins">
              {displayTitle}
            </h2>
            <p className="text-lg text-professional-medium font-inter leading-relaxed mb-6">
              {displayContent}
            </p>
            
            {/* Internal linking to related towns */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-professional-dark">
                Also serving nearby communities:
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedTowns.map(relatedTown => (
                  <Link
                    key={relatedTown.slug}
                    href={`/residential/${relatedTown.slug}`}
                    className="inline-flex items-center px-3 py-1 text-sm bg-professional-lighter text-professional-dark hover:bg-primary hover:text-white rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:outline-none"
                    aria-label={`View residential trash service in ${relatedTown.name}`}
                  >
                    {relatedTown.name}
                  </Link>
                ))}
                <Link href="/commercial"
                  className="inline-flex items-center px-3 py-1 text-sm bg-primary text-white hover:bg-primary/90 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:outline-none"
                  aria-label="View commercial dumpster services"
                >
                  Commercial Services
                </Link>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md">
            <OptimizedImage 
              src={imageSrc} 
              alt={altText} 
              className="w-full h-auto object-cover"
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TownSEOSection;
