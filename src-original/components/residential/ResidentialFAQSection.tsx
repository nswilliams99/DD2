
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import PageHeading from '@/components/seo/PageHeading';
import EnhancedFAQSchema from '@/components/seo/EnhancedFAQSchema';
import type { Tables } from '@/integrations/supabase/types';

type ResidentialFaq = Tables<'residential_faqs'>;

interface ResidentialFAQSectionProps {
  faqs?: ResidentialFaq[];
  isLoading?: boolean;
}

const ResidentialFAQSection = ({ faqs, isLoading }: ResidentialFAQSectionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Filter and sort active FAQs
  const activeFaqs = faqs
    .filter(faq => faq.is_active)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
      <EnhancedFAQSchema 
        faqs={activeFaqs.map(faq => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <PageHeading level={2} variant="section" className="text-center mb-12" id="faq-heading">
            Frequently Asked Questions
          </PageHeading>
          
          <div className="space-y-4">
            {activeFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset transition-colors"
                  aria-expanded={openItems.includes(faq.id)}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <PageHeading level={3} variant="subsection" className="text-lg font-semibold pr-4">
                    {faq.question}
                  </PageHeading>
                  {openItems.includes(faq.id) ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" aria-hidden="true" />
                  )}
                </button>
                
                {openItems.includes(faq.id) && (
                  <div 
                    id={`faq-answer-${faq.id}`}
                    className="px-6 pb-4 text-professional-medium"
                  >
                    <div className="prose prose-sm max-w-none">
                      {faq.answer.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-2 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidentialFAQSection;
