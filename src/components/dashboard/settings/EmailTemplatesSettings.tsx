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
  type: 'offer_notification' | 'allocation_notification' | 'payment_reminder' | 'general_notice' | 'welcome_signup' | 'password_reset' | 'password_change' | 'account_verification' | 'notice_general' | 'notice_urgent' | 'notice_maintenance';
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

Your offer confirmation will be processed and you will receive further communication from our sales team.

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

Your allocation confirmation has been processed successfully.

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
  },
  {
    id: '4',
    name: 'Welcome & Signup Confirmation',
    type: 'welcome_signup',
    subject: 'Welcome to {{companyName}} - Account Created Successfully',
    content: `Dear {{clientName}},

Welcome to {{companyName}}! Your account has been successfully created.

Account Details:
- Email: {{userEmail}}
- Registration Date: {{registrationDate}}
- Account Type: {{accountType}}

Next Steps:
- Verify your email address by clicking the link sent to your email
- Complete your profile setup
- Explore our available properties and services

If you have any questions, please don't hesitate to contact our support team.

Best regards,
{{companyName}} Team`,
    status: 'active',
    lastModified: '2024-01-15'
  },
  {
    id: '5',
    name: 'Password Reset Request',
    type: 'password_reset',
    subject: 'Password Reset Request - {{companyName}}',
    content: `Dear {{clientName}},

We received a request to reset your password for your {{companyName}} account.

If you requested this password reset, please click the link below to set a new password:
{{resetLink}}

This link will expire in 24 hours for security reasons.

If you did not request this password reset, please ignore this email and your password will remain unchanged.

For security reasons, please do not reply to this email.

Best regards,
{{companyName}} Security Team`,
    status: 'active',
    lastModified: '2024-01-15'
  },
  {
    id: '6',
    name: 'Password Change Confirmation',
    type: 'password_change',
    subject: 'Password Changed Successfully - {{companyName}}',
    content: `Dear {{clientName}},

Your password has been successfully changed for your {{companyName}} account.

Change Details:
- Date: {{changeDate}}
- Time: {{changeTime}}
- IP Address: {{ipAddress}}

If you did not make this change, please contact our support team immediately.

Best regards,
{{companyName}} Security Team`,
    status: 'active',
    lastModified: '2024-01-15'
  },
  {
    id: '7',
    name: 'Account Verification',
    type: 'account_verification',
    subject: 'Verify Your Email Address - {{companyName}}',
    content: `Dear {{clientName}},

Thank you for registering with {{companyName}}. To complete your account setup, please verify your email address.

Click the link below to verify your email:
{{verificationLink}}

This verification link will expire in 48 hours.

Once verified, you'll have full access to:
- Browse our property listings
- Schedule property viewings
- Track your applications and payments
- Access your client dashboard

If you did not create this account, please ignore this email.

Best regards,
{{companyName}} Team`,
    status: 'active',
    lastModified: '2024-01-15'
  },
  {
    id: '8',
    name: 'General Notice',
    type: 'notice_general',
    subject: 'Important Notice - {{noticeTitle}}',
    content: `Dear {{clientName}},

We would like to inform you about an important update:

{{noticeTitle}}

Notice Details:
{{noticeContent}}

Effective Date: {{effectiveDate}}

If you have any questions or concerns about this notice, please contact our team.

Best regards,
{{companyName}} Management`,
    status: 'active',
    lastModified: '2024-01-15'
  },
  {
    id: '9',
    name: 'Urgent Notice',
    type: 'notice_urgent',
    subject: 'URGENT: {{noticeTitle}} - Immediate Action Required',
    content: `Dear {{clientName}},

This is an urgent notice that requires your immediate attention:

{{noticeTitle}}

URGENT DETAILS:
{{noticeContent}}

Action Required By: {{actionDeadline}}

Please respond or take action immediately to avoid any complications.

For urgent assistance, contact our emergency hotline: {{emergencyContact}}

Best regards,
{{companyName}} Management`,
    status: 'active',
    lastModified: '2024-01-15'
  },
  {
    id: '10',
    name: 'Maintenance Notice',
    type: 'notice_maintenance',
    subject: 'Scheduled Maintenance Notice - {{maintenanceTitle}}',
    content: `Dear {{clientName}},

We would like to inform you about scheduled maintenance that may affect your service:

Maintenance Details:
- Title: {{maintenanceTitle}}
- Date: {{maintenanceDate}}
- Time: {{maintenanceTime}}
- Duration: {{maintenanceDuration}}
- Affected Services: {{affectedServices}}

What to Expect:
{{maintenanceDescription}}

We apologize for any inconvenience and appreciate your understanding.

Best regards,
{{companyName}} Maintenance Team`,
    status: 'active',
    lastModified: '2024-01-15'
  }
];

