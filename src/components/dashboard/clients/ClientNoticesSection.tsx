
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

interface ClientNoticesSectionProps {
  clientId: string;
}

const mockClientNotices = [
  {
    id: '1',
    title: 'Payment Reminder - Q1 2024',
    message: 'This is a reminder that your Q1 payment is due on February 15th, 2024.',
    dateSent: '2024-01-10 02:15 PM',
    channels: ['email'],
    status: 'Sent',
    readStatus: 'Read'
  },
  {
    id: '2',
    title: 'Project Update - Victoria Gardens',
    message: 'We are pleased to inform you about the latest progress on Victoria Gardens project.',
    dateSent: '2024-01-15 10:30 AM',
    channels: ['email', 'whatsapp'],
    status: 'Sent',
    readStatus: 'Unread'
  },
  {
    id: '3',
    title: 'Holiday Greetings',
    message: 'Wishing you and your family a happy new year filled with prosperity.',
    dateSent: '2024-01-01 12:00 PM',
    channels: ['whatsapp'],
    status: 'Failed',
    readStatus: 'N/A'
  }
];

export function ClientNoticesSection({ clientId }: ClientNoticesSectionProps) {
  const clientNotices = mockClientNotices; // In real app, filter by clientId

  const getStatusIcon = (status: string) => {
    return status === 'Sent' ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusColor = (status: string) => {
    return status === 'Sent' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getReadStatusColor = (readStatus: string) => {
    switch (readStatus) {
      case 'Read':
        return 'bg-blue-100 text-blue-800';
      case 'Unread':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notice History</CardTitle>
      </CardHeader>
      <CardContent>
        {clientNotices.length > 0 ? (
          <div className="space-y-4">
            {clientNotices.map((notice) => (
              <div key={notice.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{notice.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notice.message}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(notice.status)}
                      <Badge className={getStatusColor(notice.status)}>
                        {notice.status}
                      </Badge>
                    </div>
                    
                    {notice.readStatus !== 'N/A' && (
                      <Badge className={getReadStatusColor(notice.readStatus)}>
                        {notice.readStatus}
                      </Badge>
                    )}
                    
                    <span className="text-gray-500">
                      via {notice.channels.join(', ')}
                    </span>
                  </div>
                  
                  <span className="text-gray-500">{notice.dateSent}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No notices sent to this client yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
