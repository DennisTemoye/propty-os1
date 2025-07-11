import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Building2, 
  DollarSign, 
  Calendar,
  Download,
  RefreshCw,
  PieChart,
  LineChart,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const platformMetrics = {
  totalProjects: { value: 1247, change: 12.5, trend: 'up' },
  totalAllocations: { value: 3456, change: 8.2, trend: 'up' },
  activeUsers: { value: 892, change: -2.3, trend: 'down' },
  totalRevenue: { value: 45600000, change: 15.7, trend: 'up' }
};

const featureAdoption = [
  { feature: 'Projects & Units', adoption: 89, companies: 156, trend: 'up' },
  { feature: 'Client Management', adoption: 76, companies: 142, trend: 'up' },
  { feature: 'Sales Allocation', adoption: 65, companies: 98, trend: 'up' },
  { feature: 'CRM Pipelines', adoption: 45, companies: 67, trend: 'up' },
  { feature: 'Document Manager', adoption: 38, companies: 56, trend: 'down' },
  { feature: 'Calendar Scheduling', adoption: 32, companies: 48, trend: 'up' },
  { feature: 'Notice System', adoption: 28, companies: 42, trend: 'down' },
  { feature: 'Referral Program', adoption: 22, companies: 33, trend: 'up' }
];

const planDistribution = [
  { plan: 'Enterprise', count: 8, revenue: 6800000, percentage: 3.2 },
  { plan: 'Pro', count: 28, revenue: 4200000, percentage: 11.3 },
  { plan: 'Starter', count: 45, revenue: 2800000, percentage: 18.1 },
  { plan: 'Trial', count: 12, revenue: 0, percentage: 4.8 }
];

const monthlyGrowth = [
  { month: 'Jan', companies: 205, revenue: 38500000, users: 756 },
  { month: 'Feb', companies: 218, revenue: 41200000, users: 798 },
  { month: 'Mar', companies: 231, revenue: 43800000, users: 834 },
  { month: 'Apr', companies: 247, revenue: 45600000, users: 892 }
];

export function ReportsAnalyticsTab() {
  const [timeRange, setTimeRange] = useState('30d');
  const [reportType, setReportType] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <ArrowUpRight className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-600" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Platform Reports & Analytics</h3>
          <p className="text-slate-600">Comprehensive platform usage and performance analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Platform KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold">{formatNumber(platformMetrics.totalProjects.value)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(platformMetrics.totalProjects.trend)}
                  <span className={`text-sm ${getTrendColor(platformMetrics.totalProjects.trend)}`}>
                    {Math.abs(platformMetrics.totalProjects.change)}%
                  </span>
                </div>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Allocations</p>
                <p className="text-2xl font-bold">{formatNumber(platformMetrics.totalAllocations.value)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(platformMetrics.totalAllocations.trend)}
                  <span className={`text-sm ${getTrendColor(platformMetrics.totalAllocations.trend)}`}>
                    {Math.abs(platformMetrics.totalAllocations.change)}%
                  </span>
                </div>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{formatNumber(platformMetrics.activeUsers.value)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(platformMetrics.activeUsers.trend)}
                  <span className={`text-sm ${getTrendColor(platformMetrics.activeUsers.trend)}`}>
                    {Math.abs(platformMetrics.activeUsers.change)}%
                  </span>
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(platformMetrics.totalRevenue.value)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(platformMetrics.totalRevenue.trend)}
                  <span className={`text-sm ${getTrendColor(platformMetrics.totalRevenue.trend)}`}>
                    {Math.abs(platformMetrics.totalRevenue.change)}%
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Adoption */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Feature Adoption Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featureAdoption.map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{feature.feature}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{feature.adoption}%</span>
                        {getTrendIcon(feature.trend)}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${feature.adoption}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {feature.companies} companies using
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Subscription Plan Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {planDistribution.map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${
                      plan.plan === 'Enterprise' ? 'bg-purple-600' :
                      plan.plan === 'Pro' ? 'bg-blue-600' :
                      plan.plan === 'Starter' ? 'bg-green-600' : 'bg-gray-600'
                    }`} />
                    <div>
                      <div className="font-medium">{plan.plan}</div>
                      <div className="text-sm text-gray-500">{plan.count} companies</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(plan.revenue)}</div>
                    <div className="text-sm text-gray-500">{plan.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Platform Growth Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {monthlyGrowth.map((month, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-600 mb-2">{month.month} 2024</div>
                <div className="space-y-2">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{month.companies}</div>
                    <div className="text-xs text-gray-500">Companies</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{formatCurrency(month.revenue)}</div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{month.users}</div>
                    <div className="text-xs text-gray-500">Users</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Report Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="font-medium mb-1">Revenue Report</div>
            <div className="text-sm text-gray-500">Detailed revenue breakdown by company and plan</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="font-medium mb-1">Usage Analytics</div>
            <div className="text-sm text-gray-500">Feature usage and adoption analytics</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="font-medium mb-1">Growth Analysis</div>
            <div className="text-sm text-gray-500">Platform growth and trend analysis</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}