
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Flag, Palette, Users, Mail, Save, Shield } from 'lucide-react';

const proptyOSModules = [
  { id: 'projects', name: 'Projects & Units Management', description: 'Core project and unit management features', enabled: true },
  { id: 'clients', name: 'Client Management', description: 'Client database and relationship management', enabled: true },
  { id: 'sales_allocation', name: 'Sales Allocation', description: 'Unit allocation and sales tracking', enabled: true },
  { id: 'accounting', name: 'Accounting & Financial', description: 'Financial management and accounting features', enabled: true },
  { id: 'crm', name: 'CRM & Pipelines', description: 'Customer relationship management and sales pipelines', enabled: false },
  { id: 'fees_collection', name: 'Fees Collection', description: 'Service charges and infrastructure fees management', enabled: true },
  { id: 'send_notice', name: 'Send Notice', description: 'Communication and notice distribution system', enabled: true },
  { id: 'reports', name: 'Reports & Analytics', description: 'Comprehensive reporting and analytics dashboard', enabled: true },
  { id: 'document_manager', name: 'Document Manager', description: 'Document storage and management system', enabled: true },
  { id: 'staff_payroll', name: 'Staff & Payroll', description: 'Staff management and payroll processing', enabled: false }
];

const defaultCompanyRoles = [
  { id: 'company_admin', name: 'Company Admin', permissions: ['all_modules', 'user_management', 'settings'], description: 'Full system access' },
  { id: 'project_manager', name: 'Project Manager', permissions: ['projects', 'clients', 'sales', 'reports'], description: 'Project and sales management' },
  { id: 'sales_officer', name: 'Sales Officer', permissions: ['clients', 'sales_allocation', 'reports'], description: 'Client and sales focused' },
  { id: 'accountant', name: 'Accountant', permissions: ['accounting', 'fees_collection', 'reports'], description: 'Financial management' },
  { id: 'viewer', name: 'Viewer', permissions: ['view_only'], description: 'Read-only access to assigned modules' }
];

