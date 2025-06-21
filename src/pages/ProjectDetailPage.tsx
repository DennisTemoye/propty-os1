
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Edit, MapPin, User, UserPlus, Trash2, Building } from 'lucide-react';
import { ProjectHeader } from '@/components/dashboard/projects/ProjectHeader';
import { ProjectKPIGrid } from '@/components/dashboard/projects/ProjectKPIGrid';
import { ProjectOverviewContent } from '@/components/dashboard/projects/ProjectOverviewContent';
import { ProjectLayoutTab } from '@/components/dashboard/projects/ProjectLayoutTab';
import { ProjectBlocksTab } from '@/components/dashboard/projects/ProjectBlocksTab';
import { ProjectDocumentsTab } from '@/components/dashboard/projects/ProjectDocumentsTab';
import { ProjectSettingsTab } from '@/components/dashboard/projects/ProjectSettingsTab';
import { ProjectSalesHistoryTab } from '@/components/dashboard/projects/ProjectSalesHistoryTab';
import { NewProjectForm } from '@/components/dashboard/forms/NewProjectForm';
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
    totalClients: 112,
    totalRevenue: '₦2,500,000,000',
    allocationRate: 75,
    lastUpdated: '2024-01-15',
    description: 'A premium residential estate featuring modern amenities and strategic location in the heart of Lekki.',
    projectManager: 'Alice Johnson',
    internalNotes: 'Focus on completing Block A before marketing Block C units.',
    tags: ['Premium', 'Residential', 'Lekki'],
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop'
  },
  {
    id: 2,
    name: 'Emerald Heights',
    location: 'Abuja, FCT',
    category: 'Mixed',
    type: 'Commercial',
    status: 'ongoing',
    totalBlocks: 8,
    totalUnits: 200,
    availableUnits: 32,
    allocatedUnits: 156,
    reservedUnits: 12,
    totalClients: 180,
    totalRevenue: '₦4,200,000,000',
    allocationRate: 85,
    lastUpdated: '2024-01-12',
    description: 'Mixed-use commercial development strategically located in the business district of Abuja.',
    projectManager: 'David Chen',
    internalNotes: 'High demand for commercial units, consider increasing prices for remaining inventory.',
    tags: ['Commercial', 'Mixed-Use', 'Abuja']
  },
  {
    id: 3,
    name: 'Golden View Towers',
    location: 'Victoria Island, Lagos',
    category: 'Housing',
    type: 'Residential',
    status: 'ongoing',
    totalBlocks: 12,
    totalUnits: 300,
    availableUnits: 37,
    allocatedUnits: 245,
    reservedUnits: 18,
    totalClients: 280,
    totalRevenue: '₦6,800,000,000',
    allocationRate: 88,
    lastUpdated: '2024-01-10',
    description: 'Luxury high-rise towers offering panoramic views of Victoria Island waterfront.',
    projectManager: 'Sarah Williams',
    internalNotes: 'Penthouse units showing strong interest, focus marketing on premium features.',
    tags: ['Luxury', 'High-rise', 'Victoria Island']
  },
  {
    id: 4,
    name: 'Sunset Heights',
    location: 'Ikoyi, Lagos',
    category: 'Housing',
    type: 'Residential',
    status: 'completed',
    totalBlocks: 6,
    totalUnits: 180,
    availableUnits: 5,
    allocatedUnits: 167,
    reservedUnits: 8,
    totalClients: 175,
    totalRevenue: '₦3,900,000,000',
    allocationRate: 97,
    lastUpdated: '2024-01-05',
    description: 'Completed residential project in the prestigious Ikoyi neighborhood.',
    projectManager: 'Michael Brown',
    internalNotes: 'Project successfully completed. Focus on handover process for remaining units.',
    tags: ['Completed', 'Prestigious', 'Ikoyi']
  },
  {
    id: 5,
    name: 'Marina Heights',
    location: 'Marina, Lagos',
    category: 'Mixed',
    type: 'Mixed-Use',
    status: 'ongoing',
    totalBlocks: 10,
    totalUnits: 250,
    availableUnits: 27,
    allocatedUnits: 198,
    reservedUnits: 25,
    totalClients: 220,
    totalRevenue: '₦5,500,000,000',
    allocationRate: 89,
    lastUpdated: '2024-01-08',
    description: 'Modern mixed-use development combining residential and commercial spaces in Marina.',
    projectManager: 'Emily Davis',
    internalNotes: 'Commercial spaces selling faster than residential. Adjust marketing strategy.',
    tags: ['Mixed-Use', 'Modern', 'Marina']
  },
  {
    id: 6,
    name: 'Palm Grove Estate',
    location: 'Ajah, Lagos',
    category: 'Housing',
    type: 'Residential',
    status: 'ongoing',
    totalBlocks: 15,
    totalUnits: 400,
    availableUnits: 75,
    allocatedUnits: 280,
    reservedUnits: 45,
    totalClients: 325,
    totalRevenue: '₦7,200,000,000',
    allocationRate: 81,
    lastUpdated: '2024-01-14',
    description: 'Large-scale residential estate offering affordable luxury in the rapidly developing Ajah corridor.',
    projectManager: 'James Wilson',
    internalNotes: 'Strong interest from young professionals. Consider flexible payment plans.',
    tags: ['Large-scale', 'Affordable Luxury', 'Ajah']
  },
  {
    id: 7,
    name: 'Royal Gardens',
    location: 'Epe, Lagos',
    category: 'Land',
    type: 'Land Project',
    status: 'ongoing',
    totalBlocks: 20,
    totalUnits: 500,
    availableUnits: 100,
    allocatedUnits: 320,
    reservedUnits: 80,
    totalClients: 400,
    totalRevenue: '₦4,800,000,000',
    allocationRate: 80,
    lastUpdated: '2024-01-11',
    description: 'Premium land project offering investment opportunities in the emerging Epe axis.',
    projectManager: 'Lisa Thompson',
    internalNotes: 'Land banking opportunity attracting investors. Highlight future development potential.',
    tags: ['Land Investment', 'Premium', 'Epe']
  },
  {
    id: 8,
    name: 'Crystal Bay',
    location: 'Banana Island, Lagos',
    category: 'Housing',
    type: 'Waterfront',
    status: 'ongoing',
    totalBlocks: 4,
    totalUnits: 80,
    availableUnits: 5,
    allocatedUnits: 65,
    reservedUnits: 10,
    totalClients: 75,
    totalRevenue: '₦8,500,000,000',
    allocationRate: 94,
    lastUpdated: '2024-01-13',
    description: 'Ultra-luxury waterfront development on the exclusive Banana Island.',
    projectManager: 'Robert Garcia',
    internalNotes: 'Ultra-high-net-worth clients. Maintain exclusivity and premium service standards.',
    tags: ['Ultra-luxury', 'Waterfront', 'Exclusive']
  },
  {
    id: 9,
    name: 'Metro Heights',
    location: 'Ikeja, Lagos',
    category: 'Mixed',
    type: 'Commercial',
    status: 'ongoing',
    totalBlocks: 7,
    totalUnits: 220,
    availableUnits: 25,
    allocatedUnits: 180,
    reservedUnits: 15,
    totalClients: 195,
    totalRevenue: '₦3,800,000,000',
    allocationRate: 89,
    lastUpdated: '2024-01-09',
    description: 'Strategic commercial development in the heart of Lagos business district.',
    projectManager: 'Amanda Rodriguez',
    internalNotes: 'High demand from SMEs and startups. Consider co-working space configurations.',
    tags: ['Commercial', 'Business District', 'Strategic']
  },
  {
    id: 10,
    name: 'Paradise Gardens',
    location: 'Ibadan, Oyo',
    category: 'Housing',
    type: 'Residential',
    status: 'upcoming',
    totalBlocks: 8,
    totalUnits: 160,
    availableUnits: 95,
    allocatedUnits: 45,
    reservedUnits: 20,
    totalClients: 65,
    totalRevenue: '₦1,200,000,000',
    allocationRate: 41,
    lastUpdated: '2024-01-16',
    description: 'Upcoming residential development bringing modern living to Ibadan.',
    projectManager: 'Kevin Martinez',
    internalNotes: 'Pre-launch phase. Focus on early bird promotions and market education.',
    tags: ['Upcoming', 'Pre-launch', 'Ibadan']
  }
];

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // Modal states
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [isAllocateUnitOpen, setIsAllocateUnitOpen] = useState(false);
  const [isReallocateOpen, setIsReallocateOpen] = useState(false);
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);
  const [reallocateData, setReallocateData] = useState<any>(null);
  
  const project = mockProjects.find(p => p.id === parseInt(projectId || '1'));

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
            <Button onClick={() => navigate('/company/projects')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleAllocateUnit = () => {
    setIsAllocateUnitOpen(true);
  };

  const handleEditProject = () => {
    setIsEditProjectOpen(true);
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

  const handleAllocateSubmit = (data: any) => {
    console.log('Unit allocated:', data);
    toast.success('Unit allocated successfully!');
    setIsAllocateUnitOpen(false);
  };

  const handleReallocateSubmit = (data: any) => {
    console.log('Unit reallocated:', data);
    toast.success('Unit reallocated successfully!');
    setIsReallocateOpen(false);
    setReallocateData(null);
  };

  const handleRevokeSubmit = (data: any) => {
    console.log('Allocation revoked:', data);
    toast.success('Allocation revoked successfully!');
    setIsRevokeOpen(false);
    setSelectedAllocation(null);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/company/projects')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>

        {/* Project Banner Section */}
        <div className="relative bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
          {/* Banner Image */}
          <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <Building className="h-24 w-24 text-gray-400" />
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Banner Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="p-6 text-white w-full">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h1 className="text-4xl font-bold">{project.name}</h1>
                      <Badge className={getDevelopmentStageColor(project.developmentStage)}>
                        {project.developmentStage}
                      </Badge>
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

                    <div className="text-white/80">
                      {project.description}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      onClick={handleAllocateUnit}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Allocate Unit
                    </Button>
                    
                    <Button 
                      onClick={handleEditProject}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Project
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline"
                          className="bg-red-600/20 border-red-600/30 text-white hover:bg-red-600/30"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Project</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{project.name}"? This action cannot be undone and will remove all associated data including allocations, blocks, and units.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={handleDeleteProject}
                          >
                            Delete Project
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced KPI Quick Stats */}
        <ProjectKPIGrid project={project} />

        {/* Project Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b px-6">
              <TabsList className="grid w-full grid-cols-6 bg-transparent h-12">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="layout"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                >
                  Layout Designer
                </TabsTrigger>
                <TabsTrigger 
                  value="blocks"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                >
                  Blocks & Units
                </TabsTrigger>
                <TabsTrigger 
                  value="sales-history"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                >
                  Sales History
                </TabsTrigger>
                <TabsTrigger 
                  value="documents"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                >
                  Documents
                </TabsTrigger>
                <TabsTrigger 
                  value="settings"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-6">
              <ProjectOverviewContent project={project} />
            </TabsContent>

            <TabsContent value="layout" className="p-6">
              <ProjectLayoutTab project={project} />
            </TabsContent>

            <TabsContent value="blocks" className="p-6">
              <ProjectBlocksTab project={project} />
            </TabsContent>

            <TabsContent value="sales-history" className="p-6">
              <ProjectSalesHistoryTab 
                project={project} 
                onReallocate={handleReallocate}
                onRevoke={handleRevoke}
              />
            </TabsContent>

            <TabsContent value="documents" className="p-6">
              <ProjectDocumentsTab project={project} />
            </TabsContent>

            <TabsContent value="settings" className="p-6">
              <ProjectSettingsTab project={project} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modals */}
      
      {/* Edit Project Modal */}
      <Dialog open={isEditProjectOpen} onOpenChange={setIsEditProjectOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <NewProjectForm 
            onClose={() => setIsEditProjectOpen(false)}
            initialData={project}
          />
        </DialogContent>
      </Dialog>

      {/* Allocate Unit Modal - Using the same form from Sales & Allocations */}
      <AllocateUnitModal
        isOpen={isAllocateUnitOpen}
        onClose={() => setIsAllocateUnitOpen(false)}
        onSubmit={handleAllocateSubmit}
      />

      {/* Reallocate Modal - Using the same form from Sales & Allocations */}
      {reallocateData && (
        <ReallocationModal
          isOpen={isReallocateOpen}
          onClose={() => {
            setIsReallocateOpen(false);
            setReallocateData(null);
          }}
          allocation={reallocateData}
          onReallocate={handleReallocateSubmit}
        />
      )}

      {/* Revoke Allocation Modal - Using the same form from Sales & Allocations */}
      {selectedAllocation && (
        <RevokeAllocationModal
          isOpen={isRevokeOpen}
          onClose={() => {
            setIsRevokeOpen(false);
            setSelectedAllocation(null);
          }}
          allocation={selectedAllocation}
          onRevoke={handleRevokeSubmit}
        />
      )}
    </div>
  );
}
