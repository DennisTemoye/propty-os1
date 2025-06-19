
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Eye, Edit, Trash2, Mail, Phone } from 'lucide-react';

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  salary: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
}

const mockStaff: Staff[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@proptyos.com',
    phone: '+1 (555) 123-4567',
    role: 'Project Manager',
    department: 'Operations',
    salary: '₦850,000',
    status: 'active',
    joinDate: '2023-03-15'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@proptyos.com',
    phone: '+1 (555) 234-5678',
    role: 'Sales Executive',
    department: 'Sales',
    salary: '₦620,000',
    status: 'active',
    joinDate: '2023-05-20'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.chen@proptyos.com',
    phone: '+1 (555) 345-6789',
    role: 'Accountant',
    department: 'Finance',
    salary: '₦550,000',
    status: 'on-leave',
    joinDate: '2023-01-10'
  }
];

export function StaffList() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockStaff.map((staff) => (
            <div key={staff.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{staff.name}</h4>
                  <p className="text-sm text-gray-500">{staff.role} • {staff.department}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {staff.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {staff.phone}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getStatusColor(staff.status)}>
                    {staff.status}
                  </Badge>
                </div>
                <p className="font-medium">{staff.salary}/month</p>
                <p className="text-xs text-gray-500">Since {staff.joinDate}</p>
                <div className="flex gap-1 mt-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
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
  );
}
