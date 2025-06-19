
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StaffList } from './staff/StaffList';
import { PayrollManagement } from './staff/PayrollManagement';
import { UserCog, Plus, Users, DollarSign } from 'lucide-react';

export function StaffPayroll() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Staff & Payroll</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Export Payroll</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-500">Total Staff</div>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">₦8.5M</div>
              <div className="text-sm text-gray-500">Monthly Payroll</div>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">6</div>
              <div className="text-sm text-gray-500">Pending Payments</div>
            </div>
            <UserCog className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">18</div>
              <div className="text-sm text-gray-500">Full-time</div>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList>
          <TabsTrigger value="staff">Staff Management</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>

        <TabsContent value="staff">
          <StaffList />
        </TabsContent>

        <TabsContent value="payroll">
          <PayrollManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
