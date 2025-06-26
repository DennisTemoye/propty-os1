
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  DollarSign, 
  ArrowRight, 
  Ban,
  TrendingUp,
  Users,
  Clock
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

const kpiData = [
  {
    title: 'Total Sales',
    value: '89',
    subtitle: 'This month',
    icon: DollarSign,
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    change: '+15%',
    changeType: 'positive'
  },
  {
    title: 'Active Allocations',
    value: '67',
    subtitle: 'Currently allocated',
    icon: Building,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    change: '+8%',
    changeType: 'positive'
  },
  {
    title: 'Reallocations',
    value: '12',
    subtitle: 'This month',
    icon: ArrowRight,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    change: '+3%',
    changeType: 'positive'
  },
  {
    title: 'Pending Approvals',
    value: '5',
    subtitle: 'Awaiting approval',
    icon: Clock,
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    change: '-2',
    changeType: 'negative'
  }
];

const salesTrends = [
  { month: 'Jan', sales: 28, allocations: 22, reallocations: 2 },
  { month: 'Feb', sales: 32, allocations: 28, reallocations: 3 },
  { month: 'Mar', sales: 45, allocations: 38, reallocations: 4 },
  { month: 'Apr', sales: 38, allocations: 35, reallocations: 2 },
  { month: 'May', sales: 52, allocations: 45, reallocations: 5 },
  { month: 'Jun', sales: 48, allocations: 42, reallocations: 3 }
];

const projectPerformance = [
  { project: 'Victoria Gardens', sales: 28, revenue: 840000000 },
  { project: 'Emerald Heights', sales: 22, revenue: 660000000 },
  { project: 'Golden View', sales: 18, revenue: 540000000 },
  { project: 'Ocean Breeze', sales: 15, revenue: 450000000 }
];

export function OverviewTab() {
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
        {kpiData.map((kpi, index) => (
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
                <Tooltip />
                <Area type="monotone" dataKey="sales" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="allocations" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="reallocations" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-green-600" />
              <span>Project Sales Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="project" type="category" width={120} />
                <Tooltip formatter={(value) => [value, 'Sales']} />
                <Bar dataKey="sales" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-600" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">Sale Recorded</div>
                  <div className="text-sm text-gray-600">Victoria Gardens - Block A Plot 15</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">₦25M</div>
                <div className="text-sm text-gray-500">2 hours ago</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Unit Allocated</div>
                  <div className="text-sm text-gray-600">Emerald Heights - Block B Plot 22</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">John Doe</div>
                <div className="text-sm text-gray-500">5 hours ago</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ArrowRight className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium">Unit Reallocated</div>
                  <div className="text-sm text-gray-600">Golden View - Block C Plot 08</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-purple-600">Sarah Johnson</div>
                <div className="text-sm text-gray-500">1 day ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
