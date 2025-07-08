import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  ArrowLeft, 
  Edit, 
  MapPin, 
  User, 
  UserPlus, 
  Trash2, 
  Building, 
  Clock, 
  MoreHorizontal,
  DollarSign,
  TrendingUp,
  Home,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Eye,
  Settings,
  Share2,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Star,
  Target,
  Zap
} from 'lucide-react';
import { ProjectOverviewContent } from '@/components/dashboard/projects/ProjectOverviewContent';
import { EnhancedBlocksTab } from '@/components/dashboard/projects/EnhancedBlocksTab';
import { ProjectDocumentsTab } from '@/components/dashboard/projects/ProjectDocumentsTab';
import { ProjectSalesHistoryTab } from '@/components/dashboard/projects/ProjectSalesHistoryTab';
import { RevokeAllocationModal } from '@/components/dashboard/forms/RevokeAllocationModal';
import { AllocateUnitModal } from '@/components/dashboard/sales-allocation/AllocateUnitModal';
import { ReallocationModal } from '@/components/dashboard/forms/ReallocationModal';
import { getProjectImage, handleImageError } from '@/lib/utils';
import { toast } from 'sonner';

const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Housing',
    type: 'Residential',
    status: 'ongoing',
    developmentStage: 'Construction',
    totalBlocks: 5,
    totalUnits: 150,
    availableUnits: 38,
    allocatedUnits: 89,
    reservedUnits: 23,
    pendingAllocations: 8,
    interestedUnits: 12,
    offeredUnits: 8,
    revokedUnits: 2,
    totalClients: 89,
    totalRevenue: '₦2,500,000,000',
    allocationRate: 59,
    lastUpdated: '2024-01-15',
    description: 'A premium residential estate featuring modern amenities and strategic location in the heart of Lekki.',
    projectManager: 'Alice Johnson',
    internalNotes: 'Focus on completing Block A before marketing Block C units.',
    tags: ['Premium', 'Residential', 'Lekki'],
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=450&fit=crop',
    revenue: '₦2.5B',
    lastActivity: '2 hours ago',
    completionPercentage: 75,
    constructionStartDate: '2023-03-15',
    estimatedCompletion: '2025-06-30'
  },
  {
    id: 2,
    name: 'Emerald Heights',
    location: 'Abuja, FCT',
    city: 'Abuja',
    state: 'Federal Capital Territory',
    category: 'Mixed',
    type: 'Commercial',
    status: 'ongoing',
    developmentStage: 'Marketing',
    totalBlocks: 8,
    totalUnits: 200,
    availableUnits: 32,
    allocatedUnits: 156,
    reservedUnits: 12,
    pendingAllocations: 5,
    interestedUnits: 18,
    offeredUnits: 15,
    revokedUnits: 3,
    totalClients: 156,
    totalRevenue: '₦4,200,000,000',
    allocationRate: 78,
    lastUpdated: '2024-01-14',
    description: 'A modern mixed-use development in the heart of Abuja.',
    projectManager: 'Bob Wilson',
    internalNotes: 'Commercial units showing strong interest.',
    tags: ['Mixed-Use', 'Commercial', 'Abuja'],
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=450&fit=crop',
    revenue: '₦4.2B',
    lastActivity: '1 hour ago',
    completionPercentage: 60,
    constructionStartDate: '2023-01-10',
    estimatedCompletion: '2025-12-20'
  },
  {
    id: 3,
    name: 'Golden View Towers',
    location: 'Victoria Island, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Housing',
    type: 'Residential',
    status: 'ongoing',
    developmentStage: 'Pre-Launch',
    totalBlocks: 12,
    totalUnits: 300,
    availableUnits: 37,
    allocatedUnits: 245,
    reservedUnits: 18,
    pendingAllocations: 12,
    interestedUnits: 25,
    offeredUnits: 20,
    revokedUnits: 0,
    totalClients: 245,
    totalRevenue: '₦6,800,000,000',
    allocationRate: 82,
    lastUpdated: '2024-01-13',
    description: 'Luxury towers with stunning city views on Victoria Island.',
    projectManager: 'Carol Davis',
    internalNotes: 'High-end luxury market showing excellent response.',
    tags: ['Luxury', 'High-rise', 'Victoria Island'],
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=450&fit=crop',
    revenue: '₦6.8B',
    lastActivity: '30 minutes ago',
    completionPercentage: 45,
    constructionStartDate: '2023-06-01',
    estimatedCompletion: '2026-03-15'
  },
  {
    id: 4,
    name: 'Sunset Heights',
    location: 'Ikoyi, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Housing',
    type: 'Residential',
    status: 'completed',
    developmentStage: 'Handover',
    totalBlocks: 6,
    totalUnits: 180,
    availableUnits: 5,
    allocatedUnits: 167,
    reservedUnits: 8,
    pendingAllocations: 3,
    interestedUnits: 8,
    offeredUnits: 5,
    revokedUnits: 1,
    totalClients: 167,
    totalRevenue: '₦3,900,000,000',
    allocationRate: 93,
    lastUpdated: '2024-01-12',
    description: 'Premium residential development in the prestigious Ikoyi area.',
    projectManager: 'David Brown',
    internalNotes: 'Nearly sold out, focus on final unit sales.',
    tags: ['Premium', 'Ikoyi', 'Nearly Complete'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=450&fit=crop',
    revenue: '₦3.9B',
    lastActivity: '3 hours ago',
    completionPercentage: 95,
    constructionStartDate: '2022-08-20',
    estimatedCompletion: '2024-12-01'
  }
];

