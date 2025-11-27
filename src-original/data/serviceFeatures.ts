
export interface ServiceFeatureData {
  title: string;
  features: string[];
  badge?: string;
  link?: string;
}

export const serviceFeatures: ServiceFeatureData[] = [
  {
    title: "Residential",
    features: [
      "Weekly pickup",
      "Multiple cart sizes", 
      "Recycling included",
      "Easy online ordering",
      "Text notifications",
      "Eco-friendly disposal"
    ],
    badge: "Easy Online Ordering",
    link: "/residential"
  },
  {
    title: "Commercial",
    features: [
      "2-3 yard dumpsters",
      "Flexible schedules", 
      "1,000 lbs limit",
      "Business solutions",
      "Regular pickup",
      "Professional service"
    ],
    badge: "Business Solutions", 
    link: "/commercial"
  },
  {
    title: "Roll-off",
    features: [
      "10-40 yard containers",
      "Same-day delivery",
      "Flexible rental periods",
      "Construction ready",
      "Large project support",
      "Heavy-duty containers"
    ],
    badge: "Construction Ready",
    link: "/roll-off"
  }
];

export const allServiceFeatures = [
  "Weekly pickup",
  "Multiple container sizes",
  "Recycling services", 
  "Online ordering",
  "Text notifications",
  "Flexible schedules",
  "Same-day delivery",
  "Professional service",
  "Eco-friendly disposal",
  "Heavy-duty containers",
  "Large project support",
  "Business solutions"
];
