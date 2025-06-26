
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { MarketerEditForm } from '@/components/dashboard/forms/MarketerEditForm';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { toast } from 'sonner';

const mockMarketers = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    phone: '+234 801 234 5678',
    address: '456 Lagos Island, Lagos',
    nationalId: 'XYZ987654321',
    bankName: 'First Bank',
    accountNumber: '1234567890',
    commissionRate: 5,
    status: 'active',
    joinDate: '2024-01-15'
  }
];

export default function EditMarketerPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const { confirmNavigation } = useUnsavedChanges(hasUnsavedChanges);
  
  const marketer = mockMarketers.find(m => m.id === parseInt(id || '0'));

  if (!marketer) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Marketer Not Found</h2>
            <Button onClick={() => navigate('/company/marketers')}>
              Back to Marketers
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleSave = () => {
    toast.success('Marketer updated successfully!');
    setHasUnsavedChanges(false);
    navigate('/company/marketers');
  };

  const handleBack = () => {
    confirmNavigation('/company/marketers');
  };

  return (
    <DashboardLayout>
      <PageHeader
        title={`Edit Marketer: ${marketer.firstName} ${marketer.lastName}`}
        description="Update marketer information and commission details"
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
          <MarketerEditForm
            marketer={marketer}
            onFormChange={() => setHasUnsavedChanges(true)}
            onSubmit={handleSave}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
