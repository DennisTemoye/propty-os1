
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
  FileText,
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
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const mockKPIData = [
  {
    title: 'Total Sales Recorded',
    value: '284',
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
    subtitle: 'Awaiting allocation',
    icon: Clock,
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    change: '+5%',
    changeType: 'positive'
  },
  {
    title: 'Pre-Sales',
    value: '105',
    subtitle: 'Before allocation',
    icon: FileText,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    change: '+25%',
    changeType: 'positive'
  }
];

const salesTrends = [
  { month: 'Jan', preSales: 12, withAllocation: 8, totalRevenue: 450000000 },
  { month: 'Feb', preSales: 15, withAllocation: 12, totalRevenue: 680000000 },
  { month: 'Mar', preSales: 18, withAllocation: 15, totalRevenue: 820000000 },
  { month: 'Apr', preSales: 22, withAllocation: 18, totalRevenue: 950000000 },
  { month: 'May', preSales: 25, withAllocation: 20, totalRevenue: 1100000000 },
  { month: 'Jun', preSales: 28, withAllocation: 24, totalRevenue: 1350000000 }
];

const allocationStatus = [
  { name: 'Allocated', value: 156, color: '#10B981' },
  { name: 'Pending', value: 23, color: '#F59E0B' },
  { name: 'Pre-Sales', value: 105, color: '#8B5CF6' }
];

const salesByProject = [
  { project: 'Victoria Gardens', preSales: 45, allocated: 32, revenue: 1200000000 },
  { project: 'Emerald Heights', preSales: 32, allocated: 28, revenue: 960000000 },
  { project: 'Golden View', preSales: 28, allocated: 25, revenue: 840000000 },
  { project: 'Ocean Breeze', preSales: 25, allocated: 20, revenue: 750000000 }
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
        {/* Sales Trends Chart */}
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
                <Tooltip />
                <Area type="monotone" dataKey="preSales" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="withAllocation" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Allocation Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-blue-600" />
              <span>Allocation Status Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={allocationStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {allocationStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales by Project */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-green-600" />
            <span>Sales Performance by Project</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByProject}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="project" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="preSales" fill="#8B5CF6" name="Pre-Sales" />
              <Bar dataKey="allocated" fill="#10B981" name="With Allocation" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Revenue Performance by Project</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesByProject.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium">{project.project}</div>
                    <div className="text-sm text-gray-600">
                      {project.preSales} pre-sales • {project.allocated} allocated
                    </div>
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
