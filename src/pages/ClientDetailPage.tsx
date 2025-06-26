
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
    passportPhoto: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
    projects: [
      {
        name: 'Victoria Gardens',
        unit: 'Block A - Plot 02',
        assignedDate: '2024-01-10'
      }
    ],
    status: 'active',
    kycStatus: 'approved',
    totalPaid: '₦15M',
    balance: '₦10M',
    nextPayment: '2024-02-15',
    documents: ['Allocation Letter', 'MoU', 'Payment Schedule'],
    paymentProgress: 60,
    assignedDate: '2024-01-10'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+234 802 345 6789',
    address: '456 Ikoyi, Lagos',
    nationalId: 'DEF987654321',
    passportPhoto: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face',
    projects: [
      {
        name: 'Emerald Heights',
        unit: 'Block B - Plot 12',
        assignedDate: '2024-01-15'
      },
      {
        name: 'Victoria Gardens',
        unit: 'Block A - Plot 05',
        assignedDate: '2024-01-20'
      },
      {
        name: 'Golden View',
        unit: 'Block C - Plot 03',
        assignedDate: '2024-01-25'
      },
      {
        name: 'Sunset Heights',
        unit: 'Block D - Plot 07',
        assignedDate: '2024-02-01'
      },
      {
        name: 'Marina Heights',
        unit: 'Block E - Plot 10',
        assignedDate: '2024-02-05'
      },
      {
        name: 'Palm Grove Estate',
        unit: 'Block F - Plot 15',
        assignedDate: '2024-02-10'
      },
      {
        name: 'Royal Gardens',
        unit: 'Block G - Plot 08',
        assignedDate: '2024-02-15'
      },
      {
        name: 'Crystal Bay',
        unit: 'Block H - Plot 12',
        assignedDate: '2024-02-20'
      },
      {
        name: 'Metro Heights',
        unit: 'Block I - Plot 18',
        assignedDate: '2024-02-25'
      },
      {
        name: 'Paradise Gardens',
        unit: 'Block J - Plot 22',
        assignedDate: '2024-03-01'
      },
      {
        name: 'Golden View Towers',
        unit: 'Block K - Plot 30',
        assignedDate: '2024-03-05'
      },
      {
        name: 'Emerald Heights Phase 2',
        unit: 'Block L - Plot 25',
        assignedDate: '2024-03-10'
      }
    ],
    status: 'active',
    kycStatus: 'approved',
    totalPaid: '₦285M',
    balance: '₦415M',
    nextPayment: '2024-02-20',
    documents: ['Allocation Letter', 'MoU', 'Payment Schedule', 'Investment Agreement'],
    paymentProgress: 41,
    assignedDate: '2024-01-15'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+234 803 456 7890',
    address: '789 Lekki, Lagos',
    nationalId: 'GHI456789123',
    passportPhoto: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=150&h=150&fit=crop&crop=face',
    projects: [
      {
        name: 'Golden View',
        unit: 'Block C - Plot 05',
        assignedDate: '2023-12-01'
      },
      {
        name: 'Victoria Gardens',
        unit: 'Block D - Plot 08',
        assignedDate: '2023-11-15'
      }
    ],
    status: 'completed',
    kycStatus: 'approved',
    totalPaid: '₦25M',
    balance: '₦0',
    nextPayment: null,
    documents: ['Allocation Letter', 'MoU', 'Payment Schedule', 'Certificate of Occupancy'],
    paymentProgress: 100,
    assignedDate: '2023-12-01'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+234 804 567 8901',
    address: '321 Ajah, Lagos',
    nationalId: 'JKL789123456',
    passportPhoto: null,
    projects: [],
    status: 'unassigned',
    kycStatus: 'approved',
    totalPaid: '₦0',
    balance: '₦0',
    nextPayment: null,
    documents: ['KYC Documents'],
    paymentProgress: 0,
    assignedDate: null
  }
];

export default function ClientDetailPage() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAssignPropertyOpen, setIsAssignPropertyOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  
  const client = mockClients.find(c => c.id === parseInt(clientId || '1'));

  useEffect(() => {
    if (location.state?.openPayment) {
      setIsAddPaymentOpen(true);
    }
  }, [location.state]);

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
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="w-full">
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
