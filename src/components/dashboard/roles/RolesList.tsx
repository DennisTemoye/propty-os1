
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Edit, Trash2, Settings } from 'lucide-react';

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  level: 'admin' | 'manager' | 'user';
}

const mockRoles: Role[] = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    userCount: 2,
    permissions: ['all'],
    level: 'admin'
  },
  {
    id: 2,
    name: 'Project Manager',
    description: 'Manage projects, units, and client assignments',
    userCount: 5,
    permissions: ['projects.manage', 'units.manage', 'clients.view'],
    level: 'manager'
  },
  {
    id: 3,
    name: 'Sales Agent',
    description: 'View and manage assigned clients and properties',
    userCount: 12,
    permissions: ['clients.manage', 'properties.view', 'documents.view'],
    level: 'user'
  },
  {
    id: 4,
    name: 'Accountant',
    description: 'Access financial data and generate reports',
    userCount: 3,
    permissions: ['accounting.manage', 'reports.generate', 'payroll.view'],
    level: 'manager'
  }
];

export function RolesList() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Roles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRoles.map((role) => (
            <div key={role.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-600" />
                    {role.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getLevelColor(role.level)}>
                    {role.level}
                  </Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {role.userCount} users assigned
                </div>
                <div className="flex gap-1">
                  {role.permissions.slice(0, 3).map((permission, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                  {role.permissions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{role.permissions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
