import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  HelpCircle, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Mail,
  RefreshCw,
  Send,
  Bell,
  Settings,
  FileText,
  Search,
  Filter,
  Phone,
  Calendar
} from 'lucide-react';

const supportTickets = [
  {
    id: 'SUP-001',
    company: 'Global Real Estate Inc',
    subject: 'Unable to generate allocation reports',
    status: 'Open',
    priority: 'High',
    category: 'Technical',
    createdDate: '2024-03-15',
    lastUpdate: '2024-03-16',
    assignedTo: 'John Smith',
    description: 'Client allocation reports are not generating properly and showing errors.'
  },
  {
    id: 'SUP-002',
    company: 'ABC Properties Ltd',
    subject: 'Need help with commission setup',
    status: 'In Progress',
    priority: 'Medium',
    category: 'Training',
    createdDate: '2024-03-14',
    lastUpdate: '2024-03-15',
    assignedTo: 'Sarah Johnson',
    description: 'Need assistance setting up marketer commission structures.'
  },
  {
    id: 'SUP-003',
    company: 'Metro Housing Co',
    subject: 'Account reactivation request',
    status: 'Resolved',
    priority: 'Low',
    category: 'Account',
    createdDate: '2024-03-12',
    lastUpdate: '2024-03-14',
    assignedTo: 'Mike Wilson',
    description: 'Request to reactivate suspended account after payment update.'
  },
  {
    id: 'SUP-004',
    company: 'Prime Properties',
    subject: 'Feature request: Bulk import',
    status: 'Open',
    priority: 'Low',
    category: 'Feature Request',
    createdDate: '2024-03-10',
    lastUpdate: '2024-03-12',
    assignedTo: 'Lisa Brown',
    description: 'Request for bulk client import functionality.'
  }
];

const systemNotices = [
  {
    id: 1,
    title: 'Scheduled Maintenance',
    message: 'System maintenance scheduled for Sunday 3 AM - 5 AM',
    type: 'maintenance',
    target: 'all',
    status: 'scheduled',
    date: '2024-03-17'
  },
  {
    id: 2,
    title: 'New Feature Release',
    message: 'Enhanced CRM Pipelines now available for Pro and Enterprise users',
    type: 'feature',
    target: 'pro_enterprise',
    status: 'sent',
    date: '2024-03-15'
  },
  {
    id: 3,
    title: 'Security Update',
    message: 'Important security update. Please update your passwords.',
    type: 'security',
    target: 'all',
    status: 'draft',
    date: '2024-03-14'
  }
];

export function SupportToolsTab() {
  const [tickets, setTickets] = useState(supportTickets);
  const [notices, setNotices] = useState(systemNotices);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    message: '',
    type: 'general',
    target: 'all'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNoticeTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'feature': return 'bg-blue-100 text-blue-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus, lastUpdate: new Date().toISOString().split('T')[0] } : ticket
    ));
  };

  const sendNotice = () => {
    if (newNotice.title && newNotice.message) {
      const notice = {
        id: notices.length + 1,
        ...newNotice,
        status: 'sent',
        date: new Date().toISOString().split('T')[0]
      };
      setNotices(prev => [notice, ...prev]);
      setNewNotice({ title: '', message: '', type: 'general', target: 'all' });
      setShowNoticeModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Support Tools</h3>
          <p className="text-slate-600">Manage support tickets and platform communications</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showNoticeModal} onOpenChange={setShowNoticeModal}>
            <DialogTrigger asChild>
              <Button>
                <Bell className="h-4 w-4 mr-2" />
                Send Notice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Platform Notice</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Notice title"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Notice message"
                    value={newNotice.message}
                    onChange={(e) => setNewNotice(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select value={newNotice.type} onValueChange={(value) => setNewNotice(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="feature">Feature</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Target</label>
                    <Select value={newNotice.target} onValueChange={(value) => setNewNotice(prev => ({ ...prev, target: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Companies</SelectItem>
                        <SelectItem value="enterprise">Enterprise Only</SelectItem>
                        <SelectItem value="pro_enterprise">Pro & Enterprise</SelectItem>
                        <SelectItem value="trial">Trial Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowNoticeModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={sendNotice}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Notice
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Support Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-red-600">
                  {tickets.filter(t => t.status === 'Open').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {tickets.filter(t => t.status === 'In Progress').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {tickets.filter(t => t.status === 'Resolved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-blue-600">2.4h</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Support Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                     onClick={() => setSelectedTicket(ticket)}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{ticket.id}</span>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{ticket.lastUpdate}</span>
                  </div>
                  <div className="font-medium mb-1">{ticket.subject}</div>
                  <div className="text-sm text-gray-600 mb-2">{ticket.company}</div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Assigned to: {ticket.assignedTo}</span>
                    <span>{ticket.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Notices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Platform Notices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getNoticeTypeColor(notice.type)}>
                        {notice.type}
                      </Badge>
                      <Badge variant="outline">
                        {notice.target.replace('_', ' & ')}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{notice.date}</span>
                  </div>
                  <div className="font-medium mb-1">{notice.title}</div>
                  <div className="text-sm text-gray-600 mb-2">{notice.message}</div>
                  <div className="flex items-center justify-between">
                    <Badge className={
                      notice.status === 'sent' ? 'bg-green-100 text-green-800' :
                      notice.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {notice.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Detail Modal */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Ticket ID</label>
                  <p className="font-medium">{selectedTicket.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Subject</label>
                  <p className="font-medium">{selectedTicket.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Company</label>
                  <p className="font-medium">{selectedTicket.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-sm text-gray-700">{selectedTicket.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <Select 
                      value={selectedTicket.status} 
                      onValueChange={(value) => updateTicketStatus(selectedTicket.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Priority</label>
                    <p className="font-medium">{selectedTicket.priority}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Assigned To</label>
                  <p className="font-medium">{selectedTicket.assignedTo}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="font-medium">{selectedTicket.category}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Client
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Client
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <RefreshCw className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="font-medium mb-1">Reset Password</div>
            <div className="text-sm text-gray-500">Trigger password reset for any user</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <User className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="font-medium mb-1">Login as Company</div>
            <div className="text-sm text-gray-500">Access company account for support</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="font-medium mb-1">Generate Report</div>
            <div className="text-sm text-gray-500">Create detailed support reports</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Settings className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="font-medium mb-1">System Settings</div>
            <div className="text-sm text-gray-500">Configure platform settings</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}