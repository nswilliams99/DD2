// src/lib/imageManager.js
// Image management system based on ACTUAL Supabase storage structure

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const STORAGE_BUCKET = 'website_pics';

export function getImageUrl(imagePath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${imagePath}`;
}

// Actual image inventory based on your Supabase storage SQL export
export const WEBSITE_IMAGES = {
  // Open Graph images (social sharing)
  og: {
    default: 'og/default.webp',
    home: 'og/home.webp',
    residential: 'og/residential.webp',
    commercial: 'og/commercial.webp',
    rolloff: 'og/rolloff.webp'
  },

  // Home page images (COMPLETED)
  home: {
    hero: 'pages/home/homepage_hero.webp',
    about_section: 'pages/home/homepage_about.webp',
    residential_card: 'pages/home/homepage_resi_card.webp',
    commercial_card: 'pages/home/homepage_comm_card.webp',
    rolloff_card: 'pages/home/homepage_rolloff_card.webp'
  },

  // About page images (COMPLETED)
  about: {
    hero: 'pages/about/hero.webp',
    team_photo: 'pages/about/team-photo.webp',
    company_history: 'pages/about/company-history.webp',
    facility: 'pages/about/facility.webp'
  },

  // Contact page images (COMPLETED)
  contact: {
    hero: 'pages/contact/hero.webp',
    office_location: 'pages/contact/office-location.webp',
    contact_form_bg: 'pages/contact/contact-form-bg.webp'
  },

  // Commercial service images (COMPLETED)
  commercial: {
    hero: 'pages/commercial/comm_hero_img.webp',
    dumpster_cards: 'pages/commercial/comm_dumpster_cards.webp',
    flexible_pickup: 'pages/commercial/comm_flexible_pickup.webp'
  },

  // Commercial 2-yard specific (COMPLETED)
  commercial_2_yard: {
    hero: 'pages/commercial-2-yard/hero.webp',
    dumpster_cards: 'pages/commercial-2-yard/comm_dumpster_cards.webp'
  },

  // Commercial 3-yard specific (COMPLETED)
  commercial_3_yard: {
    dumpster_cards: 'pages/commercial-3-yard/comm_dumpster_cards.webp',
    dimensions: 'pages/commercial-3-yard/dimensions.webp'
  },

  // HOA Services (COMPLETED)
  hoa_services: {
    hero: 'pages/hoa-services/hero.webp',
    community: 'pages/hoa-services/community.webp',
    partnership: 'pages/hoa-services/partnership.webp'
  },

  // Pay My Bill (COMPLETED)
  pay_my_bill: {
    hero: 'pages/pay-my-bill/hero.webp',
    secure_payment: 'pages/pay-my-bill/secure-payment.webp'
  },

  // Residential main service (PARTIALLY COMPLETED)
  residential: {
    hero: 'pages/residential/resi_heroimg.webp',
    weekly_pickup: 'pages/residential/resi_town_weekly_pickup.webp'
  },

  // Residential locations - MISSING: berthoud, longmont, loveland
  residential_fort_collins: {
    hero: 'pages/residential-fort-collins/hero.webp',
    local_truck: 'pages/residential-fort-collins/local-truck.webp',
    service_area_map: 'pages/residential-fort-collins/service-area-map.webp'
  },

  residential_greeley: {
    hero: 'pages/residential
