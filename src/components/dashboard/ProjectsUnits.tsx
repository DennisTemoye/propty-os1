import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, MapPin, FileText, Building, Home, DollarSign, Search, Edit, Trash2, UserPlus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NewProjectForm } from './forms/NewProjectForm';
import { ProjectDocumentsView } from './projects/ProjectDocumentsView';
import { ResponsiveContainer } from '../common/ResponsiveContainer';
import { useResponsive } from '@/hooks/use-responsive';
import { toast } from 'sonner';

const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    category: 'Housing',
    type: 'Residential',
    location: 'Lekki, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    totalBlocks: 5,
    totalUnits: 150,
    soldUnits: 89,
    reservedUnits: 23,
    availableUnits: 38,
    interestedUnits: 12,
    offeredUnits: 8,
    allocatedUnits: 69,
    revokedUnits: 0,
    status: 'ongoing',
    projectStage: 'Construction',
    developmentStage: 'Construction',
    revenue: '₦2.5B',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop'
  },
  {
    id: 2,
    name: 'Emerald Heights',
    category: 'Mixed',
    type: 'Commercial',
    location: 'Abuja, FCT',
    city: 'Abuja',
    state: 'FCT',
    totalBlocks: 8,
    totalUnits: 200,
    soldUnits: 156,
    reservedUnits: 12,
    availableUnits: 32,
    interestedUnits: 18,
    offeredUnits: 15,
    allocatedUnits: 123,
    revokedUnits: 2,
    status: 'ongoing',
    projectStage: 'Marketing',
    developmentStage: 'Marketing',
    revenue: '₦4.2B',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop'
  },
  {
    id: 3,
    name: 'Golden View Towers',
    category: 'Housing',
    type: 'Residential',
    location: 'Victoria Island, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    totalBlocks: 12,
    totalUnits: 300,
    soldUnits: 245,
    reservedUnits: 18,
    availableUnits: 37,
    status: 'ongoing',
    projectStage: 'Pre-Launch',
    developmentStage: 'Pre-Launch',
    revenue: '₦6.8B',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop'
  },
  {
    id: 4,
    name: 'Sunset Heights',
    category: 'Housing',
    type: 'Residential',
    location: 'Ikoyi, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    totalBlocks: 6,
    totalUnits: 180,
    soldUnits: 167,
    reservedUnits: 8,
    availableUnits: 5,
    status: 'completed',
    projectStage: 'Handover',
    developmentStage: 'Completed',
    revenue: '₦3.9B',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=450&fit=crop'
  },
  {
    id: 5,
    name: 'Marina Heights',
    category: 'Mixed',
    type: 'Mixed-Use',
    location: 'Marina, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    totalBlocks: 10,
    totalUnits: 250,
    soldUnits: 198,
    reservedUnits: 25,
    availableUnits: 27,
    status: 'ongoing',
    projectStage: 'Planning',
    developmentStage: 'Planning',
    revenue: '₦5.5B',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop'
  },
  {
    id: 6,
    name: 'Palm Grove Estate',
    category: 'Housing',
    type: 'Residential',
    location: 'Ajah, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    totalBlocks: 15,
    totalUnits: 400,
    soldUnits: 280,
    reservedUnits: 45,
    availableUnits: 75,
    status: 'ongoing',
    projectStage: 'Construction',
    developmentStage: 'Construction',
    revenue: '₦7.2B',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop'
  },
  {
    id: 7,
    name: 'Royal Gardens',
    category: 'Land',
    type: 'Land Project',
    location: 'Epe, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    totalBlocks: 20,
    totalUnits: 500,
    soldUnits: 320,
    reservedUnits: 80,
    availableUnits: 100,
    status: 'ongoing',
    projectStage: 'Marketing',
    developmentStage: 'Marketing',
    revenue: '₦4.8B',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop'
  },
  {
    id: 8,
    name: 'Crystal Bay',
    category: 'Housing',
    type: 'Waterfront',
    location: 'Banana Island, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    totalBlocks: 4,
    totalUnits: 80,
    soldUnits: 65,
    reservedUnits: 10,
    availableUnits: 5,
    status: 'ongoing',
    projectStage: 'Marketing',
    developmentStage: 'Marketing',
    revenue: '₦8.5B',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop'
  },
  {
    id: 9,
    name: 'Metro Heights',
    category: 'Mixed',
    type: 'Commercial',
    location: 'Ikeja, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    totalBlocks: 7,
    totalUnits: 220,
    soldUnits: 180,
    reservedUnits: 15,
    availableUnits: 25,
    status: 'ongoing',
    projectStage: 'Construction',
    developmentStage: 'Construction',
    revenue: '₦3.8B',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop'
  },
  {
    id: 10,
    name: 'Paradise Gardens',
    category: 'Housing',
    type: 'Residential',
    location: 'Ibadan, Oyo',
    city: 'Ibadan',
    state: 'Oyo State',
    totalBlocks: 8,
    totalUnits: 160,
    soldUnits: 45,
    reservedUnits: 20,
    availableUnits: 95,
    status: 'upcoming',
    projectStage: 'Pre-Launch',
    developmentStage: 'Pre-Launch',
    revenue: '₦1.2B',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop'
  }
];

