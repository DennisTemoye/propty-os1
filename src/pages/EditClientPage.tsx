import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Upload, Camera, User, Mail, Phone, MapPin, IdCard } from 'lucide-react';
import { toast } from 'sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { MobileWarningBanner } from '@/components/common/MobileWarningBanner';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { useResponsive } from '@/hooks/use-responsive';

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
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { isMobile, isTablet, isSmallScreen } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const client = mockClients.find(c => c.id === parseInt(clientId || '1'));

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

  if (!client) {
    return <div>Client not found</div>;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPassportPhoto(file);
    }
  };

  const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIdDocument(file);
    }
  };

  const handleSave = () => {
    console.log('Saving client data:', formData);
    console.log('Passport photo:', passportPhoto);
    console.log('ID document:', idDocument);
    toast.success('Client updated successfully');
    navigate(`/company/clients/${clientId}`);
  };

  return (
    <div className="w-full">
      <MobileWarningBanner />
      <SidebarProvider>
        <div className={`min-h-screen flex w-full bg-gray-50 dark:bg-gray-900 ${isSmallScreen ? 'pt-16 sm:pt-20' : ''}`}>
          
          <CompanySidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden w-full">
            {/* Mobile/Tablet Header */}
            {isSmallScreen && (
              <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2 sticky top-16 sm:top-20 z-30 shadow-sm w-full">
                <div className="flex items-center justify-between">
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
                  <h1 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                    Edit Client
                  </h1>
                  <div className="w-9" />
                </div>
              </header>
            )}
            
            <main className="flex-1 overflow-auto w-full">
              <div className="w-full min-h-screen bg-gray-50">
                <div className="w-full max-w-none px-4 md:px-6 py-4">
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate(`/company/clients/${clientId}`)}
                        className="mb-4"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Client Details
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

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Client Info Form */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Basic Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Basic Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                              <Input
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Enter full name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                              <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Enter email address"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                              <Input
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="Enter phone number"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">National ID</label>
                              <Input
                                value={formData.nationalId}
                                onChange={(e) => handleInputChange('nationalId', e.target.value)}
                                placeholder="Enter national ID"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <Textarea
                              value={formData.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                              placeholder="Enter full address"
                              rows={3}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Status Settings */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Status Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Client Status</label>
                              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="unassigned">Unassigned</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">KYC Status</label>
                              <Select value={formData.kycStatus} onValueChange={(value) => handleInputChange('kycStatus', value)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Right Column - Photo & Documents */}
                    <div className="space-y-6">
                      {/* Passport Photo */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Camera className="h-5 w-5" />
                            Passport Photo
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex flex-col items-center">
                              <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                {passportPhoto ? (
                                  <img 
                                    src={URL.createObjectURL(passportPhoto)} 
                                    alt="Passport" 
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : client.passportPhoto ? (
                                  <img 
                                    src={client.passportPhoto} 
                                    alt="Current passport" 
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <Camera className="h-12 w-12 text-gray-400" />
                                )}
                              </div>
                              <div className="mt-3">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handlePhotoUpload}
                                  className="hidden"
                                  id="passport-upload"
                                />
                                <label htmlFor="passport-upload">
                                  <Button type="button" variant="outline" size="sm" asChild>
                                    <span className="cursor-pointer">
                                      <Upload className="h-4 w-4 mr-2" />
                                      {passportPhoto || client.passportPhoto ? 'Change Photo' : 'Upload Photo'}
                                    </span>
                                  </Button>
                                </label>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* ID Document */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <IdCard className="h-5 w-5" />
                            ID Document
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                              {idDocument ? (
                                <div className="space-y-2">
                                  <IdCard className="h-8 w-8 text-green-600 mx-auto" />
                                  <p className="text-sm font-medium text-green-600">{idDocument.name}</p>
                                  <p className="text-xs text-gray-500">Document uploaded</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <IdCard className="h-8 w-8 text-gray-400 mx-auto" />
                                  <p className="text-sm text-gray-600">Upload ID document</p>
                                </div>
                              )}
                            </div>
                            <Input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleIdUpload}
                              className="hidden"
                              id="id-upload"
                            />
                            <label htmlFor="id-upload">
                              <Button type="button" variant="outline" className="w-full" asChild>
                                <span className="cursor-pointer">
                                  <Upload className="h-4 w-4 mr-2" />
                                  {idDocument ? 'Change Document' : 'Upload ID Document'}
                                </span>
                              </Button>
                            </label>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Current Projects */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Assigned Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {client.projects.length > 0 ? (
                              client.projects.slice(0, 3).map((project, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-md">
                                  <p className="font-medium text-sm">{project.name}</p>
                                  <p className="text-xs text-gray-600">{project.unit}</p>
                                  <p className="text-xs text-gray-500">Assigned: {project.assignedDate}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500">No projects assigned</p>
                            )}
                            {client.projects.length > 3 && (
                              <p className="text-xs text-gray-500">
                                +{client.projects.length - 3} more projects
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
