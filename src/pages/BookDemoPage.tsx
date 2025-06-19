
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Building2, Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookDemoPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    businessType: '',
    propertySize: '',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo booking submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-6">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Book a Demo
            </h1>
            <p className="text-xl text-slate-600">
              Schedule a personalized demo and see how ProptyOS can transform your property management.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Demo Benefits */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-violet-600" />
                    <span>What to Expect</span>
                  </CardTitle>
                  <CardDescription>Your personalized demo will include:</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Tailored Walkthrough</h4>
                        <p className="text-sm text-slate-600">See features specific to your business type and needs</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Live Q&A Session</h4>
                        <p className="text-sm text-slate-600">Get answers to all your questions from our experts</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Custom Setup Guidance</h4>
                        <p className="text-sm text-slate-600">Learn how to get started with your specific requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Implementation Plan</h4>
                        <p className="text-sm text-slate-600">Get a roadmap for migrating your existing data</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-violet-600" />
                    <span>Demo Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Duration:</span> 30-45 minutes</p>
                    <p><span className="font-medium">Format:</span> Live video call</p>
                    <p><span className="font-medium">Cost:</span> Completely free</p>
                    <p><span className="font-medium">Follow-up:</span> Custom proposal within 24 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule Your Demo</CardTitle>
                <CardDescription>Fill in your details and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (Optional)</Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="real-estate-company">
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4" />
                            <span>Real Estate Company</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="landlord">
                          <div className="flex items-center space-x-2">
                            <Home className="h-4 w-4" />
                            <span>Landlord/Property Manager</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertySize">Property Portfolio Size *</Label>
                    <Select value={formData.propertySize} onValueChange={(value) => handleInputChange('propertySize', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your portfolio size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 properties</SelectItem>
                        <SelectItem value="6-20">6-20 properties</SelectItem>
                        <SelectItem value="21-50">21-50 properties</SelectItem>
                        <SelectItem value="51-100">51-100 properties</SelectItem>
                        <SelectItem value="100+">100+ properties</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                          <SelectItem value="evening">Evening (4PM - 6PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      placeholder="Tell us about your specific needs or questions..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                  >
                    Schedule Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    We'll contact you within 24 hours to confirm your demo appointment
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDemoPage;
