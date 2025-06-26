
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Camera, Upload, IdCard } from 'lucide-react';

interface ClientEditFormProps {
  client: any;
  onFormChange?: () => void;
  onSubmit?: () => void;
}

export function ClientEditForm({
  client,
  onFormChange,
  onSubmit
}: ClientEditFormProps) {
  const [formData, setFormData] = useState({
    name: `${client.firstName} ${client.lastName}`,
    email: client.email,
    phone: client.phone,
    address: client.address,
    nationalId: client.nationalId || '',
    status: 'active',
    kycStatus: 'approved'
  });

  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [idDocument, setIdDocument] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    onFormChange?.();
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPassportPhoto(file);
      onFormChange?.();
    }
  };

  const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIdDocument(file);
      onFormChange?.();
    }
  };

  return (
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
              {client.projects && client.projects.length > 0 ? (
                client.projects.slice(0, 3).map((project: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <p className="font-medium text-sm">{project.name}</p>
                    <p className="text-xs text-gray-600">{project.unit}</p>
                    <p className="text-xs text-gray-500">Assigned: {project.assignedDate}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No projects assigned</p>
              )}
              {client.projects && client.projects.length > 3 && (
                <p className="text-xs text-gray-500">
                  +{client.projects.length - 3} more projects
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
