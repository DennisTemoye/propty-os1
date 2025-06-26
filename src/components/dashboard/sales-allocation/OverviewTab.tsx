
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Building, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Eye,
  FileText,
  Calendar,
  MapPin
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useNavigationHelper } from './NavigationHelper';

const salesData = [
  { month: 'Jan', sales: 12, allocations: 10 },
  { month: 'Feb', sales: 18, allocations: 15 },
  { month: 'Mar', sales: 25, allocations: 22 },
  { month: 'Apr', sales: 20, allocations: 18 },
  { month: 'May', sales: 32, allocations: 28 },
  { month: 'Jun', sales: 28, allocations: 25 }
];

const allocationData = [
  { name: 'Allocated', value: 156, color: '#10b981' },
  { name: 'Available', value: 89, color: '#6b7280' },
  { name: 'Reserved', value: 23, color: '#f59e0b' }
];

const projectData = [
  { name: 'Victoria Gardens', sales: 45, allocation: 85 },
  { name: 'Emerald Heights', sales: 32, allocation: 92 },
  { name: 'Golden View', sales: 28, allocation: 78 },
  { name: 'Ocean Breeze', sales: 15, allocation: 60 }
];

const recentActivities = [
  {
    id: 1,
    type: 'sale',
    description: 'New sale recorded for John Doe',
    project: 'Victoria Gardens',
    amount: '₦25M',
    time: '2 hours ago',
    status: 'completed'
  },
  {
    id: 2,
    type: 'allocation',
    description: 'Unit allocated to Sarah Johnson',
    project: 'Emerald Heights',
    unit: 'Block A - Plot 15',
    time: '4 hours ago',
    status: 'pending'
  },
  {
    id: 3,
    type: 'reallocation',
    description: 'Unit reallocated from Mike to Alice',
    project: 'Golden View',
    unit: 'Block B - Plot 8',
    time: '1 day ago',
    status: 'approved'
  }
];

export function OverviewTab() {
  const [activeChart, setActiveChart] = useState('sales');
  const { 
    navigateToProjects, 
    navigateToClients, 
    navigateToReports,
    navigateToProjectDetail,
    navigateToClientDetail,
    showComingSoon
  } = useNavigationHelper();

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'sale': return 'bg-green-100 text-green-800';
      case 'allocation': return 'bg-blue-100 text-blue-800';
      case 'reallocation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Allocations Trend */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Sales & Allocations Trend</CardTitle>
              <Tabs value={activeChart} onValueChange={setActiveChart} className="w-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sales">6 Months</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#10b981" name="Sales" />
                <Bar dataKey="allocations" fill="#3b82f6" name="Allocations" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Unit Allocation Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Unit Distribution</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={navigateToProjects}
              >
                <Eye className="h-4 w-4 mr-1" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Performance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Project Performance</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={navigateToProjects}
            >
              <Building className="h-4 w-4 mr-1" />
              Manage Projects
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectData.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium">{project.name}</h3>
                    <Badge variant="outline">{project.sales} Sales</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Allocation Rate</span>
                      <span>{project.allocation}%</span>
                    </div>
                    <Progress value={project.allocation} className="h-2" />
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigateToProjectDetail(project.name)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => showComingSoon('Project Reports')}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Activities</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => showComingSoon('Activity Log')}
            >
              <Calendar className="h-4 w-4 mr-1" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={getActivityColor(activity.type)}>
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(activity.status)}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{activity.project}</span>
                    </div>
                    {activity.amount && (
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{activity.amount}</span>
                      </div>
                    )}
                    {activity.unit && (
                      <div className="flex items-center space-x-1">
                        <Building className="h-3 w-3" />
                        <span>{activity.unit}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => showComingSoon('Activity Details')}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={navigateToClients}>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium mb-1">Manage Clients</h3>
            <p className="text-sm text-gray-600">View and manage client records</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={navigateToProjects}>
          <CardContent className="p-6 text-center">
            <Building className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium mb-1">Project Units</h3>
            <p className="text-sm text-gray-600">Manage project inventories</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={navigateToReports}>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-medium mb-1">Sales Reports</h3>
            <p className="text-sm text-gray-600">Generate detailed reports</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
