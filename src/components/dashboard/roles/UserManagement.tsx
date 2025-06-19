
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Mail, Shield, Edit, Trash2 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Admin',
    email: 'john@proptyos.com',
    role: 'Super Admin',
    status: 'active',
    lastLogin: '2 hours ago'
  },
  {
    id: 2,
    name: 'Sarah Manager',
    email: 'sarah@proptyos.com',
    role: 'Project Manager',
    status: 'active',
    lastLogin: '1 day ago'
  },
  {
    id: 3,
    name: 'Mike Sales',
    email: 'mike@proptyos.com',
    role: 'Sales Agent',
    status: 'pending',
    lastLogin: 'Never'
  }
];

export function UserManagement() {
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
      {/* Pending Invitations */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Invitations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
              <div>
                <p className="font-medium">alice@proptyos.com</p>
                <p className="text-sm text-gray-500">Sales Agent • Invited 2 days ago</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Resend</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
              <div>
                <p className="font-medium">bob@proptyos.com</p>
                <p className="text-sm text-gray-500">Accountant • Invited 5 days ago</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Resend</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Users */}
      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500">Last login: {user.lastLogin}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      {user.role}
                    </Badge>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
