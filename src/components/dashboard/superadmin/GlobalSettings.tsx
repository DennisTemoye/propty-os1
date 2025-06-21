
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Flag, Palette, Users, Mail, Save } from 'lucide-react';

const featureFlags = [
  { id: 'crm', name: 'CRM & Pipelines', description: 'Enable CRM and sales pipeline features', enabled: true },
  { id: 'accounting', name: 'Accounting Module', description: 'Full accounting and financial management', enabled: true },
  { id: 'notices', name: 'Send Notice Feature', description: 'Allow companies to send notices to clients', enabled: true },
  { id: 'calendar', name: 'Calendar & Scheduling', description: 'Calendar integration and appointment scheduling', enabled: false },
  { id: 'api_access', name: 'API Access', description: 'Third-party API integrations', enabled: false },
  { id: 'analytics', name: 'Advanced Analytics', description: 'Detailed reporting and analytics dashboard', enabled: true },
  { id: 'document_manager', name: 'Document Manager', description: 'Document storage and management system', enabled: true },
  { id: 'mobile_app', name: 'Mobile App Access', description: 'Access to mobile applications', enabled: false }
];

const defaultRoles = [
  { id: 'admin', name: 'Company Admin', permissions: ['all'] },
  { id: 'manager', name: 'Project Manager', permissions: ['projects', 'clients', 'reports'] },
  { id: 'agent', name: 'Sales Agent', permissions: ['clients', 'allocations'] },
  { id: 'accountant', name: 'Accountant', permissions: ['accounting', 'reports'] },
  { id: 'viewer', name: 'Viewer', permissions: ['view_only'] }
];

export function GlobalSettings() {
  const [features, setFeatures] = useState(featureFlags);
  const [brandingSettings, setBrandingSettings] = useState({
    defaultLogo: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    companyName: 'ProptyOS'
  });
  const [emailSettings, setEmailSettings] = useState({
    welcomeTemplate: 'Welcome to ProptyOS! Your account has been created successfully.',
    notificationTemplate: 'You have a new notification from {{company_name}}.',
    reminderTemplate: 'This is a reminder about your upcoming payment due on {{due_date}}.'
  });

  const handleFeatureToggle = (featureId: string) => {
    setFeatures(features.map(feature => 
      feature.id === featureId 
        ? { ...feature, enabled: !feature.enabled }
        : feature
    ));
  };

  const handleSaveSettings = () => {
    console.log('Saving global settings...');
    // Implementation for saving settings
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-purple-600" />
          <h2 className="text-2xl font-bold">Global Settings</h2>
        </div>
        <Button onClick={handleSaveSettings} className="bg-purple-600 hover:bg-purple-700">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Feature Flags</TabsTrigger>
          <TabsTrigger value="branding">Branding Defaults</TabsTrigger>
          <TabsTrigger value="roles">Default Roles</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Flag className="h-5 w-5 text-blue-600" />
                <span>Feature Flags Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Control which features are available to companies based on their subscription plan.
                </div>
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-gray-600">{feature.description}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        {feature.enabled ? 'Enabled' : 'Disabled'}
                      </div>
                      <Switch
                        checked={feature.enabled}
                        onCheckedChange={() => handleFeatureToggle(feature.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-green-600" />
                <span>Branding Defaults</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Default Company Name</Label>
                    <Input
                      id="company-name"
                      value={brandingSettings.companyName}
                      onChange={(e) => setBrandingSettings({
                        ...brandingSettings,
                        companyName: e.target.value
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        id="primary-color"
                        type="color"
                        value={brandingSettings.primaryColor}
                        onChange={(e) => setBrandingSettings({
                          ...brandingSettings,
                          primaryColor: e.target.value
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={brandingSettings.primaryColor}
                        onChange={(e) => setBrandingSettings({
                          ...brandingSettings,
                          primaryColor: e.target.value
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={brandingSettings.secondaryColor}
                        onChange={(e) => setBrandingSettings({
                          ...brandingSettings,
                          secondaryColor: e.target.value
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={brandingSettings.secondaryColor}
                        onChange={(e) => setBrandingSettings({
                          ...brandingSettings,
                          secondaryColor: e.target.value
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="default-logo">Default Logo URL</Label>
                    <Input
                      id="default-logo"
                      value={brandingSettings.defaultLogo}
                      onChange={(e) => setBrandingSettings({
                        ...brandingSettings,
                        defaultLogo: e.target.value
                      })}
                      placeholder="https://example.com/logo.png"
                      className="mt-1"
                    />
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="text-sm font-medium mb-2">Preview</div>
                    <div 
                      className="p-4 rounded border-2"
                      style={{ 
                        borderColor: brandingSettings.primaryColor,
                        backgroundColor: `${brandingSettings.primaryColor}10`
                      }}
                    >
                      <div className="font-semibold" style={{ color: brandingSettings.primaryColor }}>
                        {brandingSettings.companyName}
                      </div>
                      <div className="text-sm mt-1" style={{ color: brandingSettings.secondaryColor }}>
                        Property Management System
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-600" />
                <span>Default Roles & Permissions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {defaultRoles.map((role) => (
                  <div key={role.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{role.name}</div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {permission.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-red-600" />
                <span>Email Templates & Triggers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="welcome-template">Welcome Email Template</Label>
                  <Textarea
                    id="welcome-template"
                    value={emailSettings.welcomeTemplate}
                    onChange={(e) => setEmailSettings({
                      ...emailSettings,
                      welcomeTemplate: e.target.value
                    })}
                    rows={3}
                    className="mt-1"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Available variables: {`{{company_name}}, {{user_name}}, {{login_url}}`}
                  </div>
                </div>
                <div>
                  <Label htmlFor="notification-template">Notification Email Template</Label>
                  <Textarea
                    id="notification-template"
                    value={emailSettings.notificationTemplate}
                    onChange={(e) => setEmailSettings({
                      ...emailSettings,
                      notificationTemplate: e.target.value
                    })}
                    rows={3}
                    className="mt-1"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Available variables: {`{{company_name}}, {{notification_text}}, {{action_url}}`}
                  </div>
                </div>
                <div>
                  <Label htmlFor="reminder-template">Payment Reminder Template</Label>
                  <Textarea
                    id="reminder-template"
                    value={emailSettings.reminderTemplate}
                    onChange={(e) => setEmailSettings({
                      ...emailSettings,
                      reminderTemplate: e.target.value
                    })}
                    rows={3}
                    className="mt-1"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Available variables: {`{{company_name}}, {{amount}}, {{due_date}}, {{payment_url}}`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
