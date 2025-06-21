
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { History, User, Shield, Edit, Plus, Trash2 } from 'lucide-react';

interface ActivityLogsProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockActivityLogs = [
  {
    id: 1,
    action: 'create_role',
    userName: 'John Admin',
    userEmail: 'john@proptyos.com',
    roleName: 'Finance Admin',
    details: 'Created new role with accounting and fees permissions',
    timestamp: '2024-01-22T14:30:00Z',
    actionType: 'create'
  },
  {
    id: 2,
    action: 'edit_role',
    userName: 'Sarah Manager',
    userEmail: 'sarah@proptyos.com',
    roleName: 'Project Manager',
    details: 'Updated permissions to include document management',
    timestamp: '2024-01-22T10:15:00Z',
    actionType: 'edit'
  },
  {
    id: 3,
    action: 'assign_role',
    userName: 'John Admin',
    userEmail: 'john@proptyos.com',
    roleName: 'Sales Agent',
    details: 'Assigned role to Mike Sales (mike@proptyos.com)',
    timestamp: '2024-01-21T16:45:00Z',
    actionType: 'assign'
  },
  {
    id: 4,
    action: 'delete_role',
    userName: 'John Admin',
    userEmail: 'john@proptyos.com',
    roleName: 'Temporary Role',
    details: 'Deleted unused role',
    timestamp: '2024-01-21T09:30:00Z',
    actionType: 'delete'
  },
  {
    id: 5,
    action: 'edit_permissions',
    userName: 'Sarah Manager',
    userEmail: 'sarah@proptyos.com',
    roleName: 'Accountant',
    details: 'Removed delete permissions from projects module',
    timestamp: '2024-01-20T14:20:00Z',
    actionType: 'edit'
  }
];

const getActionIcon = (actionType: string) => {
  switch (actionType) {
    case 'create': return <Plus className="h-4 w-4 text-green-600" />;
    case 'edit': return <Edit className="h-4 w-4 text-blue-600" />;
    case 'delete': return <Trash2 className="h-4 w-4 text-red-600" />;
    case 'assign': return <User className="h-4 w-4 text-purple-600" />;
    default: return <Shield className="h-4 w-4 text-gray-600" />;
  }
};

const getActionBadge = (actionType: string) => {
  const colors = {
    create: 'bg-green-100 text-green-800',
    edit: 'bg-blue-100 text-blue-800',
    delete: 'bg-red-100 text-red-800',
    assign: 'bg-purple-100 text-purple-800'
  };
  
  return colors[actionType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export function ActivityLogs({ isOpen, onClose }: ActivityLogsProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Role & Permission Activity Logs
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivityLogs.map((log) => {
                const { date, time } = formatTimestamp(log.timestamp);
                
                return (
                  <div key={log.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0">
                      {getActionIcon(log.actionType)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {log.userName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{log.userName}</span>
                          <Badge className={getActionBadge(log.actionType)} >
                            {log.actionType}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          {date} at {time}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-900 mb-1">
                        Role: <span className="font-medium text-blue-600">{log.roleName}</span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {log.details}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {mockActivityLogs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No activity logs found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
