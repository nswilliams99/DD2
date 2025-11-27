
interface LocalBlurbProps {
  content: string;
  townName: string;
}

const LocalBlurb = ({ content, townName }: LocalBlurbProps) => {
  // Create town-specific content if no custom content is provided
  const getDefaultContent = (town: string) => {
    const townContent = {
      'Berthoud': `Dumpster Diverz provides professional roll-off dumpster rental services throughout Berthoud, known as the "Garden Spot of Colorado," and surrounding Weld and Larimer County areas. Our 12-30 yard containers are perfect for residential remodels in neighborhoods like PrairieStar, Hammond Farm, Heritage Ridge, Mary's Farm, and Gateway Park, as well as construction projects near downtown Berthoud and South Berthoud developments along Highway 287.

We understand the unique needs of this growing community between Loveland and Longmont, from new construction projects in subdivisions along County Roads 17, 15, and 44 to farm property cleanouts and agricultural debris removal on outlying properties west toward Carter Lake and east toward I-25. Our same-day delivery service covers Highway 56, ensuring seamless access throughout incorporated Berthoud and surrounding rural areas.

Unlike corporate haulers, we provide small-town service with big project support - no contracts, no hidden fees, and personalized scheduling that works around your timeline. Our HOA-compliant dumpster placements make us the preferred choice for residential neighborhoods, while our flexible service supports both first-time renovators and contractors managing multi-phase builds in this beautiful foothills community.`,
      
      'Loveland': `Dumpster Diverz provides professional roll-off dumpster rental services throughout Loveland and the Big Thompson River area. Our locally owned company serves Downtown Loveland, Thompson Ranch, The Lakes at Centerra, Alford Meadows, Mariana Butte, Seven Lakes, Kendall Brook, and Boedecker Lake neighborhoods with 12-30 yard containers perfect for kitchen renovations, roofing projects, and new home construction.

Unlike national call centers, we're real people who know your neighborhood - from HOA-compliant placements in newer subdivisions like Centerra to flexible service for rural properties off County Roads 21 and 14. Our same-day delivery covers US Highway 34 (Eisenhower Blvd), Highway 287, and foothills access west of Mariana Butte, ensuring seamless service from downtown to Devil's Backbone area.

We provide contract-free, flexible rentals perfect for weekend projects, whole-home renovations, agricultural cleanups, and commercial office cleanouts along the I-25 corridor. From the Big Thompson River to Carter Lake area, Loveland residents and contractors choose us for reliable service, fair pricing, and personalized support that big corporate haulers simply can't match.`,
      
      'Longmont': `Dumpster Diverz provides professional roll-off dumpster rental services throughout Longmont and the St. Vrain Creek area. Our locally owned company serves Old Town Longmont, Harvest Junction, Fox Hill, Clover Basin, Southmoor Park, Spring Valley, Renaissance neighborhoods, and downtown Main Street corridor with 12-30 yard containers perfect for residential remodeling, reroofing projects, and new construction.

We offer local reliability without Boulder pricing - serving both established neighborhoods in Longmont proper and rural Weld County properties along Highway 66 and CR 1. Our same-day delivery covers Ken Pratt Blvd (Highway 119), US 287, Nelson Road, Airport Road, and St. Vrain Road, ensuring seamless service from downtown to Front Range foothills and Union Reservoir area.

Unlike regional haulers with upcharges, we provide contract-free, flat-rate pricing perfect for kitchen renovations in older homes, commercial cleanouts along Ken Pratt corridor, and agricultural property cleanouts. From Fox Hill subdivisions to farmland acreages, Longmont residents and contractors choose us for local knowledge of HOA compliance in suburban areas and flexible access logistics for larger country properties.`,

      'Northern Communities': `Dumpster Diverz provides professional roll-off dumpster rental services throughout Northern Colorado's rural and mountain communities — where national haulers don't go. We serve Bellvue (including Rist Canyon Rd, Bellvue Dome area, Watson Lake region), Laporte (neighborhoods off Overland Trail, County Rd 54G, Vern's Place vicinity), Masonville (foothill homesites, Stove Prairie Rd, Buckhorn Canyon area), Nunn (east of I-25, agricultural properties along CR 100 & CR 29), Pierce (small-town residential and farmsteads near Hwy 85 & CR 90), Drake (homesites along Big Thompson Canyon), and Crystal Lakes (mountain cabins north of Red Feather Lakes).

Our locally owned company specializes in challenging rural deliveries with 12-30 yard containers perfect for property cleanouts, tree removal, ranch cleanup, fire mitigation, and cabin repairs. We handle long driveways, unpaved roads, and seasonal canyon access that big corporate haulers avoid. Our experienced drivers know CR 54G/Overland Trail, Rist Canyon Rd, Stove Prairie Rd, Buckhorn Rd, US Highway 85, and mountain routes through Big Thompson Canyon.

Unlike national companies with hidden rural fees, we provide transparent pricing for foothills west of Fort Collins, rolling farmland between Greeley and Wyoming border, and canyon forest-access properties. We offer bear-safe placement options, HOA-compliant service for rural subdivisions, flexible scheduling for remote properties, and no upcharges for accessing ranches, cabins, and mountain homesites where others simply won't deliver.`,

      'Severance': `Dumpster Diverz provides professional roll-off dumpster rental services throughout Severance, one of Northern Colorado's fastest-growing communities. We serve all Severance neighborhoods including Tailholt, Hidden Valley Farm, Hunters Crossing, Timber Ridge, Lakeview, Overlook, and Old Town Severance downtown grid, plus new subdivisions off CR 74 and CR 21. Our 12-30 yard containers are perfect for new home construction debris, garage cleanouts, roofing projects, and light commercial remodels.

Located between Windsor and Eaton, Severance represents the perfect blend of suburban growth and rural accessibility. Our locally owned company provides same-day delivery throughout this growing bedroom community, with easy access from our Windsor hub via Harmony Road corridor. We specialize in serving new construction zones east toward Windsor and north of Harmony Road, plus rural residential properties along CR 21, CR 23, and CR 74.

Unlike national haulers with contracts and hidden fees, we provide flexible, HOA-friendly service perfect for Severance's new subdivisions and established neighborhoods. Our experienced drivers know the wide streets of newer developments and can handle rural driveways with advance scheduling. From 15-yard bins for garage cleanouts to 20-yard containers for home construction projects, we deliver schedule certainty and local reliability that growing communities like Severance need and deserve.`,

      'Wellington': `Dumpster Diverz provides professional roll-off dumpster rental services throughout Wellington, one of Larimer County's fastest-growing communities. We serve all Wellington neighborhoods including The Meadows, Buffalo Creek, Viewpointe, Park Meadows, Wellington Downs, Sage Meadows, Southmoor, and Old Town Wellington, plus new subdivisions east of 1st Street and County Road 60. Our 12-30 yard containers are perfect for new home construction debris, garage cleanouts, interior renovations, roofing projects, and agricultural property cleanup.

Located between Fort Collins and the Wyoming border, Wellington represents the perfect blend of suburban growth and rural accessibility. Our locally owned company provides same-day delivery throughout this growing family-oriented community, with easy access via I-25 Exit 278 and Cleveland Avenue (Highway 1). We specialize in serving new construction zones in developments like Buffalo Creek and Viewpointe, plus rural residential properties along County Roads 9, 62, and 60E near Wellington Community Park and Wellington Middle-High School areas.

Unlike national haulers with contracts and restrictions, we provide flexible, HOA-compliant service perfect for Wellington's new subdivisions and established rural properties. Our experienced drivers know the wide streets of newer developments and can handle long gravel driveways with advance scheduling. With no municipal trash provider restrictions, Wellington residents enjoy complete freedom in choosing their roll-off service. From 15-yard bins for garage cleanouts to 30-yard containers for home construction projects, we deliver the local expertise and reliable service that Wellington's growing families and contractors depend on.`,

      'Windsor': `Dumpster Diverz provides professional roll-off dumpster rental services throughout Windsor, Northern Colorado's fastest-growing master-planned suburban hub bridging Larimer and Weld Counties. We serve all Windsor neighborhoods including Water Valley, Raindance, The Ridge at Harmony Road, Highland Meadows, Jacoby Farm, Poudre Heights, Windshire Park, Bison Ridge, Governors Ranch, Peakview Estates, and downtown Windsor's old-town grid neighborhoods. Our 12-30 yard containers are perfect for home renovations, new construction debris, landscaping projects, and HOA-compliant cleanouts.

Located at the crossroads of major Front Range corridors, Windsor offers unmatched accessibility via Harmony Road (CR 74) from I-25, Crossroads Blvd (CR 28), US 257 to Greeley, and SH 392 connecting to Fort Collins and Severance. Our locally owned company provides same-day delivery throughout this golf course community and resort-style housing developments, plus rural properties along County Roads 17, 19, 21, 23, 74, and CR 30 east of I-25.

Unlike national haulers with rigid contracts, we specialize in HOA-compliant service perfect for Windsor's regulated neighborhoods and master-planned communities. Our experienced drivers understand wide street layouts, back-alley access requirements, and front-only placement restrictions common in developments like Raindance National Resort area and Highland Meadows. From 15-yard containers for garage cleanouts to 30-yard bins for home construction in Water Valley and Jacoby Farm, we deliver the local expertise, competitive pricing, and flexible scheduling that Windsor's families, retirees, and young professionals depend on.`,
      
      'Fort Collins': 'home renovations, new construction projects, and large-scale cleanouts. Our roll-off dumpsters are perfect for Fort Collins homeowners tackling kitchen remodels, bathroom updates, roofing projects, and estate cleanouts in neighborhoods like Old Town, Midtown, and Harmony Corridor.',
      
      'Greeley': `Dumpster Diverz provides professional roll-off dumpster rental services throughout Greeley and the UNC campus area. Our 10-40 yard containers serve West Greeley, Kelly Farm, Promontory, and St. Michaels neighborhoods, plus Evans and Garden City.

Unlike national haulers, we're locally owned with no contracts, no hidden fees, and real customer service from Northern Colorado professionals. We serve all of Greeley proper and most surrounding areas - call to confirm availability outside city limits.

From UNC student moves to new construction projects, we provide same-day delivery and flexible scheduling.`
    };

    if (townContent[town as keyof typeof townContent]) {
      return townContent[town as keyof typeof townContent];
    }

    const commonProjects = {
      'Fort Collins': 'home renovations, new construction projects, and large-scale cleanouts. Our roll-off dumpsters are perfect for Fort Collins homeowners tackling kitchen remodels, bathroom updates, roofing projects, and estate cleanouts in neighborhoods like Old Town, Midtown, and Harmony Corridor.'
    };

    const projectText = commonProjects[town as keyof typeof commonProjects] || 'construction, renovation, and cleanup projects';

    return `Dumpster Diverz provides professional roll-off dumpster rental services throughout ${town} and the surrounding Northern Colorado area. Our containers are perfect for ${projectText} We understand local waste disposal requirements and work with area landfills to ensure responsible debris management. With flexible rental periods and same-day delivery available, we make waste management simple for ${town} residents and contractors.`;
  };

  const displayContent = content || getDefaultContent(townName);

  return (
    <section className="py-12 bg-white" role="region" aria-labelledby="local-service-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="local-service-heading" className="text-3xl font-bold text-professional-dark mb-6 font-poppins">
            Professional Roll-Off Service in {townName}
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed font-inter space-y-4">
            {displayContent.split('\n\n').map((paragraph, index) => {
              if (!paragraph.trim()) return null;
              return (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph.trim()}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalBlurb;
