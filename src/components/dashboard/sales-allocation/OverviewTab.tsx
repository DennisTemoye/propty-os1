
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  DollarSign, 
  ArrowRight, 
  Ban,
  TrendingUp,
  Users,
  Calculator,
  Clock,
  Target,
  FileText
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
  onOpenAllocation: (mode: 'new' | 'reallocate' | 'revoke', allocation?: any) => void;
}

const mockKPIData = [
  {
    title: 'Total Sales Recorded',
    value: '₦4.2B',
    subtitle: 'This year',
    icon: DollarSign,
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    change: '+15%',
    changeType: 'positive'
  },
  {
    title: 'Units Allocated',
    value: '145',
    subtitle: 'Active allocations',
    icon: Building,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    change: '+8%',
    changeType: 'positive'
  },
  {
    title: 'Pending Allocations',
    value: '8',
    subtitle: 'Awaiting processing',
    icon: Clock,
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    change: '+3%',
    changeType: 'positive'
  },
  {
    title: 'Pre-Sales',
    value: '23',
    subtitle: 'Future allocations',
    icon: Target,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    change: '+12%',
    changeType: 'positive'
  }
];

const salesTrends = [
  { month: 'Jan', sales: 180000000, allocations: 12, presales: 8 },
  { month: 'Feb', sales: 220000000, allocations: 15, presales: 12 },
  { month: 'Mar', sales: 280000000, allocations: 18, presales: 15 },
  { month: 'Apr', sales: 350000000, allocations: 22, presales: 18 },
  { month: 'May', sales: 420000000, allocations: 25, presales: 20 },
  { month: 'Jun', sales: 480000000, allocations: 28, presales: 23 }
];

const projectPerformance = [
  { project: 'Victoria Gardens', sales: 1200000000, allocated: 45, pending: 3 },
  { project: 'Emerald Heights', sales: 960000000, allocated: 32, pending: 2 },
  { project: 'Golden View', sales: 840000000, allocated: 28, pending: 1 },
  { project: 'Ocean Breeze', sales: 750000000, allocated: 25, pending: 2 },
  { project: 'Royal Estate', sales: 600000000, allocated: 15, pending: 0 }
];

const recentActivities = [
  { type: 'sale', message: 'New sale recorded for Victoria Gardens - ₦25M', time: '2 hours ago', status: 'completed' },
  { type: 'allocation', message: 'Unit B-12 allocated to Sarah Johnson', time: '4 hours ago', status: 'completed' },
  { type: 'pending', message: '3 sales awaiting allocation approval', time: '6 hours ago', status: 'pending' },
  { type: 'reallocation', message: 'Unit A-08 reallocated from John to Mike', time: '1 day ago', status: 'completed' }
];

export function OverviewTab({ onOpenAllocation }: OverviewTabProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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
                    className={kpi.changeType === 'positive' ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}
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
        {/* Sales & Allocation Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Sales & Allocation Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'sales' ? formatCurrency(Number(value)) : value,
                  name === 'sales' ? 'Sales' : name === 'allocations' ? 'Allocations' : 'Pre-sales'
                ]} />
                <Area type="monotone" dataKey="allocations" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="presales" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-green-600" />
              <span>Project Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="project" type="category" width={100} />
                <Tooltip formatter={(value) => [value, 'Units Allocated']} />
                <Bar dataKey="allocated" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'sale' ? 'bg-green-100' :
                    activity.type === 'allocation' ? 'bg-blue-100' :
                    activity.type === 'pending' ? 'bg-orange-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'sale' && <DollarSign className="h-4 w-4 text-green-600" />}
                    {activity.type === 'allocation' && <Building className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'pending' && <Clock className="h-4 w-4 text-orange-600" />}
                    {activity.type === 'reallocation' && <ArrowRight className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.message}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                  <Badge className={
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Allocation Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => onOpenAllocation('new')}
            >
              <Building className="h-4 w-4 mr-2" />
              Process New Allocation
            </Button>
            
            <Button 
              variant="outline"
              className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
              onClick={() => onOpenAllocation('reallocate')}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Reallocate Unit
            </Button>
            
            <Button 
              variant="outline"
              className="w-full border-red-200 text-red-700 hover:bg-red-50"
              onClick={() => onOpenAllocation('revoke')}
            >
              <Ban className="h-4 w-4 mr-2" />
              Revoke Allocation
            </Button>

            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600 mb-2">Pending Actions</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Sales awaiting allocation</span>
                  <Badge className="bg-orange-100 text-orange-800">8</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Approval pending</span>
                  <Badge className="bg-yellow-100 text-yellow-800">3</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
