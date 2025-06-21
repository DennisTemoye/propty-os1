
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, RotateCcw, Eye, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

const mockNoticeHistory = [
  {
    id: '1',
    title: 'Project Update - Victoria Gardens',
    recipients: 'All Clients (156)',
    channels: ['email', 'whatsapp'],
    dateSent: '2024-01-15 10:30 AM',
    status: 'Sent',
    successCount: 156,
    failedCount: 0
  },
  {
    id: '2',
    title: 'Payment Reminder - Q1 2024',
    recipients: 'Selected Clients (45)',
    channels: ['email'],
    dateSent: '2024-01-10 02:15 PM',
    status: 'Partially Failed',
    successCount: 42,
    failedCount: 3
  },
  {
    id: '3',
    title: 'New Property Launch Announcement',
    recipients: 'Emerald Heights Clients (78)',
    channels: ['whatsapp'],
    dateSent: '2024-01-08 09:00 AM',
    status: 'Failed',
    successCount: 0,
    failedCount: 78
  },
  {
    id: '4',
    title: 'Holiday Greetings',
    recipients: 'All Clients (156)',
    channels: ['email', 'whatsapp'],
    dateSent: '2024-01-01 12:00 PM',
    status: 'Sent',
    successCount: 156,
    failedCount: 0
  }
];

export function NoticeHistoryView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredHistory = mockNoticeHistory.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.recipients.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || notice.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const handleRetry = (noticeId: string) => {
    console.log('Retrying notice:', noticeId);
    toast.success('Notice retry initiated');
  };

  const handleViewDetails = (noticeId: string) => {
    console.log('Viewing notice details:', noticeId);
    toast.info('Opening notice details');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Sent':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Partially Failed':
        return <XCircle className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Partially Failed':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="partially">Partially Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredHistory.map((notice) => (
          <Card key={notice.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{notice.title}</h3>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(notice.status)}
                      <Badge className={getStatusColor(notice.status)}>
                        {notice.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <strong>Recipients:</strong> {notice.recipients}
                    </div>
                    <div>
                      <strong>Channels:</strong> {notice.channels.join(', ')}
                    </div>
                    <div>
                      <strong>Date Sent:</strong> {notice.dateSent}
                    </div>
                    <div>
                      <strong>Success Rate:</strong> {notice.successCount}/{notice.successCount + notice.failedCount}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(notice.id)}>
                    <Eye className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                  {notice.status !== 'Sent' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRetry(notice.id)}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">No notices found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
