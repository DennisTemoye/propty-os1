
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { MobileWarningBanner } from '@/components/common/MobileWarningBanner';
import { useResponsive } from '@/hooks/use-responsive';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { MarketerEditForm } from '@/components/dashboard/forms/MarketerEditForm';

const mockMarketer = {
  id: 1,
  name: 'Jane Smith',
  email: 'jane@proptyos.com',
  phone: '+234 801 111 2222',
  role: 'Senior Marketer',
  status: 'active',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
  joinDate: '2023-06-15',
  totalLeads: 45,
  conversions: 12,
  totalSales: 8,
  totalSalesVolume: '₦200M',
  totalCommission: '₦2.4M',
  commissionPaid: '₦1.8M',
  commissionPending: '₦600K',
  assignedProjects: ['Victoria Gardens', 'Emerald Heights'],
  performanceRank: 3,
  totalMarketers: 15,
  commissionRate: '2.5'
};

export default function EditMarketerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSmallScreen } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // For now using single mock marketer, in real app would find by ID
  const marketer = mockMarketer;

  if (!marketer) {
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
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Marketer Not Found</h2>
                      <p className="text-gray-600 mb-4">The marketer with ID "{id}" could not be found.</p>
                      <Button onClick={() => navigate('/company/marketers')}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Marketers
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
    name: marketer.name || '',
    email: marketer.email || '',
    phone: marketer.phone || '',
    role: marketer.role || 'Junior Marketer',
    status: marketer.status || 'active',
    commissionRate: marketer.commissionRate || '2.5'
  });

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving marketer data:', formData);
    console.log('Profile photo:', profilePhoto);
    toast.success('Marketer profile updated successfully');
    navigate(`/company/marketers/${marketer.id}`);
  };

  const handleBack = () => {
    navigate(`/company/marketers/${marketer.id}`);
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
                    
                    <h1 className="text-3xl font-bold text-gray-900">Edit Marketer Profile</h1>
                    <p className="text-gray-600 mt-2">Update marketer information and settings</p>
                  </div>

                  <MarketerEditForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    marketer={marketer}
                    profilePhoto={profilePhoto}
                    setProfilePhoto={setProfilePhoto}
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
