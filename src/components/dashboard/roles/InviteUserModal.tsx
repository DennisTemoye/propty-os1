
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface InviteUserModalProps {
  roles: any[];
  onUserInvited: (userData: any) => void;
}

export function InviteUserModal({ roles, onUserInvited }: InviteUserModalProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleInviteUser = () => {
    if (!email || !name || !selectedRole) {
      toast.error('Please fill in all required fields');
      return;
    }

    const selectedRoleData = roles.find(role => role.id.toString() === selectedRole);
    
    const userData = {
      id: Date.now(),
      name,
      email,
      role: selectedRoleData?.name || 'Unknown',
      roleId: selectedRole,
      status: 'pending',
      invitedAt: new Date().toISOString(),
      invitedBy: 'Current User'
    };

    onUserInvited(userData);
    
    // Reset form
    setEmail('');
    setName('');
    setSelectedRole('');
    setOpen(false);
    
    toast.success(`Invitation sent to ${email}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Invite Team Member
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="userName">Full Name *</Label>
            <Input
              id="userName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter user's full name"
            />
          </div>
          
          <div>
            <Label htmlFor="userEmail">Email Address *</Label>
            <Input
              id="userEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          
          <div>
            <Label htmlFor="userRole">Assign Role *</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id.toString()}>
                    {role.name} - {role.description || 'No description'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteUser}>
              Send Invitation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
