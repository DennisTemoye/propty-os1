
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewProjectForm } from '@/components/dashboard/forms/NewProjectForm';

export function EditProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock project data - in real app, fetch based on id
  const mockProjectData = {
    name: 'Victoria Gardens Estate',
    description: 'Premium residential development with modern amenities',
    location: 'Victoria Island, Lagos',
    city: 'Lagos',
    state: 'Lagos',
    category: 'Housing',
    type: 'Residential',
    developmentStage: 'Construction',
    totalBlocks: '4',
    totalUnits: '120',
    budget: '₦2,500,000,000',
    startDate: '2024-01-15',
    expectedCompletion: '2025-12-31',
    projectManager: 'John Doe',
    tags: 'Premium, Family, Luxury',
    image: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
  };

  const handleBack = () => {
    navigate(`/company/projects/${id}`);
  };

  const handleClose = () => {
    navigate(`/company/projects/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <NewProjectForm onClose={handleClose} initialData={mockProjectData} />
      </div>
    </div>
  );
}
