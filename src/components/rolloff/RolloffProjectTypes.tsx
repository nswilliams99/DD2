
import { Card, CardContent } from '@/components/ui/card';
import { Hammer, Truck, CheckCircle } from 'lucide-react';

const RolloffProjectTypes = () => {
  const projectTypes = [
    {
      title: "Home Renovations",
      description: "Kitchen, bathroom, and room remodeling projects",
      icon: <Hammer className="w-8 h-8" aria-hidden="true" />
    },
    {
      title: "Construction Projects", 
      description: "New construction and commercial building projects",
      icon: <Truck className="w-8 h-8" aria-hidden="true" />
    },
    {
      title: "Cleanouts & Junk Removal",
      description: "Estate cleanouts, garage cleanouts, decluttering",
      icon: <CheckCircle className="w-8 h-8" aria-hidden="true" />
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
            Perfect For Your Project
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projectTypes.map((project, index) => (
              <Card key={project.title} className="bg-background hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="bg-diverz-purple text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-bold text-professional-dark mb-4 font-poppins">
                    {project.title}
                  </h3>
                  <p className="text-professional-medium font-inter">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolloffProjectTypes;
