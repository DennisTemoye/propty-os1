
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Users, MapPin, Plus, Search, Filter, Eye, Edit } from 'lucide-react';
import { ProjectKpiCard } from './projects/ProjectKpiCard';

const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    status: 'Construction',
    totalBlocks: 5,
    totalUnits: 150,
    availableUnits: 38,
    allocatedUnits: 89,
    reservedUnits: 23,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop'
  },
  {
    id: 2,
    name: 'Emerald Heights',
    location: 'Ikoyi, Lagos',
    status: 'Selling',
    totalBlocks: 3,
    totalUnits: 90,
    availableUnits: 25,
    allocatedUnits: 54,
    reservedUnits: 11,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop'
  },
  {
    id: 3,
    name: 'Golden View Residences',
    location: 'Abuja',
    status: 'Presale',
    totalBlocks: 4,
    totalUnits: 120,
    availableUnits: 85,
    allocatedUnits: 30,
    reservedUnits: 5,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop'
  }
];

export function ProjectsUnits() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Calculate totals for overview
  const totalProjects = mockProjects.length;
  const totalUnits = mockProjects.reduce((sum, project) => sum + project.totalUnits, 0);
  const totalAllocatedUnits = mockProjects.reduce((sum, project) => sum + project.allocatedUnits, 0);
  const totalAvailableUnits = mockProjects.reduce((sum, project) => sum + project.availableUnits, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects & Units</h1>
          <p className="text-gray-600 mt-1">Manage your real estate development projects</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => navigate('/company/projects/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">All Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{totalProjects}</div>
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
                    <div className="text-2xl font-bold text-green-600">{totalUnits}</div>
                    <div className="text-sm text-gray-500">Total Units</div>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{totalAllocatedUnits}</div>
                    <div className="text-sm text-gray-500">Allocated Units</div>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{totalAvailableUnits}</div>
                    <div className="text-sm text-gray-500">Available Units</div>
                  </div>
                  <Building className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProjects.slice(0, 3).map((project) => (
                  <ProjectKpiCard key={project.id} project={project} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="acquisition">Acquisition</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="presale">Presale</SelectItem>
                <SelectItem value="selling">Selling</SelectItem>
                <SelectItem value="pause sales">Pause Sales</SelectItem>
                <SelectItem value="sold out">Sold Out</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectKpiCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first project.'
                }
              </p>
              {!searchQuery && statusFilter === 'all' && (
                <Button onClick={() => navigate('/company/projects/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
