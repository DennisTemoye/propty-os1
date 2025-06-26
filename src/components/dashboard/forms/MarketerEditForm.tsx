
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Camera, Upload, IdCard } from 'lucide-react';

interface MarketerFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  commissionRate: string;
}

interface MarketerEditFormProps {
  formData: MarketerFormData;
  onInputChange: (field: string, value: string) => void;
  marketer: any;
  profilePhoto: File | null;
  setProfilePhoto: (file: File | null) => void;
}

export function MarketerEditForm({
  formData,
  onInputChange,
  marketer,
  profilePhoto,
  setProfilePhoto
}: MarketerEditFormProps) {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Marketer Info Form */}
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
                  onChange={(e) => onInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => onInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <Select value={formData.role} onValueChange={(value) => onInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior Marketer">Junior Marketer</SelectItem>
                    <SelectItem value="Senior Marketer">Senior Marketer</SelectItem>
                    <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                    <SelectItem value="Sales Director">Sales Director</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission & Status Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Commission & Status Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.commissionRate}
                  onChange={(e) => onInputChange('commissionRate', e.target.value)}
                  placeholder="Enter commission rate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Select value={formData.status} onValueChange={(value) => onInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Photo & Performance */}
      <div className="space-y-6">
        {/* Profile Photo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Profile Photo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  {profilePhoto ? (
                    <img 
                      src={URL.createObjectURL(profilePhoto)} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : marketer.avatar ? (
                    <img 
                      src={marketer.avatar} 
                      alt="Current profile" 
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
                    id="profile-upload"
                  />
                  <label htmlFor="profile-upload">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        {profilePhoto || marketer.avatar ? 'Change Photo' : 'Upload Photo'}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Leads</span>
                <span className="font-medium">{marketer.totalLeads || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversions</span>
                <span className="font-medium">{marketer.conversions || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Commission</span>
                <span className="font-medium">{marketer.totalCommission || '₦0'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Performance Rank</span>
                <span className="font-medium">#{marketer.performanceRank || 'N/A'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {marketer.assignedProjects && marketer.assignedProjects.length > 0 ? (
                marketer.assignedProjects.slice(0, 3).map((project: string, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <p className="font-medium text-sm">{project}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No projects assigned</p>
              )}
              {marketer.assignedProjects && marketer.assignedProjects.length > 3 && (
                <p className="text-xs text-gray-500">
                  +{marketer.assignedProjects.length - 3} more projects
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
