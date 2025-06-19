
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Map, TrendingUp } from 'lucide-react';

const WhoIsProptyOSForSection = () => {
  const targetUsers = [
    {
      icon: Building,
      title: 'Property Developers',
      description: 'Build and sell residential estates, commercial properties, or mixed-use developments with comprehensive project management.',
      features: ['Project & Unit Management', 'Client KYC & Allocation', 'Payment Milestone Tracking', 'Document Generation']
    },
    {
      icon: Map,
      title: 'Land Developers',
      description: 'Develop and sell residential or commercial plots with detailed mapping and allocation systems.',
      features: ['Plot Mapping & GPS', 'Land Banking Management', 'Survey Documentation', 'Allocation Certificates']
    },
    {
      icon: TrendingUp,
      title: 'Real Estate Marketers',
      description: 'Manage sales teams, track leads, and automate commission calculations for maximum performance.',
      features: ['Agent CRM System', 'Lead Management', 'Commission Tracking', 'Performance Analytics']
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Who is ProptyOS for?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Built specifically for real estate professionals who develop, sell, and market properties across Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {targetUsers.map((user, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <user.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  {user.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-center">
                  {user.description}
                </p>
                <ul className="space-y-2">
                  {user.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsProptyOSForSection;
