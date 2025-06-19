
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Layout, Shield, Users } from 'lucide-react';

const WhyProptyOSSection = () => {
  const features = [
    {
      icon: Globe,
      title: 'Built for Africa',
      description: 'Works online & offline with features designed specifically for African real estate markets and business practices.',
      bgColor: 'from-emerald-50/50 to-emerald-100/30',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700'
    },
    {
      icon: Layout,
      title: 'All-in-One Dashboard',
      description: 'Manage rent, sales, documents, CRM, and more from a single, intuitive dashboard that scales with your business.',
      bgColor: 'from-sky-50/50 to-sky-100/30',
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-700'
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Assign roles and control access for team members, agents, and staff with granular permission settings.',
      bgColor: 'from-purple-50/50 to-purple-100/30',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-700'
    },
    {
      icon: Shield,
      title: 'Secure & Scalable',
      description: 'Bank-level encryption, cloud hosting, virtual accounts, and infrastructure that grows with your portfolio.',
      bgColor: 'from-amber-50/50 to-amber-100/30',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700'
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-6">
            Why Choose ProptyOS?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Built specifically for African real estate markets with features that address unique local challenges and opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`bg-gradient-to-br ${feature.bgColor} border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-3xl overflow-hidden group dark:bg-gray-800`}>
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyProptyOSSection;
