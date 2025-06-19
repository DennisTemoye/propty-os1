
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RolesList } from './roles/RolesList';
import { UserManagement } from './roles/UserManagement';
import { Shield, Plus, Users, Settings } from 'lucide-react';

export function RolesPermissions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Roles & Permissions</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Invite User</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-500">User Roles</div>
            </div>
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">45</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">12</div>
              <div className="text-sm text-gray-500">Pending Invites</div>
            </div>
            <Users className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-500">Permissions</div>
            </div>
            <Settings className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <RolesList />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
