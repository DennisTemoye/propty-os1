
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Users, 
  FileText, 
  Link, 
  Copy,
  Share2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Camera,
  IdCard,
  Heart
} from 'lucide-react';

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
      // Personal Information
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
      
      // Identification
      idType: '',
      idNumber: '',
      
      // Residential Address
      fullAddress: '',
      city: '',
      state: '',
      
      // Next of Kin
      nokFullName: '',
      nokRelationship: '',
      nokAddress: '',
      nokEmail: '',
      nokPhone: '',
      
      // Additional Notes
      notes: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Creating new client:', data);
    toast.success('Client created successfully!');
    navigate('/company/clients');
    form.reset();
  };

  const formLink = `${window.location.origin}/client-form/new`;

  const copyFormLink = () => {
    navigator.clipboard.writeText(formLink);
    toast.success('Form link copied to clipboard!');
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ icon: Icon, title, isOpen, onToggle, color }: any) => (
    <CollapsibleTrigger asChild>
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full justify-between p-4 h-auto hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </Button>
    </CollapsibleTrigger>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/company/clients')}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Client</h1>
              <p className="text-gray-600">Create a comprehensive client profile with detailed information</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Personal Information Section */}
              <Card>
                <Collapsible open={openSections.personal} onOpenChange={() => toggleSection('personal')}>
                  <SectionHeader 
                    icon={User}
                    title="Personal Information"
                    isOpen={openSections.personal}
                    onToggle={() => toggleSection('personal')}
                    color="bg-gradient-to-br from-purple-500 to-purple-600"
                  />
                  <CollapsibleContent>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          Passport Photograph
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Click to upload passport photograph</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName"
                            {...form.register('firstName', { required: true })}
                            placeholder="Enter first name"
                            className="h-11" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName"
                            {...form.register('lastName', { required: true })}
                            placeholder="Enter last name"
                            className="h-11" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="otherName">Other Name</Label>
                          <Input 
                            id="otherName"
                            {...form.register('otherName')}
                            placeholder="Enter other name (optional)"
                            className="h-11" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Gender *</Label>
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
                          <Label>Marital Status *</Label>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address *
                          </Label>
                          <Input 
                            id="email"
                            type="email"
                            {...form.register('email', { required: true })}
                            placeholder="Enter email address"
                            className="h-11" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number *
                          </Label>
                          <Input 
                            id="phone"
                            {...form.register('phone', { required: true })}
                            placeholder="Enter phone number"
                            className="h-11" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nationality">Nationality</Label>
                          <Input 
                            id="nationality"
                            {...form.register('nationality')}
                            placeholder="Enter nationality"
                            className="h-11" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="occupation">Occupation</Label>
                          <Input 
                            id="occupation"
                            {...form.register('occupation')}
                            placeholder="Enter occupation"
                            className="h-11" 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employer" className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Employer or Business Name
                        </Label>
                        <Input 
                          id="employer"
                          {...form.register('employer')}
                          placeholder="Enter employer or business name"
                          className="h-11" 
                        />
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Identification Section */}
              <Card>
                <Collapsible open={openSections.identification} onOpenChange={() => toggleSection('identification')}>
                  <SectionHeader 
                    icon={IdCard}
                    title="Identification"
                    isOpen={openSections.identification}
                    onToggle={() => toggleSection('identification')}
                    color="bg-gradient-to-br from-blue-500 to-blue-600"
                  />
                  <CollapsibleContent>
                    <CardContent className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>ID Type *</Label>
                          <Select onValueChange={(value) => form.setValue('idType', value)}>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select ID type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="national_id">National ID</SelectItem>
                              <SelectItem value="passport">International Passport</SelectItem>
                              <SelectItem value="drivers_license">Driver's License</SelectItem>
                              <SelectItem value="voters_card">Voter's Card</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="idNumber">ID Number *</Label>
                          <Input 
                            id="idNumber"
                            {...form.register('idNumber', { required: true })}
                            placeholder="Enter ID number"
                            className="h-11" 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Residential Address Section */}
              <Card>
                <Collapsible open={openSections.address} onOpenChange={() => toggleSection('address')}>
                  <SectionHeader 
                    icon={MapPin}
                    title="Residential Address"
                    isOpen={openSections.address}
                    onToggle={() => toggleSection('address')}
                    color="bg-gradient-to-br from-green-500 to-green-600"
                  />
                  <CollapsibleContent>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullAddress">Full Address *</Label>
                        <Textarea 
                          id="fullAddress"
                          {...form.register('fullAddress', { required: true })}
                          placeholder="Enter complete residential address"
                          className="min-h-[80px] resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input 
                            id="city"
                            {...form.register('city', { required: true })}
                            placeholder="Enter city"
                            className="h-11" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input 
                            id="state"
                            {...form.register('state', { required: true })}
                            placeholder="Enter state"
                            className="h-11" 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Next of Kin Section */}
              <Card>
                <Collapsible open={openSections.nextOfKin} onOpenChange={() => toggleSection('nextOfKin')}>
                  <SectionHeader 
                    icon={Heart}
                    title="Next of Kin Information"
                    isOpen={openSections.nextOfKin}
                    onToggle={() => toggleSection('nextOfKin')}
                    color="bg-gradient-to-br from-orange-500 to-orange-600"
                  />
                  <CollapsibleContent>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nokFullName">Full Name *</Label>
                        <Input 
                          id="nokFullName"
                          {...form.register('nokFullName', { required: true })}
                          placeholder="Enter next of kin full name"
                          className="h-11" 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nokRelationship">Relationship *</Label>
                        <Select onValueChange={(value) => form.setValue('nokRelationship', value)}>
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

                      <div className="space-y-2">
                        <Label htmlFor="nokAddress">Address</Label>
                        <Textarea 
                          id="nokAddress"
                          {...form.register('nokAddress')}
                          placeholder="Enter next of kin address"
                          className="min-h-[80px] resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nokEmail">Email Address</Label>
                          <Input 
                            id="nokEmail"
                            type="email"
                            {...form.register('nokEmail')}
                            placeholder="Enter email address"
                            className="h-11" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nokPhone">Phone Number</Label>
                          <Input 
                            id="nokPhone"
                            {...form.register('nokPhone')}
                            placeholder="Enter phone number"
                            className="h-11" 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Additional Notes Section */}
              <Card>
                <Collapsible open={openSections.notes} onOpenChange={() => toggleSection('notes')}>
                  <SectionHeader 
                    icon={FileText}
                    title="Additional Notes"
                    isOpen={openSections.notes}
                    onToggle={() => toggleSection('notes')}
                    color="bg-gradient-to-br from-indigo-500 to-indigo-600"
                  />
                  <CollapsibleContent>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea 
                          id="notes"
                          {...form.register('notes')}
                          placeholder="Additional notes about the client..."
                          className="min-h-[120px] resize-none"
                        />
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              <Separator />

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <User className="h-4 w-4 mr-2" />
                  Create Client
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/company/clients')} 
                  className="h-12 px-8"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar for Form Sharing */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Share2 className="h-5 w-5 text-blue-600" />
                  Send Form to Client
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    You can copy and send this form link to clients to fill in their details remotely.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Link className="h-4 w-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Client Intake Form</span>
                      </div>
                      <p className="text-sm text-gray-700 break-all font-mono bg-white p-2 rounded border">
                        {formLink}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={copyFormLink}
                        variant="outline" 
                        className="flex-1"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                      <Button 
                        onClick={() => window.open(formLink, '_blank')}
                        variant="outline" 
                        size="sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Benefits:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Clients can fill forms at their convenience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Reduces data entry time for your team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Automatically syncs with your system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Professional client onboarding experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Self-filled entries are marked for review</span>
                    </li>
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
