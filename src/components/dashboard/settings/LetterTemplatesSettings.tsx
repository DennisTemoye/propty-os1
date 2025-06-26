import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye,
  GripVertical,
  Settings
} from 'lucide-react';
import { TemplateEditor } from './TemplateEditor';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { useLetterTemplates } from '@/hooks/useLetterTemplates';
import { toast } from 'sonner';

const templateTypes = [
  { value: 'offer_letter', label: 'Offer Letter', description: 'Client property offers' },
  { value: 'allocation_letter', label: 'Allocation Letter', description: 'Unit allocation confirmations' },
  { value: 'payment_notice', label: 'Payment Notice', description: 'Payment reminders and notices' },
  { value: 'completion_letter', label: 'Completion Letter', description: 'Project completion notifications' },
  { value: 'termination_letter', label: 'Termination Letter', description: 'Contract terminations' }
];

const availableFields = [
  { key: 'clientName', label: 'Client Name', type: 'text' },
  { key: 'projectName', label: 'Project Name', type: 'text' },
  { key: 'unitNumber', label: 'Unit Number', type: 'text' },
  { key: 'saleAmount', label: 'Sale Amount', type: 'currency' },
  { key: 'allocationAmount', label: 'Allocation Amount', type: 'currency' },
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

  const { templates, saveTemplate, deleteTemplate } = useLetterTemplates();

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
    saveTemplate(templateData);
    toast.success('Template saved successfully! Changes will be reflected globally.');
    setShowEditor(false);
    setEditingTemplate(null);
  };

  const handlePreviewTemplate = (template: any) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    deleteTemplate(templateId);
    toast.success('Template deleted successfully! This will affect all related processes.');
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
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Settings className="h-6 w-6 mr-2 text-blue-600" />
            Letter Templates Management
          </h2>
          <p className="text-gray-600">Manage templates for offers, allocations, and client communications globally</p>
        </div>
        <Button onClick={handleCreateTemplate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Global Template System:</strong> Changes made here will automatically update all letters generated 
          across the Sales & Allocation module, ensuring consistency in client communications.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Active Templates</TabsTrigger>
          <TabsTrigger value="fields">Field Management</TabsTrigger>
          <TabsTrigger value="settings">Global Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Template Types Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {templateTypes.map((type) => {
              const activeTemplate = templates.find(t => t.type === type.value && t.status === 'active');
              return (
                <Card key={type.value} className={activeTemplate ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{type.label}</h3>
                      <Badge className={activeTemplate ? 'bg-green-600' : 'bg-orange-600'}>
                        {activeTemplate ? 'Active' : 'No Template'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                    {activeTemplate ? (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handlePreviewTemplate(activeTemplate)}>
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEditTemplate(activeTemplate)}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" onClick={handleCreateTemplate} className="w-full">
                        Create Template
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* All Templates List */}
          <Card>
            <CardHeader>
              <CardTitle>All Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <Card key={template.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <h3 className="font-semibold">{template.name}</h3>
                            <p className="text-sm text-gray-600">
                              {templateTypes.find(t => t.value === template.type)?.label}
                            </p>
                            <p className="text-xs text-gray-500">
                              Modified: {new Date(template.lastModified).toLocaleDateString()}
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
                      <div className="mt-3">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fields" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Template Fields</CardTitle>
              <p className="text-sm text-gray-600">
                These fields can be used in any template and will be automatically populated with data from the system.
              </p>
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
                        Template usage: <code className="bg-gray-100 px-1 rounded">{`{{${field.key}}}`}</code>
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
              <CardTitle>Global Template Settings</CardTitle>
              <p className="text-sm text-gray-600">
                Configure default settings that apply to all letter templates across the system.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> These settings will affect all generated letters across the Sales & Allocation module. 
                  Changes here will be applied to new letters generated after saving.
                </p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Global Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
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
