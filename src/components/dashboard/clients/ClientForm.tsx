
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Upload, 
  ChevronDown, 
  ChevronRight, 
  Link2, 
  UserPlus, 
  IdCard, 
  MapPin, 
  Users, 
  StickyNote,
  Camera,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';

interface ClientFormProps {
  onClose: () => void;
  client?: any;
}

export function ClientForm({ onClose, client }: ClientFormProps) {
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [onboardingMethod, setOnboardingMethod] = useState<'manual' | 'link'>('manual');
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    identification: false,
    address: false,
    nextOfKin: false,
    notes: false
  });
  
  const form = useForm({
    defaultValues: {
      firstName: client?.firstName || '',
      lastName: client?.lastName || '',
      otherName: client?.otherName || '',
      gender: client?.gender || '',
      maritalStatus: client?.maritalStatus || '',
      email: client?.email || '',
      phone: client?.phone || '',
      nationality: client?.nationality || '',
      occupation: client?.occupation || '',
      employerName: client?.employerName || '',
      idType: client?.idType || '',
      idNumber: client?.idNumber || '',
      permanentAddress: client?.permanentAddress || '',
      city: client?.city || '',
      state: client?.state || '',
      nokFullName: client?.nokFullName || '',
      nokRelationship: client?.nokRelationship || '',
      nokAddress: client?.nokAddress || '',
      nokEmail: client?.nokEmail || '',
      nokPhone: client?.nokPhone || '',
      notes: client?.notes || ''
    }
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const onSubmit = (data: any) => {
    console.log('Client form data:', data);
    console.log('Passport photo:', passportPhoto);
    console.log('Onboarding method:', onboardingMethod);
    onClose();
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPassportPhoto(file);
    }
  };

  const generateFormLink = () => {
    const link = `${window.location.origin}/client-form/${Date.now()}`;
    navigator.clipboard.writeText(link);
    console.log('Form link copied to clipboard:', link);
  };

  if (onboardingMethod === 'link') {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-none shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Link2 className="h-10 w-10 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Share Client Form</h3>
                <p className="text-gray-600 max-w-md mx-auto">Send this secure link to your client so they can fill out their information directly</p>
              </div>
              <div className="bg-white p-6 rounded-xl border-2 border-dashed border-purple-200 shadow-inner">
                <code className="text-sm text-gray-700 break-all font-mono bg-gray-50 px-3 py-2 rounded-lg">
                  {`${window.location.origin}/client-form/${Date.now()}`}
                </code>
              </div>
              <div className="flex gap-3">
                <Button onClick={generateFormLink} className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg">
                  <Link2 className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Button variant="outline" onClick={() => setOnboardingMethod('manual')} className="flex-1 border-purple-200 hover:bg-purple-50">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Fill Manually
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          {client ? 'Update Client Information' : 'Add New Client'}
        </h2>
        <p className="text-purple-100">
          Fill in the client details below or share a form link for self-completion
        </p>
      </div>

      {/* Onboarding Method Selector */}
      <Card className="border border-purple-100 shadow-md">
        <CardContent className="p-4">
          <Select value={onboardingMethod} onValueChange={(value: 'manual' | 'link') => setOnboardingMethod(value)}>
            <SelectTrigger className="w-full border-purple-200 focus:ring-purple-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-purple-100">
              <SelectItem value="manual">
                <div className="flex items-center gap-3 py-1">
                  <UserPlus className="h-4 w-4 text-purple-600" />
                  <span>Fill form manually</span>
                </div>
              </SelectItem>
              <SelectItem value="link">
                <div className="flex items-center gap-3 py-1">
                  <Link2 className="h-4 w-4 text-indigo-600" />
                  <span>Copy form link to share with client</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <Collapsible open={expandedSections.personal} onOpenChange={() => toggleSection('personal')}>
            <Card className="overflow-hidden border border-purple-100 shadow-md hover:shadow-lg transition-shadow">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-purple-50 transition-colors border-b border-purple-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <span className="text-lg font-semibold text-gray-900">Personal Information</span>
                        <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">Required</Badge>
                      </div>
                    </div>
                    {expandedSections.personal ? 
                      <ChevronDown className="h-5 w-5 text-purple-600" /> : 
                      <ChevronRight className="h-5 w-5 text-purple-600" />
                    }
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-6 space-y-6 bg-gradient-to-br from-white to-purple-25">
                  {/* Passport Photo */}
                  <div className="flex flex-col items-center space-y-4">
                    <FormLabel className="text-sm font-semibold text-gray-700">Passport Photograph</FormLabel>
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-32 h-32 border-2 border-dashed border-purple-300 rounded-xl flex items-center justify-center bg-purple-50 hover:bg-purple-100 transition-colors">
                          {passportPhoto ? (
                            <img 
                              src={URL.createObjectURL(passportPhoto)} 
                              alt="Passport" 
                              className="w-full h-full object-cover rounded-xl"
                            />
                          ) : (
                            <Camera className="h-12 w-12 text-purple-400" />
                          )}
                        </div>
                        {passportPhoto && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="passport-upload"
                        />
                        <label htmlFor="passport-upload">
                          <Button type="button" variant="outline" size="sm" asChild className="border-purple-200 hover:bg-purple-50">
                            <span className="cursor-pointer">
                              <Upload className="h-4 w-4 mr-2" />
                              {passportPhoto ? 'Change Photo' : 'Upload Photo'}
                            </span>
                          </Button>
                        </label>
                        <p className="text-xs text-gray-500">JPG, PNG up to 2MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <User className="h-4 w-4" />
                            First Name *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} className="border-purple-200 focus:ring-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <User className="h-4 w-4" />
                            Last Name *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} className="border-purple-200 focus:ring-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="otherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Other Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter other name" {...field} className="border-purple-200 focus:ring-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Gender *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-purple-200 focus:ring-purple-500">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maritalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Marital Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-purple-200 focus:ring-purple-500">
                                <SelectValue placeholder="Select marital status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="single">Single</SelectItem>
                              <SelectItem value="married">Married</SelectItem>
                              <SelectItem value="divorced">Divorced</SelectItem>
                              <SelectItem value="widowed">Widowed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Mail className="h-4 w-4" />
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field} className="border-purple-200 focus:ring-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Phone className="h-4 w-4" />
                            Phone Number *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} className="border-purple-200 focus:ring-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Nationality</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter nationality" {...field} className="border-purple-200 focus:ring-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Briefcase className="h-4 w-4" />
                            Occupation
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter occupation" {...field} className="border-purple-200 focus:ring-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Employer/Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter employer or business name" {...field} className="border-purple-200 focus:ring-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Identification */}
          <Collapsible open={expandedSections.identification} onOpenChange={() => toggleSection('identification')}>
            <Card className="overflow-hidden border border-indigo-100 shadow-md hover:shadow-lg transition-shadow">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-indigo-50 transition-colors border-b border-indigo-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <IdCard className="h-5 w-5 text-indigo-600" />
                      </div>
                      <span className="text-lg font-semibold text-gray-900">Identification</span>
                    </div>
                    {expandedSections.identification ? 
                      <ChevronDown className="h-5 w-5 text-indigo-600" /> : 
                      <ChevronRight className="h-5 w-5 text-indigo-600" />
                    }
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-6 space-y-6 bg-gradient-to-br from-white to-indigo-25">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="idType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">ID Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-indigo-200 focus:ring-indigo-500">
                                <SelectValue placeholder="Select ID type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nin">National ID (NIN)</SelectItem>
                              <SelectItem value="passport">International Passport</SelectItem>
                              <SelectItem value="drivers_license">Driver's License</SelectItem>
                              <SelectItem value="voters_card">Voter's Card</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">ID Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter ID number" {...field} className="border-indigo-200 focus:ring-indigo-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Residential Address */}
          <Collapsible open={expandedSections.address} onOpenChange={() => toggleSection('address')}>
            <Card className="overflow-hidden border border-green-100 shadow-md hover:shadow-lg transition-shadow">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-green-50 transition-colors border-b border-green-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-lg font-semibold text-gray-900">Residential Address</span>
                    </div>
                    {expandedSections.address ? 
                      <ChevronDown className="h-5 w-5 text-green-600" /> : 
                      <ChevronRight className="h-5 w-5 text-green-600" />
                    }
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-6 space-y-6 bg-gradient-to-br from-white to-green-25">
                  <FormField
                    control={form.control}
                    name="permanentAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Permanent Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter permanent address" 
                            {...field} 
                            className="border-green-200 focus:ring-green-500 min-h-[100px]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} className="border-green-200 focus:ring-green-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">State</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter state" {...field} className="border-green-200 focus:ring-green-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Next of Kin Information */}
          <Collapsible open={expandedSections.nextOfKin} onOpenChange={() => toggleSection('nextOfKin')}>
            <Card className="overflow-hidden border border-orange-100 shadow-md hover:shadow-lg transition-shadow">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-orange-50 transition-colors border-b border-orange-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Users className="h-5 w-5 text-orange-600" />
                      </div>
                      <span className="text-lg font-semibold text-gray-900">Next of Kin Information</span>
                    </div>
                    {expandedSections.nextOfKin ? 
                      <ChevronDown className="h-5 w-5 text-orange-600" /> : 
                      <ChevronRight className="h-5 w-5 text-orange-600" />
                    }
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-6 space-y-6 bg-gradient-to-br from-white to-orange-25">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="nokFullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <User className="h-4 w-4" />
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter next of kin's full name" {...field} className="border-orange-200 focus:ring-orange-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nokRelationship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Relationship *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-orange-200 focus:ring-orange-500">
                                <SelectValue placeholder="Select relationship" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="spouse">Spouse</SelectItem>
                              <SelectItem value="parent">Parent</SelectItem>
                              <SelectItem value="child">Child</SelectItem>
                              <SelectItem value="sibling">Sibling</SelectItem>
                              <SelectItem value="friend">Friend</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nokPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Phone className="h-4 w-4" />
                            Phone Number *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} className="border-orange-200 focus:ring-orange-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nokEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field} className="border-orange-200 focus:ring-orange-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="nokAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <MapPin className="h-4 w-4" />
                          Address
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter next of kin's address" 
                            {...field} 
                            className="border-orange-200 focus:ring-orange-500 min-h-[80px]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Additional Notes */}
          <Collapsible open={expandedSections.notes} onOpenChange={() => toggleSection('notes')}>
            <Card className="overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <StickyNote className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="text-lg font-semibold text-gray-900">Additional Notes</span>
                    </div>
                    {expandedSections.notes ? 
                      <ChevronDown className="h-5 w-5 text-gray-600" /> : 
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    }
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-6">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add any additional notes about the client" 
                            className="min-h-[120px] border-gray-200 focus:ring-gray-500"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Action Buttons */}
          <Card className="border border-purple-100 shadow-lg">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg h-12 text-lg font-semibold"
                >
                  {client ? 'Update Client' : 'Create Client'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose} 
                  className="flex-1 border-gray-300 hover:bg-gray-50 h-12 text-lg font-semibold"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
