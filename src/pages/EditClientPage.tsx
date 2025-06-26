
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { ClientEditForm } from '@/components/dashboard/forms/ClientEditForm';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { toast } from 'sonner';

const mockClients = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    address: '123 Victoria Island, Lagos',
    nationalId: 'ABC123456789',
    occupation: 'Software Engineer',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+234 801 234 5679',
    referralSource: 'Website',
    notes: 'Interested in premium units',
    kycStatus: 'verified',
    projects: [
      {
        name: 'Victoria Gardens Estate',
        unit: 'Block A, Unit 5',
        assignedDate: '2024-01-15'
      }
    ]
  }
];

export default function EditClientPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const { confirmNavigation } = useUnsavedChanges(hasUnsavedChanges);
  
  const client = mockClients.find(c => c.id === parseInt(id || '0'));

  if (!client) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Not Found</h2>
            <Button onClick={() => navigate('/company/clients')}>
              Back to Clients
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleSave = () => {
    toast.success('Client updated successfully!');
    setHasUnsavedChanges(false);
    navigate('/company/clients');
  };

  const handleBack = () => {
    confirmNavigation('/company/clients');
  };

  return (
    <DashboardLayout>
      <PageHeader
        title={`Edit Client: ${client.firstName} ${client.lastName}`}
        description="Update client information and details"
        onBack={handleBack}
        actions={
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        }
      />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <ClientEditForm
            client={client}
            onFormChange={() => setHasUnsavedChanges(true)}
            onSubmit={handleSave}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
