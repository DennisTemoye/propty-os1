
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';

export function Commissions() {
  const kpiData = [
    {
      title: 'Pending',
      value: '₦12.5M',
      subtitle: 'Awaiting approval',
      icon: Clock,
      gradient: 'bg-gradient-to-tr from-orange-400 to-amber-300',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Paid This Month',
      value: '₦45.2M',
      subtitle: 'Successfully processed',
      icon: CheckCircle,
      gradient: 'bg-gradient-to-tr from-green-400 to-teal-300',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Approved',
      value: '₦8.7M',
      subtitle: 'Ready for payment',
      icon: TrendingUp,
      gradient: 'bg-gradient-to-tr from-blue-500 to-indigo-400',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Total Paid',
      value: '₦156.8M',
      subtitle: 'All time commissions',
      icon: DollarSign,
      gradient: 'bg-gradient-to-tr from-purple-500 to-pink-400',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Commissions</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Export CSV</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Process Payments</Button>
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
            gradient={kpi.gradient}
            iconBg={kpi.iconBg}
            iconColor={kpi.iconColor}
          />
        ))}
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Commission Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Commission tracking and payment management system.</p>
        </CardContent>
      </Card>
    </div>
  );
}
