
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Layout, Shield, TrendingUp } from 'lucide-react';

const WhyProptyOSSection = () => {
  const features = [
    {
      icon: Globe,
      title: 'Built for Africa',
      description: 'Works online & offline with features designed specifically for African real estate markets and business practices.',
    },
    {
      icon: Layout,
      title: 'All-in-One Project Manager',
      description: 'Manage projects, sales, documents, CRM, and payments from a single, intuitive dashboard that scales with your business.',
    },
    {
      icon: TrendingUp,
      title: 'Complete Sales Pipeline',
      description: 'From lead generation to commission tracking, manage your entire sales process with automated workflows.',
    },
    {
      icon: Shield,
      title: 'Secure & Scalable',
      description: 'Bank-level encryption, cloud hosting, virtual accounts, and infrastructure that grows with your portfolio.',
    },
  ];

  const gradients = ['bg-gradient-blue', 'bg-gradient-emerald', 'bg-gradient-orange', 'bg-gradient-pink'];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-primary rounded-full text-white font-medium mb-6 shadow-lg">
            🌍 Built for Africa
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose ProptyOS?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built specifically for African real estate markets with features that address unique local challenges and opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm hover:border-primary/30 group">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${gradients[index]} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
