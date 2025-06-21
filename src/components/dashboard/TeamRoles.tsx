import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Shield, Plus, Activity, Edit, Trash2, UserPlus } from 'lucide-react';
import { CreateRoleModal } from './roles/CreateRoleModal';
import { EditRoleModal } from './roles/EditRoleModal';
import { InviteUserModal } from './roles/InviteUserModal';
import { ActivityLogs } from './roles/ActivityLogs';
import { toast } from 'sonner';

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: any;
  level: string;
}

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  roleId?: number;
  status: string;
  lastLogin?: string;
  invitedAt?: string;
}

export function TeamRoles() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      userCount: 2,
      permissions: {},
      level: 'admin'
    },
    {
      id: 2,
      name: 'Project Manager',
      description: 'Manage projects, units, and client assignments',
      userCount: 5,
      permissions: {},
      level: 'manager'
    },
    {
      id: 3,
      name: 'Sales Agent',
      description: 'View and manage assigned clients and properties',
      userCount: 12,
      permissions: {},
      level: 'user'
    }
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: 'John Manager', email: 'john@proptyos.com', role: 'Project Manager', roleId: 2, status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Sarah Sales', email: 'sarah@proptyos.com', role: 'Sales Agent', roleId: 3, status: 'active', lastLogin: '1 day ago' },
    { id: 3, name: 'Mike Finance', email: 'mike@proptyos.com', role: 'Sales Agent', roleId: 3, status: 'pending', invitedAt: '2 days ago' }
  ]);

  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleRoleCreated = (newRole: Role) => {
    setRoles(prev => [...prev, newRole]);
  };

  const handleRoleUpdated = (updatedRole: Role) => {
    setRoles(prev => prev.map(role => role.id === updatedRole.id ? updatedRole : role));
  };

  const handleDeleteRole = (roleId: number) => {
    const role = roles.find(r => r.id === roleId);
    if (role && role.userCount > 0) {
      toast.error('Cannot delete role with assigned users');
      return;
    }
    setRoles(prev => prev.filter(role => role.id !== roleId));
    toast.success('Role deleted successfully');
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setEditModalOpen(true);
  };

  const handleUserInvited = (userData: TeamMember) => {
    setTeamMembers(prev => [...prev, userData]);
    // Update user count for the assigned role
    if (userData.roleId) {
      setRoles(prev => prev.map(role => 
        role.id === userData.roleId 
          ? { ...role, userCount: role.userCount + 1 }
          : role
      ));
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      case 'custom': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team & Roles</h1>
          <p className="text-gray-600 mt-1">Manage team members and role-based permissions</p>
        </div>
        <div className="flex space-x-2">
          <InviteUserModal roles={roles} onUserInvited={handleUserInvited} />
          <CreateRoleModal onRoleCreated={handleRoleCreated} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{teamMembers.length}</div>
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
                <div className="text-2xl font-bold text-green-600">{roles.length}</div>
                <div className="text-sm text-gray-500">Total Roles</div>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{teamMembers.filter(m => m.status === 'pending').length}</div>
                <div className="text-sm text-gray-500">Pending Invitations</div>
              </div>
              <UserPlus className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="roles">Roles Management</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
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
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditRole(role)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteRole(role.id)}
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
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-xs text-gray-500">
                        {member.status === 'active' ? `Last login: ${member.lastLogin}` : `Invited: ${member.invitedAt}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {member.role}
                      </Badge>
                      <br />
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <ActivityLogs />
        </TabsContent>
      </Tabs>

      {editingRole && (
        <EditRoleModal
          role={editingRole}
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onRoleUpdated={handleRoleUpdated}
        />
      )}
    </div>
  );
}
