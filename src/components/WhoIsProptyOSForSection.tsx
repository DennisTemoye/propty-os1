
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Home, Briefcase, MapPin, Calendar, Receipt, FileText } from 'lucide-react';

const WhoIsProptyOSForSection = () => {
  const realEstateFeatures = [
    {
      icon: Building2,
      title: 'Estate Developers',
      description: 'Manage off-plan sales, plots, and allocations',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700'
    },
    {
      icon: Users,
      title: 'Marketing Teams',
      description: 'Track leads, agent performance, and CRM',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700'
    },
    {
      icon: MapPin,
      title: 'Land Aggregators',
      description: 'Organize land records, documents, and buyer milestones',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700'
    },
    {
      icon: Briefcase,
      title: 'Property Sales Firms',
      description: 'Manage project pipelines and client payments',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700'
    },
    {
      icon: Calendar,
      title: 'Facility Managers',
      description: 'Track building-level payments and manage vendors',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700'
    }
  ];

  const landlordFeatures = [
    {
      icon: Home,
      title: 'Residential Landlords',
      description: 'Collect rent, onboard tenants, track leases',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700'
    },
    {
      icon: Building2,
      title: 'Shop & Office Owners',
      description: 'Manage short/long-term commercial space rentals',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700'
    },
    {
      icon: Users,
      title: 'Multi-unit Property Managers',
      description: 'Track unit occupancy, expenses, and reminders',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700'
    },
    {
      icon: Receipt,
      title: 'Independent Owners',
      description: 'Stay organized with receipts, payments & contracts',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700'
    },
    {
      icon: FileText,
      title: 'Small Portfolios',
      description: 'Automate admin without hiring a team',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-6">
            Who is ProptyOS For?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Real Estate Companies */}
          <Card className="bg-gradient-to-br from-indigo-50/50 to-indigo-100/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden dark:bg-gray-900 dark:border-gray-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent mb-8 text-center">
                For Real Estate Companies
              </h3>
              <div className="space-y-6">
                {realEstateFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/60 rounded-2xl border border-indigo-100/50 hover:bg-white/80 transition-colors duration-300">
                    <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* For Landlords */}
          <Card className="bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden dark:bg-gray-900 dark:border-gray-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent mb-8 text-center">
                For Landlords
              </h3>
              <div className="space-y-6">
                {landlordFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/60 rounded-2xl border border-emerald-100/50 hover:bg-white/80 transition-colors duration-300">
                    <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
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