export function ProjectsUnits() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();

  const getProjectStageColor = (stage: string) => {
    switch (stage) {
      case 'Planning':
        return 'bg-gray-100 text-gray-800';
      case 'Pre-Launch':
        return 'bg-blue-100 text-blue-800';
      case 'Marketing':
        return 'bg-orange-100 text-orange-800';
      case 'Construction':
        return 'bg-yellow-100 text-yellow-800';
      case 'Handover':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = stageFilter === 'all' || project.projectStage === stageFilter;
    
    return matchesSearch && matchesStage;
  });

  const handleProjectClick = (projectId: number) => {
    navigate(`/company/projects/${projectId}`);
  };

  const handleManageBlocks = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    navigate(`/company/projects/${projectId}/blocks`);
  };

  const handleViewDocuments = (e: React.MouseEvent, project: any) => {
    e.stopPropagation();
    setSelectedProject(project);
    setIsDocumentsModalOpen(true);
  };

  const handleEditProject = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    navigate(`/company/projects/${projectId}/settings`);
  };

  const handleAllocateUnit = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    navigate(`/company/sales-allocation?project=${projectId}`);
  };

  const handleDeleteProject = (projectId: number) => {
    toast.success(`Project ${projectId} deleted successfully`);
    // In real app, this would make an API call to delete the project
  };

  const projectStages = ['Planning', 'Pre-Launch', 'Marketing', 'Construction', 'Handover'];

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
    <ResponsiveContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage your real estate projects, blocks, and units with allocation tracking</p>
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setIsNewProjectOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Project Summary Cards */}
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

        {/* Search and Filters */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects, locations, types..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Project stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      {projectStages.map((stage) => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  size={isMobile ? 'sm' : 'default'}
                >
                  Grid View
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  onClick={() => setViewMode('table')}
                  size={isMobile ? 'sm' : 'default'}
                >
                  Table View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Projects Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-white overflow-hidden group"
                onClick={() => handleProjectClick(project.id)}
              >
                {/* Project Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop'} 
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={getProjectStageColor(project.developmentStage)}>
                      {project.developmentStage}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {project.name}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.city}, {project.state}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{project.type}</Badge>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{project.totalBlocks}</div>
                      <div className="text-xs text-gray-500">Blocks</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{project.totalUnits}</div>
                      <div className="text-xs text-gray-500">Total Units</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{project.allocatedUnits || project.soldUnits}</div>
                      <div className="text-xs text-green-600">Allocated</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">{project.offeredUnits || 0}</div>
                      <div className="text-xs text-yellow-600">Offered</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{project.availableUnits}</div>
                      <div className="text-xs text-blue-600">Available</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{project.reservedUnits}</div>
                      <div className="text-xs text-purple-600">Reserved</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${((project.allocatedUnits || project.soldUnits) / project.totalUnits) * 100}%` }}
                    ></div>
                  </div>

                  {/* Revenue */}
                  <div className="flex justify-between items-center mb-4 pt-2 border-t">
                    <span className="text-sm text-gray-500">Revenue:</span>
                    <span className="font-bold text-purple-600">{project.revenue}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={(e) => handleEditProject(e, project.id)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={(e) => handleAllocateUnit(e, project.id)}
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Allocate
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={(e) => handleViewDocuments(e, project)}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Documents
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1 text-red-600 hover:text-red-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Project</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{project.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            Delete Project
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Units Status</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow 
                        key={project.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleProjectClick(project.id)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img 
                              src={project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=60&h=60&fit=crop'} 
                              alt={project.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium">{project.name}</div>
                              <div className="text-sm text-gray-500">{project.type}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getProjectStageColor(project.developmentStage)}>
                            {project.developmentStage}
                          </Badge>
                        </TableCell>
                        <TableCell>{project.city}, {project.state}</TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Total:</span>
                              <span className="font-medium">{project.totalUnits}</span>
                            </div>
                            <div className="text-xs text-gray-500 space-y-0.5">
                              <div>Allocated: {project.allocatedUnits || project.soldUnits}</div>
                              <div>Available: {project.availableUnits}</div>
                              <div>Offered: {project.offeredUnits || 0}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-purple-600">
                          {project.revenue}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={(e) => handleEditProject(e, project.id)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={(e) => handleAllocateUnit(e, project.id)}
                            >
                              <UserPlus className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={(e) => handleViewDocuments(e, project)}
                            >
                              <FileText className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Modals */}
        <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new real estate project to your portfolio
              </DialogDescription>
            </DialogHeader>
            <NewProjectForm onClose={() => setIsNewProjectOpen(false)} />
          </DialogContent>
        </Dialog>

        <Dialog open={isDocumentsModalOpen} onOpenChange={setIsDocumentsModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Project Documents - {selectedProject?.name}</DialogTitle>
              <DialogDescription>
                View and manage documents for this project
              </DialogDescription>
            </DialogHeader>
            <ProjectDocumentsView project={selectedProject} />
          </DialogContent>
        </Dialog>
      </div>
    </ResponsiveContainer>
  );
}
