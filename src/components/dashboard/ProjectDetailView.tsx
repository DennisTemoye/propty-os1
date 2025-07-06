import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Share2
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
    lastActivity: '2 hours ago'
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
    lastActivity: '1 hour ago'
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
    lastActivity: '30 minutes ago'
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
    lastActivity: '3 hours ago'
  },
  {
    id: 5,
    name: 'Marina Heights',
    location: 'Marina, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Mixed',
    type: 'Mixed-Use',
    status: 'ongoing',
    developmentStage: 'Planning',
    totalBlocks: 10,
    totalUnits: 250,
    availableUnits: 27,
    allocatedUnits: 198,
    reservedUnits: 25,
    pendingAllocations: 7,
    interestedUnits: 15,
    offeredUnits: 12,
    revokedUnits: 0,
    totalClients: 198,
    totalRevenue: '₦5,500,000,000',
    allocationRate: 79,
    lastUpdated: '2024-01-11',
    description: 'Strategic mixed-use development in Marina business district.',
    projectManager: 'Eva Martinez',
    internalNotes: 'Planning phase progressing well.',
    tags: ['Mixed-Use', 'Marina', 'Business District'],
    image: 'https://images.unsplash.com/photo-1503602642458-232114445914?w=800&h=450&fit=crop',
    revenue: '₦5.5B',
    lastActivity: '45 minutes ago'
  },
  {
    id: 6,
    name: 'Palm Grove Estate',
    location: 'Ajah, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Housing',
    type: 'Residential',
    status: 'ongoing',
    developmentStage: 'Construction',
    totalBlocks: 15,
    totalUnits: 400,
    availableUnits: 75,
    allocatedUnits: 280,
    reservedUnits: 45,
    pendingAllocations: 15,
    interestedUnits: 35,
    offeredUnits: 25,
    revokedUnits: 5,
    totalClients: 280,
    totalRevenue: '₦7,200,000,000',
    allocationRate: 70,
    lastUpdated: '2024-01-10',
    description: 'Large residential estate with family-friendly amenities in Ajah.',
    projectManager: 'Frank Wilson',
    internalNotes: 'Strong demand from young families, good infrastructure access.',
    tags: ['Family', 'Residential', 'Ajah'],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=450&fit=crop',
    revenue: '₦7.2B',
    lastActivity: '1 hour ago'
  },
  {
    id: 7,
    name: 'Royal Gardens',
    location: 'Epe, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Land',
    type: 'Land Project',
    status: 'ongoing',
    developmentStage: 'Marketing',
    totalBlocks: 20,
    totalUnits: 500,
    availableUnits: 100,
    allocatedUnits: 320,
    reservedUnits: 80,
    pendingAllocations: 20,
    interestedUnits: 40,
    offeredUnits: 30,
    revokedUnits: 0,
    totalClients: 320,
    totalRevenue: '₦4,800,000,000',
    allocationRate: 64,
    lastUpdated: '2024-01-09',
    description: 'Expansive land development project with excellent future potential.',
    projectManager: 'Grace Thompson',
    internalNotes: 'Land banking opportunity, strong investor interest.',
    tags: ['Land', 'Investment', 'Epe'],
    image: 'https://images.unsplash.com/photo-1501127122-970c479ebc57?w=800&h=450&fit=crop',
    revenue: '₦4.8B',
    lastActivity: '2 hours ago'
  },
  {
    id: 8,
    name: 'Crystal Bay',
    location: 'Banana Island, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Housing',
    type: 'Waterfront',
    status: 'ongoing',
    developmentStage: 'Marketing',
    totalBlocks: 4,
    totalUnits: 80,
    availableUnits: 5,
    allocatedUnits: 65,
    reservedUnits: 10,
    pendingAllocations: 2,
    interestedUnits: 8,
    offeredUnits: 5,
    revokedUnits: 0,
    totalClients: 65,
    totalRevenue: '₦8,500,000,000',
    allocationRate: 81,
    lastUpdated: '2024-01-08',
    description: 'Ultra-luxury waterfront development on exclusive Banana Island.',
    projectManager: 'Henry Adams',
    internalNotes: 'Premium pricing, targeting ultra-high net worth individuals.',
    tags: ['Ultra-Luxury', 'Waterfront', 'Banana Island'],
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=450&fit=crop',
    revenue: '₦8.5B',
    lastActivity: '4 hours ago'
  },
  {
    id: 9,
    name: 'Metro Heights',
    location: 'Ikeja, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Mixed',
    type: 'Commercial',
    status: 'ongoing',
    developmentStage: 'Construction',
    totalBlocks: 7,
    totalUnits: 220,
    availableUnits: 25,
    allocatedUnits: 180,
    reservedUnits: 15,
    pendingAllocations: 6,
    interestedUnits: 12,
    offeredUnits: 10,
    revokedUnits: 0,
    totalClients: 180,
    totalRevenue: '₦3,800,000,000',
    allocationRate: 82,
    lastUpdated: '2024-01-07',
    description: 'Modern commercial complex in the bustling Ikeja business district.',
    projectManager: 'Ivy Chen',
    internalNotes: 'Strong commercial demand, good location for businesses.',
    tags: ['Commercial', 'Business', 'Ikeja'],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=450&fit=crop',
    revenue: '₦3.8B',
    lastActivity: '6 hours ago'
  },
  {
    id: 10,
    name: 'Paradise Gardens',
    location: 'Ibadan, Oyo',
    city: 'Ibadan',
    state: 'Oyo State',
    category: 'Housing',
    type: 'Residential',
    status: 'upcoming',
    developmentStage: 'Pre-Launch',
    totalBlocks: 8,
    totalUnits: 160,
    availableUnits: 95,
    allocatedUnits: 45,
    reservedUnits: 20,
    pendingAllocations: 3,
    interestedUnits: 8,
    offeredUnits: 5,
    revokedUnits: 0,
    totalClients: 45,
    totalRevenue: '₦1,200,000,000',
    allocationRate: 28,
    lastUpdated: '2024-01-06',
    description: 'Affordable residential development in the historic city of Ibadan.',
    projectManager: 'Jack Robinson',
    internalNotes: 'Pre-launch phase, targeting middle-income families.',
    tags: ['Affordable', 'Residential', 'Ibadan'],
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc9701bc?w=800&h=450&fit=crop',
    revenue: '₦1.2B',
    lastActivity: '1 day ago'
  },
  {
    id: 11,
    name: 'Test Project No Image',
    location: 'Kano, Kano',
    city: 'Kano',
    state: 'Kano State',
    category: 'Housing',
    type: 'Residential',
    status: 'upcoming',
    developmentStage: 'Planning',
    totalBlocks: 3,
    totalUnits: 50,
    availableUnits: 25,
    allocatedUnits: 15,
    reservedUnits: 10,
    pendingAllocations: 2,
    interestedUnits: 3,
    offeredUnits: 2,
    revokedUnits: 0,
    totalClients: 15,
    totalRevenue: '₦800,000,000',
    allocationRate: 30,
    lastUpdated: '2024-01-05',
    description: 'Test development project for validation of new processes.',
    projectManager: 'Test Manager',
    internalNotes: 'This is a test project for system validation.',
    tags: ['Test', 'Planning', 'Kano'],
    revenue: '₦800M',
    lastActivity: '3 days ago'
  }
];

