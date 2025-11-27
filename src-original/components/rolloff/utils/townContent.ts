
export interface TownContent {
  sizes: string;
  delivery: string;
  service: string;
  subheading: string;
}

export const getTownContent = (town: string): TownContent => {
  switch (town) {
    case 'Fort Collins':
      return {
        sizes: '12-30',
        delivery: 'SAME-DAY',
        service: 'FORT COLLINS & NORTHERN CO',
        subheading: 'Fast, reliable roll-off containers for Fort Collins homeowners, contractors, and property managers. Same-day delivery for residential remodels, construction projects, and CSU area cleanouts.'
      };
    case 'Berthoud':
      return {
        sizes: '12-30',
        delivery: 'SAME-DAY',
        service: 'GARDEN SPOT CO',
        subheading: 'Professional roll-off containers for the "Garden Spot of Colorado." Serving PrairieStar, Hammond Farm, Heritage Ridge, and surrounding neighborhoods with small-town service and big project support.'
      };
    case 'Greeley':
      return {
        sizes: '10-40',
        delivery: 'SAME-DAY',
        service: 'GREELEY & WELD COUNTY',
        subheading: 'Locally owned roll-off service for Greeley, UNC campus area, and surrounding neighborhoods. No contracts, no hidden fees - just real customer service from Northern Colorado professionals.'
      };
    case 'Loveland':
      return {
        sizes: '12-30',
        delivery: 'SAME-DAY',
        service: 'BIG THOMPSON AREA',
        subheading: 'Locally owned roll-off service for Loveland, Centerra, Thompson Ranch, and foothills communities. Real people, not call centers - serving from downtown to Devil\'s Backbone with HOA-compliant placement and flexible weekend service.'
      };
    case 'Longmont':
      return {
        sizes: '12-30',
        delivery: 'SAME-DAY',
        service: 'ST. VRAIN CREEK AREA',
        subheading: 'Local reliability without Boulder pricing for Longmont and St. Vrain Creek area. Serving Old Town, Harvest Junction, Fox Hill, Clover Basin, and rural Weld County with Front Range foothills access and flexible scheduling.'
      };
    case 'Northern Communities':
      return {
        sizes: '12-30',
        delivery: 'RURAL ACCESS',
        service: 'MOUNTAIN & RURAL',
        subheading: 'Professional roll-off service for Northern Colorado\'s rural and mountain communities — where national haulers don\'t go. Serving Bellvue, Laporte, Masonville, Nunn, Pierce, Drake, and Crystal Lakes with bear-safe placement and canyon access expertise.'
      };
    case 'Severance':
      return {
        sizes: '12-30',
        delivery: 'SAME-DAY',
        service: 'GROWING COMMUNITY',
        subheading: 'Trusted roll-off service for Severance neighborhoods including Tailholt, Hidden Valley Farm, and Hunters Crossing. Local drivers, no contracts, flexible delivery for new subdivisions and rural properties between Windsor and Eaton.'
      };
    case 'Wellington':
      return {
        sizes: '12-30',
        delivery: 'SAME-DAY',
        service: 'LARIMER COUNTY',
        subheading: 'Trusted roll-off service for Wellington neighborhoods including The Meadows, Buffalo Creek, and Viewpointe. No contracts, HOA-friendly placement, fast response from I-25 Exit 278 for Larimer County\'s fastest-growing community.'
      };
    case 'Windsor':
      return {
        sizes: '12-30',
        delivery: 'SAME-DAY',
        service: 'MASTER-PLANNED HUB',
        subheading: 'HOA-compliant roll-off service for Windsor\'s master-planned communities including Raindance, Water Valley, Highland Meadows, and Jacoby Farm. Local drivers, flexible placement, competitive pricing for Larimer-Weld County\'s suburban growth hub.'
      };
    default:
      return {
        sizes: '10-40',
        delivery: 'SAME-DAY',
        service: 'LOCAL',
        subheading: `Professional roll-off containers for construction, renovation, and cleanup projects in ${town}. 10-40 yard sizes with same-day delivery available.`
      };
  }
};
