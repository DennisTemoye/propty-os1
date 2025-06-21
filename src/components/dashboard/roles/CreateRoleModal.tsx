
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Shield, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface RolePermissions {
  [key: string]: Permission;
}

const defaultPermission: Permission = {
  view: false,
  create: false,
  edit: false,
  delete: false
};

const modules = [
  'Dashboard',
  'Projects', 
  'Clients',
  'Sales & Allocation',
  'Fees Collection',
  'Accounting',
  'Reports',
  'Marketers',
  'Send Notice',
  'CRM Pipelines',
  'Document Manager',
  'Calendar & Scheduling',
  'Settings',
  'Referral Program'
];

interface CreateRoleModalProps {
  onRoleCreated: (role: any) => void;
}

export function CreateRoleModal({ onRoleCreated }: CreateRoleModalProps) {
  const [open, setOpen] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [permissions, setPermissions] = useState<RolePermissions>(
    modules.reduce((acc, module) => ({
      ...acc,
      [module]: { ...defaultPermission }
    }), {})
  );

  const handlePermissionChange = (module: string, action: keyof Permission, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: value
      }
    }));
  };

  const handleSelectAll = (module: string, enabled: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        view: enabled,
        create: enabled,
        edit: enabled,
        delete: enabled
      }
    }));
  };

  const handleSaveRole = () => {
    if (!roleName.trim()) {
      toast.error('Role name is required');
      return;
    }

    const newRole = {
      id: Date.now(),
      name: roleName,
      description: roleDescription,
      permissions,
      userCount: 0,
      level: 'custom',
      createdAt: new Date().toISOString(),
      createdBy: 'Current User'
    };

    onRoleCreated(newRole);
    
    // Reset form
    setRoleName('');
    setRoleDescription('');
    setPermissions(modules.reduce((acc, module) => ({
      ...acc,
      [module]: { ...defaultPermission }
    }), {}));
    
    setOpen(false);
    toast.success('Role created successfully');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Create Custom Role
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="roleName">Role Name *</Label>
              <Input
                id="roleName"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="e.g., Sales Agent, Finance Admin"
              />
            </div>
            <div>
              <Label htmlFor="roleDescription">Description (Optional)</Label>
              <Textarea
                id="roleDescription"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="Brief description of this role..."
                rows={2}
              />
            </div>
          </div>

          {/* Permissions Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Module Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                  <div>Module</div>
                  <div className="text-center">View</div>
                  <div className="text-center">Create</div>
                  <div className="text-center">Edit</div>
                  <div className="text-center">Delete</div>
                </div>
                
                {modules.map((module) => (
                  <div key={module} className="grid grid-cols-5 gap-4 items-center py-2 border-b border-gray-100">
                    <div className="font-medium">
                      {module}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectAll(module, !permissions[module]?.view)}
                        className="ml-2 h-6 px-2 text-xs"
                      >
                        {permissions[module]?.view ? 'Unselect All' : 'Select All'}
                      </Button>
                    </div>
                    
                    {(['view', 'create', 'edit', 'delete'] as const).map((action) => (
                      <div key={action} className="flex justify-center">
                        <Switch
                          checked={permissions[module]?.[action] || false}
                          onCheckedChange={(checked) => handlePermissionChange(module, action, checked)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRole}>
              <Save className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
