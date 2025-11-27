
export interface ServiceFeature {
  feature: string;
  option1: string;
  option2: string;
}

export const serviceFeatures: ServiceFeature[] = [{
  feature: "Feature",
  option1: "65-Gallon Cart",
  option2: "96-Gallon Cart"
}, {
  feature: "Monthly Price",
  option1: "$29",
  option2: "$33"
}, {
  feature: "Recycling Add-on",
  option1: "+$10/month",
  option2: "+$10/month"
}, {
  feature: "Pickup Days",
  option1: "M / T / W",
  option2: "M / T / W"
}, {
  feature: "Online Management",
  option1: "Yes",
  option2: "Yes"
}, {
  feature: "Text Notifications",
  option1: "Yes",
  option2: "Yes"
}, {
  feature: "Contract Required",
  option1: "No",
  option2: "No"
}];

export const serviceAreas = ['Windsor', 'Fort Collins', 'Wellington', 'Greeley'];
