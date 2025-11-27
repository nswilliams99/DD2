
const AboutTeam = () => {
  return (
    <section className="py-16 md:py-20 bg-professional-lighter">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 font-poppins text-center">
            Where We Work
          </h2>
          <p className="text-lg text-professional-medium leading-relaxed mb-12 font-inter text-center">
            We don't just run routes through Northern Colorado — we live here. Our team serves homes, HOAs, and businesses in dozens of communities across the Front Range. Whether you're in the foothills or the suburbs, you'll find Dumpster Diverz delivering dependable, local service you can trust.
          </p>
          
          <ul className="service-town-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <li>
              <a 
                href="/residential/windsor" 
                className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-semibold text-professional-dark hover:text-diverz-purple focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 font-poppins"
              >
                Windsor
              </a>
            </li>
            <li>
              <a 
                href="/residential/fort-collins" 
                className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-semibold text-professional-dark hover:text-diverz-purple focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 font-poppins"
              >
                Fort Collins
              </a>
            </li>
            <li>
              <a 
                href="/residential/loveland" 
                className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-semibold text-professional-dark hover:text-diverz-purple focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 font-poppins"
              >
                Loveland
              </a>
            </li>
            <li>
              <a 
                href="/residential/greeley" 
                className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-semibold text-professional-dark hover:text-diverz-purple focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 font-poppins"
              >
                Greeley
              </a>
            </li>
            <li>
              <a 
                href="/residential/longmont" 
                className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-semibold text-professional-dark hover:text-diverz-purple focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 font-poppins"
              >
                Longmont
              </a>
            </li>
            <li>
              <a 
                href="/residential/severance" 
                className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-semibold text-professional-dark hover:text-diverz-purple focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 font-poppins"
              >
                Severance
              </a>
            </li>
            <li>
              <a 
                href="/residential/wellington" 
                className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-semibold text-professional-dark hover:text-diverz-purple focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 font-poppins"
              >
                Wellington
              </a>
            </li>
            <li>
              <a 
                href="/residential/berthoud" 
                className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-semibold text-professional-dark hover:text-diverz-purple focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 font-poppins"
              >
                Berthoud
              </a>
            </li>
            <li>
              <a 
                href="/residential/northern-communities" 
                className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-semibold text-professional-dark hover:text-diverz-purple focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 font-poppins"
              >
                Laporte & Bellvue
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
