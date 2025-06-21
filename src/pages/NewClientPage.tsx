
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
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
  ExternalLink
} from 'lucide-react';

export default function NewClientPage() {
  const navigate = useNavigate();
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
    navigate('/company/clients');
    form.reset();
  };

  const formLink = `${window.location.origin}/client-form/new`;

  const copyFormLink = () => {
    navigator.clipboard.writeText(formLink);
    toast.success('Form link copied to clipboard!');
  };

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
              <p className="text-gray-600">Create a new client profile with their information</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-3">
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
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        First Name *
                      </label>
                      <Input 
                        {...form.register('firstName', { required: true })}
                        placeholder="Enter first name"
                        className="h-11" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="h-4 w-4" />
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
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
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
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
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
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
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
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Users className="h-4 w-4" />
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
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
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
                    <label className="text-sm font-medium text-gray-700">Notes</label>
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
                  Share Form
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Send this form link to clients so they can fill out their information directly.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Link className="h-4 w-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Form Link</span>
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
