import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalLayout } from '@/components/layouts/GlobalLayout';
import { ClientForm } from '@/components/dashboard/clients/ClientForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function EditClientPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock client data - in real app, this would come from API
  const mockClient = {
    id,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    // ... other client properties
  };

  const handleSuccess = () => {
    navigate('/company/clients');
  };

  const handleClose = () => {
    navigate('/company/clients');
  };

  return (
    <GlobalLayout
      header={
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/company/clients')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Clients
          </Button>
          <h1 className="text-lg font-semibold">Edit Client</h1>
          <div className="w-20" />
        </div>
      }
    >
      <div className="max-w-6xl mx-auto">
        <ClientForm 
          client={mockClient}
          onClose={handleClose}
        />
      </div>
    </GlobalLayout>
  );
}