export function ProjectDetailView() {
  const params = useParams();
  const navigate = useNavigate();
  
  const projectId = params.projectId || params.id;
  
  const [isAllocateUnitOpen, setIsAllocateUnitOpen] = useState(false);
  const [isReallocateOpen, setIsReallocateOpen] = useState(false);
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);
  const [reallocateData, setReallocateData] = useState<any>(null);
  
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
    navigate(`/company/projects/${project.id}/blocks`);
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/company/projects')}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="min-w-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground truncate">
              {project.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground text-sm truncate">
                {project.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleAllocateUnit} size="sm" className="bg-gradient-primary hover:opacity-90">
            <UserPlus className="h-4 w-4 mr-2" />
            Allocate Unit
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleEditProject}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewBlocks}>
                <Building className="h-4 w-4 mr-2" />
                Manage Blocks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewReports}>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Reports
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewSalesAllocation}>
                <Users className="h-4 w-4 mr-2" />
                Sales & Allocation
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
                      Are you sure you want to delete "{project.name}"? This action cannot be undone.
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

      {/* Project Hero Banner */}
      <Card className="overflow-hidden">
        <div className="relative h-64 lg:h-80">
          <img 
            src={getProjectImage(project)} 
            alt={project.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          
          {/* Overlays */}
          <div className="absolute top-4 left-4">
            <Badge variant={getStatusVariant(project.status)} className="bg-background/90 backdrop-blur-sm">
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>
          
          <div className="absolute top-4 right-4">
            <Badge className={`${getStageColor(project.developmentStage)} backdrop-blur-sm border`}>
              {project.developmentStage}
            </Badge>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">{project.totalBlocks}</div>
                <div className="text-sm text-white/80">Blocks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">{project.totalUnits}</div>
                <div className="text-sm text-white/80">Total Units</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">{project.totalClients}</div>
                <div className="text-sm text-white/80">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">{project.allocationRate}%</div>
                <div className="text-sm text-white/80">Allocation Rate</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Home className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{project.availableUnits}</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{project.allocatedUnits}</div>
            <div className="text-sm text-muted-foreground">Allocated</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{project.reservedUnits}</div>
            <div className="text-sm text-muted-foreground">Reserved</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{project.totalClients}</div>
            <div className="text-sm text-muted-foreground">Total Clients</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="text-lg lg:text-xl font-bold text-emerald-600">{project.revenue}</div>
            <div className="text-sm text-muted-foreground">Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Allocations Alert */}
      {project.pendingAllocations > 0 && (
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900">
                    {project.pendingAllocations} Pending Allocations
                  </h3>
                  <p className="text-sm text-orange-700">
                    Requires your attention for approval
                  </p>
                </div>
              </div>
              <Button 
                size="sm"
                onClick={handlePendingAllocations}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Review Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs Section */}
      <Card>
        <Tabs defaultValue="overview" className="w-full">
          <CardHeader className="pb-3">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="text-xs lg:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="blocks" className="text-xs lg:text-sm">Blocks</TabsTrigger>
              <TabsTrigger value="sales" className="text-xs lg:text-sm">Sales</TabsTrigger>
              <TabsTrigger value="documents" className="text-xs lg:text-sm">Documents</TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <TabsContent value="overview" className="p-6 pt-0">
            <ProjectOverviewContent project={project} />
          </TabsContent>
          
          <TabsContent value="blocks" className="p-6 pt-0">
            <EnhancedBlocksTab project={project} />
          </TabsContent>
          
          <TabsContent value="sales" className="p-6 pt-0">
            <ProjectSalesHistoryTab 
              project={project} 
              onReallocate={handleReallocate} 
              onRevoke={handleRevoke} 
            />
          </TabsContent>
          
          <TabsContent value="documents" className="p-6 pt-0">
            <ProjectDocumentsTab project={project} />
          </TabsContent>
          
          <TabsContent value="analytics" className="p-6 pt-0">
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Project Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Detailed analytics and reporting for this project
              </p>
              <Button onClick={handleViewReports}>
                View Full Reports
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="p-6 pt-0">
            <div className="text-center py-12">
              <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Project Settings</h3>
              <p className="text-muted-foreground mb-4">
                Manage project configuration and preferences
              </p>
              <Button onClick={handleEditProject}>
                Edit Project Settings
              </Button>
            </div>
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