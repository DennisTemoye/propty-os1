
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  DollarSign, 
  Users,
  Clock,
  TrendingUp,
  ArrowRight,
  Ban
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface OverviewTabProps {
  onAllocationFlow: (type: 'new' | 'reallocation' | 'revoke', allocation?: any) => void;
}

const mockKPIData = [
  {
    title: 'Total Sales Recorded',
    value: '156',
    subtitle: 'This year',
    icon: DollarSign,
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    change: '+12%',
    changeType: 'positive'
  },
  {
    title: 'Active Allocations',
    value: '89',
    subtitle: 'Currently allocated',
    icon: Building,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    change: '+8%',
    changeType: 'positive'
  },
  {
    title: 'Pending Allocations',
    value: '23',
    subtitle: 'Awaiting allocation',
    icon: Clock,
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    change: '+5%',
    changeType: 'positive'
  },
  {
    title: 'Total Revenue',
    value: '₦4.2B',
    subtitle: 'From all sales',
    icon: TrendingUp,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    change: '+15%',
    changeType: 'positive'
  }
];

const salesTrends = [
  { month: 'Jan', sales: 12, allocations: 8, pending: 4 },
  { month: 'Feb', sales: 15, allocations: 12, pending: 3 },
  { month: 'Mar', sales: 18, allocations: 15, pending: 3 },
  { month: 'Apr', sales: 22, allocations: 18, pending: 4 },
  { month: 'May', sales: 25, allocations: 20, pending: 5 },
  { month: 'Jun', sales: 28, allocations: 24, pending: 4 }
];

const projectSales = [
  { project: 'Victoria Gardens', sales: 45, allocated: 42, pending: 3 },
  { project: 'Emerald Heights', sales: 32, allocated: 28, pending: 4 },
  { project: 'Golden View', sales: 28, allocated: 25, pending: 3 },
  { project: 'Ocean Breeze', sales: 25, allocated: 20, pending: 5 }
];

export function OverviewTab({ onAllocationFlow }: OverviewTabProps) {
  const recentActivity = [
    { id: 1, type: 'sale', description: 'New sale recorded - John Doe', project: 'Victoria Gardens', time: '2 hours ago' },
    { id: 2, type: 'allocation', description: 'Unit allocated - Block A-15', client: 'Sarah Johnson', time: '4 hours ago' },
    { id: 3, type: 'pending', description: 'Allocation pending approval', client: 'Mike Brown', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockKPIData.map((kpi, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {kpi.title}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                  <div className="text-xs text-gray-500 mb-2">{kpi.subtitle}</div>
                  <Badge 
                    variant="outline" 
                    className="text-green-600 border-green-200"
                  >
                    {kpi.change} from last period
                  </Badge>
                </div>
                <div className={`p-3 rounded-xl ${kpi.bgColor} shadow-sm`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales vs Allocation Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Sales vs Allocation Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="allocations" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="pending" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-green-600" />
              <span>Project Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectSales} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="project" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="sales" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{activity.description}</div>
                    <div className="text-sm text-gray-600">
                      {activity.project && `Project: ${activity.project}`}
                      {activity.client && `Client: ${activity.client}`}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Allocation Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => onAllocationFlow('new')}
            >
              <Users className="h-4 w-4 mr-2" />
              New Allocation
            </Button>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => onAllocationFlow('reallocation')}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Reallocation
            </Button>
            <Button 
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => onAllocationFlow('revoke')}
            >
              <Ban className="h-4 w-4 mr-2" />
              Revoke Allocation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
