
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

interface EditFormLayoutProps {
  title: string;
  description: string;
  onSave: () => void;
  onBack: () => void;
  children: ReactNode;
}

export function EditFormLayout({
  title,
  description,
  onSave,
  onBack,
  children
}: EditFormLayoutProps) {
  return (
    <DashboardLayout>
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button 
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
        
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
      </div>

      <div className="p-6">
        {children}
      </div>
    </DashboardLayout>
  );
}
