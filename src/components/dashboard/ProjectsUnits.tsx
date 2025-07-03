
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, MapPin, Building, Home, DollarSign, Search, Eye, Handshake, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    allocatedUnits: 89,
    pendingAllocations: 8,
    reservedUnits: 23,
    availableUnits: 38,
    interestedUnits: 12,
    offeredUnits: 8,
    revokedUnits: 2,
    status: 'ongoing',
    developmentStage: 'Construction',
    revenue: '₦2.5B',
    lastActivity: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=450&fit=crop'
  },
  {
    id: 2,
    name: 'Emerald Heights',
    category: 'Mixed',
    type: 'Commercial',
    location: 'Abuja, FCT',
    city: 'Abuja',
    state: 'Federal Capital Territory',
    totalBlocks: 8,
    totalUnits: 200,
    allocatedUnits: 156,
    pendingAllocations: 5,
    reservedUnits: 12,
    availableUnits: 32,
    interestedUnits: 18,
    offeredUnits: 15,
    revokedUnits: 3,
    status: 'ongoing',
    developmentStage: 'Marketing',
    revenue: '₦4.2B',
    lastActivity: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=450&fit=crop'
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
    allocatedUnits: 245,
    pendingAllocations: 12,
    reservedUnits: 18,
    availableUnits: 37,
    interestedUnits: 25,
    offeredUnits: 20,
    revokedUnits: 0,
    status: 'ongoing',
    developmentStage: 'Pre-Launch',
    revenue: '₦6.8B',
    lastActivity: '30 minutes ago',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=450&fit=crop'
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
    allocatedUnits: 167,
    pendingAllocations: 3,
    reservedUnits: 8,
    availableUnits: 5,
    interestedUnits: 8,
    offeredUnits: 5,
    revokedUnits: 1,
    status: 'completed',
    developmentStage: 'Handover',
    revenue: '₦3.9B',
    lastActivity: '3 hours ago',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=450&fit=crop'
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
    allocatedUnits: 198,
    pendingAllocations: 7,
    reservedUnits: 25,
    availableUnits: 27,
    interestedUnits: 15,
    offeredUnits: 12,
    revokedUnits: 0,
    status: 'ongoing',
    developmentStage: 'Planning',
    revenue: '₦5.5B',
    lastActivity: '45 minutes ago',
    image: 'https://images.unsplash.com/photo-1503602642458-232114445914?w=800&h=450&fit=crop'
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
    allocatedUnits: 280,
    pendingAllocations: 15,
    reservedUnits: 45,
    availableUnits: 75,
    interestedUnits: 35,
    offeredUnits: 25,
    revokedUnits: 5,
    status: 'ongoing',
    developmentStage: 'Construction',
    revenue: '₦7.2B',
    lastActivity: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=450&fit=crop'
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
    allocatedUnits: 320,
    pendingAllocations: 20,
    reservedUnits: 80,
    availableUnits: 100,
    interestedUnits: 40,
    offeredUnits: 30,
    revokedUnits: 0,
    status: 'ongoing',
    developmentStage: 'Marketing',
    revenue: '₦4.8B',
    lastActivity: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1501127122-970c479ebc57?w=800&h=450&fit=crop'
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
    allocatedUnits: 65,
    pendingAllocations: 2,
    reservedUnits: 10,
    availableUnits: 5,
    interestedUnits: 8,
    offeredUnits: 5,
    revokedUnits: 0,
    status: 'ongoing',
    developmentStage: 'Marketing',
    revenue: '₦8.5B',
    lastActivity: '4 hours ago',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=450&fit=crop'
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
    allocatedUnits: 180,
    pendingAllocations: 6,
    reservedUnits: 15,
    availableUnits: 25,
    interestedUnits: 12,
    offeredUnits: 10,
    revokedUnits: 0,
    status: 'ongoing',
    developmentStage: 'Construction',
    revenue: '₦3.8B',
    lastActivity: '6 hours ago',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=450&fit=crop'
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
    allocatedUnits: 45,
    pendingAllocations: 3,
    reservedUnits: 20,
    availableUnits: 95,
    interestedUnits: 8,
    offeredUnits: 5,
    revokedUnits: 0,
    status: 'upcoming',
    developmentStage: 'Pre-Launch',
    revenue: '₦1.2B',
    lastActivity: '1 day ago',
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc9701bc?w=800&h=450&fit=crop'
  }
];

