
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ClientForm } from '@/components/dashboard/clients/ClientForm';

export default function AddClientPage() {
  const navigate = useNavigate();

  const handleClientAdded = () => {
    navigate('/company/clients');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/company/clients')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Client</h1>
          <p className="text-gray-600 mt-1">
            Create a comprehensive client profile with all necessary information
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm">
          <ClientForm onClose={handleClientAdded} />
        </div>
      </div>
    </div>
  );
}
