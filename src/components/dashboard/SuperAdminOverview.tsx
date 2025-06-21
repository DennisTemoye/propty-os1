
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
  Shield,
  Server,
  Database,
  Globe,
  BarChart3,
  Calendar,
  UserCheck,
  Home,
  CreditCard,
  Clock
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
    title: 'Active Subscriptions',
    value: '189',
    subtitle: '76% of total',
    icon: UserCheck,
    gradientFrom: 'from-green-600',
    gradientTo: 'to-green-800',
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'Monthly Revenue (MRR)',
    value: '₦15.2M',
    subtitle: '+24% vs last month',
    icon: DollarSign,
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-purple-800',
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    title: 'New Companies',
    value: '34',
    subtitle: 'This month',
    icon: TrendingUp,
    gradientFrom: 'from-orange-600',
    gradientTo: 'to-orange-800',
    iconBgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  }
];

const planPerformance = [
  { plan: 'Enterprise', companies: 8, revenue: 6800000, growth: '+15%', color: 'bg-purple-600' },
  { plan: 'Growth', companies: 28, revenue: 4200000, growth: '+22%', color: 'bg-blue-600' },
  { plan: 'Starter', companies: 45, revenue: 2800000, growth: '+18%', color: 'bg-green-600' },
  { plan: 'Trial', companies: 12, revenue: 0, growth: '+8%', color: 'bg-gray-500' }
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
    description: 'Manage subscriptions and billing',
    icon: CreditCard,
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
    description: 'View audit trails and activity logs',
    icon: FileText,
    color: 'bg-slate-600 hover:bg-slate-700',
    href: '/superadmin/logs'
  }
];

const systemStatus = {
  serverLoad: { status: 'Normal', value: '67%', color: 'text-green-600' },
  apiResponse: { status: 'Good', value: '142ms', color: 'text-green-600' },
  dbHealth: { status: 'Optimal', value: '99.9%', color: 'text-green-600' },
  uptime: { status: 'Online', value: '99.9%', color: 'text-green-600' }
};

const mostUsedModules = [
  { name: 'Projects & Units', usage: 89, companies: 156 },
  { name: 'Client Management', usage: 76, companies: 142 },
  { name: 'Sales Allocation', usage: 65, companies: 98 },
  { name: 'Accounting & Fees', usage: 54, companies: 87 }
];

const mostActiveCompanies = [
  { name: 'Global Real Estate Inc', plan: 'Enterprise', activity: 'High', lastActive: '2 mins ago' },
  { name: 'ABC Properties Ltd', plan: 'Growth', activity: 'High', lastActive: '5 mins ago' },
  { name: 'Metro Housing Co', plan: 'Growth', activity: 'Medium', lastActive: '1 hour ago' },
  { name: 'Prime Properties', plan: 'Starter', activity: 'Medium', lastActive: '3 hours ago' }
];

export function SuperAdminOverview() {
  const [timeFilter, setTimeFilter] = useState('30d');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Time Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Platform Overview</h2>
          <p className="text-slate-600 mt-1">Monitor and manage the ProptyOS platform</p>
        </div>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformKPIs.map((kpi, index) => (
          <GradientKpiCard key={index} {...kpi} />
        ))}
      </div>

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
                  <span className="text-sm font-medium">Server Load</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${systemStatus.serverLoad.color}`}>
                    {systemStatus.serverLoad.status}
                  </div>
                  <div className="text-xs text-gray-500">{systemStatus.serverLoad.value}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">API Response</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${systemStatus.apiResponse.color}`}>
                    {systemStatus.apiResponse.status}
                  </div>
                  <div className="text-xs text-gray-500">{systemStatus.apiResponse.value}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Database Health</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${systemStatus.dbHealth.color}`}>
                    {systemStatus.dbHealth.status}
                  </div>
                  <div className="text-xs text-gray-500">{systemStatus.dbHealth.value}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">System Uptime</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${systemStatus.uptime.color}`}>
                    {systemStatus.uptime.status}
                  </div>
                  <div className="text-xs text-gray-500">{systemStatus.uptime.value}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Most Active Companies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Most Active Companies</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mostActiveCompanies.map((company, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{company.name}</div>
                    <div className="text-xs text-gray-500">{company.plan} Plan</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={`text-xs ${getActivityColor(company.activity)}`}>
                      {company.activity}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">{company.lastActive}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span>Plan Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {planPerformance.map((plan, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${plan.color}`} />
                    <div>
                      <div className="font-medium text-sm">{plan.plan}</div>
                      <div className="text-xs text-gray-500">{plan.companies} companies</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{formatCurrency(plan.revenue)}</div>
                    <div className="text-xs text-green-600">{plan.growth}</div>
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
            <span>Most Used ProptyOS Modules</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mostUsedModules.map((module, index) => (
              <div key={index} className="p-4 border rounded-lg bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-sm">{module.name}</span>
                  <span className="text-sm text-gray-600">{module.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${module.usage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">{module.companies} companies using</div>
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
            <span>Platform Management</span>
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