export function GlobalSettings() {
  const [modules, setModules] = useState(proptyOSModules);
  const [brandingDefaults, setBrandingDefaults] = useState({
    defaultCompanyName: 'Your Property Company',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    logoPlaceholder: '/placeholder-logo.png'
  });
  const [emailTemplates, setEmailTemplates] = useState({
    welcomeEmail: 'Welcome to ProptyOS! Your company account has been set up successfully. You can now access all enabled modules and start managing your property business.',
    notificationEmail: 'You have a new notification from {{company_name}}. {{notification_content}}',
    paymentReminder: 'This is a reminder that your payment of {{amount}} is due on {{due_date}}. Please make payment to avoid service interruption.',
    systemAlert: 'Important system update: {{alert_message}}. This affects {{affected_modules}}.'
  });
  const [notificationDefaults, setNotificationDefaults] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true
  });

  const handleModuleToggle = (moduleId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, enabled: !module.enabled }
        : module
    ));
  };

  const handleSaveSettings = () => {
    console.log('Saving global ProptyOS settings...');
    // Implementation for saving settings
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Global Settings</h2>
          <p className="text-slate-600 mt-1">Configure platform-wide settings for all ProptyOS companies</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="modules">Module Access</TabsTrigger>
          <TabsTrigger value="branding">Branding Defaults</TabsTrigger>
          <TabsTrigger value="roles">Default Roles</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Flag className="h-5 w-5 text-blue-600" />
                <span>ProptyOS Module Access Control</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Control which ProptyOS modules are available to companies based on their subscription plan.
                </div>
                {modules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div className="space-y-1">
                      <div className="font-medium">{module.name}</div>
                      <div className="text-sm text-gray-600">{module.description}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        {module.enabled ? 'Available' : 'Disabled'}
                      </div>
                      <Switch
                        checked={module.enabled}
                        onCheckedChange={() => handleModuleToggle(module.id)}
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
                <span>Company Branding Defaults</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="default-company-name">Default Company Name Template</Label>
                    <Input
                      id="default-company-name"
                      value={brandingDefaults.defaultCompanyName}
                      onChange={(e) => setBrandingDefaults({
                        ...brandingDefaults,
                        defaultCompanyName: e.target.value
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="primary-color">Primary Brand Color</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        id="primary-color"
                        type="color"
                        value={brandingDefaults.primaryColor}
                        onChange={(e) => setBrandingDefaults({
                          ...brandingDefaults,
                          primaryColor: e.target.value
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={brandingDefaults.primaryColor}
                        onChange={(e) => setBrandingDefaults({
                          ...brandingDefaults,
                          primaryColor: e.target.value
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondary-color">Secondary Brand Color</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={brandingDefaults.secondaryColor}
                        onChange={(e) => setBrandingDefaults({
                          ...brandingDefaults,
                          secondaryColor: e.target.value
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={brandingDefaults.secondaryColor}
                        onChange={(e) => setBrandingDefaults({
                          ...brandingDefaults,
                          secondaryColor: e.target.value
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="logo-placeholder">Default Logo Placeholder</Label>
                    <Input
                      id="logo-placeholder"
                      value={brandingDefaults.logoPlaceholder}
                      onChange={(e) => setBrandingDefaults({
                        ...brandingDefaults,
                        logoPlaceholder: e.target.value
                      })}
                      placeholder="/path/to/default-logo.png"
                      className="mt-1"
                    />
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="text-sm font-medium mb-2">Brand Preview</div>
                    <div 
                      className="p-4 rounded border-2"
                      style={{ 
                        borderColor: brandingDefaults.primaryColor,
                        backgroundColor: `${brandingDefaults.primaryColor}10`
                      }}
                    >
                      <div className="font-semibold" style={{ color: brandingDefaults.primaryColor }}>
                        {brandingDefaults.defaultCompanyName}
                      </div>
                      <div className="text-sm mt-1" style={{ color: brandingDefaults.secondaryColor }}>
                        Powered by ProptyOS
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
                <Shield className="h-5 w-5 text-purple-600" />
                <span>Default Company Roles & Permissions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Configure default role templates that new companies will receive upon signup.
                </div>
                {defaultCompanyRoles.map((role) => (
                  <div key={role.id} className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-sm text-gray-600">{role.description}</div>
                      </div>
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

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-orange-600" />
                <span>Default Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Set default notification preferences for new company accounts.
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-gray-600">System alerts and updates via email</div>
                    </div>
                    <Switch
                      checked={notificationDefaults.emailNotifications}
                      onCheckedChange={(checked) => setNotificationDefaults({
                        ...notificationDefaults,
                        emailNotifications: checked
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">SMS Notifications</div>
                      <div className="text-sm text-gray-600">Critical alerts via SMS</div>
                    </div>
                    <Switch
                      checked={notificationDefaults.smsNotifications}
                      onCheckedChange={(checked) => setNotificationDefaults({
                        ...notificationDefaults,
                        smsNotifications: checked
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-gray-600">In-app notifications and alerts</div>
                    </div>
                    <Switch
                      checked={notificationDefaults.pushNotifications}
                      onCheckedChange={(checked) => setNotificationDefaults({
                        ...notificationDefaults,
                        pushNotifications: checked
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Weekly Reports</div>
                      <div className="text-sm text-gray-600">Automated weekly performance reports</div>
                    </div>
                    <Switch
                      checked={notificationDefaults.weeklyReports}
                      onCheckedChange={(checked) => setNotificationDefaults({
                        ...notificationDefaults,
                        weeklyReports: checked
                      })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-red-600" />
                <span>Email Templates & Communication</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="welcome-template">Welcome Email Template</Label>
                  <Textarea
                    id="welcome-template"
                    value={emailTemplates.welcomeEmail}
                    onChange={(e) => setEmailTemplates({
                      ...emailTemplates,
                      welcomeEmail: e.target.value
                    })}
                    rows={3}
                    className="mt-1"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Available variables: {`{{company_name}}, {{user_name}}, {{login_url}}, {{enabled_modules}}`}
                  </div>
                </div>
                <div>
                  <Label htmlFor="notification-template">System Notification Template</Label>
                  <Textarea
                    id="notification-template"
                    value={emailTemplates.notificationEmail}
                    onChange={(e) => setEmailTemplates({
                      ...emailTemplates,
                      notificationEmail: e.target.value
                    })}
                    rows={3}
                    className="mt-1"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Available variables: {`{{company_name}}, {{notification_content}}, {{action_url}}`}
                  </div>
                </div>
                <div>
                  <Label htmlFor="payment-reminder">Payment Reminder Template</Label>
                  <Textarea
                    id="payment-reminder"
                    value={emailTemplates.paymentReminder}
                    onChange={(e) => setEmailTemplates({
                      ...emailTemplates,
                      paymentReminder: e.target.value
                    })}
                    rows={3}
                    className="mt-1"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Available variables: {`{{company_name}}, {{amount}}, {{due_date}}, {{payment_url}}`}
                  </div>
                </div>
                <div>
                  <Label htmlFor="system-alert">System Alert Template</Label>
                  <Textarea
                    id="system-alert"
                    value={emailTemplates.systemAlert}
                    onChange={(e) => setEmailTemplates({
                      ...emailTemplates,
                      systemAlert: e.target.value
                    })}
                    rows={3}
                    className="mt-1"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Available variables: {`{{alert_message}}, {{affected_modules}}, {{action_required}}`}
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
