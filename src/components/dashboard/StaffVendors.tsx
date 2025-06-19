
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HardHat, Plus, Users, Wrench, Calendar } from 'lucide-react';

export function StaffVendors() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Staff & Vendors</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Staff/Vendor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">8</div>
                <div className="text-sm text-gray-500">Active Staff</div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-500">Registered Vendors</div>
              </div>
              <HardHat className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">5</div>
                <div className="text-sm text-gray-500">Scheduled Tasks</div>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">$2,340</div>
                <div className="text-sm text-gray-500">Monthly Payments</div>
              </div>
              <Wrench className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff & Vendor Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center py-12">
              <HardHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Manage Your Team</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Add maintenance staff or vendors, log their roles and pay history, 
                and track scheduled repairs or visits
              </p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <h4 className="font-medium">Staff Management</h4>
                  <p className="text-sm text-gray-500">Manage maintenance staff</p>
                </CardContent>
              </Card>
              
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-6 text-center">
                  <HardHat className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <h4 className="font-medium">Vendor Directory</h4>
                  <p className="text-sm text-gray-500">Plumbers, cleaners, contractors</p>
                </CardContent>
              </Card>
              
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <h4 className="font-medium">Task Scheduling</h4>
                  <p className="text-sm text-gray-500">Schedule repairs and visits</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
