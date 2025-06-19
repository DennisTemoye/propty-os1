
import React from 'react';
import { Shield, Globe, Users, Database } from 'lucide-react';

const WhyProptyOSSection = () => {
  const features = [
    {
      icon: Globe,
      title: "Built for Africa",
      description: "Works online & offline with African-specific features and local payment integrations"
    },
    {
      icon: Database,
      title: "All-in-One Dashboard",
      description: "Manage rent, sales, documents, and CRM from a single, intuitive interface"
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Assign specific roles and control access levels for team members and stakeholders"
    },
    {
      icon: Shield,
      title: "Secure & Scalable",
      description: "Encrypted documents, cloud hosting, and virtual accounts for enterprise-grade security"
    }
  ];

  return (
    <section id="why-proptyos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Why Choose ProptyOS?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for African real estate markets with features that address local challenges and opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-2xl border border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
                  <IconComponent className="w-8 h-8 text-purple-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyProptyOSSection;
