
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, MapPin, Plus, Search, Filter, LayoutGrid, List, Building, House, DollarSign, BarChart3, Calendar, Users, TrendingUp, Eye, Edit, Archive, Star, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProjectSiteForm } from './projects/ProjectSiteForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProjectStatsCard } from './projects/ProjectStatsCard';
import { ProjectQuickActions } from './projects/ProjectQuickActions';
import { ProjectFilters } from './projects/ProjectFilters';

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
    priority: 'high',
    projectSize: 50000,
    developmentStage: 'Construction',
    documentTitle: 'Certificate of Occupancy',
    completionPercentage: 65,
    startDate: '2024-01-15',
    estimatedCompletion: '2024-12-15',
    totalValue: 7500000000,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    projectManager: 'John Doe',
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
    priority: 'medium',
    projectSize: 15000,
    developmentStage: 'Marketing',
    documentTitle: 'Approved Survey Plan',
    completionPercentage: 80,
    startDate: '2023-08-10',
    estimatedCompletion: '2024-06-10',
    totalValue: 3750000000,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    projectManager: 'Jane Smith',
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
    status: 'completed',
    priority: 'low',
    projectSize: 100000,
    developmentStage: 'Handover',
    documentTitle: 'Family Receipt & Layout Plan',
    completionPercentage: 100,
    startDate: '2023-01-20',
    estimatedCompletion: '2024-01-20',
    totalValue: 12000000000,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    projectManager: 'Mike Johnson',
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
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('all');
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const navigate = useNavigate();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle };
      case 'paused':
        return { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock };
      case 'completed':
        return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle };
      default:
        return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: AlertCircle };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredProjects = mockProjectSites.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && project.status === 'active') ||
                      (activeTab === 'completed' && project.status === 'completed') ||
                      (activeTab === 'planning' && project.developmentStage === 'Planning');
    
    return matchesSearch && matchesStatus && matchesPriority && matchesTab;
  });

  // Calculate comprehensive KPIs
  const totalProjects = mockProjectSites.length;
  const activeProjects = mockProjectSites.filter(p => p.status === 'active').length;
  const totalUnits = mockProjectSites.reduce((sum, project) => sum + project.totalUnits, 0);
  const totalSold = mockProjectSites.reduce((sum, project) => sum + project.soldUnits, 0);
  const totalRevenue = mockProjectSites.reduce((sum, project) => sum + (project.soldUnits * 25000000), 0);
  const avgCompletion = mockProjectSites.reduce((sum, project) => sum + project.completionPercentage, 0) / totalProjects;

  const handleNewProject = () => {
    setEditingProject(null);
    setIsProjectFormOpen(true);
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setIsProjectFormOpen(true);
  };

  const handleCardClick = (projectId: number) => {
    navigate(`/company/projects/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Project Sites</h1>
                  <p className="text-lg text-gray-600">Comprehensive project management and oversight</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-indigo-500" />
                  <span className="font-medium">{activeProjects} Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <House className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium">{totalUnits.toLocaleString()} Total Units</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{avgCompletion.toFixed(1)}% Avg Progress</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button 
                onClick={handleNewProject} 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 h-auto text-base font-medium"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Project
              </Button>
            </div>
          </div>

          {/* KPI Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProjectStatsCard
              title="Total Projects"
              value={totalProjects.toString()}
              subtitle={`${activeProjects} active`}
              icon={Building}
              trend="+12%"
              trendUp={true}
              gradient="from-violet-500 to-purple-600"
            />
            <ProjectStatsCard
              title="Total Units"
              value={totalUnits.toLocaleString()}
              subtitle="Across all projects"
              icon={House}
              trend="+8%"
              trendUp={true}
              gradient="from-emerald-500 to-teal-600"
            />
            <ProjectStatsCard
              title="Units Sold"
              value={totalSold.toLocaleString()}
              subtitle={`${((totalSold / totalUnits) * 100).toFixed(1)}% rate`}
              icon={DollarSign}
              trend="+15%"
              trendUp={true}
              gradient="from-blue-500 to-cyan-600"
            />
            <ProjectStatsCard
              title="Total Revenue"
              value={`₦${(totalRevenue / 1000000000).toFixed(1)}B`}
              subtitle="All time earnings"
              icon={BarChart3}
              trend="+22%"
              trendUp={true}
              gradient="from-amber-500 to-orange-600"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Enhanced Tabs and Filters */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100/50">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  All Projects ({totalProjects})
                </TabsTrigger>
                <TabsTrigger value="active" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Active ({activeProjects})
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Completed ({mockProjectSites.filter(p => p.status === 'completed').length})
                </TabsTrigger>
                <TabsTrigger value="planning" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Planning ({mockProjectSites.filter(p => p.developmentStage === 'Planning').length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <ProjectFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              viewMode={viewMode}
              setViewMode={setViewMode}
              filteredCount={filteredProjects.length}
              totalCount={mockProjectSites.length}
            />
          </CardContent>
        </Card>

        {/* Enhanced Projects Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const statusConfig = getStatusConfig(project.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <Card 
                  key={project.id} 
                  className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden hover:scale-105 hover:-translate-y-2"
                >
                  {/* Project Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <Badge className={`${statusConfig.color} border font-medium shadow-sm`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {project.status}
                      </Badge>
                      <Badge className={`${getPriorityColor(project.priority)} shadow-sm`}>
                        <Star className="h-3 w-3 mr-1" />
                        {project.priority}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                      <div className="flex items-center text-sm opacity-90">
                        <MapPin className="h-3 w-3 mr-1" />
                        {project.location}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-6">
                    {/* Progress Section */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Project Progress</span>
                        <span className="text-sm font-bold text-indigo-600">{project.completionPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-1000 shadow-sm" 
                          style={{ width: `${project.completionPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200/50">
                        <div className="text-xs font-medium text-gray-500 mb-1">Project Size</div>
                        <div className="text-lg font-bold text-gray-900">{(project.projectSize / 1000).toFixed(0)}K m²</div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200/50">
                        <div className="text-xs font-medium text-gray-500 mb-1">Total Units</div>
                        <div className="text-lg font-bold text-gray-900">{project.totalUnits}</div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200/50">
                        <div className="text-xs font-medium text-gray-500 mb-1">Stage</div>
                        <div className="text-sm font-semibold text-indigo-600">{project.developmentStage}</div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200/50">
                        <div className="text-xs font-medium text-gray-500 mb-1">Value</div>
                        <div className="text-sm font-bold text-gray-900">₦{(project.totalValue / 1000000000).toFixed(1)}B</div>
                      </div>
                    </div>

                    {/* Sales Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-emerald-700">{project.soldUnits}</div>
                        <div className="text-xs text-emerald-600 font-medium">Sold</div>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-amber-700">{project.reservedUnits}</div>
                        <div className="text-xs text-amber-600 font-medium">Reserved</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-blue-700">{project.availableUnits}</div>
                        <div className="text-xs text-blue-600 font-medium">Available</div>
                      </div>
                    </div>

                    {/* Project Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500 space-x-3">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(project.startDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {project.projectManager}
                        </div>
                      </div>
                      
                      <ProjectQuickActions
                        project={project}
                        onView={() => handleCardClick(project.id)}
                        onEdit={() => handleEditProject(project)}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const statusConfig = getStatusConfig(project.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <Card 
                  key={project.id} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md bg-white/80 backdrop-blur-sm overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 flex-1">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={project.imageUrl} 
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-bold text-lg text-gray-900 truncate">{project.name}</h3>
                            <Badge className={`${statusConfig.color} border text-xs`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {project.status}
                            </Badge>
                            <Badge className={`${getPriorityColor(project.priority)} text-xs`}>
                              {project.priority}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center text-gray-600 text-sm space-x-4 mb-3">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {project.location}
                            </div>
                            <div>•</div>
                            <div>{(project.projectSize / 1000).toFixed(0)}K m²</div>
                            <div>•</div>
                            <div>{project.developmentStage}</div>
                            <div>•</div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {project.projectManager}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 max-w-xs">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{project.completionPercentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full" 
                                  style={{ width: `${project.completionPercentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-8 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-gray-900">{project.totalBlocks}</div>
                          <div className="text-gray-500 text-xs">Blocks</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900">{project.totalUnits}</div>
                          <div className="text-gray-500 text-xs">Units</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-emerald-600">{project.soldUnits}</div>
                          <div className="text-gray-500 text-xs">Sold</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-amber-600">{project.reservedUnits}</div>
                          <div className="text-gray-500 text-xs">Reserved</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{project.availableUnits}</div>
                          <div className="text-gray-500 text-xs">Available</div>
                        </div>
                        
                        <ProjectQuickActions
                          project={project}
                          onView={() => handleCardClick(project.id)}
                          onEdit={() => handleEditProject(project)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Enhanced Empty State */}
        {filteredProjects.length === 0 && (
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-16 text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <Building2 className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No projects found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                  ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
                  : 'Get started by creating your first project site to begin managing your real estate developments.'}
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button 
                  onClick={handleNewProject} 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 h-auto text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="h-5 w-5 mr-3" />
                  Create Your First Project
                </Button>
                {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all') && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setPriorityFilter('all');
                    }}
                    className="px-6 py-4 h-auto text-lg"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Enhanced Project Form Modal */}
      <Dialog open={isProjectFormOpen} onOpenChange={setIsProjectFormOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold">
              {editingProject ? 'Edit Project Site' : 'Create New Project Site'}
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-600">
              {editingProject 
                ? 'Update project information, settings, and configuration' 
                : 'Set up a new real estate project site with comprehensive details, blocks, and units'
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
