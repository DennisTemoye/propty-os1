import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Edit, Trash2, Star, Copy, Loader2 } from 'lucide-react';
import { ReportFilters } from '@/services/reportService';
import { toast } from 'sonner';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  filters: ReportFilters;
  isDefault: boolean;
}

interface ReportTemplatesProps {
  templates: ReportTemplate[];
  onLoadTemplate: (template: ReportTemplate) => void;
  onSaveTemplate: (template: { name: string; description: string; type: string; filters: ReportFilters }) => Promise<boolean>;
  onDeleteTemplate?: (templateId: string) => Promise<boolean>;
  currentFilters: ReportFilters;
  currentReportType: string;
  loading?: boolean;
}

export function ReportTemplates({
  templates,
  onLoadTemplate,
  onSaveTemplate,
  onDeleteTemplate,
  currentFilters,
  currentReportType,
  loading = false
}: ReportTemplatesProps) {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    type: currentReportType
  });

  const reportTypes = [
    { value: 'sales', label: 'Sales Report' },
    { value: 'commission', label: 'Commission Report' },
    { value: 'financial', label: 'Financial Report' },
    { value: 'project', label: 'Project Report' },
    { value: 'client', label: 'Client Report' }
  ];

  const handleSaveTemplate = async () => {
    if (!newTemplate.name.trim()) {
      toast.error('Template name is required');
      return;
    }

    if (!newTemplate.description.trim()) {
      toast.error('Template description is required');
      return;
    }

    setSaving(true);
    try {
      const success = await onSaveTemplate({
        name: newTemplate.name.trim(),
        description: newTemplate.description.trim(),
        type: newTemplate.type,
        filters: currentFilters
      });

      if (success) {
        setIsSaveDialogOpen(false);
        setNewTemplate({
          name: '',
          description: '',
          type: currentReportType
        });
        toast.success('Template saved successfully');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!onDeleteTemplate) return;

    setTemplateToDelete(templateId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!templateToDelete || !onDeleteTemplate) return;

    setDeleting(true);
    try {
      const success = await onDeleteTemplate(templateToDelete);
      if (success) {
        setIsDeleteDialogOpen(false);
        setTemplateToDelete(null);
        toast.success('Template deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template');
    } finally {
      setDeleting(false);
    }
  };

  const handleLoadTemplate = (template: ReportTemplate) => {
    onLoadTemplate(template);
    toast.success(`Template "${template.name}" loaded successfully`);
  };

  const getReportTypeLabel = (type: string) => {
    return reportTypes.find(t => t.value === type)?.label || type;
  };

  const getReportTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      sales: 'bg-blue-100 text-blue-800',
      commission: 'bg-purple-100 text-purple-800',
      financial: 'bg-green-100 text-green-800',
      project: 'bg-orange-100 text-orange-800',
      client: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Save Current Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Save Current Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">
                Save your current filters and settings as a reusable template
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(currentFilters).map(([key, value]) => {
                  if (value && key !== 'reportType') {
                    return (
                      <Badge key={key} variant="secondary" className="text-xs">
                        {key}: {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                      </Badge>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
            <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Save Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Report Template</DialogTitle>
                  <DialogDescription>
                    Save your current report configuration as a reusable template.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      placeholder="Enter template name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-description">Description</Label>
                    <Textarea
                      id="template-description"
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                      placeholder="Enter template description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-type">Report Type</Label>
                    <Select
                      value={newTemplate.type}
                      onValueChange={(value) => setNewTemplate({ ...newTemplate, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsSaveDialogOpen(false)}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveTemplate}
                    disabled={saving}
                    className="flex items-center gap-2"
                  >
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    Save Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Saved Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Saved Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {templates.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Templates Saved</h3>
              <p className="text-gray-500">
                Save your first template to quickly load common report configurations.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        {template.isDefault && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                        <Badge className={getReportTypeColor(template.type)}>
                          {getReportTypeLabel(template.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(template.filters).map(([key, value]) => {
                          if (value && key !== 'reportType') {
                            return (
                              <Badge key={key} variant="outline" className="text-xs">
                                {key}: {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                              </Badge>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLoadTemplate(template)}
                        disabled={loading}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Load
                      </Button>
                      {onDeleteTemplate && !template.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTemplate(template.id)}
                          disabled={loading}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this template? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleting}
              className="flex items-center gap-2"
            >
              {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
