import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus,
  UserPlus,
  BarChart3,
  Eye,
  Edit,
  MoreVertical,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Target
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data for demonstration
const kpiData = [
  { label: 'Total Projects', value: '45', icon: Building2, color: 'text-blue-500', target: '50' },
  { label: 'Active Clients', value: '237', icon: Users, color: 'text-green-500', target: '250' },
  { label: 'Revenue YTD', value: '$1.25M', icon: DollarSign, color: 'text-purple-500', target: '$1.5M' },
  { label: 'Sales Growth', value: '+15%', icon: TrendingUp, color: 'text-orange-500', target: '+20%' },
];

const projectUpdates = [
  {
    projectName: 'Sunrise Villas',
    status: 'Construction',
    dueDate: '2024-08-15',
    location: 'Kilimani, Nairobi',
    tasksCompleted: 75,
  },
  {
    projectName: 'Palm Residences',
    status: 'Marketing',
    dueDate: '2024-09-20',
    location: 'Westlands, Nairobi',
    tasksCompleted: 90,
  },
  {
    projectName: 'Garden Apartments',
    status: 'Pre-Launch',
    dueDate: '2024-10-01',
    location: 'Karen, Nairobi',
    tasksCompleted: 30,
  },
];

const salesPipelineData = [
  { stage: 'Lead', count: 55, conversionRate: 10 },
  { stage: 'Qualified', count: 35, conversionRate: 30 },
  { stage: 'Negotiation', count: 15, conversionRate: 70 },
  { stage: 'Closed', count: 5, conversionRate: 100 },
];

export function DashboardOverview() {
  const navigate = useNavigate();

  const handleViewProject = (projectId: string) => {
    navigate(`/company/projects/${projectId}`);
  };

  const handleEditProject = (projectId: string) => {
    navigate(`/company/projects/${projectId}/edit`);
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                {kpi.label}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-4 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit KPI
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="text-sm text-muted-foreground">
                <TrendingUp className="mr-1 h-4 w-4 inline-block" />
                {((parseFloat(kpi.value.toString().replace(/[^0-9.-]+/g, "")) / parseFloat(kpi.target.toString().replace(/[^0-9.-]+/g, ""))) * 100).toFixed(0)}% vs Target
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => navigate('/company/projects/new')}
            >
              <Building2 className="h-6 w-6" />
              <span className="text-sm">New Project</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => navigate('/company/clients/new')}
            >
              <UserPlus className="h-6 w-6" />
              <span className="text-sm">Add Client</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
            >
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">Record Sale</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
            >
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Project Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Project Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {projectUpdates.map((project, index) => (
            <div key={index} className="border rounded-md p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">{project.projectName}</div>
                <Badge variant="secondary">{project.status}</Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Due Date: {project.dueDate}
              </div>
              <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location: {project.location}
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium">Tasks Completed: {project.tasksCompleted}%</div>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${project.tasksCompleted}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleViewProject('123')}>
                  View
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleEditProject('123')}>
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sales Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Target className="h-5 w-5" />
            Sales Pipeline Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {salesPipelineData.map((stage, index) => (
              <div key={index} className="p-4 rounded-md shadow-sm border">
                <div className="text-sm font-medium">{stage.stage}</div>
                <div className="text-2xl font-bold">{stage.count}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  <CheckCircle2 className="h-4 w-4 inline-block mr-1" />
                  {stage.conversionRate}% Conversion
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
