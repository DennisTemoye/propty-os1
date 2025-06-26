import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { EditFormLayout } from '@/components/dashboard/forms/EditFormLayout';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  console.log('EditMarketerPage - ID from params:', id);
  
  // For now using single mock marketer, in real app would find by ID
  const marketer = mockMarketer;
  
  console.log('EditMarketerPage - Found marketer:', marketer);

  if (!marketer) {
    return (
      <EditFormLayout
        title="Marketer Not Found"
        description={`The marketer with ID "${id}" could not be found.`}
        backPath="/company/marketers"
        onSave={() => {}}
        onBack={() => navigate('/company/marketers')}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        <div className="text-center py-8">
          <p className="text-gray-600">Please check the marketer ID and try again.</p>
        </div>
      </EditFormLayout>
    );
  }

  const [formData, setFormData] = useState({
    name: marketer?.name || '',
    email: marketer?.email || '',
    phone: marketer?.phone || '',
    role: marketer?.role || 'Junior Marketer',
    status: marketer?.status || 'active',
    commissionRate: marketer?.commissionRate || '2.5'
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
    <EditFormLayout
      title="Edit Marketer Profile"
      description="Update marketer information and settings"
      backPath={`/company/marketers/${marketer.id}`}
      onSave={handleSave}
      onBack={handleBack}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <MarketerEditForm
        formData={formData}
        onInputChange={handleInputChange}
        marketer={marketer}
        profilePhoto={profilePhoto}
        setProfilePhoto={setProfilePhoto}
      />
    </EditFormLayout>
  );
}
