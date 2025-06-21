
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { NoticePreviewModal } from './NoticePreviewModal';
import { ConfirmSendModal } from './ConfirmSendModal';
import { Send, Eye, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface NoticeFormData {
  title: string;
  message: string;
  attachment: File | null;
  channels: string[];
  recipientType: 'all' | 'selected' | 'project';
  selectedClients: string[];
  selectedProject: string;
}

const mockClients = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com' },
];

const mockProjects = [
  { id: '1', name: 'Victoria Gardens' },
  { id: '2', name: 'Emerald Heights' },
  { id: '3', name: 'Golden View' },
];

export function SendNoticeForm() {
  const [formData, setFormData] = useState<NoticeFormData>({
    title: '',
    message: '',
    attachment: null,
    channels: [],
    recipientType: 'all',
    selectedClients: [],
    selectedProject: '',
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleChannelChange = (channel: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      channels: checked 
        ? [...prev.channels, channel]
        : prev.channels.filter(c => c !== channel)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, attachment: file }));
    }
  };

  const removeAttachment = () => {
    setFormData(prev => ({ ...prev, attachment: null }));
  };

  const handleClientSelect = (clientId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedClients: prev.selectedClients.includes(clientId)
        ? prev.selectedClients.filter(id => id !== clientId)
        : [...prev.selectedClients, clientId]
    }));
  };

  const handlePreview = () => {
    if (!formData.title || !formData.message || formData.channels.length === 0) {
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
    console.log('Sending notice:', formData);
    toast.success('Notice sent successfully!');
    setIsConfirmOpen(false);
    // Reset form
    setFormData({
      title: '',
      message: '',
      attachment: null,
      channels: [],
      recipientType: 'all',
      selectedClients: [],
      selectedProject: '',
    });
  };

  const getRecipientCount = () => {
    switch (formData.recipientType) {
      case 'all':
        return mockClients.length;
      case 'selected':
        return formData.selectedClients.length;
      case 'project':
        return formData.selectedProject ? 8 : 0; // Mock count for project clients
      default:
        return 0;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>Compose Notice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notice Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Notice Title *</Label>
            <Input
              id="title"
              placeholder="Enter notice title..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          {/* Message Body */}
          <div className="space-y-2">
            <Label htmlFor="message">Message Body *</Label>
            <Textarea
              id="message"
              placeholder="Enter your message..."
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            />
          </div>

          {/* Attachment */}
          <div className="space-y-2">
            <Label htmlFor="attachment">Attachment (Optional)</Label>
            {formData.attachment ? (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">{formData.attachment.name}</span>
                <Button size="sm" variant="ghost" onClick={removeAttachment}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <input
                  type="file"
                  id="attachment"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Label htmlFor="attachment" className="cursor-pointer text-blue-600 hover:text-blue-800">
                  Click to upload file
                </Label>
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
              </div>
            )}
          </div>

          {/* Communication Channels */}
          <div className="space-y-2">
            <Label>Communication Channels *</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email"
                  checked={formData.channels.includes('email')}
                  onCheckedChange={(checked) => handleChannelChange('email', !!checked)}
                />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whatsapp"
                  checked={formData.channels.includes('whatsapp')}
                  onCheckedChange={(checked) => handleChannelChange('whatsapp', !!checked)}
                />
                <Label htmlFor="whatsapp">WhatsApp</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recipients Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recipients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recipient Type */}
          <div className="space-y-2">
            <Label>Recipient Type</Label>
            <Select
              value={formData.recipientType}
              onValueChange={(value: 'all' | 'selected' | 'project') => 
                setFormData(prev => ({ ...prev, recipientType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                <SelectItem value="selected">Selected Clients</SelectItem>
                <SelectItem value="project">Clients under a Specific Project</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Selected Clients */}
          {formData.recipientType === 'selected' && (
            <div className="space-y-2">
              <Label>Select Clients</Label>
              <div className="border rounded-lg p-3 max-h-48 overflow-y-auto">
                {mockClients.map((client) => (
                  <div key={client.id} className="flex items-center space-x-2 py-1">
                    <Checkbox
                      id={`client-${client.id}`}
                      checked={formData.selectedClients.includes(client.id)}
                      onCheckedChange={() => handleClientSelect(client.id)}
                    />
                    <Label htmlFor={`client-${client.id}`} className="flex-1">
                      {client.name} ({client.email})
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Selection */}
          {formData.recipientType === 'project' && (
            <div className="space-y-2">
              <Label>Select Project</Label>
              <Select
                value={formData.selectedProject}
                onValueChange={(value) => setFormData(prev => ({ ...prev, selectedProject: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a project..." />
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

          {/* Summary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Summary</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p>Recipients: {getRecipientCount()} clients</p>
              <p>Channels: {formData.channels.length > 0 ? formData.channels.join(', ') : 'None selected'}</p>
              {formData.attachment && <p>Attachment: {formData.attachment.name}</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handlePreview}
              variant="outline"
              className="flex-1"
              disabled={!formData.title || !formData.message || formData.channels.length === 0}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleSend}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!formData.title || !formData.message || formData.channels.length === 0}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Notice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <NoticePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onSend={handleSend}
        formData={formData}
        recipientCount={getRecipientCount()}
      />

      <ConfirmSendModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmSend}
        formData={formData}
        recipientCount={getRecipientCount()}
      />
    </div>
  );
}
