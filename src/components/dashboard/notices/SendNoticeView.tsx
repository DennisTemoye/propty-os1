
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Send, Eye, Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { NoticePreviewModal } from './NoticePreviewModal';
import { ConfirmSendModal } from './ConfirmSendModal';
import { NoticeHistoryView } from './NoticeHistoryView';
import { toast } from 'sonner';

interface NoticeData {
  title: string;
  message: string;
  attachment?: File;
  channels: string[];
  recipientType: 'all' | 'selected' | 'project';
  selectedClients: string[];
  selectedProject: string;
}

export function SendNoticeView() {
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');
  const [notice, setNotice] = useState<NoticeData>({
    title: '',
    message: '',
    channels: [],
    recipientType: 'all',
    selectedClients: [],
    selectedProject: ''
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const mockClients = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
  ];

  const mockProjects = [
    { id: '1', name: 'Victoria Gardens Estate' },
    { id: '2', name: 'Emerald Heights' },
    { id: '3', name: 'Golden View Apartments' },
  ];

  const handleChannelChange = (channel: string, checked: boolean) => {
    if (checked) {
      setNotice(prev => ({
        ...prev,
        channels: [...prev.channels, channel]
      }));
    } else {
      setNotice(prev => ({
        ...prev,
        channels: prev.channels.filter(c => c !== channel)
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNotice(prev => ({ ...prev, attachment: file }));
    }
  };

  const handlePreview = () => {
    if (!notice.title || !notice.message || notice.channels.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsPreviewOpen(true);
  };

  const handleSend = () => {
    setIsPreviewOpen(false);
    setIsConfirmOpen(true);
  };

  const confirmSend = () => {
    console.log('Sending notice:', notice);
    toast.success('Notice sent successfully!');
    setIsConfirmOpen(false);
    // Reset form
    setNotice({
      title: '',
      message: '',
      channels: [],
      recipientType: 'all',
      selectedClients: [],
      selectedProject: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Send Notice</h1>
          <p className="text-gray-600">Notify clients through multiple communication channels</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'compose' ? 'default' : 'outline'}
            onClick={() => setActiveTab('compose')}
          >
            <Send className="h-4 w-4 mr-2" />
            Compose
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'outline'}
            onClick={() => setActiveTab('history')}
          >
            <Clock className="h-4 w-4 mr-2" />
            History
          </Button>
        </div>
      </div>

      {activeTab === 'compose' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notice Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Notice Title *</Label>
                  <Input
                    id="title"
                    value={notice.title}
                    onChange={(e) => setNotice(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter notice title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message Body *</Label>
                  <Textarea
                    id="message"
                    value={notice.message}
                    onChange={(e) => setNotice(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Enter your message"
                    rows={6}
                  />
                </div>
                
                <div>
                  <Label htmlFor="attachment">Attachment (Optional)</Label>
                  <Input
                    id="attachment"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  {notice.attachment && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {notice.attachment.name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication Channels *</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email"
                      checked={notice.channels.includes('email')}
                      onCheckedChange={(checked) => handleChannelChange('email', checked as boolean)}
                    />
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="whatsapp"
                      checked={notice.channels.includes('whatsapp')}
                      onCheckedChange={(checked) => handleChannelChange('whatsapp', checked as boolean)}
                    />
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recipients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Recipient Type</Label>
                  <Select
                    value={notice.recipientType}
                    onValueChange={(value: 'all' | 'selected' | 'project') => 
                      setNotice(prev => ({ ...prev, recipientType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Clients</SelectItem>
                      <SelectItem value="selected">Selected Clients</SelectItem>
                      <SelectItem value="project">Clients under Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {notice.recipientType === 'selected' && (
                  <div>
                    <Label>Select Clients</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {mockClients.map((client) => (
                        <div key={client.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={client.id}
                            checked={notice.selectedClients.includes(client.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNotice(prev => ({
                                  ...prev,
                                  selectedClients: [...prev.selectedClients, client.id]
                                }));
                              } else {
                                setNotice(prev => ({
                                  ...prev,
                                  selectedClients: prev.selectedClients.filter(id => id !== client.id)
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={client.id} className="text-sm">
                            {client.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {notice.recipientType === 'project' && (
                  <div>
                    <Label>Select Project</Label>
                    <Select
                      value={notice.selectedProject}
                      onValueChange={(value) => setNotice(prev => ({ ...prev, selectedProject: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose project" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProjects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button onClick={handlePreview} className="w-full" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview Notice
              </Button>
              <Button onClick={handleSend} className="w-full" disabled={!notice.title || !notice.message || notice.channels.length === 0}>
                <Send className="h-4 w-4 mr-2" />
                Send Notice
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <NoticeHistoryView />
      )}

      <NoticePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        notice={notice}
        onSend={handleSend}
      />

      <ConfirmSendModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        notice={notice}
        onConfirm={confirmSend}
      />
    </div>
  );
}
