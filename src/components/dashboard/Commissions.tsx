
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const kpiData = [
  {
    title: 'Pending',
    value: '₦12.5M',
    subtitle: 'Awaiting Approval',
    icon: Clock,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
    cardBg: 'bg-gradient-to-br from-amber-50 to-amber-100',
    border: 'border-amber-200',
    valueColor: 'text-amber-900',
  },
  {
    title: 'Paid This Month',
    value: '₦45.2M',
    subtitle: 'Successfully Processed',
    icon: CheckCircle,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    cardBg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    valueColor: 'text-emerald-900',
  },
  {
    title: 'Approved',
    value: '₦8.7M',
    subtitle: 'Ready for Payment',
    icon: TrendingUp,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-sky-500 to-sky-600',
    cardBg: 'bg-gradient-to-br from-sky-50 to-sky-100',
    border: 'border-sky-200',
    valueColor: 'text-sky-900',
  },
  {
    title: 'Total Paid',
    value: '₦156.8M',
    subtitle: 'All Time',
    icon: DollarSign,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    cardBg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    border: 'border-purple-200',
    valueColor: 'text-purple-900',
  },
];

export function Commissions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Commissions</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Export CSV</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Process Payments</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className={`${kpi.cardBg} ${kpi.border} border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {kpi.title}
                  </div>
                  <div className={`text-3xl font-bold ${kpi.valueColor} mb-1`}>{kpi.value}</div>
                  <div className="text-xs text-gray-600">{kpi.subtitle}</div>
                </div>
                <div className={`p-3 rounded-xl ${kpi.iconBg} shadow-lg`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
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
