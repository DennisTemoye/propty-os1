
import React from 'react';
import { 
  Home, 
  MapPin, 
  CreditCard, 
  Users, 
  TrendingUp, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Shield, 
  UserCheck, 
  Map, 
  Calculator 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Home,
      title: "Project & Unit Management",
      description: "Complete property development lifecycle from planning to delivery"
    },
    {
      icon: MapPin,
      title: "Unit Allocation & Plot Mapping",
      description: "Visual property mapping with GPS coordinates and detailed layouts"
    },
    {
      icon: CreditCard,
      title: "Instalment Payment Tracking",
      description: "Milestone-based payment tracking with automated receipt generation"
    },
    {
      icon: Users,
      title: "Client KYC & Onboarding",
      description: "Streamlined customer verification and document management"
    },
    {
      icon: TrendingUp,
      title: "Marketer CRM & Commission Tracking",
      description: "Manage sales teams and automatically calculate commissions"
    },
    {
      icon: Briefcase,
      title: "Staff Management & Expense Tracking",
      description: "Track expenses, manage vendors, and handle payroll"
    },
    {
      icon: FileText,
      title: "Document Generator + Digital Signature",
      description: "Create contracts, agreements, and collect digital signatures"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp + SMS Integration",
      description: "Automated notifications and communication with clients"
    },
    {
      icon: Shield,
      title: "Secure Document Storage",
      description: "Encrypted cloud storage for all property documents"
    },
    {
      icon: UserCheck,
      title: "Role-Based Access Control",
      description: "Granular permissions for team members and stakeholders"
    },
    {
      icon: Map,
      title: "Google Maps + Geo-tagging",
      description: "Interactive maps with property locations and boundaries"
    },
    {
      icon: Calculator,
      title: "Financial Reports & Analytics",
      description: "Comprehensive reporting for sales, expenses, and performance"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Features Overview
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to manage real estate projects, sales, and client relationships in one powerful platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
