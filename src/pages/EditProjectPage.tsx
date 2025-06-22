
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ProjectForm } from '@/components/dashboard/projects/ProjectForm';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';

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
];

export default function EditProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
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

  const handleFormSubmit = () => {
    setHasUnsavedChanges(false);
    navigate(`/company/projects/${projectId}`);
  };

  // Listen for beforeunload event to warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  if (!project) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <CompanySidebar />
        <div className="flex-1 flex items-center justify-center ml-64">
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
      <CompanySidebar />
      
      <div className="flex-1 flex flex-col ml-64">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6">
            <ProjectForm 
              onClose={handleFormSubmit}
              project={project}
              onFormChange={setHasUnsavedChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
