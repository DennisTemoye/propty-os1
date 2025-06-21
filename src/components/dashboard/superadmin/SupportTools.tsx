
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HelpCircle, Send, AlertTriangle, MessageSquare, FileText, Users } from 'lucide-react';

const systemErrors = [
  {
    id: 1,
    company: 'ABC Properties Ltd',
    error: 'Payment Gateway Timeout',
    severity: 'high',
    timestamp: '2024-01-20 14:30:25',
    status: 'unresolved',
    description: 'Payment processing timeout during subscription renewal'
  },
  {
    id: 2,
    company: 'Metro Housing Co',
    error: 'Database Connection Failed',
    severity: 'critical',
    timestamp: '2024-01-20 13:15:12',
    status: 'resolved',
    description: 'Temporary database connectivity issue during report generation'
  },
  {
    id: 3,
    company: 'Global Real Estate Inc',
    error: 'File Upload Error',
    severity: 'medium',
    timestamp: '2024-01-20 12:45:33',
    status: 'investigating',
    description: 'Document upload failing for files larger than 10MB'
  }
];

const helpArticles = [
  {
    id: 1,
    title: 'Getting Started with ProptyOS',
    category: 'Onboarding',
    views: 1250,
    lastUpdated: '2024-01-15',
    status: 'published'
  },
  {
    id: 2,
    title: 'Managing Project Allocations',
    category: 'Sales',
    views: 890,
    lastUpdated: '2024-01-10',
    status: 'published'
  },
  {
    id: 3,
    title: 'Setting Up Payment Collection',
    category: 'Billing',
    views: 445,
    lastUpdated: '2024-01-08',
    status: 'draft'
  }
];

export function SupportTools() {
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [noticeType, setNoticeType] = useState('info');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'investigating':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'unresolved':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSendAnnouncement = () => {
    console.log('Sending announcement:', {
      title: announcementTitle,
      message: announcementMessage,
      audience: targetAudience,
      type: noticeType
    });
    // Reset form
    setAnnouncementTitle('');
    setAnnouncementMessage('');
    setTargetAudience('all');
    setNoticeType('info');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <HelpCircle className="h-5 w-5 text-blue-600" />
        <h2 className="text-2xl font-bold">Support Tools</h2>
      </div>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="errors">System Errors</TabsTrigger>
          <TabsTrigger value="articles">Help Articles</TabsTrigger>
          <TabsTrigger value="broadcast">Broadcast Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span>Send Platform Announcement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Announcement Title</Label>
                  <Input
                    id="title"
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    placeholder="Enter announcement title"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Notice Type</Label>
                  <Select value={noticeType} onValueChange={setNoticeType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Information</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={announcementMessage}
                  onChange={(e) => setAnnouncementMessage(e.target.value)}
                  placeholder="Enter your announcement message..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    <SelectItem value="trial">Trial Users</SelectItem>
                    <SelectItem value="starter">Starter Plan</SelectItem>
                    <SelectItem value="growth">Growth Plan</SelectItem>
                    <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                    <SelectItem value="active">Active Companies Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleSendAnnouncement}
                className="w-full"
                disabled={!announcementTitle || !announcementMessage}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Announcement
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>System Errors & Issues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Error Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemErrors.map((error) => (
                    <TableRow key={error.id}>
                      <TableCell className="font-medium">{error.company}</TableCell>
                      <TableCell>{error.error}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getSeverityColor(error.severity)}>
                          {error.severity.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(error.status)}>
                          {error.status.charAt(0).toUpperCase() + error.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{error.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Error Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Company</Label>
                                  <div className="text-sm text-gray-600">{error.company}</div>
                                </div>
                                <div>
                                  <Label>Error Type</Label>
                                  <div className="text-sm text-gray-600">{error.error}</div>
                                </div>
                                <div>
                                  <Label>Description</Label>
                                  <div className="text-sm text-gray-600">{error.description}</div>
                                </div>
                                <div>
                                  <Label>Timestamp</Label>
                                  <div className="text-sm text-gray-600">{error.timestamp}</div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            Resolve
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="articles" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span>Help Articles Management</span>
                </CardTitle>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  New Article
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {helpArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{article.category}</Badge>
                      </TableCell>
                      <TableCell>{article.views}</TableCell>
                      <TableCell>{article.lastUpdated}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={article.status === 'published' ? 'text-green-700 border-green-200' : 'text-gray-700 border-gray-200'}
                        >
                          {article.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="broadcast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Broadcast Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Email Campaigns</h4>
                  <p className="text-sm text-gray-600 mb-4">Send targeted email campaigns to specific company segments</p>
                  <Button className="w-full">Launch Campaign</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">In-App Notifications</h4>
                  <p className="text-sm text-gray-600 mb-4">Push notifications directly to user dashboards</p>
                  <Button className="w-full">Send Notification</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">System Maintenance</h4>
                  <p className="text-sm text-gray-600 mb-4">Schedule and announce system maintenance windows</p>
                  <Button className="w-full">Schedule Maintenance</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
