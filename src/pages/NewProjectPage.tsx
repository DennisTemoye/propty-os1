
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { NewProjectForm } from '@/components/dashboard/forms/NewProjectForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function NewProjectPage() {
  const navigate = useNavigate();
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedWarning(true);
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

  const confirmLeave = () => {
    setHasUnsavedChanges(false);
    navigate('/company/projects');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="px-6 py-4">
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
              <div className="w-32" /> {/* Spacer for center alignment */}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <NewProjectForm
                onClose={handleFormSubmit}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      <AlertDialog open={showUnsavedWarning} onOpenChange={setShowUnsavedWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              Unsaved Changes
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave? All changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay on Page</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmLeave}
            >
              Leave Page
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
