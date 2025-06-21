
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, User, Shield, Clock } from 'lucide-react';

interface ActivityLog {
  id: number;
  type: 'role_created' | 'role_updated' | 'role_deleted' | 'user_assigned' | 'permissions_changed';
  description: string;
  user: string;
  timestamp: string;
  details?: string;
}

const mockLogs: ActivityLog[] = [
  {
    id: 1,
    type: 'role_created',
    description: 'Created new role "Sales Officer"',
    user: 'Admin User',
    timestamp: '2024-01-20 14:30:00',
    details: 'Role created with permissions for Clients, Sales & Allocation'
  },
  {
    id: 2,
    type: 'user_assigned',
    description: 'Assigned role "Project Manager" to John Smith',
    user: 'Admin User',
    timestamp: '2024-01-20 13:15:00'
  },
  {
    id: 3,
    type: 'permissions_changed',
    description: 'Updated permissions for "Sales Agent" role',
    user: 'Admin User',
    timestamp: '2024-01-20 11:45:00',
    details: 'Added Create permission for Clients module'
  },
  {
    id: 4,
    type: 'role_updated',
    description: 'Modified role "Accountant" description',
    user: 'Admin User',
    timestamp: '2024-01-19 16:20:00'
  }
];

export function ActivityLogs() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'role_created':
      case 'role_updated':
      case 'role_deleted':
        return <Shield className="h-4 w-4" />;
      case 'user_assigned':
        return <User className="h-4 w-4" />;
      case 'permissions_changed':
        return <Activity className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'role_created': return 'bg-green-100 text-green-800';
      case 'role_updated': return 'bg-blue-100 text-blue-800';
      case 'role_deleted': return 'bg-red-100 text-red-800';
      case 'user_assigned': return 'bg-purple-100 text-purple-800';
      case 'permissions_changed': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Activity Logs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockLogs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3 p-3 border rounded-lg">
              <div className={`p-2 rounded-full ${getTypeColor(log.type)}`}>
                {getTypeIcon(log.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">{log.description}</p>
                  <Badge variant="outline" className={getTypeColor(log.type)}>
                    {formatType(log.type)}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {log.user}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {log.timestamp}
                  </span>
                </div>
                {log.details && (
                  <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
