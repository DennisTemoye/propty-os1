import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, MapPin, FileText, Building, Home, DollarSign, Search, Users, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NewProjectForm } from './forms/NewProjectForm';
import { ProjectDocumentsView } from './projects/ProjectDocumentsView';
import { UpdateAllocationStatusModal } from './forms/UpdateAllocationStatusModal';
import { RevokeAllocationModal } from './forms/RevokeAllocationModal';

const statusColors = {
  'available': 'bg-gray-100 text-gray-800',
  'interested': 'bg-blue-100 text-blue-800',
  'offered': 'bg-orange-100 text-orange-800',
  'allocated': 'bg-green-100 text-green-800',
  'revoked': 'bg-red-100 text-red-800'
};

const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    category: 'Housing',
    type: 'Residential',
    location: 'Lekki, Lagos',
    totalBlocks: 5,
    totalUnits: 150,
    soldUnits: 89,
    reservedUnits: 23,
    availableUnits: 38,
    status: 'ongoing',
    projectStage: 'Construction',
    revenue: '₦2.5B',
    units: [
      {
        id: 1,
        name: 'Block A - Plot 02',
        status: 'allocated',
        client: 'John Doe',
        amount: '₦25M',
        lastUpdated: '2024-01-20'
      },
      {
        id: 2,
        name: 'Block A - Plot 03',
        status: 'offered',
        client: 'Jane Smith',
        amount: '₦25M',
        lastUpdated: '2024-01-18'
      },
      {
        id: 3,
        name: 'Block A - Plot 04',
        status: 'interested',
        client: 'Mike Johnson',
        amount: '₦25M',
        lastUpdated: '2024-01-22'
      },
      {
        id: 4,
        name: 'Block A - Plot 05',
        status: 'available',
        client: null,
        amount: '₦25M',
        lastUpdated: '2024-01-15'
      }
    ]
  },
  {
    id: 2,
    name: 'Emerald Heights',
    category: 'Mixed',
    type: 'Commercial',
    location: 'Abuja, FCT',
    totalBlocks: 8,
    totalUnits: 200,
    soldUnits: 156,
    reservedUnits: 12,
    availableUnits: 32,
    status: 'ongoing',
    projectStage: 'Marketing',
    revenue: '₦4.2B'
  },
  {
    id: 3,
    name: 'Golden View Towers',
    category: 'Housing',
    type: 'Residential',
    location: 'Victoria Island, Lagos',
    totalBlocks: 12,
    totalUnits: 300,
    soldUnits: 245,
    reservedUnits: 18,
    availableUnits: 37,
    status: 'ongoing',
    projectStage: 'Pre-Launch',
    revenue: '₦6.8B'
  },
  {
    id: 4,
    name: 'Sunset Heights',
    category: 'Housing',
    type: 'Residential',
    location: 'Ikoyi, Lagos',
    totalBlocks: 6,
    totalUnits: 180,
    soldUnits: 167,
    reservedUnits: 8,
    availableUnits: 5,
    status: 'completed',
    projectStage: 'Handover',
    revenue: '₦3.9B'
  },
  {
    id: 5,
    name: 'Marina Heights',
    category: 'Mixed',
    type: 'Mixed-Use',
    location: 'Marina, Lagos',
    totalBlocks: 10,
    totalUnits: 250,
    soldUnits: 198,
    reservedUnits: 25,
    availableUnits: 27,
    status: 'ongoing',
    projectStage: 'Planning',
    revenue: '₦5.5B'
  },
  {
    id: 6,
    name: 'Palm Grove Estate',
    category: 'Housing',
    type: 'Residential',
    location: 'Ajah, Lagos',
    totalBlocks: 15,
    totalUnits: 400,
    soldUnits: 280,
    reservedUnits: 45,
    availableUnits: 75,
    status: 'ongoing',
    projectStage: 'Construction',
    revenue: '₦7.2B'
  },
  {
    id: 7,
    name: 'Royal Gardens',
    category: 'Land',
    type: 'Land Project',
    location: 'Epe, Lagos',
    totalBlocks: 20,
    totalUnits: 500,
    soldUnits: 320,
    reservedUnits: 80,
    availableUnits: 100,
    status: 'ongoing',
    projectStage: 'Marketing',
    revenue: '₦4.8B'
  },
  {
    id: 8,
    name: 'Crystal Bay',
    category: 'Housing',
    type: 'Waterfront',
    location: 'Banana Island, Lagos',
    totalBlocks: 4,
    totalUnits: 80,
    soldUnits: 65,
    reservedUnits: 10,
    availableUnits: 5,
    status: 'ongoing',
    projectStage: 'Marketing',
    revenue: '₦8.5B'
  },
  {
    id: 9,
    name: 'Metro Heights',
    category: 'Mixed',
    type: 'Commercial',
    location: 'Ikeja, Lagos',
    totalBlocks: 7,
    totalUnits: 220,
    soldUnits: 180,
    reservedUnits: 15,
    availableUnits: 25,
    status: 'ongoing',
    projectStage: 'Construction',
    revenue: '₦3.8B'
  },
  {
    id: 10,
    name: 'Paradise Gardens',
    category: 'Housing',
    type: 'Residential',
    location: 'Ibadan, Oyo',
    totalBlocks: 8,
    totalUnits: 160,
    soldUnits: 45,
    reservedUnits: 20,
    availableUnits: 95,
    status: 'upcoming',
    projectStage: 'Pre-Launch',
    revenue: '₦1.2B'
  }
];

