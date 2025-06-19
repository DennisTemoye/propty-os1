
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Home, Briefcase, MapPin, Calendar, Receipt, FileText } from 'lucide-react';

const WhoIsProptyOSForSection = () => {
  const realEstateFeatures = [
    {
      icon: Building2,
      title: 'Estate Developers',
      description: 'Manage off-plan sales, plots, and allocations'
    },
    {
      icon: Users,
      title: 'Marketing Teams',
      description: 'Track leads, agent performance, and CRM'
    },
    {
      icon: MapPin,
      title: 'Land Aggregators',
      description: 'Organize land records, documents, and buyer milestones'
    },
    {
      icon: Briefcase,
      title: 'Property Sales Firms',
      description: 'Manage project pipelines and client payments'
    },
    {
      icon: Calendar,
      title: 'Facility Managers',
      description: 'Track building-level payments and manage vendors'
    }
  ];

  const landlordFeatures = [
    {
      icon: Home,
      title: 'Residential Landlords',
      description: 'Collect rent, onboard tenants, track leases'
    },
    {
      icon: Building2,
      title: 'Shop & Office Owners',
      description: 'Manage short/long-term commercial space rentals'
    },
    {
      icon: Users,
      title: 'Multi-unit Property Managers',
      description: 'Track unit occupancy, expenses, and reminders'
    },
    {
      icon: Receipt,
      title: 'Independent Owners',
      description: 'Stay organized with receipts, payments & contracts'
    },
    {
      icon: FileText,
      title: 'Small Portfolios',
      description: 'Automate admin without hiring a team'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Who is ProptyOS For?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Real Estate Companies */}
          <Card className="border shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900 dark:border-gray-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-8 text-center">
                For Real Estate Companies
              </h3>
              <div className="space-y-6">
                {realEstateFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* For Landlords */}
          <Card className="border shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900 dark:border-gray-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-8 text-center">
                For Landlords
              </h3>
              <div className="space-y-6">
                {landlordFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhoIsProptyOSForSection;
