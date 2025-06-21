
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Eye, 
  EyeOff, 
  Save,
  FileText,
  User,
  CreditCard,
  Building
} from 'lucide-react';

interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'file' | 'date' | 'number';
  required: boolean;
  visible: boolean;
  options?: string[];
  placeholder?: string;
  isCustom?: boolean;
}

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  fields: FormField[];
}

export function FormEditor() {
  const [selectedForm, setSelectedForm] = useState<string>('');
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [newField, setNewField] = useState<Partial<FormField>>({
    name: '',
    label: '',
    type: 'text',
    required: false,
    visible: true,
    placeholder: ''
  });

  const [formTemplates, setFormTemplates] = useState<FormTemplate[]>([
    {
      id: 'client-form',
      name: 'Client Form',
      description: 'Client onboarding and information collection',
      icon: <User className="h-5 w-5" />,
      fields: [
        { id: '1', name: 'firstName', label: 'First Name', type: 'text', required: true, visible: true },
        { id: '2', name: 'lastName', label: 'Last Name', type: 'text', required: true, visible: true },
        { id: '3', name: 'email', label: 'Email Address', type: 'email', required: true, visible: true },
        { id: '4', name: 'phone', label: 'Phone Number', type: 'phone', required: true, visible: true },
        { id: '5', name: 'gender', label: 'Gender', type: 'select', required: false, visible: true, options: ['Male', 'Female', 'Other'] },
        { id: '6', name: 'address', label: 'Address', type: 'textarea', required: false, visible: true },
      ]
    },
    {
      id: 'allocation-form',
      name: 'Allocation Form',
      description: 'Property allocation and assignment',
      icon: <Building className="h-5 w-5" />,
      fields: [
        { id: '1', name: 'clientName', label: 'Client Name', type: 'select', required: true, visible: true },
        { id: '2', name: 'projectName', label: 'Project Name', type: 'select', required: true, visible: true },
        { id: '3', name: 'unitNumber', label: 'Unit Number', type: 'text', required: true, visible: true },
        { id: '4', name: 'allocationDate', label: 'Allocation Date', type: 'date', required: true, visible: true },
        { id: '5', name: 'notes', label: 'Notes', type: 'textarea', required: false, visible: true },
      ]
    },
    {
      id: 'payment-form',
      name: 'Payment Form',
      description: 'Payment collection and tracking',
      icon: <CreditCard className="h-5 w-5" />,
      fields: [
        { id: '1', name: 'clientName', label: 'Client Name', type: 'select', required: true, visible: true },
        { id: '2', name: 'amount', label: 'Amount', type: 'number', required: true, visible: true },
        { id: '3', name: 'paymentMethod', label: 'Payment Method', type: 'select', required: true, visible: true, options: ['Cash', 'Bank Transfer', 'Check', 'Card'] },
        { id: '4', name: 'paymentDate', label: 'Payment Date', type: 'date', required: true, visible: true },
        { id: '5', name: 'reference', label: 'Reference Number', type: 'text', required: false, visible: true },
      ]
    }
  ]);

  const selectedFormTemplate = formTemplates.find(form => form.id === selectedForm);

  const moveField = (dragIndex: number, hoverIndex: number) => {
    if (!selectedFormTemplate) return;

    const draggedField = selectedFormTemplate.fields[dragIndex];
    const newFields = [...selectedFormTemplate.fields];
    newFields.splice(dragIndex, 1);
    newFields.splice(hoverIndex, 0, draggedField);

    setFormTemplates(prev => prev.map(template => 
      template.id === selectedForm 
        ? { ...template, fields: newFields }
        : template
    ));
  };

  const handleAddField = () => {
    if (!selectedFormTemplate || !newField.name || !newField.label) return;

    const field: FormField = {
      id: Date.now().toString(),
      name: newField.name!,
      label: newField.label!,
      type: newField.type!,
      required: newField.required!,
      visible: newField.visible!,
      placeholder: newField.placeholder,
      options: newField.type === 'select' ? ['Option 1', 'Option 2'] : undefined,
      isCustom: true
    };

    setFormTemplates(prev => prev.map(template => 
      template.id === selectedForm 
        ? { ...template, fields: [...template.fields, field] }
        : template
    ));

    setNewField({
      name: '',
      label: '',
      type: 'text',
      required: false,
      visible: true,
      placeholder: ''
    });
    setIsAddFieldModalOpen(false);
  };

  const handleRemoveField = (fieldId: string) => {
    if (!selectedFormTemplate) return;

    setFormTemplates(prev => prev.map(template => 
      template.id === selectedForm 
        ? { ...template, fields: template.fields.filter(field => field.id !== fieldId) }
        : template
    ));
  };

  const handleToggleFieldVisibility = (fieldId: string) => {
    if (!selectedFormTemplate) return;

    setFormTemplates(prev => prev.map(template => 
      template.id === selectedForm 
        ? { 
            ...template, 
            fields: template.fields.map(field => 
              field.id === fieldId 
                ? { ...field, visible: !field.visible }
                : field
            )
          }
        : template
    ));
  };

  const handleSaveChanges = () => {
    console.log('Saving form changes for:', selectedForm);
    console.log('Updated fields:', selectedFormTemplate?.fields);
    // Here you would typically save to a backend or local storage
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Form Editor</h2>
          <p className="text-gray-600">Customize forms by adding, removing, or reordering fields</p>
        </div>
        {selectedForm && (
          <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        )}
      </div>

      {/* Form Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Form to Edit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formTemplates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedForm === template.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                }`}
                onClick={() => setSelectedForm(template.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                      <Badge variant="outline" className="mt-1">
                        {template.fields.length} fields
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Editor */}
      {selectedFormTemplate && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {selectedFormTemplate.icon}
                {selectedFormTemplate.name} - Field Editor
              </CardTitle>
              <Dialog open={isAddFieldModalOpen} onOpenChange={setIsAddFieldModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Custom Field</DialogTitle>
                    <DialogDescription>
                      Create a new custom field for this form
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fieldName">Field Name</Label>
                      <Input
                        id="fieldName"
                        placeholder="e.g., customField"
                        value={newField.name}
                        onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fieldLabel">Field Label</Label>
                      <Input
                        id="fieldLabel"
                        placeholder="e.g., Custom Field"
                        value={newField.label}
                        onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fieldType">Field Type</Label>
                      <Select 
                        value={newField.type} 
                        onValueChange={(value: any) => setNewField(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="textarea">Textarea</SelectItem>
                          <SelectItem value="select">Dropdown</SelectItem>
                          <SelectItem value="file">File Upload</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="placeholder">Placeholder Text</Label>
                      <Input
                        id="placeholder"
                        placeholder="Enter placeholder text"
                        value={newField.placeholder}
                        onChange={(e) => setNewField(prev => ({ ...prev, placeholder: e.target.value }))}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="required"
                        checked={newField.required}
                        onCheckedChange={(checked) => setNewField(prev => ({ ...prev, required: checked }))}
                      />
                      <Label htmlFor="required">Required field</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddField} className="flex-1">
                        Add Field
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddFieldModalOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedFormTemplate.fields.map((field, index) => (
                <div
                  key={field.id}
                  className={`p-4 border rounded-lg bg-white shadow-sm ${!field.visible ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="cursor-grab hover:cursor-grabbing">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{field.label}</h4>
                          {field.required && (
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                          )}
                          {field.isCustom && (
                            <Badge variant="secondary" className="text-xs">Custom</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {field.name} • {field.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFieldVisibility(field.id)}
                      >
                        {field.visible ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      {field.isCustom && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveField(field.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
