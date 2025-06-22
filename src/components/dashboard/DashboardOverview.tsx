import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building, Home, DollarSign } from 'lucide-react';

const DashboardOverview = () => {
  const navigate = useNavigate();

  const handleNewProject = () => {
    navigate('/company/projects/new');
  };

  const handleNewClient = () => {
    navigate('/company/clients/new');
  };

  const kpiData = [
    {
      title: 'Total Projects',
      value: '12',
      subtitle: 'All registered',
      icon: Building,
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      cardBg: 'from-purple-50 to-purple-100',
    },
    {
      title: 'Total Units',
      value: '1,247',
      subtitle: 'Across all projects',
      icon: Home,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-100',
      cardBg: 'from-emerald-50 to-emerald-100',
    },
    {
      title: 'Units Allocated',
      value: '845',
      subtitle: 'Successfully allocated',
      icon: DollarSign,
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      cardBg: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Total Revenue',
      value: '₦15.2B',
      subtitle: 'All time earnings',
      icon: DollarSign,
      color: 'text-amber-700',
      bgColor: 'bg-amber-100',
      cardBg: 'from-amber-50 to-amber-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your real estate business.</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Quick Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleNewProject}>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleNewClient}>
              <Users className="h-4 w-4 mr-2" />
              New Client
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className={`bg-gradient-to-br ${kpi.cardBg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {kpi.title}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                  <div className="text-xs text-gray-500">{kpi.subtitle}</div>
                </div>
                <div className={`p-3 rounded-xl ${kpi.bgColor} shadow-sm`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access & Analytics (Example placeholders) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
            <p className="text-gray-600">No recent activities to display.</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Performance</h2>
            <p className="text-gray-600">Sales data will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
