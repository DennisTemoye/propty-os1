import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "₦20,000",
      period: "/month",
      description: "Perfect for small real estate companies",
      features: [
        "Up to 2 projects",
        "Up to 50 units",
        "Project dashboard",
        "KYC onboarding",
        "Document uploads",
        "Basic reporting",
        "Email support"
      ],
      isPopular: false
    },
    {
      name: "Pro",
      price: "₦50,000",
      period: "/month",
      description: "Complete solution for growing companies",
      features: [
        "Up to 200 projects",
        "Up to 5,000 units",
        "Full suite including CRM",
        "Unit allocation & mapping",
        "Virtual payment accounts",
        "Team management",
        "Advanced analytics",
        "WhatsApp integration",
        "Priority support"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Pricing",
      description: "Whitelabel solution for large organizations",
      features: [
        "Unlimited projects & units",
        "Whitelabel solution",
        "Custom branding",
        "Custom APIs",
        "Super Admin tools",
        "Custom dashboards",
        "Dedicated support",
        "On-premise option"
      ],
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Flexible Pricing for Real Estate Companies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs, whether you're developing properties, selling land, or managing real estate sales teams across Africa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 p-8 transition-all duration-300 ${
                plan.isPopular
                  ? 'border-purple-600 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-purple-200 hover:shadow-md'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
