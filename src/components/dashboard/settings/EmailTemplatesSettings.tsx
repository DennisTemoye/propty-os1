import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Mail, 
  Eye,
  FileText,
  Send,
  User,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

interface EmailTemplate {
  id: string;
  name: string;
  type: 'offer_notification' | 'allocation_notification' | 'payment_reminder' | 'general_notice';
  subject: string;
  content: string;
  status: 'active' | 'draft';
  lastModified: string;
}

const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Offer Notification',
    type: 'offer_notification',
    subject: 'Property Offer Confirmation - {{projectName}}',
    content: `Dear {{clientName}},

We are pleased to confirm your property offer for {{projectName}}.

Offer Details:
- Project: {{projectName}}
- Amount: {{saleAmount}}
- Type: {{salesType}}

Your offer letter will be prepared and delivered to you shortly. Please keep this email for your records.

For any questions, please contact our sales team.

Best regards,
Sales Team`,
    status: 'active',
    lastModified: '2024-01-15'
  },
  {
    id: '2',
    name: 'Allocation Notification',
    type: 'allocation_notification',
    subject: 'Unit Allocation Confirmation - {{unitNumber}}',
    content: `Dear {{clientName}},

Congratulations! Your unit allocation has been confirmed.

Allocation Details:
- Project: {{projectName}}
- Unit: {{unitNumber}}
- Allocation Date: {{allocationDate}}
- Amount: {{saleAmount}}

Your allocation letter will be prepared and delivered to you shortly.

Welcome to our community!

Best regards,
Sales Team`,
    status: 'active',
    lastModified: '2024-01-15'
  },
  {
    id: '3',
    name: 'Payment Reminder',
    type: 'payment_reminder',
    subject: 'Payment Reminder - {{projectName}}',
    content: `Dear {{clientName}},

This is a friendly reminder about your upcoming payment for {{projectName}}.

Payment Details:
- Amount Due: {{amountDue}}
- Due Date: {{dueDate}}
- Unit: {{unitNumber}}

Please ensure payment is made by the due date to avoid any delays.

Thank you for your continued trust in us.

Best regards,
Accounts Team`,
    status: 'active',
    lastModified: '2024-01-10'
  }
];

const availableVariables = [
  { key: 'clientName', label: 'Client Name', category: 'Client' },
  { key: 'projectName', label: 'Project Name', category: 'Project' },
  { key: 'unitNumber', label: 'Unit Number', category: 'Project' },
  { key: 'saleAmount', label: 'Sale Amount', category: 'Financial' },
  { key: 'initialPayment', label: 'Initial Payment', category: 'Financial' },
  { key: 'amountDue', label: 'Amount Due', category: 'Financial' },
  { key: 'dueDate', label: 'Due Date', category: 'Financial' },
  { key: 'allocationDate', label: 'Allocation Date', category: 'Project' },
  { key: 'salesType', label: 'Sales Type', category: 'Project' },
  { key: 'companyName', label: 'Company Name', category: 'Company' },
  { key: 'companyAddress', label: 'Company Address', category: 'Company' },
  { key: 'companyPhone', label: 'Company Phone', category: 'Company' }
];

