
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, XCircle, AlertTriangle, Mail, X } from 'lucide-react';
import { SystemNotification } from '@/types/allocation';

const mockNotifications: SystemNotification[] = [
  {
    id: '1',
    type: 'allocation_pending',
    title: 'New Allocation Pending',
    message: 'John Doe - Block A Unit 15 requires approval',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    relatedAllocationId: 'alloc-1'
  },
  {
    id: '2',
    type: 'allocation_approved',
    title: 'Allocation Approved',
    message: 'Jane Smith - Block B Unit 8 has been approved',
    timestamp: '2024-01-15T09:15:00Z',
    read: false,
    relatedAllocationId: 'alloc-2'
  },
  {
    id: '3',
    type: 'allocation_declined',
    title: 'Allocation Declined',
    message: 'Mike Johnson - Block C Unit 12 was declined: Insufficient documentation',
    timestamp: '2024-01-14T16:45:00Z',
    read: true,
    relatedAllocationId: 'alloc-3'
  }
];

interface SystemNotificationsProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationClick?: (notification: SystemNotification) => void;
}

export function SystemNotifications({ isOpen, onClose, onNotificationClick }: SystemNotificationsProps) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getNotificationIcon = (type: SystemNotification['type']) => {
    switch (type) {
      case 'allocation_pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'allocation_approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'allocation_declined':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'otp_required':
        return <Mail className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: SystemNotification['type']) => {
    switch (type) {
      case 'allocation_pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'allocation_approved':
        return 'bg-green-100 text-green-800';
      case 'allocation_declined':
        return 'bg-red-100 text-red-800';
      case 'otp_required':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end pt-16 pr-4">
      <Card className="w-96 max-h-96 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Badge className="bg-red-600 text-white text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    onNotificationClick?.(notification);
                  }}
                >
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getNotificationColor(notification.type)}`}
                        >
                          {notification.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
