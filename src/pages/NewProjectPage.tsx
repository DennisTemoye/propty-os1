
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { NewProjectForm } from '@/components/dashboard/forms/NewProjectForm';

export default function NewProjectPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/company/projects');
  };

  const handleClose = () => {
    navigate('/company/projects');
  };

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
              <span>Back to Projects</span>
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          <div className="w-32" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto p-6">
        <NewProjectForm 
          onClose={handleClose} 
          isFullPage={true}
        />
      </div>
    </div>
  );
}
