
import OptimizedImage from '@/components/ui/OptimizedImage';

const ServiceAreaMapSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-poppins">
              Our Northern Colorado Service Area
            </h2>
            <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto font-inter leading-relaxed">
              Dumpster Diverz proudly serves the Front Range and beyond with local weekly trash pickup and roll-off dumpster rentals. From Fort Collins to Longmont — and out to the most rural cabins and ranches — we go where national haulers don't.
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
              title="Interactive map of Dumpster Diverz service area in Northern Colorado"
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

export default ServiceAreaMapSection;
