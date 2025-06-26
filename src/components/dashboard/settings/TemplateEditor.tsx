
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Plus, X, GripVertical } from 'lucide-react';

interface TemplateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
  onSave: (template: any) => void;
  availableFields: any[];
}

const templateTypes = [
  { value: 'offer_letter', label: 'Offer Letter' },
  { value: 'allocation_letter', label: 'Allocation Letter' },
  { value: 'payment_notice', label: 'Payment Notice' },
  { value: 'completion_letter', label: 'Completion Letter' },
  { value: 'termination_letter', label: 'Termination Letter' }
];

export function TemplateEditor({ isOpen, onClose, template, onSave, availableFields }: TemplateEditorProps) {
  const [templateData, setTemplateData] = useState(template || {
    name: '',
    type: '',
    status: 'draft',
    content: '',
    fields: []
  });

  const handleSave = () => {
    onSave(templateData);
  };

  const handleAddField = (fieldKey: string) => {
    if (!templateData.fields.includes(fieldKey)) {
      setTemplateData({
        ...templateData,
        fields: [...templateData.fields, fieldKey]
      });
    }
  };

  const handleRemoveField = (fieldKey: string) => {
    setTemplateData({
      ...templateData,
      fields: templateData.fields.filter((f: string) => f !== fieldKey)
    });
  };

  const insertFieldIntoContent = (fieldKey: string) => {
    const fieldPlaceholder = `{{${fieldKey}}}`;
    const newContent = templateData.content + ' ' + fieldPlaceholder;
    setTemplateData({
      ...templateData,
      content: newContent
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {template?.id ? 'Edit Template' : 'Create New Template'}
          </DialogTitle>
          <DialogDescription>
            Design and customize letter templates with drag-and-drop fields
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="design">Design & Fields</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Template Name *</Label>
                <Input
                  value={templateData.name}
                  onChange={(e) => setTemplateData({...templateData, name: e.target.value})}
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <Label>Template Type *</Label>
                <Select
                  value={templateData.type}
                  onValueChange={(value) => setTemplateData({...templateData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={templateData.status}
                onValueChange={(value) => setTemplateData({...templateData, status: value})}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="design" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Available Fields */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Available Fields</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {availableFields.map((field) => (
                      <div
                        key={field.key}
                        className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-gray-50"
                        onClick={() => handleAddField(field.key)}
                      >
                        <div>
                          <div className="text-sm font-medium">{field.label}</div>
                          <div className="text-xs text-gray-500">{field.type}</div>
                        </div>
                        <Plus className="h-4 w-4 text-blue-600" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Template Content */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <Label>Template Content</Label>
                  <Textarea
                    value={templateData.content}
                    onChange={(e) => setTemplateData({...templateData, content: e.target.value})}
                    placeholder="Enter your template content here. Use {{fieldName}} for dynamic fields."
                    rows={15}
                    className="font-mono text-sm"
                  />
                </div>

                {/* Selected Fields */}
                <div>
                  <Label>Selected Fields</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {templateData.fields.map((fieldKey: string) => {
                      const field = availableFields.find(f => f.key === fieldKey);
                      return (
                        <Badge
                          key={fieldKey}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => insertFieldIntoContent(fieldKey)}
                        >
                          <GripVertical className="h-3 w-3 mr-1" />
                          {field?.label || fieldKey}
                          <X
                            className="h-3 w-3 ml-1 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveField(fieldKey);
                            }}
                          />
                        </Badge>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Click a field to insert it into the template content
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Template Preview</h3>
                  <div className="border rounded-lg p-6 bg-white min-h-96">
                    <div className="whitespace-pre-wrap font-mono text-sm">
                      {templateData.content || 'No content to preview'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
