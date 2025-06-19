
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Plus, TrendingUp, DollarSign } from 'lucide-react';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';

export function VendorsExpenses() {
  const kpiData = [
    {
      title: 'Total Vendors',
      value: '156',
      subtitle: 'All registered',
      icon: Truck,
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-blue-400',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Monthly Expenses',
      value: '₦12.8M',
      subtitle: 'Operational costs',
      icon: DollarSign,
      gradientFrom: 'from-rose-400',
      gradientTo: 'to-pink-300',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Pending Approval',
      value: '89',
      subtitle: 'Awaiting review',
      icon: TrendingUp,
      gradientFrom: 'from-orange-400',
      gradientTo: 'to-amber-300',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Active Vendors',
      value: '45',
      subtitle: 'Currently working',
      icon: Truck,
      gradientFrom: 'from-green-400',
      gradientTo: 'to-teal-300',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Vendors & Expenses</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Export Report</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <GradientKpiCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            subtitle={kpi.subtitle}
            icon={kpi.icon}
            gradientFrom={kpi.gradientFrom}
            gradientTo={kpi.gradientTo}
            iconBgColor={kpi.iconBgColor}
            iconColor={kpi.iconColor}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Manage vendors and track expenses by category.</p>
        </CardContent>
      </Card>
    </div>
  );
}
