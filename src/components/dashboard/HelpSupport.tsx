
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { HelpCircle, MessageSquare, Book, Phone, Mail, Search, Send, ExternalLink } from 'lucide-react';

interface Ticket {
  id: number;
  subject: string;
  status: 'open' | 'pending' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  created: string;
  category: string;
}

const mockTickets: Ticket[] = [
  { id: 1, subject: 'Unable to upload documents', status: 'open', priority: 'high', created: '2024-01-15', category: 'Technical' },
  { id: 2, subject: 'Payment integration question', status: 'pending', priority: 'medium', created: '2024-01-12', category: 'Billing' },
  { id: 3, subject: 'User role permissions', status: 'resolved', priority: 'low', created: '2024-01-10', category: 'Account' },
];

const faqData = [
  { question: 'How do I add a new project?', answer: 'Navigate to Projects & Units and click the "Add Project" button.' },
  { question: 'How do I assign units to clients?', answer: 'Go to the client detail page and use the "Assign Property" feature.' },
  { question: 'How do I manage user permissions?', answer: 'Visit Roles & Permissions to create and assign user roles.' },
  { question: 'How do I generate reports?', answer: 'Use the Reports module to create custom reports for your data.' },
];

export function HelpSupport() {
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFAQ = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <Button onClick={() => setIsNewTicketOpen(true)} className="bg-purple-600 hover:bg-purple-700">
          <MessageSquare className="h-4 w-4 mr-2" />
          New Support Ticket
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Book className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold">Documentation</h3>
            <p className="text-sm text-gray-500">Browse user guides</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold">Live Chat</h3>
            <p className="text-sm text-gray-500">Chat with support</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold">Phone Support</h3>
            <p className="text-sm text-gray-500">Call us directly</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold">Email Support</h3>
            <p className="text-sm text-gray-500">Send us an email</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>My Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">#{ticket.id} - {ticket.subject}</h4>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <span>•</span>
                    <span>{ticket.category}</span>
                    <span>•</span>
                    <span>{ticket.created}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFAQ.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2 text-blue-600" />
                    {item.question}
                  </h4>
                  <p className="text-sm text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">support@proptyos.com</p>
              <p className="text-sm text-gray-500">24/7 Email Support</p>
            </div>
            <div className="text-center">
              <ExternalLink className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Knowledge Base</h3>
              <p className="text-gray-600">help.proptyos.com</p>
              <p className="text-sm text-gray-500">Self-service articles</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Ticket Modal */}
      <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>
              Describe your issue and we'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Brief description of your issue" />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing Question</option>
                <option value="account">Account Management</option>
                <option value="feature">Feature Request</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Priority</label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Please provide detailed information about your issue..." rows={4} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsNewTicketOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
