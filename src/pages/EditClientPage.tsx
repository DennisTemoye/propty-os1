import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { EditFormLayout } from '@/components/dashboard/forms/EditFormLayout';
import { ClientEditForm } from '@/components/dashboard/forms/ClientEditForm';

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

export default function EditClientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  console.log('EditClientPage - ID from params:', id);
  
  const client = mockClients.find(c => c.id === parseInt(id || '1'));
  
  console.log('EditClientPage - Found client:', client);

  if (!client) {
    return (
      <EditFormLayout
        title="Client Not Found"
        description={`The client with ID "${id}" could not be found.`}
        backPath="/company/clients"
        onSave={() => {}}
        onBack={() => navigate('/company/clients')}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        <div className="text-center py-8">
          <p className="text-gray-600">Please check the client ID and try again.</p>
        </div>
      </EditFormLayout>
    );
  }

  const [formData, setFormData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
    nationalId: client?.nationalId || '',
    status: client?.status || 'active',
    kycStatus: client?.kycStatus || 'pending'
  });

  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [idDocument, setIdDocument] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving client data:', formData);
    console.log('Passport photo:', passportPhoto);
    console.log('ID document:', idDocument);
    toast.success('Client updated successfully');
    navigate(`/company/clients/${id}`);
  };

  const handleBack = () => {
    navigate(`/company/clients/${id}`);
  };

  return (
    <EditFormLayout
      title="Edit Client"
      description="Update client information and details"
      backPath={`/company/clients/${id}`}
      onSave={handleSave}
      onBack={handleBack}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <ClientEditForm
        formData={formData}
        onInputChange={handleInputChange}
        client={client}
        passportPhoto={passportPhoto}
        setPassportPhoto={setPassportPhoto}
        idDocument={idDocument}
        setIdDocument={setIdDocument}
      />
    </EditFormLayout>
  );
}
