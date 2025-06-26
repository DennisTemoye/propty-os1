
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, Building, FileText, Shield, Globe, Edit } from 'lucide-react';
import { CompanySettings } from './settings/CompanySettings';
import { SystemSettings } from './settings/SystemSettings';
import { BillingSettings } from './settings/BillingSettings';
import { LetterTemplatesSettings } from './settings/LetterTemplatesSettings';
import { FormEditor } from './settings/FormEditor';

export function Settings() {
  const [activeTab, setActiveTab] = useState('company');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <SettingsIcon className="h-8 w-8 mr-3 text-blue-600" />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Manage your company settings and configurations</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>Company</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Letter Templates</span>
          </TabsTrigger>
          <TabsTrigger value="forms" className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Form Editor</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>System</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <CompanySettings />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <LetterTemplatesSettings />
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <FormEditor />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
