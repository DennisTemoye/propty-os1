
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye, 
  Move,
  GripVertical 
} from 'lucide-react';
import { TemplateEditor } from './TemplateEditor';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { toast } from 'sonner';

const mockTemplates = [
  {
    id: 'offer-1',
    name: 'Standard Offer Letter',
    type: 'offer_letter',
    status: 'active',
    lastModified: '2024-01-15',
    fields: ['clientName', 'projectName', 'saleAmount', 'offerDate']
  },
  {
    id: 'allocation-1',
    name: 'Standard Allocation Letter',
    type: 'allocation_letter',
    status: 'active',
    lastModified: '2024-01-10',
    fields: ['clientName', 'projectName', 'unitNumber', 'allocationDate']
  },
  {
    id: 'payment-1',
    name: 'Payment Reminder Notice',
    type: 'payment_notice',
    status: 'draft',
    lastModified: '2024-01-12',
    fields: ['clientName', 'dueAmount', 'dueDate']
  }
];

const templateTypes = [
  { value: 'offer_letter', label: 'Offer Letter' },
  { value: 'allocation_letter', label: 'Allocation Letter' },
  { value: 'payment_notice', label: 'Payment Notice' },
  { value: 'completion_letter', label: 'Completion Letter' },
  { value: 'termination_letter', label: 'Termination Letter' }
];

const availableFields = [
  { key: 'clientName', label: 'Client Name', type: 'text' },
  { key: 'projectName', label: 'Project Name', type: 'text' },
  { key: 'unitNumber', label: 'Unit Number', type: 'text' },
  { key: 'saleAmount', label: 'Sale Amount', type: 'currency' },
  { key: 'initialPayment', label: 'Initial Payment', type: 'currency' },
  { key: 'dueAmount', label: 'Due Amount', type: 'currency' },
  { key: 'offerDate', label: 'Offer Date', type: 'date' },
  { key: 'allocationDate', label: 'Allocation Date', type: 'date' },
  { key: 'dueDate', label: 'Due Date', type: 'date' },
  { key: 'companyName', label: 'Company Name', type: 'text' },
  { key: 'companyAddress', label: 'Company Address', type: 'text' },
  { key: 'companyPhone', label: 'Company Phone', type: 'text' },
  { key: 'marketerName', label: 'Marketer Name', type: 'text' }
];

export function LetterTemplatesSettings() {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  const handleCreateTemplate = () => {
    setEditingTemplate({
      id: '',
      name: '',
      type: '',
      status: 'draft',
      content: '',
      fields: []
    });
    setShowEditor(true);
  };

  const handleEditTemplate = (template: any) => {
    setEditingTemplate(template);
    setShowEditor(true);
  };

  const handleSaveTemplate = (templateData: any) => {
    console.log('Saving template:', templateData);
    toast.success('Template saved successfully!');
    setShowEditor(false);
    setEditingTemplate(null);
  };

  const handlePreviewTemplate = (template: any) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    console.log('Deleting template:', templateId);
    toast.success('Template deleted successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Letter Templates</h2>
          <p className="text-gray-600">Manage templates for offers, allocations, and other client communications</p>
        </div>
        <Button onClick={handleCreateTemplate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="fields">Field Management</TabsTrigger>
          <TabsTrigger value="settings">Template Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {mockTemplates.map((template) => (
              <Card key={template.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-gray-600">
                          {templateTypes.find(t => t.value === template.type)?.label}
                        </p>
                        <p className="text-xs text-gray-500">
                          Last modified: {template.lastModified}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(template.status)}>
                        {template.status}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePreviewTemplate(template)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditTemplate(template)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-600">Fields used:</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.fields.map((field) => (
                        <Badge key={field} variant="outline" className="text-xs">
                          {availableFields.find(f => f.key === field)?.label || field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fields" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Fields</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableFields.map((field) => (
                  <Card key={field.key} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{field.label}</span>
                        <Badge variant="outline">{field.type}</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Field key: <code className="bg-gray-100 px-1 rounded">{field.key}</code>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Default Company Information</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <Input placeholder="Company Name" />
                  <Input placeholder="Company Address" />
                  <Input placeholder="Phone Number" />
                  <Input placeholder="Email Address" />
                </div>
              </div>
              <div>
                <Label>Default Letter Settings</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Default Font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="times">Times New Roman</SelectItem>
                      <SelectItem value="calibri">Calibri</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Default Font Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12pt</SelectItem>
                      <SelectItem value="14">14pt</SelectItem>
                      <SelectItem value="16">16pt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showEditor && (
        <TemplateEditor
          isOpen={showEditor}
          onClose={() => {
            setShowEditor(false);
            setEditingTemplate(null);
          }}
          template={editingTemplate}
          onSave={handleSaveTemplate}
          availableFields={availableFields}
        />
      )}

      {showPreview && (
        <TemplatePreviewModal
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setSelectedTemplate(null);
          }}
          template={selectedTemplate}
        />
      )}
    </div>
  );
}
