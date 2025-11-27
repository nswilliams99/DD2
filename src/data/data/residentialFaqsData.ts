// Hardcoded residential FAQs data to replace Supabase dependency
export interface ResidentialFaq {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
  is_active: boolean;
  town_slug: string | null;
  embedding: string;
  created_at: string;
  updated_at: string;
}

export const residentialFaqsData: ResidentialFaq[] = [
  // Global FAQs (town_slug is null)
  {
    id: '1',
    question: 'What days do you pick up trash?',
    answer: 'We provide weekly pickup service on scheduled days. Your pickup day depends on your service area. We\'ll confirm your specific pickup day when you sign up for service.',
    category: 'service',
    sort_order: 1,
    is_active: true,
    town_slug: null,
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    question: 'What size trash carts do you provide?',
    answer: 'We offer both 64-gallon and 96-gallon wheeled carts. The 64-gallon cart works well for most households, while the 96-gallon cart is perfect for larger families or those who generate more waste.',
    category: 'equipment',
    sort_order: 2,
    is_active: true,
    town_slug: null,
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    question: 'Do you provide recycling service?',
    answer: 'Yes! We provide weekly curbside recycling pickup along with your trash service. We provide a separate recycling cart for paper, cardboard, plastic, glass, and metal.',
    category: 'recycling',
    sort_order: 3,
    is_active: true,
    town_slug: null,
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    question: 'Is there a contract required?',
    answer: 'No contracts required! We believe in earning your business every month with reliable service and fair pricing. You can cancel anytime with 30 days notice.',
    category: 'billing',
    sort_order: 4,
    is_active: true,
    town_slug: null,
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    question: 'How much does residential service cost?',
    answer: 'Our residential trash and recycling service starts at $25/month for a 64-gallon cart. Pricing may vary by location and cart size. Call 970-888-7274 for exact pricing in your area.',
    category: 'billing',
    sort_order: 5,
    is_active: true,
    town_slug: null,
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    question: 'What if I have extra trash that doesn\'t fit in my cart?',
    answer: 'You can place extra bags next to your cart on pickup day for a small additional fee, or you can upgrade to a larger 96-gallon cart for a few dollars more per month.',
    category: 'service',
    sort_order: 6,
    is_active: true,
    town_slug: null,
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    question: 'Do you send pickup reminders?',
    answer: 'Yes! We send text message reminders the evening before your pickup day so you never forget to put your cart out. You can opt-in when you sign up or call us to add this service.',
    category: 'service',
    sort_order: 7,
    is_active: true,
    town_slug: null,
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    question: 'What happens if you miss my pickup?',
    answer: 'If we miss your scheduled pickup, we\'ll come back the next business day at no charge. We also provide a credit on your next bill if there\'s a service issue.',
    category: 'service',
    sort_order: 8,
    is_active: true,
    town_slug: null,
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Windsor-specific FAQs
  {
    id: '9',
    question: 'Do you serve all areas of Windsor?',
    answer: 'Yes, we provide service throughout Windsor including Raindance, Water Valley, downtown Windsor, and all residential neighborhoods. We\'ve been serving Windsor families since 2008.',
    category: 'service',
    sort_order: 1,
    is_active: true,
    town_slug: 'windsor',
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '10',
    question: 'What day is pickup in Windsor?',
    answer: 'Windsor pickup days vary by neighborhood. Most areas are serviced on Tuesday or Friday. We\'ll confirm your specific pickup day based on your address when you sign up.',
    category: 'service',
    sort_order: 2,
    is_active: true,
    town_slug: 'windsor',
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Fort Collins-specific FAQs  
  {
    id: '11',
    question: 'Do you serve Fort Collins city limits?',
    answer: 'We serve select areas of Fort Collins, primarily in the southern and eastern parts of the city. Call us at 970-888-7274 to confirm service availability for your specific address.',
    category: 'service',
    sort_order: 1,
    is_active: true,
    town_slug: 'fort-collins',
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Wellington-specific FAQs
  {
    id: '12',
    question: 'Do you provide service in all Wellington neighborhoods?',
    answer: 'Yes, we serve all of Wellington including The Meadows, downtown Wellington, and surrounding residential areas. Wellington is our home base and we provide comprehensive coverage.',
    category: 'service',
    sort_order: 1,
    is_active: true,
    town_slug: 'wellington',
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Greeley-specific FAQs
  {
    id: '13',
    question: 'Which parts of Greeley do you serve?',
    answer: 'We serve western Greeley and some central areas. Our Greeley service area is growing, so please call 970-888-7274 to check availability for your specific address.',
    category: 'service',
    sort_order: 1,
    is_active: true,
    town_slug: 'greeley',
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Severance-specific FAQs
  {
    id: '14',
    question: 'Do you serve Severance residents?',
    answer: 'Yes, we provide full residential service throughout Severance including new developments and established neighborhoods. Severance is part of our core service area.',
    category: 'service',
    sort_order: 1,
    is_active: true,
    town_slug: 'severance',
    embedding: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const getResidentialFaqsByTown = (townSlug: string | null): ResidentialFaq[] => {
  if (townSlug) {
    // Return both global FAQs and town-specific FAQs
    return residentialFaqsData
      .filter(faq => faq.is_active && (faq.town_slug === null || faq.town_slug === townSlug))
      .sort((a, b) => a.sort_order - b.sort_order);
  } else {
    // Return only global FAQs
    return residentialFaqsData
      .filter(faq => faq.is_active && faq.town_slug === null)
      .sort((a, b) => a.sort_order - b.sort_order);
  }
};

export const getAllResidentialFaqs = (): ResidentialFaq[] => {
  return residentialFaqsData
    .filter(faq => faq.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
};
