
import React from 'react';
import { Building, Users, DollarSign, FileText, MapPin, Calculator, CheckCircle, Calendar } from 'lucide-react';
import { KPIOverviewCard } from './KPIOverviewCard';

export function DashboardKPISection() {
  const kpiData = [
    {
      title: 'Total Projects',
      value: '24',
      subtitle: '3 New This Quarter',
      icon: Building,
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-cyan-400',
      linkTo: '/company/developments',
    },
    {
      title: 'Active Clients',
      value: '1,247',
      subtitle: '89 New This Month',
      icon: Users,
      gradientFrom: 'from-emerald-500',
      gradientTo: 'to-teal-400',
      linkTo: '/company/clients',
    },
    {
      title: 'Total Sales Revenue',
      value: '₦2.4B',
      subtitle: '156 Units Sold',
      icon: DollarSign,
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-pink-400',
      linkTo: '/company/accounting',
    },
    {
      title: 'Pending Allocations',
      value: '23',
      subtitle: 'Awaiting Processing',
      icon: FileText,
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-amber-400',
      linkTo: '/company/sales',
    },
    {
      title: 'Available Units',
      value: '187',
      subtitle: 'Ready for Allocation',
      icon: MapPin,
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-purple-400',
      linkTo: '/company/developments',
    },
    {
      title: 'Installment Collections',
      value: '₦450M',
      subtitle: '92% Collection Rate',
      icon: Calculator,
      gradientFrom: 'from-green-500',
      gradientTo: 'to-emerald-400',
      linkTo: '/company/accounting',
    },
    {
      title: 'Completed Deals',
      value: '89',
      subtitle: 'This Quarter',
      icon: CheckCircle,
      gradientFrom: 'from-teal-500',
      gradientTo: 'to-cyan-400',
      linkTo: '/company/sales',
    },
    {
      title: 'Scheduled Inspections',
      value: '34',
      subtitle: 'Next 7 Days',
      icon: Calendar,
      gradientFrom: 'from-rose-500',
      gradientTo: 'to-pink-400',
      linkTo: '/company/calendar',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <KPIOverviewCard
          key={index}
          title={kpi.title}
          value={kpi.value}
          subtitle={kpi.subtitle}
          icon={kpi.icon}
          gradientFrom={kpi.gradientFrom}
          gradientTo={kpi.gradientTo}
          linkTo={kpi.linkTo}
        />
      ))}
    </div>
  );
}
