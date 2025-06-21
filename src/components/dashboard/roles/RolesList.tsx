
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreateRoleModal } from './CreateRoleModal';
import { ActivityLogs } from './ActivityLogs';
import { Shield, Users, Edit, Trash2, Settings, History } from 'lucide-react';

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: Record<string, string[]>;
  level: 'admin' | 'manager' | 'user';
  createdAt: string;
  updatedAt: string;
}

const mockRoles: Role[] = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    userCount: 2,
    permissions: { 
      dashboard: ['view'],
      projects: ['view', 'create', 'edit', 'delete'],
      clients: ['view', 'create', 'edit', 'delete'],
      sales: ['view', 'create', 'edit', 'delete'],
      fees: ['view', 'create', 'edit', 'delete'],
      accounting: ['view', 'create', 'edit', 'delete'],
      reports: ['view', 'create', 'edit', 'delete'],
      settings: ['view', 'edit'],
      team: ['view', 'create', 'edit', 'delete']
    },
    level: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Project Manager',
    description: 'Manage projects, units, and client assignments',
    userCount: 5,
    permissions: {
      dashboard: ['view'],
      projects: ['view', 'create', 'edit'],
      clients: ['view', 'create', 'edit'],
      sales: ['view', 'create'],
      fees: ['view'],
      reports: ['view']
    },
    level: 'manager',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 3,
    name: 'Sales Agent',
    description: 'View and manage assigned clients and properties',
    userCount: 12,
    permissions: {
      dashboard: ['view'],
      clients: ['view', 'create', 'edit'],
      sales: ['view', 'create'],
      documents: ['view']
    },
    level: 'user',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  },
  {
    id: 4,
    name: 'Accountant',
    description: 'Access financial data and generate reports',
    userCount: 3,
    permissions: {
      dashboard: ['view'],
      accounting: ['view', 'create', 'edit'],
      fees: ['view', 'create', 'edit'],
      reports: ['view', 'create']
    },
    level: 'manager',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-22T09:15:00Z'
  }
];

interface RolesListProps {
  onCreateRole: () => void;
}

export function RolesList({ onCreateRole }: RolesListProps) {
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [showActivityLogs, setShowActivityLogs] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPermissionCount = (permissions: Record<string, string[]>) => {
    return Object.values(permissions).reduce((total, actions) => total + actions.length, 0);
  };

  const getTopPermissions = (permissions: Record<string, string[]>) => {
    const modules = Object.keys(permissions).slice(0, 3);
    return modules.map(module => module.charAt(0).toUpperCase() + module.slice(1));
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
  };

  const handleDelete = (role: Role) => {
    if (confirm(`Are you sure you want to delete the role "${role.name}"? This action cannot be undone.`)) {
      console.log('Deleting role:', role.id);
      // Handle role deletion
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Roles</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowActivityLogs(true)}
            >
              <History className="h-4 w-4 mr-2" />
              Activity Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRoles.map((role) => (
              <div key={role.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-600" />
                      {role.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Created: {new Date(role.createdAt).toLocaleDateString()}</span>
                      <span>Last updated: {new Date(role.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getLevelColor(role.level)}>
                      {role.level}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(role)}
                        title="Edit role"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(role)}
                        title="Delete role"
                        disabled={role.userCount > 0}
                      >
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
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">
                      {getPermissionCount(role.permissions)} permissions across
                    </span>
                    <div className="flex gap-1">
                      {getTopPermissions(role.permissions).map((module, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                      {Object.keys(role.permissions).length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{Object.keys(role.permissions).length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {editingRole && (
        <CreateRoleModal
          isOpen={!!editingRole}
          onClose={() => setEditingRole(null)}
          existingRole={editingRole}
        />
      )}

      <ActivityLogs
        isOpen={showActivityLogs}
        onClose={() => setShowActivityLogs(false)}
      />
    </div>
  );
}
