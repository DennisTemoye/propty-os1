import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavigationHelper } from './NavigationHelper';
import { 
  Building, 
  DollarSign, 
  ArrowRight, 
  Ban,
  TrendingUp,
  Users,
  Calculator,
  Clock,
  CheckCircle,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

const recentActivities = [
  {
    id: 1,
    type: 'presale',
    title: 'Presale Recorded',
    description: 'Victoria Gardens - Client: John Doe',
    timestamp: '2 hours ago',
    clientId: 'client-1',
    projectId: 'project-1'
  },
  {
    id: 2,
    type: 'allocation',
    title: 'Unit Allocated',
    description: 'Block A - Plot 15 to Sarah Johnson',
    timestamp: '4 hours ago',
    clientId: 'client-2',
    allocationId: 'alloc-1'
  },
  {
    id: 3,
    type: 'pending',
    title: 'Pending Allocation',
    description: 'Golden View - Client: Robert Brown',
    timestamp: '6 hours ago',
    clientId: 'client-3',
    projectId: 'project-2'
  }
];

export function OverviewTab() {
  const navigate = useNavigate();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleActivityClick = (activity: any) => {
    // Navigate based on activity type
    switch (activity.type) {
      case 'presale':
        navigate(`/company/clients/${activity.clientId}`);
        break;
      case 'allocation':
        navigate(`/company/sales`);
        break;
      case 'pending':
        navigate('/company/sales');
        break;
    }
  };

  const handleProjectClick = (project: any) => {
    navigate('/company/projects');
  };

  const handleNavigateToModule = (module: string) => {
    navigate(`/company/${module}`);
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
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleProjectClick(project)}
              >
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
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/company/projects');
                    }}
                    className="hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
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
            {recentActivities.map((activity) => (
              <div 
                key={activity.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:shadow-sm transition-all ${
                  activity.type === 'presale' ? 'bg-green-50 hover:bg-green-100' :
                  activity.type === 'allocation' ? 'bg-blue-50 hover:bg-blue-100' :
                  'bg-yellow-50 hover:bg-yellow-100'
                }`}
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex-1">
                  <div className="font-medium">{activity.title}</div>
                  <div className="text-sm text-gray-600">{activity.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{activity.timestamp}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={
                    activity.type === 'presale' ? 'bg-green-100 text-green-800' :
                    activity.type === 'allocation' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {activity.type === 'presale' ? 'Presale' :
                     activity.type === 'allocation' ? 'Allocated' :
                     'Pending'}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActivityClick(activity);
                    }}
                    className="hover:bg-gray-200 transition-colors"
                  >
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Helper */}
      <Card>
        <CardHeader>
          <CardTitle>Related Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <NavigationHelper onNavigate={handleNavigateToModule} />
        </CardContent>
      </Card>
    </div>
  );
}
