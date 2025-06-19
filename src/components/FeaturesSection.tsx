
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
      description: "Complete property lifecycle management from listing to closing",
      bgColor: "from-emerald-50/50 to-emerald-100/30",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700"
    },
    {
      icon: MapPin,
      title: "Unit Allocation & Plot Mapping",
      description: "Visual property mapping with GPS coordinates and detailed layouts",
      bgColor: "from-sky-50/50 to-sky-100/30",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-700"
    },
    {
      icon: CreditCard,
      title: "Virtual Payment Accounts",
      description: "Dedicated payment accounts for each property and tenant",
      bgColor: "from-purple-50/50 to-purple-100/30",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700"
    },
    {
      icon: Users,
      title: "Buyer & Tenant Dashboards",
      description: "Self-service portals for customers to track their properties",
      bgColor: "from-amber-50/50 to-amber-100/30",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700"
    },
    {
      icon: TrendingUp,
      title: "Agent CRM & Commission Tracker",
      description: "Manage sales teams and automatically calculate commissions",
      bgColor: "from-indigo-50/50 to-indigo-100/30",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-700"
    },
    {
      icon: Briefcase,
      title: "Staff/Vendor & Expense Management",
      description: "Track expenses, manage vendors, and handle payroll",
      bgColor: "from-teal-50/50 to-teal-100/30",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-700"
    },
    {
      icon: FileText,
      title: "Document Generator + Digital Signature",
      description: "Create contracts, agreements, and collect digital signatures",
      bgColor: "from-rose-50/50 to-rose-100/30",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-700"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp + SMS Integration",
      description: "Automated notifications and communication with clients",
      bgColor: "from-emerald-50/50 to-emerald-100/30",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700"
    },
    {
      icon: Shield,
      title: "Secure Document Storage",
      description: "Encrypted cloud storage for all property documents",
      bgColor: "from-sky-50/50 to-sky-100/30",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-700"
    },
    {
      icon: UserCheck,
      title: "KYC Client Onboarding",
      description: "Streamlined know-your-customer verification process",
      bgColor: "from-purple-50/50 to-purple-100/30",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700"
    },
    {
      icon: Map,
      title: "Google Maps + Geo-tagging",
      description: "Interactive maps with property locations and boundaries",
      bgColor: "from-amber-50/50 to-amber-100/30",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700"
    },
    {
      icon: Tag,
      title: "Property Tagging System",
      description: "Advanced categorization and search capabilities",
      bgColor: "from-indigo-50/50 to-indigo-100/30",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-700"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-6">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive features designed to streamline every aspect of property and real estate management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.bgColor} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 group`}
              >
                <div className={`w-14 h-14 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
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
