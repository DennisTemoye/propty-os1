
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Send,
  UserPlus,
  FileText,
  Receipt,
} from 'lucide-react';

export function DashboardOverview() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Revenue',
      value: '₦2.4B',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Active Projects',
      value: '24',
      change: '+3 this month',
      trend: 'up',
      icon: Building2,
    },
    {
      title: 'Total Clients',
      value: '1,247',
      change: '+18.2%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Units Sold',
      value: '892',
      change: '+5.1%',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'payment',
      title: 'Payment received from John Doe',
      amount: '₦2.5M',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      id: 2,
      type: 'allocation',
      title: 'New unit allocated to Jane Smith',
      project: 'Victoria Gardens - Block A, Unit 15',
      time: '4 hours ago',
      status: 'pending',
    },
    {
      id: 3,
      type: 'client',
      title: 'New client registration',
      client: 'Mike Johnson',
      time: '6 hours ago',
      status: 'completed',
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      title: 'Review payment confirmation for Victoria Gardens',
      priority: 'high',
      dueDate: 'Today',
    },
    {
      id: 2,
      title: 'Update project completion status',
      priority: 'medium',
      dueDate: 'Tomorrow',
    },
    {
      id: 3,
      title: 'Send quarterly report to stakeholders',
      priority: 'low',
      dueDate: 'This week',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => navigate('/company/projects/new')}>
              <Building2 className="h-4 w-4 mr-2" />
              New Project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/company/clients/new')}>
              <UserPlus className="h-4 w-4 mr-2" />
              New Client
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/company/sales-allocations/new')}>
              <FileText className="h-4 w-4 mr-2" />
              New Allocation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/company/accounting/expense/new')}>
              <Receipt className="h-4 w-4 mr-2" />
              New Expense
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/company/tools/send-notice')}>
              <Send className="h-4 w-4 mr-2" />
              New Notice
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    {activity.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    {activity.amount && (
                      <p className="text-sm text-green-600 font-semibold">{activity.amount}</p>
                    )}
                    {activity.project && (
                      <p className="text-sm text-gray-600">{activity.project}</p>
                    )}
                    {activity.client && (
                      <p className="text-sm text-gray-600">{activity.client}</p>
                    )}
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <AlertCircle className={`h-5 w-5 ${
                      task.priority === 'high' ? 'text-red-500' : 
                      task.priority === 'medium' ? 'text-orange-500' : 'text-blue-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={
                        task.priority === 'high' ? 'destructive' : 
                        task.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Sales Target</span>
              <span>₦500M / ₦800M</span>
            </div>
            <Progress value={62.5} className="h-2" />
            <p className="text-sm text-gray-600">62.5% of monthly target achieved</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
