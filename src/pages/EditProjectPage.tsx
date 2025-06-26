import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, MapPin, Building2, Layers, Info, Plus, Trash2, User, Calendar, Camera, Clock, Upload, X } from 'lucide-react';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { toast } from 'sonner';

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
    availableUnits: 38,
    allocatedUnits: 89,
    reservedUnits: 23,
    totalClients: 112,
    totalRevenue: '₦2,500,000,000',
    allocationRate: 75,
    lastUpdated: '2024-01-15',
    description: 'A premium residential estate featuring modern amenities and strategic location in the heart of Lekki.',
    projectManager: 'Alice Johnson',
    internalNotes: 'Focus on completing Block A before marketing Block C units.',
    tags: ['Premium', 'Residential', 'Lekki'],
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop',
    documentTitle: 'Certificate of Occupancy',
    projectSize: '50 hectares',
    startDate: '2024-01-01',
    expectedCompletion: '2025-12-31',
    totalBudget: '₦5,000,000,000',
    contactPerson: 'Alice Johnson',
    contactPhone: '+234 xxx xxx xxxx',
    contactEmail: 'alice@victoriagarden.com',
    address: 'Plot 123, Lekki Phase 1, Lagos State',
    lga: 'Eti-Osa',
    country: 'Nigeria',
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
  const { projectId } = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [projectImage, setProjectImage] = useState<string>('');
  
  const project = mockProjects.find(p => p.id === parseInt(projectId || '0'));

  const form = useForm({
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
      documentTitle: project?.documentTitle || '',
      type: project?.type || '',
      category: project?.category || '',
      status: project?.status || 'active',
      projectSize: project?.projectSize || '',
      location: project?.location || '',
      address: project?.address || '',
      city: project?.city || '',
      state: project?.state || '',
      lga: project?.lga || '',
      country: project?.country || 'Nigeria',
      developmentStage: project?.developmentStage || '',
      totalBudget: project?.totalBudget || '',
      totalBlocks: project?.totalBlocks?.toString() || '',
      totalUnits: project?.totalUnits?.toString() || '',
      startDate: project?.startDate || '',
      expectedCompletion: project?.expectedCompletion || '',
      projectManager: project?.projectManager || '',
      contactPerson: project?.contactPerson || '',
      contactPhone: project?.contactPhone || '',
      contactEmail: project?.contactEmail || '',
      internalNotes: project?.internalNotes || ''
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
    const backUrl = `/company/projects/${projectId}`;
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
    navigate(`/company/projects/${projectId}`);
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

  if (!project) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="fixed inset-y-0 left-0 z-50 w-64">
          <CompanySidebar />
        </div>
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
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
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
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
          <div className="w-full space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Project Image Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Camera className="h-5 w-5 mr-2" />
                      Project Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {/* Image Preview */}
                      {projectImage ? (
                        <div className="relative">
                          <img 
                            src={projectImage} 
                            alt="Project preview" 
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={handleRemoveImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                          <div className="text-center">
                            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No image uploaded</p>
                          </div>
                        </div>
                      )}

                      {/* Upload Controls */}
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('project-image-upload')?.click()}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          {projectImage ? 'Change Image' : 'Upload Image'}
                        </Button>
                        
                        <input
                          id="project-image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        
                        <span className="text-sm text-gray-500">
                          Supports JPG, PNG, GIF up to 5MB
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Basic Information Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Info className="h-5 w-5 mr-2" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Victoria Gardens Estate" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Category *</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Housing">Housing</SelectItem>
                                  <SelectItem value="Mixed">Mixed</SelectItem>
                                  <SelectItem value="Land">Land</SelectItem>
                                  <SelectItem value="Commercial">Commercial</SelectItem>
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
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Brief description of the project..."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Type *</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
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

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Status</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="ongoing">Ongoing</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="upcoming">Upcoming</SelectItem>
                                  <SelectItem value="paused">Paused</SelectItem>
                                  <SelectItem value="sold out">Sold Out</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Size</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 50 hectares" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="documentTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Document Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Certificate of Occupancy, Family Receipt, Approved Survey" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Location Details Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Location Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Lekki, Lagos" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Address</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Plot 123, Lekki Phase 1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Lagos" {...field} />
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
                              <Input placeholder="e.g., Lagos State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lga"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LGA</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Eti-Osa" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                                  <SelectItem value="Ghana">Ghana</SelectItem>
                                  <SelectItem value="Kenya">Kenya</SelectItem>
                                  <SelectItem value="South Africa">South Africa</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Project Details Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      Project Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="developmentStage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Development Stage</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select stage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Land Acquisition">Land Acquisition</SelectItem>
                                  <SelectItem value="Planning & Approvals">Planning & Approvals</SelectItem>
                                  <SelectItem value="Subdivision">Subdivision</SelectItem>
                                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                                  <SelectItem value="Construction">Construction</SelectItem>
                                  <SelectItem value="Marketing">Marketing</SelectItem>
                                  <SelectItem value="Pre-Launch">Pre-Launch</SelectItem>
                                  <SelectItem value="Sales">Sales</SelectItem>
                                  <SelectItem value="Handover">Handover</SelectItem>
                                </SelectContent>
                              </Select>
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
                            <FormLabel>Total Budget</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., ₦5,000,000,000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="totalBlocks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Blocks</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 5" {...field} />
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
                              <Input type="number" placeholder="e.g., 150" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline & Management Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Timeline & Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <FormField
                      control={form.control}
                      name="projectManager"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Manager</FormLabel>
                          <FormControl>
                            <Input placeholder="Project Manager Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person</FormLabel>
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
                            <FormLabel>Contact Phone</FormLabel>
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
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="project@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="internalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Internal Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Internal notes and remarks..."
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

                {/* Blocks & Structure Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Layers className="h-5 w-5 mr-2" />
                        Blocks & Structure
                      </CardTitle>
                      <Button type="button" onClick={addBlock} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Block
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {blocks.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <Layers className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">No blocks defined yet</p>
                        <p className="text-sm">Add your first block to get started.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {blocks.map((block: any, index: number) => (
                          <Card key={index} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <Badge variant="outline" className="text-sm font-medium">Block {index + 1}</Badge>
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
                              
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
                                  <label className="text-sm font-medium mb-2 block">Units Count</label>
                                  <Input 
                                    type="number"
                                    placeholder="e.g., 30"
                                    value={block.units}
                                    onChange={(e) => updateBlock(index, 'units', parseInt(e.target.value) || 0)}
                                  />
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium mb-2 block">Status</label>
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
                              
                              <div>
                                <label className="text-sm font-medium mb-2 block">Description</label>
                                <Textarea 
                                  placeholder="Brief description of this block..."
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

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={handleBack}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Update Project
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
