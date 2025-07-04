import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, Edit, MapPin, User, UserPlus, Trash2, Building, Clock } from 'lucide-react';
import { ProjectHeader } from '@/components/dashboard/projects/ProjectHeader';
import { ProjectKPIGrid } from '@/components/dashboard/projects/ProjectKPIGrid';
import { ProjectOverviewContent } from '@/components/dashboard/projects/ProjectOverviewContent';
import { ProjectBlocksTab } from '@/components/dashboard/projects/ProjectBlocksTab';
import { ProjectDocumentsTab } from '@/components/dashboard/projects/ProjectDocumentsTab';
import { ProjectSalesHistoryTab } from '@/components/dashboard/projects/ProjectSalesHistoryTab';
import { RevokeAllocationModal } from '@/components/dashboard/forms/RevokeAllocationModal';
import { AllocateUnitModal } from '@/components/dashboard/sales-allocation/AllocateUnitModal';
import { ReallocationModal } from '@/components/dashboard/forms/ReallocationModal';
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
  
  // Extract projectId from URL params - handle both :projectId and :id patterns
  const projectId = params.projectId || params.id;
  
  const [isAllocateUnitOpen, setIsAllocateUnitOpen] = useState(false);
  const [isReallocateOpen, setIsReallocateOpen] = useState(false);
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);
  const [reallocateData, setReallocateData] = useState<any>(null);
  
  const project = mockProjects.find(p => p.id === parseInt(projectId || '1'));

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
        <Button onClick={() => navigate('/company/projects')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }

  const handleAllocateUnit = () => setIsAllocateUnitOpen(true);
  const handleEditProject = () => {
    navigate(`/company/projects/${project.id}/edit`);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate('/company/projects')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>

        <div className="flex space-x-3">
          <Button onClick={handleAllocateUnit} className="bg-green-600 hover:bg-green-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Allocate Unit
          </Button>
          <Button onClick={handleEditProject} variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
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
                <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteProject}>
                  Delete Project
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Project Banner */}
      <div className="relative bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-end">
            <div className="p-6 text-white w-full">
              <div className="flex items-center space-x-3 mb-3">
                <h1 className="text-4xl font-bold">{project.name}</h1>
                <Badge variant="secondary">{project.developmentStage}</Badge>
              </div>
              <div className="flex items-center space-x-6 text-white/90 mb-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.city}, {project.state}
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  {project.totalBlocks} Blocks
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {project.totalUnits} Units
                </div>
              </div>
              <div className="text-white/80">{project.description}</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <ProjectKPIGrid project={project} />

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b px-6">
            <TabsList className="grid w-full grid-cols-5 bg-transparent h-12">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="blocks">Blocks & Units</TabsTrigger>
              <TabsTrigger value="sales-history">Sales History</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="pending" className="relative">
                Pending Approvals
                <Badge className="ml-2 bg-yellow-600 text-white text-xs">2</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6">
            <ProjectOverviewContent project={project} />
          </TabsContent>
          <TabsContent value="blocks" className="p-6">
            <ProjectBlocksTab project={project} />
          </TabsContent>
          <TabsContent value="sales-history" className="p-6">
            <ProjectSalesHistoryTab project={project} onReallocate={handleReallocate} onRevoke={handleRevoke} />
          </TabsContent>
          <TabsContent value="documents" className="p-6">
            <ProjectDocumentsTab project={project} />
          </TabsContent>
          <TabsContent value="pending" className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <h3 className="text-lg font-semibold">Pending Allocations for {project.name}</h3>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  This project has 2 allocations pending approval. Visit the Sales & Allocation module for detailed review and approval.
                </p>
                <Button 
                  className="mt-2"
                  onClick={() => navigate('/company/sales?tab=pending')}
                >
                  Review Pending Allocations
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

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
