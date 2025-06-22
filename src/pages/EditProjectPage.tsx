
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { NewProjectForm } from '@/components/dashboard/forms/NewProjectForm';

// Mock data for editing - in real app this would come from API
const getProjectData = (id: string) => {
  const mockProjects = [
    {
      id: 1,
      name: 'Victoria Gardens Estate',
      description: 'Luxury residential development with modern amenities',
      location: 'Lekki Phase 1, Lagos',
      city: 'Lagos',
      state: 'Lagos State',
      category: 'Housing',
      type: 'Residential',
      developmentStage: 'Construction',
      totalBlocks: 5,
      totalUnits: 150,
      budget: '₦2.5B',
      startDate: '2024-01-15',
      expectedCompletion: '2025-12-31',
      projectManager: 'John Doe',
      tags: 'Luxury, Waterfront, Premium',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=450&fit=crop'
    }
  ];
  
  return mockProjects.find(p => p.id === parseInt(id));
};

export default function EditProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  
  const projectData = projectId ? getProjectData(projectId) : null;

  const handleBack = () => {
    navigate(`/company/projects/${projectId}`);
  };

  const handleClose = () => {
    navigate(`/company/projects/${projectId}`);
  };

  if (!projectData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <Button onClick={() => navigate('/company/projects')}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Project</span>
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
          <div className="w-32" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto p-6">
        <NewProjectForm 
          onClose={handleClose}
          initialData={projectData}
          isFullPage={true}
        />
      </div>
    </div>
  );
}
