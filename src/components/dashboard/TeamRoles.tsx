
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, Plus, Activity } from 'lucide-react';

export function TeamRoles() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team & Roles</h1>
          <p className="text-gray-600 mt-1">Manage team members and role-based permissions</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-500">Total Team Members</div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">5</div>
                <div className="text-sm text-gray-500">Active Roles</div>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">156</div>
                <div className="text-sm text-gray-500">Recent Activities</div>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'John Manager', role: 'Project Manager', status: 'Active' },
                { name: 'Sarah Sales', role: 'Sales Agent', status: 'Active' },
                { name: 'Mike Finance', role: 'Accountant', status: 'Active' },
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.role}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{member.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { role: 'Admin', permissions: 'Full Access', members: 2 },
                { role: 'Manager', permissions: 'Project Management', members: 3 },
                { role: 'Sales Agent', permissions: 'Client & Sales', members: 5 },
                { role: 'Accountant', permissions: 'Financial Records', members: 2 },
              ].map((role, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{role.role}</div>
                    <div className="text-sm text-gray-600">{role.permissions}</div>
                  </div>
                  <Badge variant="outline">{role.members} members</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