const availableVariables = [
  { key: 'clientName', label: 'Client Name', category: 'Client' },
  { key: 'userEmail', label: 'User Email', category: 'Client' },
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
  { key: 'companyPhone', label: 'Company Phone', category: 'Company' },
  { key: 'registrationDate', label: 'Registration Date', category: 'Account' },
  { key: 'accountType', label: 'Account Type', category: 'Account' },
  { key: 'resetLink', label: 'Password Reset Link', category: 'Account' },
  { key: 'verificationLink', label: 'Email Verification Link', category: 'Account' },
  { key: 'changeDate', label: 'Change Date', category: 'Account' },
  { key: 'changeTime', label: 'Change Time', category: 'Account' },
  { key: 'ipAddress', label: 'IP Address', category: 'Account' },
  { key: 'noticeTitle', label: 'Notice Title', category: 'Notice' },
  { key: 'noticeContent', label: 'Notice Content', category: 'Notice' },
  { key: 'effectiveDate', label: 'Effective Date', category: 'Notice' },
  { key: 'actionDeadline', label: 'Action Deadline', category: 'Notice' },
  { key: 'emergencyContact', label: 'Emergency Contact', category: 'Notice' },
  { key: 'maintenanceTitle', label: 'Maintenance Title', category: 'Maintenance' },
  { key: 'maintenanceDate', label: 'Maintenance Date', category: 'Maintenance' },
  { key: 'maintenanceTime', label: 'Maintenance Time', category: 'Maintenance' },
  { key: 'maintenanceDuration', label: 'Maintenance Duration', category: 'Maintenance' },
  { key: 'affectedServices', label: 'Affected Services', category: 'Maintenance' },
  { key: 'maintenanceDescription', label: 'Maintenance Description', category: 'Maintenance' }
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
      userEmail: 'john.doe@example.com',
      projectName: 'Victoria Gardens',
      unitNumber: 'Block A - Plot 15',
      saleAmount: '₦25,000,000',
      initialPayment: '₦5,000,000',
      amountDue: '₦20,000,000',
      dueDate: new Date().toLocaleDateString(),
      allocationDate: new Date().toLocaleDateString(),
      salesType: 'Property Offer',
      companyName: 'ProptyOS',
      companyAddress: '123 Business District, Lagos',
      companyPhone: '+234 123 456 7890',
      registrationDate: new Date().toLocaleDateString(),
      accountType: 'Client',
      resetLink: 'https://app.proptyos.com/reset-password?token=sample',
      verificationLink: 'https://app.proptyos.com/verify-email?token=sample',
      changeDate: new Date().toLocaleDateString(),
      changeTime: new Date().toLocaleTimeString(),
      ipAddress: '192.168.1.100',
      noticeTitle: 'System Maintenance Update',
      noticeContent: 'Our systems will undergo scheduled maintenance for improved performance.',
      effectiveDate: new Date().toLocaleDateString(),
      actionDeadline: new Date().toLocaleDateString(),
      emergencyContact: '+234 800 123 4567',
      maintenanceTitle: 'Server Upgrade',
      maintenanceDate: new Date().toLocaleDateString(),
      maintenanceTime: '10:00 PM - 2:00 AM',
      maintenanceDuration: '4 hours',
      affectedServices: 'Client Portal, Mobile App',
      maintenanceDescription: 'We will be upgrading our servers to provide better performance and security.'
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
      case 'welcome_signup':
        return 'bg-emerald-100 text-emerald-800';
      case 'password_reset':
        return 'bg-red-100 text-red-800';
      case 'password_change':
        return 'bg-amber-100 text-amber-800';
      case 'account_verification':
        return 'bg-cyan-100 text-cyan-800';
      case 'notice_general':
        return 'bg-slate-100 text-slate-800';
      case 'notice_urgent':
        return 'bg-red-100 text-red-800';
      case 'notice_maintenance':
        return 'bg-yellow-100 text-yellow-800';
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
      case 'welcome_signup':
        return 'Welcome & Signup';
      case 'password_reset':
        return 'Password Reset';
      case 'password_change':
        return 'Password Change';
      case 'account_verification':
        return 'Account Verification';
      case 'notice_general':
        return 'General Notice';
      case 'notice_urgent':
        return 'Urgent Notice';
      case 'notice_maintenance':
        return 'Maintenance Notice';
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
                      <SelectItem value="welcome_signup">Welcome & Signup</SelectItem>
                      <SelectItem value="password_reset">Password Reset</SelectItem>
                      <SelectItem value="password_change">Password Change</SelectItem>
                      <SelectItem value="account_verification">Account Verification</SelectItem>
                      <SelectItem value="notice_general">General Notice</SelectItem>
                      <SelectItem value="notice_urgent">Urgent Notice</SelectItem>
                      <SelectItem value="notice_maintenance">Maintenance Notice</SelectItem>
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