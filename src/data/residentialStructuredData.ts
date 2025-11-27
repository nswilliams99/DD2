
export const residentialServiceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Residential Trash & Recycling Service",
  "description": "Weekly trash pickup and recycling service for homes in Windsor, Fort Collins, Wellington and Northern Colorado",
  "provider": {
    "@type": "Organization",
    "name": "Dumpster Diverz LLC",
    "telephone": "970-888-7274",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Wellington",
      "addressRegion": "Colorado"
    }
  },
  "areaServed": [{
    "@type": "City",
    "name": "Windsor"
  }, {
    "@type": "City",
    "name": "Fort Collins"
  }, {
    "@type": "City",
    "name": "Wellington"
  }, {
    "@type": "City",
    "name": "Greeley"
  }],
  "offers": [{
    "@type": "Offer",
    "name": "64-Gallon Cart Service",
    "price": "25",
    "priceCurrency": "USD"
  }, {
    "@type": "Offer",
    "name": "96-Gallon Cart Service",
    "price": "30",
    "priceCurrency": "USD"
  }]
};

export const paymentActionStructuredData = {
  "@context": "https://schema.org",
  "@type": "PayAction",
  "name": "Pay Trash Service Bill Online",
  "description": "Secure online payment portal for Dumpster Diverz residential trash and recycling service bills",
  "agent": {
    "@type": "Organization",
    "name": "Dumpster Diverz LLC"
  }
};

export const residentialFAQStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What size trash carts do you offer for residential service?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We offer two cart sizes: 64-gallon carts for $25/month (perfect for smaller households) and 96-gallon carts for $30/month (ideal for families). Both include weekly pickup and recycling service."
    }
  }, {
    "@type": "Question",
    "name": "Is recycling included with residential trash service in Windsor and Fort Collins?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, recycling is included with all our residential trash service plans at no additional cost. We provide recycling pickup alongside your weekly trash collection throughout Windsor, Fort Collins, Wellington and surrounding areas."
    }
  }, {
    "@type": "Question",
    "name": "What areas do you serve for residential waste management?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We provide residential trash and recycling service throughout Northern Colorado including Windsor, Fort Collins, Wellington, Greeley and surrounding communities. Contact us to confirm service availability in your specific area."
    }
  }]
};