export function EnhancedProjectDetailView() {
  const params = useParams();
  const navigate = useNavigate();
  
  const projectId = params.projectId || params.id;
  
  const [isAllocateUnitOpen, setIsAllocateUnitOpen] = useState(false);
  const [isReallocateOpen, setIsReallocateOpen] = useState(false);
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);
  const [reallocateData, setReallocateData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const project = mockProjects.find(p => p.id === parseInt(projectId || '1'));

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <Building className="h-16 w-16 text-muted-foreground" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Project Not Found</h2>
          <p className="text-muted-foreground">The requested project could not be found.</p>
        </div>
        <Button onClick={() => navigate('/company/projects')} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ongoing': return 'default';
      case 'completed': return 'secondary';
      case 'upcoming': return 'outline';
      default: return 'outline';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Construction': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Marketing': return 'bg-green-50 text-green-700 border-green-200';
      case 'Pre-Launch': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Planning': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Handover': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleAllocateUnit = () => setIsAllocateUnitOpen(true);
  
  const handleEditProject = () => {
    navigate(`/company/projects/${project.id}/edit`);
  };
  
  const handleViewBlocks = () => {
    setActiveTab('blocks');
  };
  
  const handleViewReports = () => {
    navigate('/company/reports', { state: { projectId: project.id, projectName: project.name } });
  };
  
  const handleViewSalesAllocation = () => {
    navigate('/company/sales', { state: { projectId: project.id, projectName: project.name } });
  };
  
  const handleReallocate = (unitId: string, clientName: string) => {
    setReallocateData({ unitId, clientName });
    setIsReallocateOpen(true);
  };
  
  const handleRevoke = (allocation: any) => {
    setSelectedAllocation(allocation);
    setIsRevokeOpen(true);
  };
  
  const handleDeleteProject = () => {
    toast.success(`Project "${project.name}" has been deleted successfully.`);
    navigate('/company/projects');
  };

  const handlePendingAllocations = () => {
    navigate('/company/sales?tab=pending', { state: { projectId: project.id } });
  };

  const handleViewAllActivity = () => {
    navigate('/company/activity-log', { state: { projectId: project.id } });
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Enhanced Header with Breadcrumb */}
      <div className="bg-gradient-to-r from-background via-muted/10 to-background border-b border-border/40 -mx-6 -mt-6 px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/company/projects')}
              className="shrink-0 hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="min-w-0 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Projects</span>
                <span>/</span>
                <span className="font-medium text-foreground">{project.name}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {project.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{project.projectManager}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  <span>Last updated {project.lastActivity}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={getStatusVariant(project.status)} className="px-3 py-1">
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
            <Badge className={`${getStageColor(project.developmentStage)} px-3 py-1 border`}>
              {project.developmentStage}
            </Badge>
            
            <Button onClick={handleAllocateUnit} className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all">
              <UserPlus className="h-4 w-4 mr-2" />
              Allocate Unit
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="px-3">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem onClick={handleEditProject}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Project Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleViewBlocks}>
                  <Building className="h-4 w-4 mr-2" />
                  Manage Blocks & Units
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleViewReports}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Reports
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleViewSalesAllocation}>
                  <Users className="h-4 w-4 mr-2" />
                  Sales & Allocation Hub
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Project Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Project
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Project</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{project.name}"? This action cannot be undone and will permanently remove all associated data including units, allocations, and documents.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeleteProject}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Delete Project
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Hero Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Project Visual */}
        <Card className="lg:col-span-2 overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="relative h-80 lg:h-96">
            <img 
              src={getProjectImage(project)} 
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Floating Stats */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center text-white">
                  <div className="text-2xl lg:text-3xl font-bold">{project.totalBlocks}</div>
                  <div className="text-sm text-white/80">Blocks</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center text-white">
                  <div className="text-2xl lg:text-3xl font-bold">{project.totalUnits}</div>
                  <div className="text-sm text-white/80">Units</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center text-white">
                  <div className="text-2xl lg:text-3xl font-bold">{project.allocationRate}%</div>
                  <div className="text-sm text-white/80">Allocated</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center text-white">
                  <div className="text-xl lg:text-2xl font-bold">{project.revenue}</div>
                  <div className="text-sm text-white/80">Revenue</div>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="absolute top-6 right-6">
              <div className="bg-white/10 backdrop-blur-md rounded-full p-3">
                <div className="text-white text-center">
                  <div className="text-lg font-bold">{project.completionPercentage}%</div>
                  <div className="text-xs">Complete</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Allocation Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Allocation Progress</span>
                <span className="text-primary font-bold">{project.allocationRate}%</span>
              </div>
              <Progress value={project.allocationRate} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{project.allocatedUnits} allocated</span>
                <span>{project.availableUnits} available</span>
              </div>
            </div>

            <Separator />

            {/* Project Timeline */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Construction Progress</span>
                <span className="text-blue-600 font-bold">{project.completionPercentage}%</span>
              </div>
              <Progress value={project.completionPercentage} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Started {project.constructionStartDate}</span>
                <span>Est. {project.estimatedCompletion}</span>
              </div>
            </div>

            <Separator />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-xl">
                <div className="text-lg font-bold text-green-600">{project.totalClients}</div>
                <div className="text-xs text-muted-foreground">Total Clients</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-xl">
                <div className="text-lg font-bold text-orange-600">{project.pendingAllocations}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                <Home className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">{project.availableUnits}</div>
            <div className="text-sm text-muted-foreground">Available Units</div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{project.allocatedUnits}</div>
            <div className="text-sm text-muted-foreground">Allocated Units</div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-orange-100 group-hover:bg-orange-200 transition-colors">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-orange-600">{project.reservedUnits}</div>
            <div className="text-sm text-muted-foreground">Reserved Units</div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-600">{project.totalClients}</div>
            <div className="text-sm text-muted-foreground">Active Clients</div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-emerald-600">{project.revenue}</div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Allocations Alert */}
      {project.pendingAllocations > 0 && (
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-orange-100">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-orange-900 text-lg">
                    {project.pendingAllocations} Pending Allocations
                  </h3>
                  <p className="text-orange-700">
                    These allocations require your immediate attention for approval
                  </p>
                </div>
              </div>
              <Button 
                onClick={handlePendingAllocations}
                className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Zap className="h-4 w-4 mr-2" />
                Review Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Tabs Section */}
      <Card className="overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="pb-0 border-b border-border/40">
            <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1 h-12">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
              >
                <FileText className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="blocks"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
              >
                <Building className="h-4 w-4 mr-2" />
                Blocks
              </TabsTrigger>
              <TabsTrigger 
                value="sales"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Sales
              </TabsTrigger>
              <TabsTrigger 
                value="documents"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <TabsContent value="overview" className="p-6 m-0">
            <ProjectOverviewContent 
              project={project} 
              onViewAllActivity={handleViewAllActivity}
            />
          </TabsContent>
          
          <TabsContent value="blocks" className="p-6 m-0">
            <EnhancedBlocksTab project={project} />
          </TabsContent>
          
          <TabsContent value="sales" className="p-6 m-0">
            <ProjectSalesHistoryTab 
              project={project} 
              onReallocate={handleReallocate} 
              onRevoke={handleRevoke} 
            />
          </TabsContent>
          
          <TabsContent value="documents" className="p-6 m-0">
            <ProjectDocumentsTab project={project} />
          </TabsContent>
        </Tabs>
      </Card>

      {/* Modals */}
      <AllocateUnitModal
        isOpen={isAllocateUnitOpen}
        onClose={() => setIsAllocateUnitOpen(false)}
        onSubmit={() => {
          toast.success('Unit allocated successfully!');
          setIsAllocateUnitOpen(false);
        }}
      />

      {reallocateData && (
        <ReallocationModal
          isOpen={isReallocateOpen}
          onClose={() => {
            setIsReallocateOpen(false);
            setReallocateData(null);
          }}
          allocation={reallocateData}
          onReallocate={() => {
            toast.success('Unit reallocated successfully!');
            setIsReallocateOpen(false);
            setReallocateData(null);
          }}
        />
      )}

      {selectedAllocation && (
        <RevokeAllocationModal
          isOpen={isRevokeOpen}
          onClose={() => {
            setIsRevokeOpen(false);
            setSelectedAllocation(null);
          }}
          allocation={selectedAllocation}
          onRevoke={() => {
            toast.success('Allocation revoked successfully!');
            setIsRevokeOpen(false);
            setSelectedAllocation(null);
          }}
        />
      )}
    </div>
  );
}