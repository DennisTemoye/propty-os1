
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { ProjectForm } from '@/components/dashboard/projects/ProjectForm';

// Mock project data - in a real app, this would come from an API
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
  }
  // Add other projects as needed
];

export default function EditProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const project = mockProjects.find(p => p.id === parseInt(projectId || '1'));

  const handleBack = () => {
    const backUrl = `/company/projects/${projectId}`;
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(backUrl);
      }
    } else {
      navigate(backUrl);
    }
  };

  const handleFormChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleFormSubmit = () => {
    setHasUnsavedChanges(false);
    navigate(`/company/projects/${projectId}`);
  };

  if (!project) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="fixed inset-y-0 left-0 z-50 w-64">
          <CompanySidebar />
        </div>
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64">
        <CompanySidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Edit Project: {project.name}</h1>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <ProjectForm 
              project={project}
              onClose={handleFormSubmit}
              onFormChange={handleFormChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
