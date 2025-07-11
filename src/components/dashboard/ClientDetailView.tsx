
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Building, DollarSign, FileText } from 'lucide-react';
import { ClientDetailView as ClientDetailViewComponent } from '@/components/dashboard/clients/ClientDetailView';
import { AssignPropertyModal } from '@/components/dashboard/clients/AssignPropertyModal';
import { AddPaymentModal } from '@/components/dashboard/clients/AddPaymentModal';
import { SendNoticeForm } from '@/components/dashboard/notices/SendNoticeForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const mockClients = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    address: '123 Victoria Island, Lagos',
    nationalId: 'ABC123456789',
    passportPhoto: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
    projects: [
      {
        name: 'Victoria Gardens',
        unit: 'Block A - Plot 02',
        assignedDate: '2024-01-10'
      }
    ],
    kycStatus: 'verified',
    totalPaid: '₦15M',
    balance: '₦10M',
    nextPayment: '2024-02-15',
    documents: ['Allocation Letter', 'MoU', 'Payment Schedule'],
    paymentProgress: 60,
    assignedDate: '2024-01-10'
  }
];

export function ClientDetailView() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract clientId from URL params - handle both :clientId and :id patterns
  const clientId = params.clientId || params.id;
  
  const [isAssignPropertyOpen, setIsAssignPropertyOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isSendNoticeOpen, setIsSendNoticeOpen] = useState(false);
  
  const client = mockClients.find(c => c.id === parseInt(clientId || '1'));

  useEffect(() => {
    if (location.state?.openPayment) {
      setIsAddPaymentOpen(true);
    }
  }, [location.state]);

  if (!client) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Not Found</h2>
        <Button onClick={() => navigate('/company/clients')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Clients
        </Button>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/company/clients/${client.id}/edit`);
  };
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      toast.success('Client deleted successfully');
      navigate('/company/clients');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate('/company/clients')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Clients
        </Button>
        
        <div className="flex gap-2">
          <Button onClick={() => setIsAssignPropertyOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Building className="h-4 w-4 mr-2" />
            Assign Property
          </Button>
          <Button onClick={() => setIsAddPaymentOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <DollarSign className="h-4 w-4 mr-2" />
            Add Payment
          </Button>
          <Button onClick={() => setIsSendNoticeOpen(true)} className="bg-purple-600 hover:bg-purple-700">
            <FileText className="h-4 w-4 mr-2" />
            Send Notice
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Client
          </Button>
          <Button variant="outline" onClick={handleDelete} className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Client
          </Button>
        </div>
      </div>
      
      <ClientDetailViewComponent client={client} />

      <AssignPropertyModal 
        isOpen={isAssignPropertyOpen}
        onClose={() => setIsAssignPropertyOpen(false)}
        client={client}
      />

      <AddPaymentModal 
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
        client={client}
      />

      <Dialog open={isSendNoticeOpen} onOpenChange={setIsSendNoticeOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Send Notice to {client.name}</DialogTitle>
            <DialogDescription>
              Send a notice to this client via email or WhatsApp
            </DialogDescription>
          </DialogHeader>
          <SendNoticeForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
