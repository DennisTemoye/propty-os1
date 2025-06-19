
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Layout, Shield, Users } from 'lucide-react';

const WhyProptyOSSection = () => {
  const features = [
    {
      icon: Globe,
      title: 'Built for Africa',
      description: 'Works online & offline with features designed specifically for African real estate markets and business practices.'
    },
    {
      icon: Layout,
      title: 'All-in-One Dashboard',
      description: 'Manage rent, sales, documents, CRM, and more from a single, intuitive dashboard that scales with your business.'
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Assign roles and control access for team members, agents, and staff with granular permission settings.'
    },
    {
      icon: Shield,
      title: 'Secure & Scalable',
      description: 'Bank-level encryption, cloud hosting, virtual accounts, and infrastructure that grows with your portfolio.'
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose ProptyOS?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Built specifically for African real estate markets with features that address unique local challenges and opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
