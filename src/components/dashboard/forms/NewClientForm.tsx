
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin, Building, Users, FileText } from 'lucide-react';

interface NewClientFormProps {
  onClose: () => void;
}

export function NewClientForm({ onClose }: NewClientFormProps) {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      clientType: 'individual',
      source: '',
      notes: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Creating new client:', data);
    toast.success('Client created successfully!');
    onClose();
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Add New Client</h2>
        <p className="text-gray-600 mt-1">Fill in the details below to create a new client profile</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-purple-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  First Name *
                </label>
                <Input 
                  {...form.register('firstName', { required: true })}
                  placeholder="Enter first name"
                  className="h-11" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Last Name *
                </label>
                <Input 
                  {...form.register('lastName', { required: true })}
                  placeholder="Enter last name"
                  className="h-11" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Email Address *
                </label>
                <Input 
                  type="email"
                  {...form.register('email', { required: true })}
                  placeholder="Enter email address"
                  className="h-11" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Phone Number *
                </label>
                <Input 
                  {...form.register('phone', { required: true })}
                  placeholder="Enter phone number"
                  className="h-11" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 text-left block">
                Address
              </label>
              <Input 
                {...form.register('address')}
                placeholder="Enter full address"
                className="h-11" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Client Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building className="h-5 w-5 text-blue-600" />
              Client Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Client Type
                </label>
                <Select onValueChange={(value) => form.setValue('clientType', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select client type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Lead Source
                </label>
                <Select onValueChange={(value) => form.setValue('source', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="social_media">Social Media</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="walk_in">Walk-in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-green-600" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 text-left block">Notes</label>
              <Textarea 
                {...form.register('notes')}
                placeholder="Additional notes about the client..."
                className="min-h-[100px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <User className="h-4 w-4 mr-2" />
            Create Client
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="h-12 px-8">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
