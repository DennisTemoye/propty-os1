
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/shared/FormInput';
import { FormSelect } from '@/components/shared/FormSelect';
import { MapPin, Building2, Layers, Info, Plus, Trash2, Upload, X, FileText } from 'lucide-react';
import { projectTypeOptions, projectStatusOptions, developmentStageOptions } from '@/forms/projectFormSchema';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

interface ProjectFormProps {
  project?: any;
  onClose: () => void;
  onFormChange?: () => void;
}

export function ProjectForm({ project, onClose, onFormChange }: ProjectFormProps) {
  const [blocks, setBlocks] = useState(project?.blocks || []);
  const [imagePreview, setImagePreview] = useState<string | null>(project?.image || null);
  
  const form = useForm({
    defaultValues: {
      name: project?.name || '',
      location: project?.location || '',
      description: project?.description || '',
      documentTitle: project?.documentTitle || '',
      type: project?.type || '',
      status: project?.status || 'active',
      projectSize: project?.projectSize || '',
      developmentStage: project?.developmentStage || '',
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

  const onSubmit = (data: any) => {
    console.log('Project data:', { ...data, blocks });
    toast.success(project ? 'Project updated successfully!' : 'Project created successfully!');
    onClose();
  };

  const addBlock = () => {
    setBlocks([...blocks, {
      id: `Block-${blocks.length + 1}`,
      prototype: '',
      units: 0,
      status: 'planning',
      description: ''
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

  return (
    <div className="max-w-7xl mx-auto">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      control={form.control}
                      name="name"
                      label="Project Name"
                      placeholder="e.g., Victoria Gardens Estate"
                      required
                    />
                    
                    <FormInput
                      control={form.control}
                      name="location"
                      label="Location"
                      placeholder="e.g., Lekki, Lagos"
                      required
                    />
                  </div>

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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormSelect
                      control={form.control}
                      name="type"
                      label="Project Type"
                      placeholder="Select type"
                      options={projectTypeOptions}
                      required
                    />

                    <FormSelect
                      control={form.control}
                      name="status"
                      label="Project Status"
                      placeholder="Select status"
                      options={projectStatusOptions}
                    />
                  </div>
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
                    <FormInput
                      control={form.control}
                      name="projectSize"
                      label="Project Size"
                      placeholder="e.g., 50 hectares"
                    />

                    <FormSelect
                      control={form.control}
                      name="developmentStage"
                      label="Development Stage"
                      placeholder="Select stage"
                      options={developmentStageOptions}
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <label className="text-sm font-medium text-left block">Block ID</label>
                                <Input 
                                  placeholder="e.g., Block A"
                                  value={block.id}
                                  onChange={(e) => updateBlock(index, 'id', e.target.value)}
                                />
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium text-left block">Prototype</label>
                                <Select 
                                  value={block.prototype}
                                  onValueChange={(value) => updateBlock(index, 'prototype', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select prototype" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Duplex">Duplex</SelectItem>
                                    <SelectItem value="Bungalow">Bungalow</SelectItem>
                                    <SelectItem value="Apartment">Apartment</SelectItem>
                                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                                    <SelectItem value="Commercial">Commercial</SelectItem>
                                    <SelectItem value="Office">Office</SelectItem>
                                    <SelectItem value="Retail">Retail</SelectItem>
                                    <SelectItem value="Standard Plots">Standard Plots</SelectItem>
                                    <SelectItem value="Premium Plots">Premium Plots</SelectItem>
                                    <SelectItem value="Corner Plots">Corner Plots</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium text-left block">Units Count</label>
                                <Input 
                                  type="number"
                                  placeholder="e.g., 30"
                                  value={block.units}
                                  onChange={(e) => updateBlock(index, 'units', parseInt(e.target.value) || 0)}
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
                                    <SelectItem value="surveyed">Surveyed</SelectItem>
                                    <SelectItem value="construction">Construction</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="marketing">Marketing</SelectItem>
                                  </SelectContent>
                                </Select>
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
                          multiple
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
                    <MapPin className="h-5 w-5 mr-2" />
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
          <div className="flex justify-end space-x-2 max-w-7xl mx-auto">
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={form.handleSubmit(onSubmit)}
            >
              {project ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
