// Hardcoded rolloff town data to replace Supabase dependency
export interface RolloffTown {
  id: string;
  name: string;
  slug: string;
  hero_image_url: string;
  hero_alt_text: string;
  hero_subheading: string;
  local_blurb: string;
  meta_description: string;
  meta_title: string;
  is_active: boolean;
  state: string;
  embedding: string;
  kml_polygon_data: string;
  map_center_lat: number;
  map_center_lng: number;
  created_at: string;
  updated_at: string;
}

export const rolloffTownsData: RolloffTown[] = [
  {
    id: '1',
    name: 'Fort Collins',
    slug: 'fort-collins',
    hero_image_url: 'website_pics/pages/rolloff-fort-collins/rolloff_town_hero.webp',
    hero_alt_text: 'Dumpster rental service in Fort Collins, Colorado',
    hero_subheading: 'Reliable Dumpster Rentals in Fort Collins',
    local_blurb: 'Serving Fort Collins with reliable dumpster rental services for home renovations, construction projects, and cleanouts throughout the city and surrounding areas.',
    meta_description: 'Professional dumpster rental services in Fort Collins, CO. Same-day delivery, competitive rates, and excellent customer service for all your waste management needs.',
    meta_title: 'Roll-Off Dumpster Rentals in Fort Collins | Dumpster Diverz',
    is_active: true,
    state: 'Colorado',
    embedding: '',
    kml_polygon_data: '',
    map_center_lat: 40.5853,
    map_center_lng: -105.0844,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const getRolloffTownBySlug = (slug: string): RolloffTown | null => {
  return rolloffTownsData.find(town => town.slug === slug) || null;
};

export const getAllRolloffTowns = (): RolloffTown[] => {
  return rolloffTownsData.filter(town => town.is_active);
};
