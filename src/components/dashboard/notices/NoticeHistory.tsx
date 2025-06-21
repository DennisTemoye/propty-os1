
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RotateCcw, Eye, Download } from 'lucide-react';
import { toast } from 'sonner';

const mockNotices = [
  {
    id: 1,
    title: 'Payment Reminder - January 2024',
    recipients: 25,
    channels: ['email', 'whatsapp'],
    date: '2024-01-15',
    status: 'sent',
    success: 23,
    failed: 2,
  },
  {
    id: 2,
    title: 'New Project Launch - Victoria Gardens Phase 2',
    recipients: 156,
    channels: ['email'],
    date: '2024-01-10',
    status: 'sent',
    success: 156,
    failed: 0,
  },
  {
    id: 3,
    title: 'Infrastructure Fee Update',
    recipients: 42,
    channels: ['email', 'whatsapp'],
    date: '2024-01-08',
    status: 'partial',
    success: 38,
    failed: 4,
  },
  {
    id: 4,
    title: 'Holiday Office Hours',
    recipients: 89,
    channels: ['email'],
    date: '2024-01-05',
    status: 'failed',
    success: 0,
    failed: 89,
  },
];

export function NoticeHistory() {
  const handleRetry = (notice: any) => {
    console.log('Retrying notice:', notice.id);
    toast.success(`Retrying notice: ${notice.title}`);
  };

  const handleView = (notice: any) => {
    console.log('Viewing notice:', notice.id);
    toast.info(`Viewing notice: ${notice.title}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-100 text-green-800">Sent</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notice History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Notice Title</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Channels</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Success/Failed</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockNotices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell className="font-medium">{notice.title}</TableCell>
                <TableCell>{notice.recipients}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {notice.channels.map((channel) => (
                      <Badge key={channel} variant="outline" className="text-xs">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{notice.date}</TableCell>
                <TableCell>{getStatusBadge(notice.status)}</TableCell>
                <TableCell>
                  <span className="text-green-600">{notice.success}</span>
                  {notice.failed > 0 && (
                    <span className="text-red-600"> / {notice.failed}</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleView(notice)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    {notice.failed > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRetry(notice)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