export function ProjectsUnits() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const navigate = useNavigate();

  const getDevelopmentStageColor = (stage: string) => {
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
    
    const matchesStage = stageFilter === 'all' || project.developmentStage === stageFilter;
    
    return matchesSearch && matchesStage;
  });

  const handleProjectClick = (projectId: number) => {
    navigate(`/company/projects/${projectId}`);
  };

  const handleViewDetails = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    navigate(`/company/projects/${projectId}`);
  };

  const handleNewProject = () => {
    navigate('/company/projects/new');
  };

  const developmentStages = ['Planning', 'Pre-Launch', 'Marketing', 'Construction', 'Handover', 'Completed'];

  // Calculate totals for KPI cards
  const totalProjects = mockProjects.length;
  const totalUnits = mockProjects.reduce((sum, project) => sum + project.totalUnits, 0);
  const totalAllocations = mockProjects.reduce((sum, project) => sum + project.allocatedUnits, 0);
  const totalPendingAllocations = mockProjects.reduce((sum, project) => sum + (project.pendingAllocations || 0), 0);

  const kpiData = [
    {
      title: 'Total Projects',
      value: totalProjects.toString(),
      subtitle: 'All registered',
      icon: Building,
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      cardBg: 'from-purple-50 to-purple-100',
    },
    {
      title: 'Total Units',
      value: totalUnits.toLocaleString(),
      subtitle: 'Across all projects',
      icon: Home,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-100',
      cardBg: 'from-emerald-50 to-emerald-100',
    },
    {
      title: 'Total Allocations',
      value: totalAllocations.toLocaleString(),
      subtitle: 'Successfully allocated',
      icon: Handshake,
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      cardBg: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Pending Approvals',
      value: totalPendingAllocations.toString(),
      subtitle: 'Awaiting approval',
      icon: AlertTriangle,
      color: 'text-amber-700',
      bgColor: 'bg-amber-100',
      cardBg: 'from-amber-50 to-amber-100',
    },
  ];

  const getProjectImage = (project: any) => {
    return project.image || '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your real estate projects, blocks, and units with allocation tracking</p>
        </div>
        <Button 
          className="bg-gradient-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0"
          onClick={handleNewProject}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Project Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className={`bg-gradient-to-br ${kpi.cardBg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 rounded-2xl animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
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
                    <SelectValue placeholder="Development stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    {developmentStages.map((stage) => (
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
              >
                Grid View
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-white overflow-hidden group border border-gray-200 hover:border-gray-300 rounded-xl animate-fade-in transform hover:scale-[1.02]"
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Project Image */}
              <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={getProjectImage(project)} 
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ aspectRatio: '16/9' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png';
                  }}
                />
                {/* Development Stage Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={getDevelopmentStageColor(project.developmentStage)}>
                    {project.developmentStage}
                  </Badge>
                </div>
                {/* Pending Indicator */}
                {project.pendingAllocations > 0 && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-600 text-white text-xs flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{project.pendingAllocations} Pending</span>
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Project Info */}
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{project.city}, {project.state}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      Last activity: {project.lastActivity}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{project.totalBlocks}</div>
                      <div className="text-xs text-gray-500">Blocks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{project.totalUnits}</div>
                      <div className="text-xs text-gray-500">Total Units</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{project.allocatedUnits}</div>
                      <div className="text-xs text-gray-500">Allocated</div>
                    </div>
                  </div>

                  {/* Unit Status Summary */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending:</span>
                      <span className="font-medium text-yellow-600">{project.pendingAllocations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-medium text-blue-600">{project.availableUnits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reserved:</span>
                      <span className="font-medium text-purple-600">{project.reservedUnits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-green-600">{project.revenue}</span>
                    </div>
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
                  <TableHead>Allocation Status</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Last Activity</TableHead>
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
                      <Badge className={getDevelopmentStageColor(project.developmentStage)}>
                        {project.developmentStage}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="font-medium">{project.totalUnits}</span>
                        </div>
                        <div className="text-xs text-gray-500 space-y-0.5">
                          <div>Allocated: {project.allocatedUnits}</div>
                          <div>Pending: {project.pendingAllocations}</div>
                          <div>Available: {project.availableUnits}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{project.revenue}</TableCell>
                    <TableCell className="text-sm text-gray-500">{project.lastActivity}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => handleViewDetails(e, project.id)}
                        className="h-8 px-3"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
