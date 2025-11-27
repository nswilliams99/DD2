/**
 * Dumpster Diverz Company Information
 * Centralized company data for Next.js migration
 */

export const COMPANY = {
  name: "Dumpster Diverz",
  legalName: "Dumpster Diverz LLC",
  tagline: "Northern Colorado's Premier Waste Management Solution",
  phone: "970-818-1311",
  phoneDisplay: "(970) 818-1311",
  email: "info@dumpsterdiverz.com",
  address: {
    street: "Windsor",
    city: "Windsor",
    state: "CO",
    zip: "80550",
    full: "Windsor, CO 80550"
  },
  coordinates: {
    latitude: 40.4775,
    longitude: -104.9014
  },
  serviceArea: [
    "Windsor, CO",
    "Fort Collins, CO",
    "Loveland, CO",
    "Greeley, CO",
    "Wellington, CO",
    "Severance, CO",
    "Timnath, CO",
    "Johnstown, CO"
  ],
  hours: {
    weekday: "Monday - Friday: 7:00 AM - 5:00 PM",
    weekend: "Saturday: 8:00 AM - 12:00 PM",
    display: "Mon-Fri: 7AM-5PM, Sat: 8AM-12PM"
  },
  website: "https://www.dumpsterdiverz.com",
  social: {
    facebook: "https://www.facebook.com/dumpsterdiverz",
    instagram: "",
    twitter: "",
    linkedin: ""
  },
  analytics: {
    googleAnalyticsId: "G-C0E6YGLW9W",
    googleTagManagerId: ""
  },
  yearEstablished: "2020",
  description: "Dumpster Diverz provides reliable waste management solutions including residential trash pickup, commercial dumpster services, and roll-off container rentals throughout Northern Colorado.",
  services: {
    residential: true,
    commercial: true,
    rolloff: true
  }
};

export default COMPANY;
