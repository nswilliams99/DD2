
import { Card, CardContent } from '@/components/ui/card';
import { useCommercialSpecs } from '@/hooks/useCommercialSpecs';

const CommercialSpecsTable = () => {
  const { data: specs, isLoading, error } = useCommercialSpecs();

  if (isLoading) {
    return (
      <section className="py-16 bg-professional-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
              Commercial Dumpster Specifications
            </h2>
            <Card className="bg-background shadow-xl">
              <CardContent className="p-8 text-center">
                <p className="text-professional-medium font-inter">Loading specifications...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading commercial specs:', error);
    return (
      <section className="py-16 bg-professional-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
              Commercial Dumpster Specifications
            </h2>
            <Card className="bg-background shadow-xl">
              <CardContent className="p-8 text-center">
                <p className="text-professional-medium font-inter">Unable to load specifications at this time.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (!specs || specs.length === 0) {
    return (
      <section className="py-16 bg-professional-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
              Commercial Dumpster Specifications
            </h2>
            <Card className="bg-background shadow-xl">
              <CardContent className="p-8 text-center">
                <p className="text-professional-medium font-inter">No specifications available.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-professional-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
            Commercial Dumpster Specifications
          </h2>
          <Card className="bg-background shadow-xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-diverz-purple text-white">
                      <th className="px-6 py-4 text-left font-semibold font-poppins">Size</th>
                      <th className="px-6 py-4 text-center font-semibold font-poppins">Dimensions</th>
                      <th className="px-6 py-4 text-center font-semibold font-poppins">Capacity</th>
                      <th className="px-6 py-4 text-center font-semibold font-poppins">Ideal For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec, index) => (
                      <tr key={spec.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-medium text-professional-dark font-inter">{spec.label}</td>
                        <td className="px-6 py-4 text-center text-professional-medium font-inter">{spec.dimensions}</td>
                        <td className="px-6 py-4 text-center text-professional-medium font-inter">{spec.capacity}</td>
                        <td className="px-6 py-4 text-center text-professional-medium font-inter">{spec.ideal_use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommercialSpecsTable;
