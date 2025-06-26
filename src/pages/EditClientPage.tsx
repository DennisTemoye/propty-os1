
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { MobileWarningBanner } from '@/components/common/MobileWarningBanner';
import { useResponsive } from '@/hooks/use-responsive';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
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
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSmallScreen } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const client = mockClients.find(c => c.id === parseInt(id || '0'));

  if (!client) {
    return (
      <SidebarProvider>
        <div className="w-full">
          <MobileWarningBanner />
          <div className={`min-h-screen flex w-full bg-gray-50 dark:bg-gray-900 ${isSmallScreen ? 'pt-16 sm:pt-20' : ''}`}>
            <CompanySidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)} 
            />
            
            <div className={`flex-1 flex flex-col min-w-0 overflow-hidden w-full ${isSmallScreen ? 'ml-0' : 'ml-64'}`}>
              <main className="flex-1 overflow-auto w-full">
                <div className="w-full min-h-screen bg-gray-50">
                  <div className="w-full max-w-none px-4 md:px-6 py-4">
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Not Found</h2>
                      <p className="text-gray-600 mb-4">The client with ID "{id}" could not be found.</p>
                      <Button onClick={() => navigate('/company/clients')}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Clients
                      </Button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const [formData, setFormData] = useState({
    name: client.name || '',
    email: client.email || '',
    phone: client.phone || '',
    address: client.address || '',
    nationalId: client.nationalId || '',
    status: client.status || 'active',
    kycStatus: client.kycStatus || 'pending'
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
    navigate(`/company/clients/${client.id}`);
  };

  const handleBack = () => {
    navigate(`/company/clients/${client.id}`);
  };

  return (
    <SidebarProvider>
      <div className="w-full">
        <MobileWarningBanner />
        <div className={`min-h-screen flex w-full bg-gray-50 dark:bg-gray-900 ${isSmallScreen ? 'pt-16 sm:pt-20' : ''}`}>
          <CompanySidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          
          <div className={`flex-1 flex flex-col min-w-0 overflow-hidden w-full ${isSmallScreen ? 'ml-0' : 'ml-64'}`}>
            <main className="flex-1 overflow-auto w-full">
              <div className="w-full min-h-screen bg-gray-50">
                <div className="w-full max-w-none px-4 md:px-6 py-4">
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        onClick={handleBack}
                        className="mb-4"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      
                      <Button 
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900">Edit Client</h1>
                    <p className="text-gray-600 mt-2">Update client information and details</p>
                  </div>

                  <ClientEditForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    client={client}
                    passportPhoto={passportPhoto}
                    setPassportPhoto={setPassportPhoto}
                    idDocument={idDocument}
                    setIdDocument={setIdDocument}
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
