
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { NewProjectForm } from '@/components/dashboard/forms/NewProjectForm';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';

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

  const handleFormSubmit = () => {
    setHasUnsavedChanges(false);
    navigate('/company/projects');
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
                Back to Projects
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">New Project</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6">
            <NewProjectForm 
              onClose={handleFormSubmit}
              onFormChange={setHasUnsavedChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
