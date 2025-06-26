import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Upload, X, Plus, Trash2 } from 'lucide-react';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// Mock project data - in a real app, this would come from an API
const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Housing',
    type: 'Residential',
    status: 'ongoing',
    developmentStage: 'Construction',
    totalBlocks: 5,
    totalUnits: 150,
    description: 'A premium residential estate featuring modern amenities and strategic location in the heart of Lekki.',
    projectManager: 'Alice Johnson',
    tags: ['Premium', 'Residential', 'Lekki'],
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop',
    projectSize: '50 hectares',
    startDate: '2024-01-01',
    expectedCompletion: '2025-12-31',
    totalBudget: '₦5,000,000,000',
    blocks: [
      {
        id: 'Block-A',
        prototype: 'Duplex',
        units: 30,
        status: 'construction',
        description: 'Premium duplex units with modern amenities'
      }
    ]
  }
];

export default function EditProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [projectImage, setProjectImage] = useState<string>('');
  
  console.log('EditProjectPage - ID from params:', id);
  
  const project = mockProjects.find(p => p.id === parseInt(id || '0'));
  
  console.log('EditProjectPage - Found project:', project);

  const form = useForm({
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
      type: project?.type || '',
      category: project?.category || '',
      projectSize: project?.projectSize || '',
      location: project?.location || '',
      city: project?.city || '',
      state: project?.state || '',
      developmentStage: project?.developmentStage || '',
      totalBudget: project?.totalBudget || '',
      totalBlocks: project?.totalBlocks?.toString() || '',
      totalUnits: project?.totalUnits?.toString() || '',
      startDate: project?.startDate || '',
      expectedCompletion: project?.expectedCompletion || '',
      projectManager: project?.projectManager || '',
      tags: project?.tags?.join(', ') || ''
    }
  });

  // Initialize blocks and image from project data
  React.useEffect(() => {
    if (project?.blocks) {
      setBlocks(project.blocks);
    }
    if (project?.image) {
      setProjectImage(project.image);
    }
  }, [project]);

  // Watch form changes
  const watchedFields = form.watch();
  React.useEffect(() => {
    setHasUnsavedChanges(true);
  }, [watchedFields, blocks]);

  const handleBack = () => {
    const backUrl = `/company/projects/${project?.id || id}`;
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(backUrl);
      }
    } else {
      navigate(backUrl);
    }
  };

  const onSubmit = (data: any) => {
    console.log('Project data:', { ...data, blocks, image: projectImage });
    toast.success('Project updated successfully!');
    setHasUnsavedChanges(false);
    navigate(`/company/projects/${project?.id || id}`);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setProjectImage(imageUrl);
      setHasUnsavedChanges(true);
      toast.success('Image uploaded successfully');
    }
  };

  const handleRemoveImage = () => {
    setProjectImage('');
    setHasUnsavedChanges(true);
    // Reset file input
    const fileInput = document.getElementById('project-image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const addBlock = () => {
    setBlocks([...blocks, {
      id: `Block-${blocks.length + 1}`,
      prototype: '',
      units: 0,
      status: 'planning',
      description: ''
    }]);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_: any, i: number) => i !== index));
  };

  const updateBlock = (index: number, field: string, value: any) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = { ...updatedBlocks[index], [field]: value };
    setBlocks(updatedBlocks);
  };

  if (!project) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="fixed inset-y-0 left-0 z-50 w-64">
          <CompanySidebar />
        </div>
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
            <p className="text-gray-600 mb-6">The project with ID "{id}" could not be found.</p>
            <Button onClick={() => navigate('/company/projects')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64">
        <CompanySidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Edit Project: {project.name}</h1>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-20">
                
                {/* Project Image Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Project Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {projectImage ? (
                      <div className="relative">
                        <img 
                          src={projectImage} 
                          alt="Project preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                        <div className="text-center">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <label htmlFor="project-image-upload" className="cursor-pointer">
                            <span className="text-blue-600 hover:text-blue-700">Upload project image</span>
                            <span className="text-gray-500"> or drag and drop</span>
                          </label>
                          <input
                            id="project-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <p className="text-sm text-gray-500 mt-2">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter project name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="developmentStage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Development Stage *</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select development stage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Planning">Planning</SelectItem>
                                  <SelectItem value="Pre-Launch">Pre-Launch</SelectItem>
                                  <SelectItem value="Marketing">Marketing</SelectItem>
                                  <SelectItem value="Construction">Construction</SelectItem>
                                  <SelectItem value="Handover">Handover</SelectItem>
                                  <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter project description"
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Location Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Location Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter state" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Project Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category *</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Housing">Housing</SelectItem>
                                  <SelectItem value="Commercial">Commercial</SelectItem>
                                  <SelectItem value="Mixed">Mixed</SelectItem>
                                  <SelectItem value="Land">Land</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Type</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select project type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Residential">Residential</SelectItem>
                                  <SelectItem value="Commercial">Commercial</SelectItem>
                                  <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
                                  <SelectItem value="Waterfront">Waterfront</SelectItem>
                                  <SelectItem value="Land Project">Land Project</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="totalBlocks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Blocks</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter number of blocks" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="totalUnits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Units</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter number of units" {...field} />
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
                            <FormLabel>Budget</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter project budget" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline & Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Timeline & Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
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
                            <FormLabel>Expected Completion</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="projectManager"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Manager</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter project manager name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags (comma separated)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Premium, Luxury, Family" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Blocks Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Blocks & Structure</CardTitle>
                      <Button type="button" onClick={addBlock} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Block
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {blocks.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No blocks defined yet. Add your first block to get started.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {blocks.map((block: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <Badge variant="outline">Block {index + 1}</Badge>
                              <Button 
                                type="button"
                                variant="outline" 
                                size="sm"
                                onClick={() => removeBlock(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <label className="text-sm font-medium mb-2 block">Block ID</label>
                                <Input 
                                  placeholder="e.g., Block A"
                                  value={block.id}
                                  onChange={(e) => updateBlock(index, 'id', e.target.value)}
                                />
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium mb-2 block">Prototype</label>
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
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium mb-2 block">Units Count</label>
                                <Input 
                                  type="number"
                                  placeholder="e.g., 30"
                                  value={block.units}
                                  onChange={(e) => updateBlock(index, 'units', parseInt(e.target.value) || 0)}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium mb-2 block">Description</label>
                              <Textarea 
                                placeholder="Brief description of this block..."
                                value={block.description}
                                onChange={(e) => updateBlock(index, 'description', e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </form>
            </Form>

            {/* Fixed Submit Button */}
            <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 p-4 z-30">
              <div className="flex justify-end space-x-2 max-w-4xl mx-auto">
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Update Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
