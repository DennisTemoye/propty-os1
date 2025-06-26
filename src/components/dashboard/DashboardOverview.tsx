
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Home,
  UserCheck,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  FileText,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react';

export function DashboardOverview() {
  // Mock data for KPIs
  const kpiData = [
    {
      title: 'Total Projects',
      value: '12',
      change: '+2',
      changeType: 'positive' as const,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Clients',
      value: '245',
      change: '+18',
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Revenue',
      value: '₦15.2B',
      change: '+12%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Units Sold',
      value: '842',
      change: '+25',
      changeType: 'positive' as const,
      icon: Home,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Active Marketers',
      value: '28',
      change: '+3',
      changeType: 'positive' as const,
      icon: UserCheck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Pending Payments',
      value: '₦2.8B',
      change: '-5%',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'sale',
      title: 'New unit allocation',
      description: 'Block A Unit 05 allocated to John Doe - Victoria Gardens',
      time: '2 hours ago',
      icon: Home,
      status: 'success'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment received',
      description: '₦15M payment from Jane Smith - Emerald Heights',
      time: '4 hours ago',
      icon: DollarSign,
      status: 'success'
    },
    {
      id: 3,
      type: 'client',
      title: 'New client registered',
      description: 'Michael Johnson completed KYC verification',
      time: '6 hours ago',
      icon: Users,
      status: 'info'
    },
    {
      id: 4,
      type: 'project',
      title: 'Project milestone',
      description: 'Golden View Towers - Block C construction completed',
      time: '1 day ago',
      icon: Building2,
      status: 'success'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Payment overdue',
      description: 'Sarah Williams - ₦5M payment overdue by 7 days',
      time: '2 days ago',
      icon: AlertTriangle,
      status: 'warning'
    }
  ];

  const projectsData = [
    {
      name: 'Victoria Gardens',
      location: 'Lekki, Lagos',
      progress: 75,
      status: 'ongoing',
      totalUnits: 150,
      soldUnits: 112,
      revenue: '₦2.5B'
    },
    {
      name: 'Emerald Heights',
      location: 'Abuja, FCT',
      progress: 60,
      status: 'ongoing',
      totalUnits: 200,
      soldUnits: 156,
      revenue: '₦4.2B'
    },
    {
      name: 'Golden View Towers',
      location: 'Victoria Island',
      progress: 90,
      status: 'ongoing',
      totalUnits: 300,
      soldUnits: 245,
      revenue: '₦6.8B'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid - Full Width */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
                    <div className={`flex items-center text-sm font-medium ${
                      kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.changeType === 'positive' ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {kpi.change}
                    </div>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid - Full Width */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Performance - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Project Performance</CardTitle>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-1" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projectsData.map((project, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{project.revenue}</div>
                        <div className="text-xs text-gray-500">{project.soldUnits}/{project.totalUnits} units sold</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Recent Activities</CardTitle>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-1" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Building2 className="h-6 w-6" />
              <span className="text-sm">New Project</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Add Client</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Home className="h-6 w-6" />
              <span className="text-sm">Allocate Unit</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">Record Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Generate Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <UserCheck className="h-6 w-6" />
              <span className="text-sm">Add Marketer</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
