import { MapPin } from 'lucide-react';

const ServiceAreaMap = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-primary-pink mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
                Our Service Area
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-inter">
              We proudly serve residential and commercial customers throughout Northern Colorado
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1g5Tx0w-UhgglPLo5yTiSKzuUD2m7Dfg&ehbc=2E312F"
              width="100%"
              height="500"
              style={{ border: 0, display: 'block' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dumpster Diverz Service Area Map - Northern Colorado"
            />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 font-inter">
              Don't see your area? <a href="tel:970-888-7274" className="text-primary-pink hover:underline font-semibold">Call us at (970) 888-7274</a> to check if we can serve your location.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;