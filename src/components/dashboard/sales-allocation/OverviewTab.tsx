
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Handshake,
  TrendingUp,
  Building
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

const salesMetrics = [
  {
    title: 'Total Sales',
    value: '₦4.2B',
    subtitle: 'This year',
    icon: DollarSign,
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    change: '+18%',
    changeType: 'positive'
  },
  {
    title: 'Active Allocations',
    value: '156',
    subtitle: 'Current period',
    icon: Handshake,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    change: '+12%',
    changeType: 'positive'
  },
  {
    title: 'Sales Growth',
    value: '+24%',
    subtitle: 'Monthly growth',
    icon: TrendingUp,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    change: '+5%',
    changeType: 'positive'
  },
  {
    title: 'Available Units',
    value: '89',
    subtitle: 'Ready for allocation',
    icon: Building,
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    change: '-8',
    changeType: 'negative'
  }
];

const salesTrends = [
  { month: 'Jan', sales: 850000000, allocations: 12 },
  { month: 'Feb', sales: 920000000, allocations: 15 },
  { month: 'Mar', sales: 1100000000, allocations: 18 },
  { month: 'Apr', sales: 1250000000, allocations: 22 },
  { month: 'May', sales: 1180000000, allocations: 19 },
  { month: 'Jun', sales: 1350000000, allocations: 25 }
];

const projectPerformance = [
  { project: 'Victoria Gardens', sales: 28, revenue: 1200000000 },
  { project: 'Emerald Heights', sales: 22, revenue: 980000000 },
  { project: 'Golden View', sales: 18, revenue: 750000000 },
  { project: 'Ocean Breeze', sales: 15, revenue: 620000000 }
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
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {metric.title}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-xs text-gray-500 mb-2">{metric.subtitle}</div>
                  <Badge 
                    variant="outline" 
                    className={metric.changeType === 'positive' ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}
                  >
                    {metric.change} from last period
                  </Badge>
                </div>
                <div className={`p-3 rounded-xl ${metric.bgColor} shadow-sm`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
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
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Sales & Allocation Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'sales' ? formatCurrency(Number(value)) : value,
                    name === 'sales' ? 'Sales' : 'Allocations'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-blue-600" />
              <span>Project Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="project" />
                <YAxis />
                <Tooltip formatter={(value) => [value, 'Sales Count']} />
                <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Project */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Revenue Performance by Project</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectPerformance.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium">{project.project}</div>
                    <div className="text-sm text-gray-600">{project.sales} units sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{formatCurrency(project.revenue)}</div>
                  <div className="text-sm text-gray-500">Total Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
