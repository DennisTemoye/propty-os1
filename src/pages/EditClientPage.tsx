
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { NewClientForm } from '@/components/dashboard/forms/NewClientForm';

const EditClientPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/company/clients');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center space-x-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Clients</span>
            </Button>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Edit Client</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <NewClientForm 
          clientId={id}
          isEditMode={true}
          onSuccess={() => navigate('/company/clients')}
        />
      </div>
    </div>
  );
};

export default EditClientPage;
