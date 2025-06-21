
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit, Settings, MapPin, Calendar, User } from 'lucide-react';
import { ProjectHeader } from '@/components/dashboard/projects/ProjectHeader';
import { ProjectKPIGrid } from '@/components/dashboard/projects/ProjectKPIGrid';
import { ProjectOverviewContent } from '@/components/dashboard/projects/ProjectOverviewContent';
import { ProjectLayoutTab } from '@/components/dashboard/projects/ProjectLayoutTab';
import { ProjectBlocksTab } from '@/components/dashboard/projects/ProjectBlocksTab';
import { ProjectDocumentsTab } from '@/components/dashboard/projects/ProjectDocumentsTab';
import { ProjectSettingsTab } from '@/components/dashboard/projects/ProjectSettingsTab';

const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    category: 'Housing',
    type: 'Residential',
    status: 'active',
    totalBlocks: 3,
    totalUnits: 150,
    availableUnits: 38,
    allocatedUnits: 89,
    reservedUnits: 23,
    totalClients: 112,
    totalRevenue: '₦2,340,000,000',
    allocationRate: 75,
    lastUpdated: '2024-01-15',
    description: 'A premium residential estate featuring modern amenities and strategic location in the heart of Lekki.',
    projectManager: 'Alice Johnson',
    internalNotes: 'Focus on completing Block A before marketing Block C units.',
    tags: ['Premium', 'Residential', 'Lekki']
  }
];

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
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

        {/* Project Header */}
        <ProjectHeader project={project} />

        {/* KPI Quick Stats */}
        <ProjectKPIGrid project={project} />

        {/* Project Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b px-6">
              <TabsList className="grid w-full grid-cols-5 bg-transparent h-12">
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

            <TabsContent value="documents" className="p-6">
              <ProjectDocumentsTab project={project} />
            </TabsContent>

            <TabsContent value="settings" className="p-6">
              <ProjectSettingsTab project={project} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
