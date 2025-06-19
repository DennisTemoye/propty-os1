
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StaffList } from './staff/StaffList';
import { PayrollManagement } from './staff/PayrollManagement';
import { UserCog, Plus, Users, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';

export function StaffPayroll() {
  const kpiData = [
    {
      title: 'Total Staff',
      value: '24',
      subtitle: 'All employees',
      icon: Users,
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-blue-400',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Monthly Payroll',
      value: '₦8.5M',
      subtitle: 'Current expenses',
      icon: DollarSign,
      gradientFrom: 'from-green-400',
      gradientTo: 'to-teal-300',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Pending Payments',
      value: '6',
      subtitle: 'Awaiting processing',
      icon: UserCog,
      gradientFrom: 'from-orange-400',
      gradientTo: 'to-amber-300',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Full-time',
      value: '18',
      subtitle: 'Active employees',
      icon: Users,
      gradientFrom: 'from-indigo-400',
      gradientTo: 'to-pink-300',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Staff & Payroll</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Export Payroll</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
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

      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList>
          <TabsTrigger value="staff">Staff Management</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>

        <TabsContent value="staff">
          <StaffList />
        </TabsContent>

        <TabsContent value="payroll">
          <PayrollManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