export function ProjectsUnits() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateUnitStatus = (unit: any) => {
    setSelectedUnit(unit);
    setIsUpdateStatusOpen(true);
  };

  const handleRevokeUnit = (unit: any) => {
    setSelectedUnit(unit);
    setIsRevokeModalOpen(true);
  };

  const handleStatusUpdate = (data: any) => {
    console.log('Unit status updated:', data);
    // Here you would update your state management/backend
  };

  const handleRevocation = (data: any) => {
    console.log('Unit allocation revoked:', data);
    // Here you would update your state management/backend
  };

  // Filter projects based on search and stage
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
      subtitle: 'Successfully closed',
      icon: Users,
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your real estate projects, blocks, and units</p>
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
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unit status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="allocated">Allocated</SelectItem>
                    <SelectItem value="revoked">Revoked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid View
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Table View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer bg-white"
              onClick={() => handleProjectClick(project.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={getProjectStageColor(project.projectStage)}>
                    {project.projectStage}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{project.type}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Blocks:</span>
                      <span className="font-medium">{project.totalBlocks || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Units:</span>
                      <span className="font-medium">{project.totalUnits}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Allocated:</span>
                      <span className="font-medium text-green-600">{project.soldUnits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Reserved:</span>
                      <span className="font-medium text-orange-600">{project.reservedUnits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Available:</span>
                      <span className="font-medium text-blue-600">{project.availableUnits}</span>
                    </div>
                  </div>

                  {/* Unit Status Overview */}
                  {project.units && (
                    <div className="border-t pt-3">
                      <div className="text-sm font-medium mb-2">Recent Unit Activity</div>
                      <div className="space-y-1">
                        {project.units.slice(0, 3).map((unit) => (
                          <div key={unit.id} className="flex items-center justify-between text-xs">
                            <span className="truncate">{unit.name}</span>
                            <div className="flex items-center space-x-2">
                              <Badge className={statusColors[unit.status as keyof typeof statusColors]} size="sm">
                                {unit.status}
                              </Badge>
                              {unit.status !== 'available' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateUnitStatus(unit);
                                  }}
                                  className="h-6 w-6 p-0"
                                >
                                  <RefreshCw className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(project.soldUnits / project.totalUnits) * 100}%` }}
                    ></div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Revenue:</span>
                      <span className="font-bold text-purple-600">{project.revenue}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => handleManageBlocks(e, project.id)}
                    >
                      <Building className="h-3 w-3 mr-1" />
                      Manage Blocks
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => handleViewDocuments(e, project)}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Documents
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Blocks/Units</TableHead>
                  <TableHead>Allocation Status</TableHead>
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
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.type}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getProjectStageColor(project.projectStage)}>
                        {project.projectStage}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{project.totalBlocks || 0} blocks</div>
                        <div className="text-gray-500">{project.totalUnits} units</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {project.soldUnits} Allocated
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          {project.availableUnits} Available
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-purple-600">
                      {project.revenue}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => handleManageBlocks(e, project.id)}
                        >
                          <Building className="h-3 w-3" />
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

      <UpdateAllocationStatusModal
        isOpen={isUpdateStatusOpen}
        onClose={() => setIsUpdateStatusOpen(false)}
        allocation={selectedUnit}
        onStatusUpdate={handleStatusUpdate}
      />

      <RevokeAllocationModal
        isOpen={isRevokeModalOpen}
        onClose={() => setIsRevokeModalOpen(false)}
        allocation={selectedUnit}
        onRevoke={handleRevocation}
      />
    </div>
  );
}
