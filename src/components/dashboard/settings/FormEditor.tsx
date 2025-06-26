
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Plus, Save, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface FormField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'date';
  label: string;
  required: boolean;
  options?: string[];
}

interface CustomForm {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  status: 'active' | 'draft';
  createdAt: string;
  updatedAt: string;
}

const mockForms: CustomForm[] = [
  {
    id: 'form-1',
    name: 'Client Registration Form',
    description: 'Standard form for new client registration',
    status: 'active',
    fields: [
      { id: 'f1', name: 'fullName', type: 'text', label: 'Full Name', required: true },
      { id: 'f2', name: 'email', type: 'email', label: 'Email Address', required: true },
      { id: 'f3', name: 'phone', type: 'text', label: 'Phone Number', required: true }
    ],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15'
  },
  {
    id: 'form-2',
    name: 'Property Inquiry Form',
    description: 'Form for property inquiries and interest',
    status: 'draft',
    fields: [
      { id: 'f4', name: 'project', type: 'select', label: 'Project Interest', required: true, options: ['Victoria Gardens', 'Emerald Heights'] },
      { id: 'f5', name: 'budget', type: 'number', label: 'Budget Range', required: false },
      { id: 'f6', name: 'comments', type: 'textarea', label: 'Additional Comments', required: false }
    ],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-20'
  }
];

export function FormEditor() {
  const [forms, setForms] = useState<CustomForm[]>(mockForms);
  const [selectedForm, setSelectedForm] = useState<CustomForm | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateForm = () => {
    const newForm: CustomForm = {
      id: `form-${Date.now()}`,
      name: 'New Form',
      description: 'New custom form',
      status: 'draft',
      fields: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setForms([...forms, newForm]);
    setSelectedForm(newForm);
    setIsEditing(true);
    toast.success('New form created');
  };

  const handleSaveForm = () => {
    if (selectedForm) {
      setForms(forms.map(f => f.id === selectedForm.id ? selectedForm : f));
      setIsEditing(false);
      toast.success('Form saved successfully');
    }
  };

  const handleDeleteForm = (formId: string) => {
    setForms(forms.filter(f => f.id !== formId));
    if (selectedForm?.id === formId) {
      setSelectedForm(null);
    }
    toast.success('Form deleted');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="h-5 w-5 text-blue-600" />
                <span>Form Editor</span>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Create and manage custom forms for your business needs
              </p>
            </div>
            <Button onClick={handleCreateForm} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Form
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Forms List */}
            <div className="space-y-4">
              <h3 className="font-semibold">Available Forms</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Form Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{form.name}</div>
                          <div className="text-sm text-gray-500">{form.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={form.status === 'active' ? 'default' : 'secondary'}>
                          {form.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedForm(form);
                              setIsEditing(false);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedForm(form);
                              setIsEditing(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteForm(form.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Form Editor */}
            <div className="space-y-4">
              {selectedForm ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      {isEditing ? 'Edit Form' : 'View Form'}
                    </h3>
                    {isEditing && (
                      <Button onClick={handleSaveForm} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Form Name</Label>
                      <Input
                        value={selectedForm.name}
                        onChange={(e) => setSelectedForm({
                          ...selectedForm,
                          name: e.target.value
                        })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={selectedForm.description}
                        onChange={(e) => setSelectedForm({
                          ...selectedForm,
                          description: e.target.value
                        })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label>Status</Label>
                      <Select
                        value={selectedForm.status}
                        onValueChange={(value: 'active' | 'draft') => 
                          setSelectedForm({
                            ...selectedForm,
                            status: value
                          })
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Form Fields ({selectedForm.fields.length})</Label>
                      <div className="mt-2 space-y-2">
                        {selectedForm.fields.map((field) => (
                          <div key={field.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{field.label}</div>
                                <div className="text-sm text-gray-500">
                                  {field.type} • {field.required ? 'Required' : 'Optional'}
                                </div>
                              </div>
                              <Badge variant="outline">{field.type}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Edit className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>Select a form to view or edit</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
