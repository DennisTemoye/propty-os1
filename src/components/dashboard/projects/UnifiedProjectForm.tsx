import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/shared/FormInput';
import { FormSelect } from '@/components/shared/FormSelect';
import { MapPin, Building2, Layers, Info, Plus, Trash2, Upload, X, FileText, Download, User, Tag } from 'lucide-react';
import { projectFormSchema, ProjectFormData, projectCategoryOptions, projectStatusOptions, teamMemberOptions } from '@/forms/projectFormSchema';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

interface UnifiedProjectFormProps {
  project?: any;
  onClose: () => void;
  onFormChange?: () => void;
  mode?: 'create' | 'edit';
}

// Mock documents for demonstration
const mockDocuments = [
  {
    id: 1,
    name: 'Building Permit.pdf',
    type: 'PDF',
    size: '2.1 MB',
    uploadDate: '2024-01-15',
    category: 'Legal'
  },
  {
    id: 2,
    name: 'Site Layout.dwg',
    type: 'DWG',
    size: '5.8 MB',
    uploadDate: '2024-01-10',
    category: 'Technical'
  }
];

export function UnifiedProjectForm({ project, onClose, onFormChange, mode = 'create' }: UnifiedProjectFormProps) {
  const [blocks, setBlocks] = useState(project?.blocks || []);
  const [imagePreview, setImagePreview] = useState<string | null>(project?.image || null);
  const [documents, setDocuments] = useState(project?.documents || mockDocuments);
  
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: project?.name || '',
      location: project?.location || '',
      category: project?.category || '',
      terminologyType: project?.terminologyType || 'plots',
      description: project?.description || '',
      status: project?.status || '',
      projectSize: project?.projectSize || '',
      documentTitle: project?.documentTitle || '',
      projectManager: project?.projectManager || '',
      tags: project?.tags?.join(', ') || '',
      startDate: project?.startDate || '',
      expectedCompletion: project?.expectedCompletion || '',
      totalBudget: project?.totalBudget || '',
      contactPerson: project?.contactPerson || '',
      contactPhone: project?.contactPhone || '',
      contactEmail: project?.contactEmail || ''
    }
  });

  // Watch form changes
  const watchedFields = form.watch();
  useEffect(() => {
    onFormChange?.();
  }, [watchedFields, blocks, onFormChange]);

  const onSubmit = (data: ProjectFormData) => {
    const projectData = {
      ...data,
      blocks,
      image: imagePreview,
      documents,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
    };
    
    console.log(`${mode === 'create' ? 'Creating' : 'Updating'} project:`, projectData);
    toast.success(mode === 'create' ? 'Project created successfully!' : 'Project updated successfully!');
    onClose();
  };

  const addBlock = () => {
    setBlocks([...blocks, {
      id: `Block-${blocks.length + 1}`,
      name: `Block ${String.fromCharCode(65 + blocks.length)}`,
      type: '',
      prototype: '',
      totalUnits: 0,
      availableUnits: 0,
      reservedUnits: 0,
      soldUnits: 0,
      status: 'planning',
      description: '',
      structureType: 'plots', // Default to plots
      defaultPrice: '',
      defaultSize: '',
      units: []
    }]);
    onFormChange?.();
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_: any, i: number) => i !== index));
    onFormChange?.();
  };

  const updateBlock = (index: number, field: string, value: any) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = { ...updatedBlocks[index], [field]: value };
    setBlocks(updatedBlocks);
    onFormChange?.();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onFormChange?.();
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    onFormChange?.();
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDocument = {
        id: documents.length + 1,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        category: 'General'
      };
      setDocuments([...documents, newDocument]);
      onFormChange?.();
      toast.success('Document uploaded successfully!');
    }
  };

  const removeDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    onFormChange?.();
    toast.success('Document removed successfully!');
  };

  const downloadDocument = (doc: any) => {
    console.log('Downloading:', doc.name);
    toast.info(`Downloading ${doc.name}...`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-left">
                    <Info className="h-5 w-5 mr-2" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormInput
                    control={form.control}
                    name="name"
                    label="Project Name"
                    placeholder="e.g., Victoria Gardens Estate"
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      control={form.control}
                      name="location"
                      label="Location"
                      placeholder="e.g., Lekki, Lagos"
                      required
                    />

                    <FormSelect
                      control={form.control}
                      name="category"
                      label="Project Category"
                      placeholder="Select category"
                      options={projectCategoryOptions}
                      required
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="terminologyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">Primary Structure Type</FormLabel>
                        <FormControl>
                          <Select value={field.value || 'plots'} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select structure type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="plots">Plots (Land Development)</SelectItem>
                              <SelectItem value="units">Units (Housing/Buildings)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormInput
                    control={form.control}
                    name="description"
                    label="Project Description"
                    placeholder="Brief description of the project..."
                    type="textarea"
                  />

                  <FormInput
                    control={form.control}
                    name="documentTitle"
                    label="Document Title"
                    placeholder="e.g., Certificate of Occupancy, Family Receipt, Approved Survey"
                  />
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-left">
                    <Building2 className="h-5 w-5 mr-2" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormSelect
                      control={form.control}
                      name="status"
                      label="Project Status"
                      placeholder="Select status"
                      options={projectStatusOptions}
                      required
                    />

                    <FormInput
                      control={form.control}
                      name="projectSize"
                      label="Project Size"
                      placeholder="e.g., 50 hectares or 150 units"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormSelect
                      control={form.control}
                      name="projectManager"
                      label="Project Manager"
                      placeholder="Assign project manager"
                      options={teamMemberOptions}
                    />

                    <FormInput
                      control={form.control}
                      name="tags"
                      label="Tags"
                      placeholder="e.g., Premium, Luxury, Family (comma separated)"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Blocks & Structure */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-left">
                      <Layers className="h-5 w-5 mr-2" />
                      Blocks & Structure
                    </CardTitle>
                    <Button type="button" onClick={addBlock} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Block
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blocks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Layers className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No blocks defined yet. Add your first block to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {blocks.map((block: any, index: number) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="outline">Block {index + 1}</Badge>
                              <Button 
                                type="button"
                                variant="outline" 
                                size="sm"
                                onClick={() => removeBlock(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-left block">Block Name</label>
                                  <Input 
                                    placeholder="e.g., Block A"
                                    value={block.name || block.id}
                                    onChange={(e) => updateBlock(index, 'name', e.target.value)}
                                  />
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium text-left block">Structure Type</label>
                                  <Select 
                                    value={block.structureType || 'plots'}
                                    onValueChange={(value) => updateBlock(index, 'structureType', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select structure type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="plots">Plots (Land Development)</SelectItem>
                                      <SelectItem value="units">Units (Housing/Buildings)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-left block">Block Type</label>
                                  <Select 
                                    value={block.type}
                                    onValueChange={(value) => updateBlock(index, 'type', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="duplex">Duplex</SelectItem>
                                      <SelectItem value="bungalow">Bungalow</SelectItem>
                                      <SelectItem value="apartment">Apartment</SelectItem>
                                      <SelectItem value="commercial">Commercial</SelectItem>
                                      <SelectItem value="land">Land Plot</SelectItem>
                                      <SelectItem value="utility">Utility</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium text-left block">Total {block.structureType === 'units' ? 'Units' : 'Plots'}</label>
                                  <Input 
                                    type="number"
                                    placeholder="e.g., 30"
                                    value={block.totalUnits || 0}
                                    onChange={(e) => updateBlock(index, 'totalUnits', parseInt(e.target.value) || 0)}
                                  />
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium text-left block">Status</label>
                                  <Select 
                                    value={block.status}
                                    onValueChange={(value) => updateBlock(index, 'status', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="planning">Planning</SelectItem>
                                      <SelectItem value="construction">Construction</SelectItem>
                                      <SelectItem value="completed">Completed</SelectItem>
                                      <SelectItem value="on-hold">On Hold</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-left block">Default Price</label>
                                  <Input 
                                    placeholder="e.g., ₦25,000,000"
                                    value={block.defaultPrice || ''}
                                    onChange={(e) => updateBlock(index, 'defaultPrice', e.target.value)}
                                  />
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium text-left block">Default Size</label>
                                  <Input 
                                    placeholder="e.g., 500sqm"
                                    value={block.defaultSize || ''}
                                    onChange={(e) => updateBlock(index, 'defaultSize', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <label className="text-sm font-medium text-left block">Description</label>
                              <Textarea 
                                placeholder="Brief description of this block..."
                                className="mt-1"
                                value={block.description}
                                onChange={(e) => updateBlock(index, 'description', e.target.value)}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timeline & Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-left">
                    <Building2 className="h-5 w-5 mr-2" />
                    Timeline & Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left">Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expectedCompletion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left">Expected Completion</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="totalBudget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left">Total Budget</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., ₦5,000,000,000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Media & Contact (1/3 width) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Project Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-left">Project Image</CardTitle>
                </CardHeader>
                <CardContent>
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Project preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <Label htmlFor="image-upload" className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-700">Upload image</span>
                        </Label>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-left">
                    <FileText className="h-5 w-5 mr-2" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Existing Documents */}
                    {documents.length > 0 && (
                      <div className="space-y-2 mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Uploaded Documents</h4>
                        {documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <div>
                                <div className="text-sm font-medium">{doc.name}</div>
                                <div className="text-xs text-gray-500">
                                  {doc.category} • {doc.size} • {doc.uploadDate}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => downloadDocument(doc)}
                                className="h-8 w-8 p-0"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDocument(doc.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload New Document */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="text-center">
                        <FileText className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <Label htmlFor="documents-upload" className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-700 text-sm">Upload documents</span>
                        </Label>
                        <Input
                          id="documents-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleDocumentUpload}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, DOC files
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-left">
                    <User className="h-5 w-5 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">Contact Person</FormLabel>
                        <FormControl>
                          <Input placeholder="Project Manager/Lead" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+234 xxx xxx xxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">Contact Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="project@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </form>

        {/* Fixed Submit Button */}
        <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 p-4 z-30">
          <div className="flex justify-end space-x-2 max-w-4xl mx-auto">
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={form.handleSubmit(onSubmit)}
            >
              {mode === 'create' ? 'Create Project' : 'Update Project'}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
