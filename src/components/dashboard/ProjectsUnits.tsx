
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Plus, Building, MapPin, Calendar, Users, Search, Grid, List } from 'lucide-react';
import { ProjectStatsCard } from './projects/ProjectStatsCard';
import { useNavigate } from 'react-router-dom';

const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens',
    location: 'Lekki, Lagos',
    type: 'Residential',
    status: 'Active',
    totalUnits: 150,
    soldUnits: 89,
    availableUnits: 45,
    reservedUnits: 16,
    startDate: '2023-01-15',
    completionDate: '2024-12-30',
    totalValue: '₦15.5B',
    salesValue: '₦9.2B'
  },
  {
    id: 2,
    name: 'Emerald Heights',
    location: 'Victoria Island, Lagos',
    type: 'Commercial',
    status: 'Planning',
    totalUnits: 80,
    soldUnits: 0,
    availableUnits: 80,
    reservedUnits: 0,
    startDate: '2024-03-01',
    completionDate: '2025-08-15',
    totalValue: '₦12.8B',
    salesValue: '₦0'
  },
  {
    id: 3,
    name: 'Golden View Estate',
    location: 'Ikoyi, Lagos',
    type: 'Mixed-Use',
    status: 'Construction',
    totalUnits: 200,
    soldUnits: 45,
    availableUnits: 120,
    reservedUnits: 35,
    startDate: '2023-08-01',
    completionDate: '2025-06-30',
    totalValue: '₦25.3B',
    salesValue: '₦5.7B'
  },
  {
    id: 4,
    name: 'Sunset Heights',
    location: 'Ajah, Lagos',
    type: 'Residential',
    status: 'Completed',
    totalUnits: 75,
    soldUnits: 75,
    availableUnits: 0,
    reservedUnits: 0,
    startDate: '2022-05-01',
    completionDate: '2023-11-15',
    totalValue: '₦8.9B',
    salesValue: '₦8.9B'
  }
];

export function ProjectsUnits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'construction':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'on-hold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleProjectClick = (projectId: number) => {
    navigate(`/company/projects/${projectId}`);
  };

  const totalProjects = mockProjects.length;
  const activeProjects = mockProjects.filter(p => p.status === 'Active').length;
  const totalUnits = mockProjects.reduce((sum, p) => sum + p.totalUnits, 0);
  const soldUnits = mockProjects.reduce((sum, p) => sum + p.soldUnits, 0);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects & Units</h1>
          <p className="text-gray-600 mt-1">Manage your development projects and unit allocations</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate('/company/projects/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="responsive-grid">
        <ProjectStatsCard
          title="Total Projects"
          value={totalProjects.toString()}
          subtitle="All projects"
          icon={Building}
          gradient="from-blue-500 to-blue-600"
        />
        <ProjectStatsCard
          title="Active Projects"
          value={activeProjects.toString()}
          subtitle="Currently running"
          icon={Calendar}
          gradient="from-green-500 to-green-600"
        />
        <ProjectStatsCard
          title="Total Units"
          value={totalUnits.toLocaleString()}
          subtitle="Across all projects"
          icon={Grid}
          gradient="from-purple-500 to-purple-600"
        />
        <ProjectStatsCard
          title="Units Sold"
          value={soldUnits.toLocaleString()}
          subtitle={`${Math.round((soldUnits / totalUnits) * 100)}% of total`}
          icon={Users}
          gradient="from-orange-500 to-orange-600"
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
            </div>
          </div>

          {/* Projects Display */}
          {viewMode === 'grid' ? (
            <div className="responsive-grid">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 w-full"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {project.name}
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location}
                        </div>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-semibold text-blue-600">{project.totalUnits}</div>
                        <div className="text-gray-500 text-xs">Total Units</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-600">{project.soldUnits}</div>
                        <div className="text-gray-500 text-xs">Sold</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="font-semibold text-orange-600">{project.reservedUnits}</div>
                        <div className="text-gray-500 text-xs">Reserved</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-semibold text-purple-600">{project.availableUnits}</div>
                        <div className="text-gray-500 text-xs">Available</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Value:</span>
                        <span className="font-semibold">{project.totalValue}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sales Value:</span>
                        <span className="font-semibold text-green-600">{project.salesValue}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredProjects.map((project) => (
                    <div 
                      key={project.id}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleProjectClick(project.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {project.location}
                              </div>
                            </div>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
                            <div>
                              <span className="text-gray-500">Total Units:</span>
                              <div className="font-semibold">{project.totalUnits}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Sold:</span>
                              <div className="font-semibold text-green-600">{project.soldUnits}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Available:</span>
                              <div className="font-semibold text-purple-600">{project.availableUnits}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Value:</span>
                              <div className="font-semibold">{project.totalValue}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="projects" className="w-full">
          <div className="text-center py-8">
            <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Project Management</h3>
            <p className="text-gray-500">Detailed project management features coming soon</p>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="w-full">
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-500">Comprehensive analytics and reporting features coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
