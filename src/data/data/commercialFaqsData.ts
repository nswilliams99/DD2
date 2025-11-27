// Hardcoded commercial FAQs data to replace Supabase dependency
export interface CommercialFAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const commercialFaqsData: CommercialFAQ[] = [
  {
    id: '1',
    question: 'What commercial dumpster sizes do you offer?',
    answer: 'We offer 2-yard and 3-yard commercial dumpsters. These sizes are perfect for handling most business waste needs efficiently.',
    category: 'sizes',
    sort_order: 1,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    question: 'How often can you pick up my commercial dumpster?',
    answer: 'We offer flexible pickup schedules including weekly, bi-weekly, monthly, twice weekly, three times weekly, and even daily pickup for high-volume businesses.',
    category: 'service',
    sort_order: 2,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    question: 'Do you require a contract for commercial service?',
    answer: 'No contracts required! We provide month-to-month service so you can adjust or cancel with 30 days notice. We believe in earning your business with reliable service.',
    category: 'billing',
    sort_order: 3,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    question: 'How much does commercial dumpster service cost?',
    answer: 'Commercial service starts around $85/month for a 2-yard dumpster with weekly pickup. Pricing varies by dumpster size, pickup frequency, and location. Call 970-888-7274 for a custom quote.',
    category: 'billing',
    sort_order: 4,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    question: 'Can I change my pickup schedule or dumpster size?',
    answer: 'Absolutely! We can adjust your pickup frequency or upgrade/downgrade your dumpster size. Changes typically take effect on your next billing cycle.',
    category: 'service',
    sort_order: 5,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    question: 'What can I put in my commercial dumpster?',
    answer: 'You can dispose of regular business waste, cardboard, paper, food waste, and general trash. We cannot accept hazardous materials, electronics, or large appliances.',
    category: 'waste',
    sort_order: 6,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    question: 'Do you provide commercial recycling service?',
    answer: 'Yes, we offer commercial recycling services for cardboard, paper, and other recyclable materials. This can often reduce your waste volume and save money.',
    category: 'recycling',
    sort_order: 7,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    question: 'What happens if my dumpster gets too full?',
    answer: 'If your dumpster is consistently overfull, we recommend upgrading to a larger size or more frequent pickup. Overfilled dumpsters can result in additional fees and pickup delays.',
    category: 'service',
    sort_order: 8,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '9',
    question: 'How quickly can you start commercial service?',
    answer: 'We can typically start service within 2-3 business days. For urgent needs, same-day or next-day service may be available. Call us to discuss your timeline.',
    category: 'service',
    sort_order: 9,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '10',
    question: 'Do you service restaurants and food establishments?',
    answer: 'Yes, we have extensive experience serving restaurants, cafes, and food service businesses. We understand the unique waste needs and can recommend the right size and pickup frequency.',
    category: 'business-type',
    sort_order: 10,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '11',
    question: 'Can you lock my commercial dumpster?',
    answer: 'Yes, our dumpsters can be equipped with locking lids to prevent unauthorized dumping and reduce overflow issues. This is especially helpful for businesses with public access.',
    category: 'security',
    sort_order: 11,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '12',
    question: 'What areas do you provide commercial service?',
    answer: 'We provide commercial dumpster service throughout Windsor, Fort Collins, Wellington, Greeley, Severance, and surrounding Northern Colorado areas.',
    category: 'service-area',
    sort_order: 12,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const getCommercialFaqsByCategory = (category: string | null): CommercialFAQ[] => {
  if (category) {
    return commercialFaqsData
      .filter(faq => faq.is_active && faq.category === category)
      .sort((a, b) => a.sort_order - b.sort_order);
  } else {
    return commercialFaqsData
      .filter(faq => faq.is_active)
      .sort((a, b) => a.sort_order - b.sort_order);
  }
};

export const getAllCommercialFaqs = (): CommercialFAQ[] => {
  return commercialFaqsData
    .filter(faq => faq.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
};
