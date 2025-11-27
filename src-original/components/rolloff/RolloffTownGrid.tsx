
import { Link } from 'react-router-dom';
import { useRolloffTowns } from '@/hooks/useRolloffTowns';

const RolloffTownGrid = () => {
  const { data: towns, isLoading } = useRolloffTowns();

  if (isLoading) {
    return (
      <section className="py-16 bg-professional-medium">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4 text-center font-poppins text-white">
            Choose Your Service Area
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-xl border border-gray-400 p-4 h-16 bg-gray-600"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!towns || towns.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-professional-medium">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins text-white">
            Choose Your Service Area
          </h2>
          <p className="text-lg mb-10 font-inter text-white/90">
            Select your location to get specific pricing and availability for roll-off dumpster rentals
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {towns.map((town) => (
              <Link
                key={town.slug}
                to={`/roll-off-dumpsters/${town.slug}`}
                className="rounded-xl p-4 text-center transition-all duration-200 shadow-lg hover:shadow-xl group font-inter font-semibold bg-white text-professional-dark border border-white hover:bg-primary hover:text-white hover:border-primary focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:outline-none"
                aria-label={`View roll-off dumpster service in ${town.name}`}
              >
                <span className="transition-colors">
                  {town.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolloffTownGrid;
