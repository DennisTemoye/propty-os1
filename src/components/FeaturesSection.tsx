
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
  Tag 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Home,
      title: "Rent & Sales Management",
      description: "Complete property lifecycle management from listing to closing"
    },
    {
      icon: MapPin,
      title: "Unit Allocation & Plot Mapping",
      description: "Visual property mapping with GPS coordinates and detailed layouts"
    },
    {
      icon: CreditCard,
      title: "Virtual Payment Accounts",
      description: "Dedicated payment accounts for each property and tenant"
    },
    {
      icon: Users,
      title: "Buyer & Tenant Dashboards",
      description: "Self-service portals for customers to track their properties"
    },
    {
      icon: TrendingUp,
      title: "Agent CRM & Commission Tracker",
      description: "Manage sales teams and automatically calculate commissions"
    },
    {
      icon: Briefcase,
      title: "Staff/Vendor & Expense Management",
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
      title: "KYC Client Onboarding",
      description: "Streamlined know-your-customer verification process"
    },
    {
      icon: Map,
      title: "Google Maps + Geo-tagging",
      description: "Interactive maps with property locations and boundaries"
    },
    {
      icon: Tag,
      title: "Property Tagging System",
      description: "Advanced categorization and search capabilities"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive features designed to streamline every aspect of property and real estate management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
