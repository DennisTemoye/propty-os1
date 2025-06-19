
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompanySettings } from './settings/CompanySettings';
import { BillingSettings } from './settings/BillingSettings';
import { SystemSettings } from './settings/SystemSettings';
import { Building, CreditCard, Settings as SettingsIcon, Phone } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <CompanySettings />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSettings />
        </TabsContent>

        <TabsContent value="system">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Support Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Contact Support</h3>
                  <p className="text-gray-600 mb-2">Email: support@proptyos.com</p>
                  <p className="text-gray-600 mb-2">Phone: +1 (555) 123-4567</p>
                  <p className="text-gray-600">Hours: Mon-Fri 9AM-6PM EST</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Quick Links</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Visit Knowledge Base
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      View Documentation
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Submit Feature Request
                    </Button>
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
