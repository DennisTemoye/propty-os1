import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, MapPin, Plus, Search, Filter, LayoutGrid, Layers, Home, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProjectSiteForm } from './projects/ProjectSiteForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';

const mockProjectSites = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    totalBlocks: 8,
    totalUnits: 150,
    soldUnits: 89,
    reservedUnits: 23,
    availableUnits: 38,
    status: 'active',
    description: 'Premium residential estate with modern amenities',
    projectSize: '50 hectares',
    developmentStage: 'Construction',
    documentTitle: 'Certificate of Occupancy',
    blocks: [
      { id: 'A', prototype: 'Duplex', units: 30, status: 'completed' },
      { id: 'B', prototype: 'Bungalow', units: 25, status: 'construction' },
      { id: 'C', prototype: 'Duplex', units: 30, status: 'planning' }
    ]
  },
  {
    id: 2,
    name: 'Mainland Commercial Plaza',
    location: 'Ikeja, Lagos',
    totalBlocks: 3,
    totalUnits: 75,
    soldUnits: 45,
    reservedUnits: 12,
    availableUnits: 18,
    status: 'paused',
    description: 'Modern commercial spaces and offices',
    projectSize: '15 hectares',
    developmentStage: 'Marketing',
    documentTitle: 'Approved Survey Plan',
    blocks: [
      { id: 'Alpha', prototype: 'Office Towers', units: 40, status: 'completed' },
      { id: 'Beta', prototype: 'Retail Spaces', units: 35, status: 'completed' }
    ]
  },
  {
    id: 3,
    name: 'Sunset Land Development',
    location: 'Abuja FCT',
    totalBlocks: 12,
    totalUnits: 200,
    soldUnits: 196,
    reservedUnits: 4,
    availableUnits: 0,
    status: 'sold out',
    description: 'Prime land plots for residential development',
    projectSize: '100 hectares',
    developmentStage: 'Handover',
    documentTitle: 'Family Receipt & Layout Plan',
    blocks: [
      { id: '1', prototype: 'Standard Plots', units: 50, status: 'surveyed' },
      { id: '2', prototype: 'Premium Plots', units: 30, status: 'surveyed' },
      { id: '3', prototype: 'Corner Plots', units: 20, status: 'planning' }
    ]
  }
];

export function ProjectSites() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold out':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = mockProjectSites.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate KPI totals
  const totalProjects = mockProjectSites.length;
  const totalUnits = mockProjectSites.reduce((sum, project) => sum + project.totalUnits, 0);
  const totalSold = mockProjectSites.reduce((sum, project) => sum + project.soldUnits, 0);
  const totalReserved = mockProjectSites.reduce((sum, project) => sum + project.reservedUnits, 0);
  const totalAvailable = mockProjectSites.reduce((sum, project) => sum + project.availableUnits, 0);

  const handleNewProject = () => {
    setEditingProject(null);
    setIsProjectFormOpen(true);
  };

  const handleCardClick = (projectId: number) => {
    navigate(`/company/projects/${projectId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Sites</h1>
          <p className="text-gray-600 mt-1">Create, manage, and structure your real estate project sites</p>
        </div>
        <Button onClick={handleNewProject} className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Project Site
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <GradientKpiCard
          title="Total Projects"
          value={totalProjects.toString()}
          subtitle="Active projects"
          icon={Building2}
          gradientFrom="from-purple-50"
          gradientTo="to-purple-100"
          iconBgColor="bg-purple-200"
          iconColor="text-purple-600"
        />
        <GradientKpiCard
          title="Total Units"
          value={totalUnits.toLocaleString()}
          subtitle="All project units"
          icon={Home}
          gradientFrom="from-green-50"
          gradientTo="to-green-100"
          iconBgColor="bg-green-200"
          iconColor="text-green-600"
        />
        <GradientKpiCard
          title="Units Sold"
          value={totalSold.toLocaleString()}
          subtitle={`${((totalSold / totalUnits) * 100).toFixed(1)}% of total`}
          icon={DollarSign}
          gradientFrom="from-blue-50"
          gradientTo="to-blue-100"
          iconBgColor="bg-blue-200"
          iconColor="text-blue-600"
        />
        <GradientKpiCard
          title="Reserved"
          value={totalReserved.toLocaleString()}
          subtitle={`${((totalReserved / totalUnits) * 100).toFixed(1)}% of total`}
          icon={MapPin}
          gradientFrom="from-yellow-50"
          gradientTo="to-yellow-100"
          iconBgColor="bg-yellow-200"
          iconColor="text-yellow-600"
        />
        <GradientKpiCard
          title="Available"
          value={totalAvailable.toLocaleString()}
          subtitle={`${((totalAvailable / totalUnits) * 100).toFixed(1)}% of total`}
          icon={Building2}
          gradientFrom="from-indigo-50"
          gradientTo="to-indigo-100"
          iconBgColor="bg-indigo-200"
          iconColor="text-indigo-600"
        />
      </div>

      {/* Enhanced Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search project sites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="sold out">Sold Out</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {filteredProjects.length} of {mockProjectSites.length} projects
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <Layers className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Sites Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-sm"
              onClick={() => handleCardClick(project.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 text-gray-900">{project.name}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-600 text-xs">Project Size</span>
                      <div className="font-medium text-gray-900">{project.projectSize}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-600 text-xs">Development Stage</span>
                      <div className="font-medium text-gray-900">{project.developmentStage}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-600 text-xs">Blocks</span>
                      <div className="font-bold text-blue-600 text-lg">{project.totalBlocks}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-600 text-xs">Total Units</span>
                      <div className="font-bold text-gray-900 text-lg">{project.totalUnits}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-green-600">{project.soldUnits}</div>
                      <div className="text-xs text-green-700 font-medium">Sold</div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-yellow-600">{project.reservedUnits}</div>
                      <div className="text-xs text-yellow-700 font-medium">Reserved</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-600">{project.availableUnits}</div>
                      <div className="text-xs text-blue-700 font-medium">Available</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleCardClick(project.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location} • {project.projectSize} • {project.developmentStage}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-medium">{project.totalBlocks}</div>
                      <div className="text-gray-500">Blocks</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{project.totalUnits}</div>
                      <div className="text-gray-500">Units</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-green-600">{project.soldUnits}</div>
                      <div className="text-gray-500">Sold</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-yellow-600">{project.reservedUnits}</div>
                      <div className="text-gray-500">Reserved</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-blue-600">{project.availableUnits}</div>
                      <div className="text-gray-500">Available</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No project sites found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search criteria.'
                : 'Get started by creating your first project site.'}
            </p>
            <Button onClick={handleNewProject} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Project Site
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Project Form Modal */}
      <Dialog open={isProjectFormOpen} onOpenChange={setIsProjectFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Project Site' : 'Create New Project Site'}
            </DialogTitle>
            <DialogDescription>
              {editingProject 
                ? 'Update project information and settings' 
                : 'Set up a new real estate project site with blocks and units'
              }
            </DialogDescription>
          </DialogHeader>
          <ProjectSiteForm 
            project={editingProject}
            onClose={() => setIsProjectFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
