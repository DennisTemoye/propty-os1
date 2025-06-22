
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { NewProjectForm } from '@/components/dashboard/forms/NewProjectForm';

export default function NewProjectPage() {
  const navigate = useNavigate();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/company/projects');
      }
    } else {
      navigate('/company/projects');
    }
  };

  const handleFormChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleFormSubmit = () => {
    setHasUnsavedChanges(false);
    navigate('/company/projects');
  };

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
              Back to Projects
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <NewProjectForm 
              onClose={handleFormSubmit}
              onFormChange={handleFormChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
