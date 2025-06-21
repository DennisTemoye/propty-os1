
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { UserPlus, Mail } from 'lucide-react';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const availableRoles = [
  { id: 'super_admin', name: 'Super Admin', level: 'admin' },
  { id: 'project_manager', name: 'Project Manager', level: 'manager' },
  { id: 'sales_agent', name: 'Sales Agent', level: 'user' },
  { id: 'accountant', name: 'Accountant', level: 'manager' },
  { id: 'finance_admin', name: 'Finance Admin', level: 'manager' },
  { id: 'marketer_manager', name: 'Marketer Manager', level: 'manager' }
];

export function InviteUserModal({ isOpen, onClose }: InviteUserModalProps) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      sendWelcomeEmail: true
    }
  });

  const onSubmit = (data: any) => {
    const selectedRole = availableRoles.find(role => role.id === data.role);
    
    const inviteData = {
      ...data,
      roleName: selectedRole?.name,
      roleLevel: selectedRole?.level,
      invitedAt: new Date().toISOString(),
      status: 'pending'
    };

    console.log('Sending invitation:', inviteData);
    toast.success(`Invitation sent to ${data.email} as ${selectedRole?.name}!`);
    
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Team Member
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder="e.g., John Doe"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="e.g., john@company.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Assign Role *</Label>
            <Select onValueChange={(value) => setValue('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{role.name}</span>
                      <span className="text-xs text-gray-500 ml-2">({role.level})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sendWelcomeEmail"
              {...register('sendWelcomeEmail')}
              className="rounded"
            />
            <Label htmlFor="sendWelcomeEmail" className="text-sm">
              Send welcome email with login instructions
            </Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
