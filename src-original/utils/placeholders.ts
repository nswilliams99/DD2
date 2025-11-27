export const PLACEHOLDERS = {
  hero: '/placeholders/hero-placeholder.webp',
  card: '/placeholders/card-placeholder.webp',
  team: '/placeholders/team-placeholder.webp',
  blog: '/placeholders/blog-placeholder.webp',
  service: '/placeholders/service-placeholder.webp',
  commercial: '/placeholders/commercial-placeholder.webp',
  residential: '/placeholders/residential-placeholder.webp',
  rolloff: '/placeholders/rolloff-placeholder.webp',
  default: '/placeholders/default-placeholder.webp'
} as const;

export type PlaceholderType = keyof typeof PLACEHOLDERS;

export const getPlaceholder = (type: PlaceholderType = 'default'): string => {
  return PLACEHOLDERS[type] || PLACEHOLDERS.default;
};

// Get random variant if multiple exist
export const getRandomPlaceholder = (type: PlaceholderType, variantCount: number = 1): string => {
  if (variantCount === 1) return getPlaceholder(type);
  
  const variant = Math.floor(Math.random() * variantCount) + 1;
  const basePath = PLACEHOLDERS[type];
  const extension = basePath.split('.').pop();
  const nameWithoutExt = basePath.replace(`.${extension}`, '');
  
  return `${nameWithoutExt}-variant${variant}.${extension}`;
};