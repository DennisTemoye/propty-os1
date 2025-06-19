
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Edit, Trash2, Building, Plus, DollarSign } from 'lucide-react';
import { ClientDetailView } from '@/components/dashboard/clients/ClientDetailView';
import { ClientForm } from '@/components/dashboard/clients/ClientForm';
import { AssignPropertyModal } from '@/components/dashboard/clients/AssignPropertyModal';
import { AddPaymentModal } from '@/components/dashboard/clients/AddPaymentModal';
import { toast } from 'sonner';

const mockClients = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    address: '123 Victoria Island, Lagos',
    nationalId: 'ABC123456789',
    project: 'Victoria Gardens',
    unit: 'Block A - Plot 02',
    status: 'active',
    kycStatus: 'approved',
    totalPaid: '₦15M',
    balance: '₦10M',
    nextPayment: '2024-02-15',
    documents: ['Allocation Letter', 'MoU', 'Payment Schedule'],
    paymentProgress: 60,
    assignedDate: '2024-01-10'
  }
];

export default function ClientDetailPage() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAssignPropertyOpen, setIsAssignPropertyOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  
  const client = mockClients.find(c => c.id === parseInt(clientId || '1'));

  if (!client) {
    return <div>Client not found</div>;
  }

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      console.log('Deleting client:', client.id);
      toast.success('Client deleted successfully');
      navigate('/company/clients');
    }
  };

  const handleAssignProperty = () => {
    setIsAssignPropertyOpen(true);
  };

  const handleAddPayment = () => {
    setIsAddPaymentOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate('/company/clients')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Clients
            </Button>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleAssignProperty}
                className="bg-green-600 hover:bg-green-700"
              >
                <Building className="h-4 w-4 mr-2" />
                Assign Property
              </Button>
              <Button 
                onClick={handleAddPayment}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Add Payment
              </Button>
              <Button 
                variant="outline"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Client
              </Button>
              <Button 
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Client
              </Button>
            </div>
          </div>
        </div>
        
        <ClientDetailView client={client} />

        {/* Edit Client Modal */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Client</DialogTitle>
              <DialogDescription>
                Update client information and details
              </DialogDescription>
            </DialogHeader>
            <ClientForm client={client} onClose={() => setIsEditOpen(false)} />
          </DialogContent>
        </Dialog>

        {/* Assign Property Modal */}
        <AssignPropertyModal 
          isOpen={isAssignPropertyOpen}
          onClose={() => setIsAssignPropertyOpen(false)}
          client={client}
        />

        {/* Add Payment Modal */}
        <AddPaymentModal 
          isOpen={isAddPaymentOpen}
          onClose={() => setIsAddPaymentOpen(false)}
          client={client}
        />
      </div>
    </div>
  );
}
