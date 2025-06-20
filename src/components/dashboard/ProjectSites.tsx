
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, MapPin, Plus, Search, Filter, LayoutGrid, List, Building, House, DollarSign, BarChart3, Calendar, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProjectSiteForm } from './projects/ProjectSiteForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
    projectSize: '50,000', // in square meters
    developmentStage: 'Construction',
    documentTitle: 'Certificate of Occupancy',
    completionPercentage: 65,
    startDate: '2024-01-15',
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
    projectSize: '15,000', // in square meters
    developmentStage: 'Marketing',
    documentTitle: 'Approved Survey Plan',
    completionPercentage: 80,
    startDate: '2023-08-10',
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
    projectSize: '100,000', // in square meters
    developmentStage: 'Handover',
    documentTitle: 'Family Receipt & Layout Plan',
    completionPercentage: 100,
    startDate: '2023-01-20',
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
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'paused':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'sold out':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Construction':
        return 'bg-orange-50 text-orange-700';
      case 'Marketing':
        return 'bg-purple-50 text-purple-700';
      case 'Handover':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-50 text-gray-700';
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
  const totalRevenue = totalSold * 25000000;

  const handleNewProject = () => {
    setEditingProject(null);
    setIsProjectFormOpen(true);
  };

  const handleCardClick = (projectId: number) => {
    navigate(`/company/projects/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Project Sites</h1>
              <p className="text-lg text-gray-600">Manage and oversee all your real estate development projects</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500 mt-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>{totalProjects} Active Projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <House className="h-4 w-4" />
                  <span>{totalUnits.toLocaleString()} Total Units</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>{((totalSold / totalUnits) * 100).toFixed(1)}% Sales Rate</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleNewProject} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm px-6 py-3 h-auto text-base font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Project Site
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500 mb-2">Total Projects</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {totalProjects}
                  </div>
                  <div className="text-xs text-gray-500">All registered</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
                  <Building className="h-6 w-6 text-violet-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500 mb-2">Total Units</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-1">
                    {totalUnits.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Across all projects</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl">
                  <House className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500 mb-2">Units Sold</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                    {totalSold.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Successfully closed</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500 mb-2">Total Revenue</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1">
                    ₦{(totalRevenue / 1000000000).toFixed(1)}B
                  </div>
                  <div className="text-xs text-gray-500">All time earnings</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by project name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] border-gray-200">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="sold out">Sold Out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between lg:justify-end gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Filter className="h-4 w-4" />
                  <span>{filteredProjects.length} of {mockProjectSites.length} projects</span>
                </div>
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`${viewMode === 'grid' 
                      ? 'bg-white shadow-sm text-indigo-600 border border-indigo-100' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`${viewMode === 'list' 
                      ? 'bg-white shadow-sm text-indigo-600 border border-indigo-100' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-sm bg-white overflow-hidden"
                onClick={() => handleCardClick(project.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {project.name}
                      </CardTitle>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(project.status)} border text-xs font-medium`}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Project Progress</span>
                      <span className="font-medium text-gray-900">{project.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${project.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Project Info Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 p-3 rounded-lg">
                      <div className="text-xs text-blue-600 font-medium mb-1">Size</div>
                      <div className="font-bold text-blue-800 text-sm">{project.projectSize} m²</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 p-3 rounded-lg">
                      <div className="text-xs text-purple-600 font-medium mb-1">Units</div>
                      <div className="font-bold text-purple-800 text-sm">{project.totalUnits}</div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-100 p-3 rounded-lg">
                      <div className="text-xs text-indigo-600 font-medium mb-1">Stage</div>
                      <Badge className={`${getStageColor(project.developmentStage)} text-xs border-0 font-medium`}>
                        {project.developmentStage}
                      </Badge>
                    </div>
                  </div>

                  {/* Enhanced KPI Stats Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100 p-4 rounded-xl text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-xl font-bold text-emerald-700 mb-1">{project.soldUnits}</div>
                        <div className="text-xs text-emerald-600 font-medium">Sold Units</div>
                      </div>
                      <div className="absolute top-1 right-1 opacity-20">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 p-4 rounded-xl text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-xl font-bold text-amber-700 mb-1">{project.reservedUnits}</div>
                        <div className="text-xs text-amber-600 font-medium">Reserved</div>
                      </div>
                      <div className="absolute top-1 right-1 opacity-20">
                        <Calendar className="h-5 w-5 text-amber-500" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 p-4 rounded-xl text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-xl font-bold text-blue-700 mb-1">{project.availableUnits}</div>
                        <div className="text-xs text-blue-600 font-medium">Available</div>
                      </div>
                      <div className="absolute top-1 right-1 opacity-20">
                        <House className="h-5 w-5 text-blue-500" />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      Started {new Date(project.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Building2 className="h-3 w-3 mr-1" />
                      {project.totalBlocks} blocks
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
                className="hover:shadow-md transition-all duration-200 cursor-pointer border-0 shadow-sm bg-white"
                onClick={() => handleCardClick(project.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                            <Badge className={`${getStatusColor(project.status)} border`}>
                              {project.status}
                            </Badge>
                            <Badge className={getStageColor(project.developmentStage)}>
                              {project.developmentStage}
                            </Badge>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm space-x-4">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {project.location}
                            </div>
                            <div>•</div>
                            <div>{project.projectSize} m²</div>
                            <div>•</div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Started {new Date(project.startDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{project.totalBlocks}</div>
                        <div className="text-gray-500">Blocks</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{project.totalUnits}</div>
                        <div className="text-gray-500">Units</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-emerald-600">{project.soldUnits}</div>
                        <div className="text-gray-500">Sold</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-amber-600">{project.reservedUnits}</div>
                        <div className="text-gray-500">Reserved</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{project.availableUnits}</div>
                        <div className="text-gray-500">Available</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-indigo-600">{project.completionPercentage}%</div>
                        <div className="text-gray-500">Complete</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-12 text-center">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No project sites found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
                  : 'Get started by creating your first project site to begin managing your real estate developments.'}
              </p>
              <Button 
                onClick={handleNewProject} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 h-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Project Site
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

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
