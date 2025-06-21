
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Shield, Save, X } from 'lucide-react';

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingRole?: any;
}

const modules = [
  { id: 'dashboard', name: 'Dashboard', actions: ['view'] },
  { id: 'projects', name: 'Projects', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'clients', name: 'Clients', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'sales', name: 'Sales & Allocations', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'fees', name: 'Fees Collection', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'accounting', name: 'Accounting', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'reports', name: 'Reports', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'settings', name: 'Settings', actions: ['view', 'edit'] },
  { id: 'team', name: 'Team & Roles', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'crm', name: 'CRM Pipelines', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'calendar', name: 'Calendar & Scheduling', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'documents', name: 'Document Manager', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'notices', name: 'Send Notice', actions: ['view', 'create', 'edit'] },
  { id: 'marketers', name: 'Marketers', actions: ['view', 'create', 'edit', 'delete'] }
];

const actionLabels = {
  view: 'View',
  create: 'Create',
  edit: 'Edit',
  delete: 'Delete'
};

export function CreateRoleModal({ isOpen, onClose, existingRole }: CreateRoleModalProps) {
  const [permissions, setPermissions] = useState<Record<string, string[]>>(
    existingRole ? existingRole.permissions : {}
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: existingRole?.name || '',
      description: existingRole?.description || '',
      level: existingRole?.level || 'user'
    }
  });

  const handlePermissionChange = (moduleId: string, action: string, checked: boolean) => {
    setPermissions(prev => {
      const modulePerms = prev[moduleId] || [];
      if (checked) {
        return { ...prev, [moduleId]: [...modulePerms, action] };
      } else {
        return { ...prev, [moduleId]: modulePerms.filter(a => a !== action) };
      }
    });
  };

  const selectAllModule = (moduleId: string, module: any) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: [...module.actions]
    }));
  };

  const deselectAllModule = (moduleId: string) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: []
    }));
  };

  const onSubmit = (data: any) => {
    const roleData = {
      ...data,
      permissions,
      id: existingRole?.id || Date.now(),
      userCount: existingRole?.userCount || 0,
      createdAt: existingRole?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('Saving role:', roleData);
    toast.success(`Role "${data.name}" ${existingRole ? 'updated' : 'created'} successfully!`);
    
    reset();
    setPermissions({});
    onClose();
  };

  const handleClose = () => {
    reset();
    setPermissions(existingRole?.permissions || {});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {existingRole ? 'Edit Role' : 'Create New Role'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Role Name *</Label>
              <Input
                id="name"
                {...register('name', { required: 'Role name is required' })}
                placeholder="e.g., Sales Officer"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="level">Role Level</Label>
              <select
                id="level"
                {...register('level')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe the role and its responsibilities..."
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Module Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modules.map((module) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{module.name}</h4>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => selectAllModule(module.id, module)}
                        >
                          Select All
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => deselectAllModule(module.id)}
                        >
                          Clear All
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {module.actions.map((action) => (
                        <div key={action} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${module.id}-${action}`}
                            checked={permissions[module.id]?.includes(action) || false}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(module.id, action, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`${module.id}-${action}`}
                            className="text-sm font-normal"
                          >
                            {actionLabels[action as keyof typeof actionLabels]}
                          </Label>
                        </div>
                      ))}
                    </div>

                    {permissions[module.id]?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {permissions[module.id].map((action) => (
                          <Badge key={action} variant="secondary" className="text-xs">
                            {actionLabels[action as keyof typeof actionLabels]}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {existingRole ? 'Update Role' : 'Create Role'}
            </Button>
            <Button type="button" variant="outline" onClick={handleClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
