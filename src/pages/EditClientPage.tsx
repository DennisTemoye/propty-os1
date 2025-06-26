
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ClientForm } from '@/components/dashboard/clients/ClientForm';
import { GlobalLayout } from '@/components/layouts/GlobalLayout';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useResponsive } from '@/hooks/use-responsive';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

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
  }
];

export default function EditClientPage() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { isSmallScreen } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const client = mockClients.find(c => c.id === parseInt(clientId || '1'));

  if (!client) {
    return (
      <SidebarProvider>
        <GlobalLayout
          sidebar={<CompanySidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
          formLayout={true}
        >
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Client not found</h1>
              <Button onClick={() => navigate('/company/clients')}>
                Back to Clients
              </Button>
            </div>
          </div>
        </GlobalLayout>
      </SidebarProvider>
    );
  }

  const handleClose = () => {
    navigate(`/company/clients/${client.id}`);
  };

  const mobileHeader = isSmallScreen ? (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {sidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
        Edit Client
      </h1>
      <div className="w-9" />
    </div>
  ) : undefined;

  return (
    <SidebarProvider>
      <GlobalLayout
        sidebar={<CompanySidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
        header={mobileHeader}
        formLayout={true}
      >
        {/* Mobile/Tablet Sidebar Overlay */}
        {isSmallScreen && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/company/clients/${client.id}`)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Client Details
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Client</h1>
            <p className="text-gray-600 mt-1">Update client information and details</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <ClientForm client={client} onClose={handleClose} />
        </div>
      </GlobalLayout>
    </SidebarProvider>
  );
}
