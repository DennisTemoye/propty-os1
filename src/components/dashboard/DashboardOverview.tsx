import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  MapPin,
  Calendar,
  Eye
} from 'lucide-react';

export function DashboardOverview() {
  const navigate = useNavigate();

  const mockProjects = [
    {
      id: 1,
      name: 'Victoria Gardens Estate',
      location: 'Lekki, Lagos',
      totalUnits: 150,
      soldUnits: 89,
      reservedUnits: 23,
      availableUnits: 38,
      revenue: '₦2,500,000,000',
      status: 'ongoing',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Emerald Heights',
      location: 'Abuja, FCT',
      totalUnits: 200,
      soldUnits: 156,
      reservedUnits: 12,
      availableUnits: 32,
      revenue: '₦4,200,000,000',
      status: 'ongoing',
      lastUpdated: '2024-01-12'
    },
    {
      id: 3,
      name: 'Golden View Towers',
      location: 'Victoria Island, Lagos',
      totalUnits: 300,
      soldUnits: 245,
      reservedUnits: 18,
      availableUnits: 37,
      revenue: '₦6,800,000,000',
      status: 'ongoing',
      lastUpdated: '2024-01-10'
    }
  ];

  const mockClients = [
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+234 801 234 5678', status: 'active', lastContact: '2024-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+234 802 345 6789', status: 'prospect', lastContact: '2024-01-14' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', phone: '+234 803 456 7890', status: 'active', lastContact: '2024-01-13' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+234 804 567 8901', status: 'inactive', lastContact: '2024-01-10' }
  ];

  const totalProjects = mockProjects.length;
  const activeProjects = mockProjects.filter(p => p.status === 'ongoing').length;
  const totalUnits = mockProjects.reduce((sum, p) => sum + p.totalUnits, 0);
  const soldUnits = mockProjects.reduce((sum, p) => sum + p.soldUnits, 0);
  const totalRevenue = mockProjects.reduce((sum, p) => {
    const revenue = parseInt(p.revenue.replace(/[^\d]/g, ''));
    return sum + revenue;
  }, 0);

  const salesProgress = (soldUnits / totalUnits) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getClientStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'prospect':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={() => navigate('/company/projects/new')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/company/clients/new')}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Client
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalProjects}</div>
                <div className="text-sm text-gray-500">Total Projects</div>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{soldUnits}</div>
                <div className="text-sm text-gray-500">Units Sold</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{mockClients.length}</div>
                <div className="text-sm text-gray-500">Total Clients</div>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">₦{(totalRevenue / 1000000000).toFixed(1)}B</div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Sales Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Sales Progress</span>
              <span>{salesProgress.toFixed(1)}% Complete</span>
            </div>
            <Progress value={salesProgress} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{soldUnits} sold</span>
              <span>{totalUnits - soldUnits} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects and Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Projects</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/company/projects')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{project.name}</h4>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">
                        {project.soldUnits}/{project.totalUnits} units sold
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {project.revenue}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/company/projects/${project.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Clients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Clients</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/company/clients')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockClients.slice(0, 4).map((client) => (
                <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{client.name}</h4>
                      <Badge className={getClientStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{client.email}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Last contact: {client.lastContact}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/company/clients/${client.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
