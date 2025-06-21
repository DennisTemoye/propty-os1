
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ArrowLeft, User, Upload, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewClientPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const form = useForm({
    defaultValues: {
      passportPhoto: null,
      firstName: '',
      lastName: '',
      otherName: '',
      gender: '',
      maritalStatus: '',
      email: '',
      phone: '',
      nationality: '',
      occupation: '',
      employerName: '',
      idType: '',
      idNumber: '',
      address: '',
      city: '',
      state: '',
      nextOfKinName: '',
      nextOfKinRelationship: '',
      nextOfKinAddress: '',
      nextOfKinEmail: '',
      nextOfKinPhone: '',
      notes: ''
    }
  });

  const formLink = "https://app.proptyos.com/form/client-intake?company=XYZ123";

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('passportPhoto', file);
    }
  };

  const copyFormLink = async () => {
    try {
      await navigator.clipboard.writeText(formLink);
      setCopied(true);
      toast.success('Form link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const onSubmit = (data: any) => {
    console.log('Creating new client:', data);
    toast.success('Client created successfully!');
    navigate('/company/clients');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <CompanySidebar />
        <div className="flex-1 flex">
          {/* Main Form Area */}
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/company/clients')}
                  className="mb-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Clients
                </Button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Client</h1>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Fill in the client details below to create a new client profile</p>
              </div>

              {/* Form */}
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Passport Photo */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Passport Photograph</label>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
                          {photoPreview ? (
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Upload className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label htmlFor="photo-upload">
                            <Button type="button" variant="outline" className="cursor-pointer" asChild>
                              <span>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Photo
                              </span>
                            </Button>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name *</label>
                        <Input 
                          {...form.register('firstName', { required: true })}
                          placeholder="Enter first name"
                          className="h-11" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name *</label>
                        <Input 
                          {...form.register('lastName', { required: true })}
                          placeholder="Enter last name"
                          className="h-11" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Other Name</label>
                        <Input 
                          {...form.register('otherName')}
                          placeholder="Enter other name (optional)"
                          className="h-11" 
                        />
                      </div>
                    </div>

                    {/* Gender and Marital Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender *</label>
                        <Select onValueChange={(value) => form.setValue('gender', value)}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Marital Status</label>
                        <Select onValueChange={(value) => form.setValue('maritalStatus', value)}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select marital status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address *</label>
                        <Input 
                          type="email"
                          {...form.register('email', { required: true })}
                          placeholder="Enter email address"
                          className="h-11" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number *</label>
                        <Input 
                          {...form.register('phone', { required: true })}
                          placeholder="Enter phone number"
                          className="h-11" 
                        />
                      </div>
                    </div>

                    {/* Additional Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nationality</label>
                        <Input 
                          {...form.register('nationality')}
                          placeholder="Enter nationality"
                          className="h-11" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Occupation</label>
                        <Input 
                          {...form.register('occupation')}
                          placeholder="Enter occupation"
                          className="h-11" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Employer Name / Business Name</label>
                      <Input 
                        {...form.register('employerName')}
                        placeholder="Enter employer or business name"
                        className="h-11" 
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Identification */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Identification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">ID Type</label>
                        <Select onValueChange={(value) => form.setValue('idType', value)}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="national_id">National ID</SelectItem>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="drivers_license">Driver's License</SelectItem>
                            <SelectItem value="voters_card">Voter's Card</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">ID Number</label>
                        <Input 
                          {...form.register('idNumber')}
                          placeholder="Enter ID number"
                          className="h-11" 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Address */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Residential Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Permanent Residential Address</label>
                      <Textarea 
                        {...form.register('address')}
                        placeholder="Enter full residential address"
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                        <Input 
                          {...form.register('city')}
                          placeholder="Enter city"
                          className="h-11" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                        <Input 
                          {...form.register('state')}
                          placeholder="Enter state"
                          className="h-11" 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next of Kin */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Next of Kin Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Next of Kin Full Name</label>
                        <Input 
                          {...form.register('nextOfKinName')}
                          placeholder="Enter next of kin full name"
                          className="h-11" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Relationship</label>
                        <Select onValueChange={(value) => form.setValue('nextOfKinRelationship', value)}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="child">Child</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="friend">Friend</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Next of Kin Address</label>
                      <Textarea 
                        {...form.register('nextOfKinAddress')}
                        placeholder="Enter next of kin address"
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Next of Kin Email</label>
                        <Input 
                          type="email"
                          {...form.register('nextOfKinEmail')}
                          placeholder="Enter next of kin email"
                          className="h-11" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Next of Kin Phone</label>
                        <Input 
                          {...form.register('nextOfKinPhone')}
                          placeholder="Enter next of kin phone"
                          className="h-11" 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Notes */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Additional Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                      <Textarea 
                        {...form.register('notes')}
                        placeholder="Add any additional notes about the client..."
                        className="min-h-[120px] resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex gap-3 pt-6">
                  <Button type="submit" className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <User className="h-4 w-4 mr-2" />
                    Create Client
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/company/clients')} className="h-12 px-8">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Side Column */}
          <div className="w-80 p-6 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Client Self-Onboarding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Prefer to let your client fill this? Copy and send the form link below.
                </p>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Form Link</label>
                  <div className="flex gap-2">
                    <Input 
                      value={formLink}
                      readOnly
                      className="text-xs bg-gray-50 dark:bg-gray-700"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={copyFormLink}
                      className="shrink-0"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <strong>Note:</strong> Clients who complete this form will appear with a "Self-filled" status in your client list.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default NewClientPage;
