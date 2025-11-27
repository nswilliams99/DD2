
import { Helmet } from 'react-helmet-async';

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
    ...(mainEntity && { "mainEntity": mainEntity }),
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
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default EnhancedFAQSchema;
