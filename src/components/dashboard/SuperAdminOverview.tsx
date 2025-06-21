
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Shield
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
    subtitle: '76% conversion rate',
    icon: Users,
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

export function SuperAdminOverview() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformKPIs.map((kpi, index) => (
          <GradientKpiCard key={index} {...kpi} />
        ))}
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <span className="text-sm font-medium">API Response Time</span>
                <Badge variant="outline" className="text-green-700 border-green-200">
                  142ms
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Performance</span>
                <Badge variant="outline" className="text-green-700 border-green-200">
                  Optimal
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage Usage</span>
                <Badge variant="outline" className="text-yellow-700 border-yellow-200">
                  67%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">System Uptime</span>
                <Badge variant="outline" className="text-green-700 border-green-200">
                  99.9%
                </Badge>
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
    </div>
  );
}
