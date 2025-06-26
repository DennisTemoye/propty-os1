
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, Edit, MapPin, User, Trash2, Building, FileText } from 'lucide-react';
import { ProjectHeader } from '@/components/dashboard/projects/ProjectHeader';
import { ProjectKPIGrid } from '@/components/dashboard/projects/ProjectKPIGrid';
import { ProjectOverviewContent } from '@/components/dashboard/projects/ProjectOverviewContent';
import { ProjectBlocksTab } from '@/components/dashboard/projects/ProjectBlocksTab';
import { ProjectDocumentsTab } from '@/components/dashboard/projects/ProjectDocumentsTab';
import { ProjectSalesHistoryTab } from '@/components/dashboard/projects/ProjectSalesHistoryTab';
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
    status: 'Construction',
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
  }
];

export function ProjectDetailView() {
  const params = useParams();
  const navigate = useNavigate();
  
  // Extract projectId from URL params - handle both :projectId and :id patterns
  const projectId = params.projectId || params.id;
  
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

  const handleEditProject = () => {
    navigate(`/company/projects/${project.id}/edit`);
  };
  
  const handleDeleteProject = () => {
    toast.success(`Project "${project.name}" has been deleted successfully.`);
    navigate('/company/projects');
  };

  const handleViewSalesModule = () => {
    navigate('/company/sales');
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
          <Button onClick={handleViewSalesModule} className="bg-green-600 hover:bg-green-700">
            <FileText className="h-4 w-4 mr-2" />
            Manage Sales
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
                <Badge variant="secondary">{project.status}</Badge>
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
            <TabsList className="grid w-full grid-cols-4 bg-transparent h-12">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="blocks">Blocks & Units</TabsTrigger>
              <TabsTrigger value="sales-history">Sales History</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6">
            <ProjectOverviewContent project={project} />
          </TabsContent>
          <TabsContent value="blocks" className="p-6">
            <ProjectBlocksTab project={project} />
          </TabsContent>
          <TabsContent value="sales-history" className="p-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-blue-900">Sales Management</h3>
                  <p className="text-blue-700 text-sm">All sales, allocations, and client management are handled in the Sales & Allocation module.</p>
                </div>
                <Button onClick={handleViewSalesModule} className="bg-blue-600 hover:bg-blue-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Go to Sales Module
                </Button>
              </div>
            </div>
            <ProjectSalesHistoryTab project={project} />
          </TabsContent>
          <TabsContent value="documents" className="p-6">
            <ProjectDocumentsTab project={project} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
