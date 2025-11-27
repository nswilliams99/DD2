
import { Card, CardContent } from '@/components/ui/card';

const RolloffSpecsTable = () => {
  const containerSpecs = [
    { 
      size: "12-Yard", 
      dimensions: "14' L x 8' W x 3.5' H", 
      capacity: "4-5 pickup truck loads", 
      ideal: "Small cleanouts, bathroom remodel", 
      popular: false 
    },
    { 
      size: "15-Yard", 
      dimensions: "16' L x 8' W x 4.5' H", 
      capacity: "5-6 pickup truck loads", 
      ideal: "Kitchen remodel, flooring project", 
      popular: true 
    },
    { 
      size: "20-Yard", 
      dimensions: "20' L x 8' W x 4' H", 
      capacity: "6-8 pickup truck loads", 
      ideal: "Large home cleanout, deck removal", 
      popular: false 
    },
    { 
      size: "30-Yard", 
      dimensions: "20' L x 8' W x 6' H", 
      capacity: "9-12 pickup truck loads", 
      ideal: "Construction projects, large demo", 
      popular: false 
    }
  ];

  return (
    <section className="py-16 bg-professional-lighter">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
            Roll-Off Container Specifications
          </h2>
          <Card className="bg-background shadow-xl border-2 border-professional-lighter">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full" role="table" aria-label="Roll-off container specifications">
                  <thead>
                    <tr className="bg-diverz-purple text-white">
                      <th scope="col" className="px-6 py-4 text-left font-semibold font-poppins">Size</th>
                      <th scope="col" className="px-6 py-4 text-center font-semibold font-poppins">Dimensions</th>
                      <th scope="col" className="px-6 py-4 text-center font-semibold font-poppins">Capacity</th>
                      <th scope="col" className="px-6 py-4 text-center font-semibold font-poppins">Ideal For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {containerSpecs.map((spec, index) => (
                      <tr key={spec.size} className={index % 2 === 0 ? 'bg-professional-lighter' : 'bg-white'}>
                        <td className="px-6 py-4 font-medium text-professional-dark font-inter">
                          {spec.size}
                          {spec.popular && (
                            <span className="ml-2 text-xs bg-diverz-purple text-white px-2 py-1 rounded" aria-label="Popular choice">
                              Popular
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-professional-medium font-inter">
                          {spec.dimensions}
                        </td>
                        <td className="px-6 py-4 text-center text-professional-medium font-inter">
                          {spec.capacity}
                        </td>
                        <td className="px-6 py-4 text-center text-professional-medium font-inter">
                          {spec.ideal}
                        </td>
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

export default RolloffSpecsTable;
