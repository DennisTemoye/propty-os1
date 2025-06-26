
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
  Calculator,
  Clock,
  CheckCircle
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
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const mockKPIData = [
  {
    title: 'Total Sales Recorded',
    value: '234',
    subtitle: 'All time',
    icon: DollarSign,
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    change: '+18%',
    changeType: 'positive'
  },
  {
    title: 'Units Allocated',
    value: '156',
    subtitle: 'Active allocations',
    icon: Building,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    change: '+12%',
    changeType: 'positive'
  },
  {
    title: 'Pending Allocations',
    value: '23',
    subtitle: 'Awaiting assignment',
    icon: Clock,
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    change: '+5%',
    changeType: 'positive'
  },
  {
    title: 'Completed This Month',
    value: '45',
    subtitle: 'Sales + Allocations',
    icon: CheckCircle,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    change: '+15%',
    changeType: 'positive'
  }
];

const salesAllocationTrends = [
  { month: 'Jan', sales: 18, allocations: 12, pending: 6 },
  { month: 'Feb', sales: 22, allocations: 18, pending: 4 },
  { month: 'Mar', sales: 28, allocations: 22, pending: 6 },
  { month: 'Apr', sales: 35, allocations: 28, pending: 7 },
  { month: 'May', sales: 42, allocations: 35, pending: 7 },
  { month: 'Jun', sales: 48, allocations: 40, pending: 8 }
];

const salesTypeData = [
  { name: 'Presale', value: 78, color: '#3B82F6' },
  { name: 'With Allocation', value: 156, color: '#10B981' }
];

const projectPerformance = [
  { project: 'Victoria Gardens', sales: 45, allocations: 38, pending: 7 },
  { project: 'Emerald Heights', sales: 32, allocations: 28, pending: 4 },
  { project: 'Golden View', sales: 28, allocations: 25, pending: 3 },
  { project: 'Ocean Breeze', sales: 25, allocations: 20, pending: 5 },
  { project: 'Royal Estate', sales: 20, allocations: 18, pending: 2 }
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
              <AreaChart data={salesAllocationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="allocations" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="pending" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-green-600" />
              <span>Sales Type Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {salesTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-purple-600" />
            <span>Project Performance Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectPerformance.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium">{project.project}</div>
                    <div className="text-sm text-gray-600">
                      {project.allocations} allocated of {project.sales} sales
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{project.sales}</div>
                    <div className="text-xs text-gray-500">Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{project.allocations}</div>
                    <div className="text-xs text-gray-500">Allocated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{project.pending}</div>
                    <div className="text-xs text-gray-500">Pending</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-medium">Presale Recorded</div>
                <div className="text-sm text-gray-600">Victoria Gardens - Client: John Doe</div>
              </div>
              <Badge className="bg-green-100 text-green-800">Presale</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-medium">Unit Allocated</div>
                <div className="text-sm text-gray-600">Block A - Plot 15 to Sarah Johnson</div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Allocated</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <div className="font-medium">Pending Allocation</div>
                <div className="text-sm text-gray-600">Golden View - Client: Robert Brown</div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
