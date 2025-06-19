
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Building2, Home, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetStartedPage = () => {
  const [accountType, setAccountType] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phoneNumber: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, accountType });
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
              Start Your Free Trial
            </h1>
            <p className="text-xl text-slate-600">
              Get started with ProptyOS today. No credit card required.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Account Type Selection */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Account Type</CardTitle>
                  <CardDescription>Select the option that best describes your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      accountType === 'company' 
                        ? 'border-violet-500 bg-violet-50' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setAccountType('company')}
                  >
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-6 w-6 text-violet-600" />
                      <div>
                        <h3 className="font-semibold">Real Estate Company</h3>
                        <p className="text-sm text-slate-600">For developers, agencies, and large property portfolios</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      accountType === 'landlord' 
                        ? 'border-violet-500 bg-violet-50' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setAccountType('landlord')}
                  >
                    <div className="flex items-center space-x-3">
                      <Home className="h-6 w-6 text-violet-600" />
                      <div>
                        <h3 className="font-semibold">Landlord/Property Manager</h3>
                        <p className="text-sm text-slate-600">For individual landlords and property managers</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features List */}
              <Card>
                <CardHeader>
                  <CardTitle>What you'll get:</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      '14-day free trial',
                      'Full access to all features',
                      'Unlimited properties',
                      'Customer support',
                      'Mobile app access',
                      'Data export capabilities'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <Card>
              <CardHeader>
                <CardTitle>Create Your Account</CardTitle>
                <CardDescription>Fill in your details to get started</CardDescription>
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

                  {accountType === 'company' && (
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                    disabled={!accountType}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    By signing up, you agree to our Terms of Service and Privacy Policy
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

export default GetStartedPage;
