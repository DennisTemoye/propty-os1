
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Map, TrendingUp } from 'lucide-react';

const WhoIsProptyOSForSection = () => {
  const targetUsers = [
    {
      icon: Building,
      title: 'Property Developers',
      description: 'Build and sell residential estates, commercial properties, or mixed-use developments with comprehensive project management.',
      features: ['Project & Unit Management', 'Client KYC & Allocation', 'Payment Milestone Tracking', 'Document Generation'],
      gradient: 'from-purple-500 to-blue-600',
      cardGradient: 'from-purple-50 to-blue-50'
    },
    {
      icon: Map,
      title: 'Land Developers',
      description: 'Develop and sell residential or commercial plots with detailed mapping and allocation systems.',
      features: ['Plot Mapping & GPS', 'Land Banking Management', 'Survey Documentation', 'Allocation Certificates'],
      gradient: 'from-green-500 to-teal-600',
      cardGradient: 'from-green-50 to-teal-50'
    },
    {
      icon: TrendingUp,
      title: 'Real Estate Marketers',
      description: 'Manage sales teams, track leads, and automate commission calculations for maximum performance.',
      features: ['Agent CRM System', 'Lead Management', 'Commission Tracking', 'Performance Analytics'],
      gradient: 'from-amber-500 to-orange-600',
      cardGradient: 'from-amber-50 to-orange-50'
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
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className={`bg-gradient-to-br ${user.gradient} p-1`}>
                <CardContent className={`bg-gradient-to-br ${user.cardGradient} dark:bg-gray-700 p-8 m-0 rounded-lg`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${user.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <user.icon className="w-8 h-8 text-white" />
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
                        <div className={`w-2 h-2 bg-gradient-to-r ${user.gradient} rounded-full mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsProptyOSForSection;
