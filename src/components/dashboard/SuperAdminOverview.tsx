
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  Settings,
  FileText,
  HelpCircle,
  Shield,
  Server,
  Database,
  Globe,
  BarChart3,
  Calendar,
  UserCheck
} from 'lucide-react';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';

const platformKPIs = [
  {
    title: 'Total Companies',
    value: '247',
    subtitle: '+12 this month',
    icon: Building2,
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-blue-800',
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Active Companies',
    value: '189',
    subtitle: '76% of total',
    icon: UserCheck,
    gradientFrom: 'from-green-600',
    gradientTo: 'to-green-800',
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'Monthly Revenue',
    value: '₦15.2M',
    subtitle: '+24% vs last month',
    icon: DollarSign,
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-purple-800',
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    title: 'New Signups',
    value: '34',
    subtitle: 'Last 30 days',
    icon: TrendingUp,
    gradientFrom: 'from-orange-600',
    gradientTo: 'to-orange-800',
    iconBgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  }
];

const revenueByPlan = [
  { plan: 'Enterprise', revenue: 6800000, companies: 8, color: 'bg-purple-500' },
  { plan: 'Growth', revenue: 4200000, companies: 28, color: 'bg-blue-500' },
  { plan: 'Starter', revenue: 2800000, companies: 45, color: 'bg-green-500' },
  { plan: 'Trial', revenue: 0, companies: 12, color: 'bg-gray-400' }
];

const quickActions = [
  {
    title: 'Manage Companies',
    description: 'View and manage all registered companies',
    icon: Building2,
    color: 'bg-blue-600 hover:bg-blue-700',
    href: '/superadmin/companies'
  },
  {
    title: 'Billing & Plans',
    description: 'Manage subscriptions and pricing',
    icon: DollarSign,
    color: 'bg-green-600 hover:bg-green-700',
    href: '/superadmin/billing'
  },
  {
    title: 'Global Settings',
    description: 'Configure platform-wide settings',
    icon: Settings,
    color: 'bg-purple-600 hover:bg-purple-700',
    href: '/superadmin/settings'
  },
  {
    title: 'System Logs',
    description: 'View audit trails and system logs',
    icon: FileText,
    color: 'bg-slate-600 hover:bg-slate-700',
    href: '/superadmin/logs'
  }
];

const systemAlerts = [
  {
    type: 'warning',
    message: 'High server load detected on EU-West region',
    time: '2 minutes ago'
  },
  {
    type: 'info',
    message: 'Scheduled maintenance completed successfully',
    time: '1 hour ago'
  },
  {
    type: 'success',
    message: 'New backup completed for all databases',
    time: '3 hours ago'
  }
];

const analyticsData = {
  activeUsersToday: 1247,
  activeUsersWeek: 4589,
  activeUsersMonth: 15672,
  mostUsedModules: [
    { name: 'Project Management', usage: 89 },
    { name: 'Client Management', usage: 76 },
    { name: 'Accounting', usage: 65 },
    { name: 'Reports', usage: 54 }
  ],
  growthMetrics: {
    userGrowth: '+18%',
    revenueGrowth: '+24%',
    companyGrowth: '+12%'
  }
};

export function SuperAdminOverview() {
  const [timeFilter, setTimeFilter] = useState('30d');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Time Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Platform Overview</h2>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformKPIs.map((kpi, index) => (
          <GradientKpiCard key={index} {...kpi} />
        ))}
      </div>

      {/* Revenue by Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Revenue by Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {revenueByPlan.map((plan, index) => (
              <div key={index} className="relative">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${plan.color}`} />
                    <span className="font-medium">{plan.plan}</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {formatCurrency(plan.revenue)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {plan.companies} companies
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Server className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">API Response Time</span>
                </div>
                <Badge variant="outline" className="text-green-700 border-green-200">
                  142ms
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Database Performance</span>
                </div>
                <Badge variant="outline" className="text-green-700 border-green-200">
                  Optimal
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">System Uptime</span>
                </div>
                <Badge variant="outline" className="text-green-700 border-green-200">
                  99.9%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Server Load</span>
                </div>
                <Badge variant="outline" className="text-yellow-700 border-yellow-200">
                  67%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>User Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Today</span>
                <div className="text-lg font-bold text-purple-600">
                  {analyticsData.activeUsersToday.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active This Week</span>
                <div className="text-lg font-bold text-blue-600">
                  {analyticsData.activeUsersWeek.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active This Month</span>
                <div className="text-lg font-bold text-green-600">
                  {analyticsData.activeUsersMonth.toLocaleString()}
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm font-medium mb-2">Growth Metrics</div>
                <div className="flex justify-between text-xs">
                  <span>Users: <span className="text-green-600 font-medium">{analyticsData.growthMetrics.userGrowth}</span></span>
                  <span>Revenue: <span className="text-green-600 font-medium">{analyticsData.growthMetrics.revenueGrowth}</span></span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span>Recent Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Used Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <span>Most Used Modules</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {analyticsData.mostUsedModules.map((module, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{module.name}</span>
                  <span className="text-sm text-gray-600">{module.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${module.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-600" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Button 
                    className={`w-full ${action.color} text-white`}
                    onClick={() => window.location.href = action.href}
                  >
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.title}
                  </Button>
                  <p className="text-sm text-gray-600 mt-2 text-center">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
