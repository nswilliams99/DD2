import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
}

interface EnhancedFAQSchemaProps {
  faqs: FAQItem[];
  pageUrl?: string;
  mainEntity?: string;
}

const EnhancedFAQSchema = ({ faqs, pageUrl, mainEntity }: EnhancedFAQSchemaProps) => {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl && { "url": pageUrl }),
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script
      id="enhanced-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
};

export default EnhancedFAQSchema;
