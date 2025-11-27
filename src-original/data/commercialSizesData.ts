// Hardcoded commercial sizes data to replace Supabase dependency
export interface CommercialSize {
  id: string;
  size_value: number;
  size_label: string;
  title: string;
  description: string;
  capacity_bags: number;
  weight_limit: number;
  dimensions: string;
  ideal_for: string[];
  pickup_options: string[];
  pricing_range?: string;
  hero_image_url?: string;
  hero_alt_text?: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  specifications: Record<string, string>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  is_active: boolean;
  sort_order: number;
}

export const commercialSizesData: CommercialSize[] = [
  {
    id: '1',
    size_value: 2,
    size_label: '2 Yard',
    title: '2 Yard Commercial Dumpster',
    description: 'Perfect for small businesses, offices, and restaurants with minimal waste generation.',
    capacity_bags: 12,
    weight_limit: 400,
    dimensions: '6\' L x 3\' W x 3\' H',
    ideal_for: ['Small offices', 'Retail stores', 'Restaurants', 'Medical offices', 'Salons'],
    pickup_options: ['Weekly', 'Bi-weekly', 'Monthly', 'On-demand'],
    pricing_range: '$85-120/month',
    hero_image_url: 'https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/commercial-2-yard/2%20yarder%20.webp',
    hero_alt_text: '2 yard commercial dumpster for small businesses',
    features: [
      {
        icon: 'building',
        title: 'Small Business Friendly',
        description: 'Ideal size for offices and small retail locations'
      },
      {
        icon: 'truck',
        title: 'Flexible Pickup',
        description: 'Weekly, bi-weekly, or monthly service options'
      },
      {
        icon: 'dollar-sign',
        title: 'Cost Effective',
        description: 'Affordable monthly rates for small waste volumes'
      }
    ],
    specifications: {
      'Capacity': '2 cubic yards',
      'Weight Limit': '400 lbs',
      'Dimensions': '6\'L x 3\'W x 3\'H',
      'Bag Capacity': '12 standard bags'
    },
    faqs: [
      {
        question: 'Is a 2 yard dumpster right for my small business?',
        answer: 'A 2 yard dumpster is perfect for small offices, retail stores, and restaurants generating 1-3 bags of waste per day.'
      },
      {
        question: 'How often can you pick up a 2 yard dumpster?',
        answer: 'We offer weekly, bi-weekly, or monthly pickup schedules based on your business needs.'
      }
    ],
    is_active: true,
    sort_order: 1
  },
  {
    id: '2',
    size_value: 3,
    size_label: '3 Yard',
    title: '3 Yard Commercial Dumpster',
    description: 'Ideal for medium-sized businesses with moderate waste generation needs.',
    capacity_bags: 18,
    weight_limit: 600,
    dimensions: '6\' L x 3.5\' W x 4\' H',
    ideal_for: ['Medium offices', 'Restaurants', 'Retail stores', 'Auto shops', 'Veterinary clinics'],
    pickup_options: ['Weekly', 'Bi-weekly', 'Monthly'],
    pricing_range: '$110-150/month',
    hero_image_url: '/lovable-uploads/services-commercial-new.jpg',
    hero_alt_text: '3 yard commercial dumpster for medium businesses',
    features: [
      {
        icon: 'building-2',
        title: 'Medium Business Solution',
        description: 'Perfect for growing businesses and busy locations'
      },
      {
        icon: 'recycle',
        title: 'Waste Efficient',
        description: 'Optimal size for moderate waste generation'
      },
      {
        icon: 'calendar',
        title: 'Scheduled Service',
        description: 'Reliable pickup schedules to keep your business clean'
      }
    ],
    specifications: {
      'Capacity': '3 cubic yards',
      'Weight Limit': '600 lbs',
      'Dimensions': '6\'L x 3.5\'W x 4\'H',
      'Bag Capacity': '18 standard bags'
    },
    faqs: [
      {
        question: 'What businesses typically use 3 yard dumpsters?',
        answer: 'Medium-sized restaurants, retail stores, auto shops, and busy offices typically use 3 yard dumpsters.'
      },
      {
        question: 'Can I upgrade from a 2 yard to 3 yard dumpster?',
        answer: 'Yes, we can easily upgrade your service. Contact us and we can make the change on your next billing cycle.'
      }
    ],
    is_active: true,
    sort_order: 2
  }
];

export const getCommercialSizeByValue = (sizeValue: number): CommercialSize | null => {
  return commercialSizesData.find(size => size.size_value === sizeValue && size.is_active) || null;
};

export const getAllCommercialSizes = (): CommercialSize[] => {
  return commercialSizesData.filter(size => size.is_active).sort((a, b) => a.sort_order - b.sort_order);
};