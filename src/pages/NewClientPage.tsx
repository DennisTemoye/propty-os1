
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ArrowLeft, User, Mail, Phone, MapPin, Building, Users, FileText, Copy, ChevronDown, Upload, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewClientPage() {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    personal: true,
    identification: false,
    address: false,
    nextOfKin: false,
    notes: false
  });

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
      employer: '',
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

  const companyFormLink = 'https://proptyos.com/client-form?company=XYZ';

  const onSubmit = (data: any) => {
    console.log('Creating new client:', data);
    toast.success('Client created successfully!');
    navigate('/company/clients');
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(companyFormLink);
    toast.success('Form link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/company/clients')}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Client</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-3">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <Card>
                <Collapsible open={openSections.personal} onOpenChange={() => toggleSection('personal')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-blue-600" />
                          Personal Information
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.personal ? 'rotate-180' : ''}`} />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-6">
                      {/* Passport Photo */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          Passport Photograph
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                            <Upload className="h-6 w-6 text-gray-400" />
                          </div>
                          <Button type="button" variant="outline" size="sm">
                            Upload Photo
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name *</label>
                          <Input {...form.register('firstName', { required: true })} placeholder="Enter first name" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name *</label>
                          <Input {...form.register('lastName', { required: true })} placeholder="Enter last name" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Other Name</label>
                          <Input {...form.register('otherName')} placeholder="Enter other name (optional)" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender *</label>
                          <Select onValueChange={(value) => form.setValue('gender', value)}>
                            <SelectTrigger>
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
                            <SelectTrigger>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address *
                          </label>
                          <Input type="email" {...form.register('email', { required: true })} placeholder="Enter email address" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number *
                          </label>
                          <Input {...form.register('phone', { required: true })} placeholder="Enter phone number" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nationality</label>
                          <Input {...form.register('nationality')} placeholder="Enter nationality" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Occupation</label>
                          <Input {...form.register('occupation')} placeholder="Enter occupation" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Employer or Business Name
                        </label>
                        <Input {...form.register('employer')} placeholder="Enter employer or business name" />
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Identification */}
              <Card>
                <Collapsible open={openSections.identification} onOpenChange={() => toggleSection('identification')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-green-600" />
                          Identification
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.identification ? 'rotate-180' : ''}`} />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">ID Type *</label>
                          <Select onValueChange={(value) => form.setValue('idType', value)}>
                            <SelectTrigger>
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
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">ID Number *</label>
                          <Input {...form.register('idNumber', { required: true })} placeholder="Enter ID number" />
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Residential Address */}
              <Card>
                <Collapsible open={openSections.address} onOpenChange={() => toggleSection('address')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-purple-600" />
                          Residential Address
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.address ? 'rotate-180' : ''}`} />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Address</label>
                        <Textarea {...form.register('address')} placeholder="Enter full residential address" rows={3} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                          <Input {...form.register('city')} placeholder="Enter city" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                          <Input {...form.register('state')} placeholder="Enter state" />
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Next of Kin Information */}
              <Card>
                <Collapsible open={openSections.nextOfKin} onOpenChange={() => toggleSection('nextOfKin')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-orange-600" />
                          Next of Kin Information
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.nextOfKin ? 'rotate-180' : ''}`} />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                          <Input {...form.register('nextOfKinName')} placeholder="Enter next of kin full name" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Relationship</label>
                          <Select onValueChange={(value) => form.setValue('nextOfKinRelationship', value)}>
                            <SelectTrigger>
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
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                        <Textarea {...form.register('nextOfKinAddress')} placeholder="Enter next of kin address" rows={2} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                          <Input type="email" {...form.register('nextOfKinEmail')} placeholder="Enter email address" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                          <Input {...form.register('nextOfKinPhone')} placeholder="Enter phone number" />
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Additional Notes */}
              <Card>
                <Collapsible open={openSections.notes} onOpenChange={() => toggleSection('notes')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-gray-600" />
                          Additional Notes
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.notes ? 'rotate-180' : ''}`} />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                        <Textarea 
                          {...form.register('notes')}
                          placeholder="Additional notes about the client..."
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6">
                <Button type="submit" className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <User className="h-4 w-4 mr-2" />
                  Create Client
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/company/clients')} className="h-12 px-8">
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Side Column */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Client Self-Onboarding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Prefer your client to fill the form directly? Copy the form link below and send to the client.
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Form Link:</p>
                    <p className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                      {companyFormLink}
                    </p>
                  </div>
                  <Button 
                    onClick={copyToClipboard}
                    variant="outline" 
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Benefits:</h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Client fills form at their convenience</li>
                    <li>• Reduces data entry errors</li>
                    <li>• Automatic form validation</li>
                    <li>• Digital document upload</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
