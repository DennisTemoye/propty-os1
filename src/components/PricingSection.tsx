
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Users, Zap, Crown } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "₦15,000",
      period: "/user/month",
      originalPrice: "₦20,000",
      description: "Perfect for small teams getting started",
      icon: Users,
      users: "Up to 5 users",
      features: [
        "Up to 3 projects",
        "Up to 100 units",
        "Basic project dashboard",
        "Client management",
        "Document storage (5GB)",
        "Email support",
        "Mobile app access",
        "Basic reporting"
      ],
      isPopular: false,
      savings: "Save 25%"
    },
    {
      name: "Professional",
      price: "₦35,000",
      period: "/user/month",
      originalPrice: "₦45,000",
      description: "Complete solution for growing teams",
      icon: Zap,
      users: "Up to 25 users",
      features: [
        "Unlimited projects & units",
        "Advanced CRM & pipelines",
        "Sales allocation & mapping",
        "Team role management",
        "Document storage (50GB)",
        "WhatsApp integration",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Commission tracking"
      ],
      isPopular: true,
      savings: "Save 22%"
    },
    {
      name: "Enterprise",
      price: "₦75,000",
      period: "/user/month",
      originalPrice: "Custom",
      description: "White-label solution for large organizations",
      icon: Crown,
      users: "Unlimited users",
      features: [
        "Everything in Professional",
        "White-label solution",
        "Custom branding & domains",
        "Advanced API & webhooks",
        "Dedicated account manager",
        "Custom integrations",
        "On-premise deployment",
        "24/7 phone support",
        "Custom training",
        "SLA guarantees"
      ],
      isPopular: false,
      savings: "Custom pricing"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
            💰 Transparent Per-User Pricing
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Simple, Scalable Pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Pay only for what you use. Scale your team up or down anytime. All plans include our core real estate management features with no hidden fees.
          </p>
          <div className="inline-flex items-center justify-center bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-3 rounded-full font-medium">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            Annual billing saves up to 25% • 14-day free trial for all plans
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative rounded-3xl border-2 p-8 transition-all duration-500 hover:shadow-2xl ${
                  plan.isPopular
                    ? 'border-purple-500 shadow-xl scale-105 bg-gradient-to-br from-white to-purple-50/50'
                    : 'border-slate-200 hover:border-purple-300 bg-white/80 backdrop-blur-sm hover:scale-105'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                {plan.savings && !plan.isPopular && (
                  <div className="absolute -top-3 -right-3">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {plan.savings}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {plan.originalPrice !== plan.price && plan.originalPrice !== "Custom" && (
                        <span className="text-lg text-slate-400 line-through">{plan.originalPrice}</span>
                      )}
                      <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    </div>
                    <span className="text-slate-600 font-medium">{plan.period}</span>
                  </div>

                  <div className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    <Users className="w-4 h-4 mr-1" />
                    {plan.users}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-transparent hover:border-purple-300'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </Button>

                <p className="text-center text-sm text-slate-500 mt-4">
                  {plan.name === 'Enterprise' ? 'Custom onboarding included' : 'No credit card required'}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional pricing info */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">All plans include:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-700">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-emerald-500 mr-2" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-emerald-500 mr-2" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-emerald-500 mr-2" />
                <span>Data migration help</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-emerald-500 mr-2" />
                <span>Mobile & web access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
