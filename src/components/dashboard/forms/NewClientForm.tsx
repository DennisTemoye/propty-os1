import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { User, Phone, MapPin, Building, Users, FileText, CreditCard } from 'lucide-react';
import { genderOptions, maritalStatusOptions, idTypeOptions, relationshipOptions, referralSourceOptions } from '@/forms/clientFormSchema';

interface NewClientFormProps {
  onClose: () => void;
}

export function NewClientForm({ onClose }: NewClientFormProps) {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      otherName: '',
      gender: '',
      maritalStatus: '',
      nationality: '',
      occupation: '',
      employerBusiness: '',
      email: '',
      phone: '',
      idType: '',
      nationalId: '',
      address: '',
      city: '',
      state: '',
      nextOfKinName: '',
      nextOfKinRelationship: '',
      nextOfKinAddress: '',
      nextOfKinEmail: '',
      nextOfKinPhone: '',
      clientType: 'individual',
      referralSource: '',
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
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Add New Client</h2>
        <p className="text-gray-600 mt-1">Fill in the details below to create a comprehensive client profile</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-left">
              <User className="h-5 w-5 text-purple-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Other Name
                </label>
                <Input 
                  {...form.register('otherName')}
                  placeholder="Enter other name"
                  className="h-11" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Gender
                </label>
                <Select onValueChange={(value) => form.setValue('gender', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Marital Status
                </label>
                <Select onValueChange={(value) => form.setValue('maritalStatus', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    {maritalStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Nationality
                </label>
                <Input 
                  {...form.register('nationality')}
                  placeholder="e.g., Nigerian"
                  className="h-11" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Occupation
                </label>
                <Input 
                  {...form.register('occupation')}
                  placeholder="Enter occupation"
                  className="h-11" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 text-left block">
                Employer/Business Name
              </label>
              <Input 
                {...form.register('employerBusiness')}
                placeholder="Enter employer or business name"
                className="h-11" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-left">
              <Phone className="h-5 w-5 text-blue-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Identification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-left">
              <CreditCard className="h-5 w-5 text-green-600" />
              Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  ID Type
                </label>
                <Select onValueChange={(value) => form.setValue('idType', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    {idTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  ID Number
                </label>
                <Input 
                  {...form.register('nationalId')}
                  placeholder="Enter ID number"
                  className="h-11" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Residential Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-left">
              <MapPin className="h-5 w-5 text-orange-600" />
              Residential Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 text-left block">
                Permanent Residential Address *
              </label>
              <Input 
                {...form.register('address', { required: true })}
                placeholder="Enter full address"
                className="h-11" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  City
                </label>
                <Input 
                  {...form.register('city')}
                  placeholder="Enter city"
                  className="h-11" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  State
                </label>
                <Input 
                  {...form.register('state')}
                  placeholder="Enter state"
                  className="h-11" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next of Kin Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-left">
              <Users className="h-5 w-5 text-indigo-600" />
              Next of Kin Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Next of Kin Full Name
                </label>
                <Input 
                  {...form.register('nextOfKinName')}
                  placeholder="Enter next of kin name"
                  className="h-11" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Relationship
                </label>
                <Select onValueChange={(value) => form.setValue('nextOfKinRelationship', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationshipOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 text-left block">
                Next of Kin Address
              </label>
              <Input 
                {...form.register('nextOfKinAddress')}
                placeholder="Enter next of kin address"
                className="h-11" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Next of Kin Email
                </label>
                <Input 
                  type="email"
                  {...form.register('nextOfKinEmail')}
                  placeholder="Enter next of kin email"
                  className="h-11" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-left block">
                  Next of Kin Phone
                </label>
                <Input 
                  {...form.register('nextOfKinPhone')}
                  placeholder="Enter next of kin phone"
                  className="h-11" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-left">
              <Building className="h-5 w-5 text-purple-600" />
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
                  Referral Source
                </label>
                <Select onValueChange={(value) => form.setValue('referralSource', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {referralSourceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-left">
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