export function EmailTemplatesSettings() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockEmailTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    type: 'offer_notification' as EmailTemplate['type'],
    subject: '',
    content: ''
  });

  const handleEdit = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditForm({
      name: template.name,
      type: template.type,
      subject: template.subject,
      content: template.content
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!selectedTemplate) return;

    const updatedTemplate = {
      ...selectedTemplate,
      ...editForm,
      lastModified: new Date().toISOString().split('T')[0]
    };

    setTemplates(prev => prev.map(t => t.id === selectedTemplate.id ? updatedTemplate : t));
    setIsEditing(false);
    setSelectedTemplate(null);
    toast.success('Email template updated successfully!');
  };

  const handlePreview = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const insertVariable = (variableKey: string) => {
    const variable = `{{${variableKey}}}`;
    setEditForm(prev => ({
      ...prev,
      content: prev.content + ' ' + variable
    }));
  };

  const renderPreviewContent = (content: string) => {
    const sampleData = {
      clientName: 'John Doe',
      projectName: 'Victoria Gardens',
      unitNumber: 'Block A - Plot 15',
      saleAmount: '₦25,000,000',
      initialPayment: '₦5,000,000',
      amountDue: '₦20,000,000',
      dueDate: new Date().toLocaleDateString(),
      allocationDate: new Date().toLocaleDateString(),
      salesType: 'Property Offer',
      companyName: 'Property Management Company',
      companyAddress: '123 Business District, Lagos',
      companyPhone: '+234 123 456 7890'
    };

    let rendered = content;
    Object.entries(sampleData).forEach(([key, value]) => {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return rendered;
  };

  const getTypeColor = (type: EmailTemplate['type']) => {
    switch (type) {
      case 'offer_notification':
        return 'bg-blue-100 text-blue-800';
      case 'allocation_notification':
        return 'bg-green-100 text-green-800';
      case 'payment_reminder':
        return 'bg-orange-100 text-orange-800';
      case 'general_notice':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: EmailTemplate['type']) => {
    switch (type) {
      case 'offer_notification':
        return 'Offer Notification';
      case 'allocation_notification':
        return 'Allocation Notification';
      case 'payment_reminder':
        return 'Payment Reminder';
      case 'general_notice':
        return 'General Notice';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Mail className="h-6 w-6 mr-2 text-blue-600" />
            Email Templates
          </h2>
          <p className="text-muted-foreground">Manage email templates for offers, allocations, and notifications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(template.type)}>
                      {getTypeLabel(template.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{template.subject}</TableCell>
                  <TableCell>
                    <Badge className={template.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {template.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{template.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handlePreview(template)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(template)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Template Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Email Template</DialogTitle>
            <DialogDescription>
              Customize the email template content and variables
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor">Template Editor</TabsTrigger>
              <TabsTrigger value="variables">Available Variables</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Template Name</Label>
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Template Type</Label>
                  <Select
                    value={editForm.type}
                    onValueChange={(value: EmailTemplate['type']) => setEditForm(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="offer_notification">Offer Notification</SelectItem>
                      <SelectItem value="allocation_notification">Allocation Notification</SelectItem>
                      <SelectItem value="payment_reminder">Payment Reminder</SelectItem>
                      <SelectItem value="general_notice">General Notice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Email Subject</Label>
                <Input
                  value={editForm.subject}
                  onChange={(e) => setEditForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter email subject with variables like {{clientName}}"
                />
              </div>

              <div>
                <Label>Email Content</Label>
                <Textarea
                  value={editForm.content}
                  onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={15}
                  placeholder="Enter email content with variables like {{projectName}}"
                  className="font-mono text-sm"
                />
              </div>
            </TabsContent>

            <TabsContent value="variables" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(
                  availableVariables.reduce((acc, variable) => {
                    if (!acc[variable.category]) acc[variable.category] = [];
                    acc[variable.category].push(variable);
                    return acc;
                  }, {} as Record<string, typeof availableVariables>)
                ).map(([category, variables]) => (
                  <Card key={category}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{category}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {variables.map((variable) => (
                        <Button
                          key={variable.key}
                          variant="outline"
                          size="sm"
                          onClick={() => insertVariable(variable.key)}
                          className="w-full justify-start text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {variable.label}
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
            <DialogDescription>
              Preview with sample data
            </DialogDescription>
          </DialogHeader>

          {selectedTemplate && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border-b pb-2">
                      <div className="text-sm text-gray-600">Subject:</div>
                      <div className="font-semibold">{renderPreviewContent(selectedTemplate.subject)}</div>
                    </div>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {renderPreviewContent(selectedTemplate.content)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}