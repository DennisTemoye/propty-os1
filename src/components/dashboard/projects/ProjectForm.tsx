import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/shared/FormInput';
import { FormSelect } from '@/components/shared/FormSelect';
import { MapPin, Building2, Layers, Info, Plus, Trash2 } from 'lucide-react';
import { projectTypeOptions, projectStatusOptions, developmentStageOptions } from '@/forms/projectFormSchema';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface ProjectFormProps {
  project?: any;
  onClose: () => void;
  onFormChange?: () => void;
}

export function ProjectForm({ project, onClose, onFormChange }: ProjectFormProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [blocks, setBlocks] = useState(project?.blocks || []);
  
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

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-20">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="blocks">Blocks & Structure</TabsTrigger>
              <TabsTrigger value="timeline">Timeline & Management</TabsTrigger>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput
                      control={form.control}
                      name="startDate"
                      label="Start Date"
                      type="date"
                    />

                    <FormInput
                      control={form.control}
                      name="expectedCompletion"
                      label="Expected Completion"
                      type="date"
                    />

                    <FormInput
                      control={form.control}
                      name="totalBudget"
                      label="Total Budget"
                      placeholder="e.g., ₦5,000,000,000"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blocks" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-left">
                    <MapPin className="h-5 w-5 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

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
            </TabsContent>
          </Tabs>
        </form>

        {/* Fixed Submit Button */}
        <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 p-4 z-30">
          <div className="flex justify-end space-x-2 max-w-4xl mx-auto">
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
