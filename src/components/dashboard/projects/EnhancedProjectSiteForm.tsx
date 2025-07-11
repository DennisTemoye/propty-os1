import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Building, Users, FileText, Plus, Trash2, Eye } from 'lucide-react';

interface EnhancedProjectSiteFormProps {
  project?: any;
  onClose: () => void;
}

interface ProjectFormData {
  // Basic Information
  name: string;
  location: string;
  description: string;
  category: string;
  projectType: string;
  projectSize: number;
  developmentStage: string;
  
  // Project Details
  totalUnits: number;
  
  // Project Team
  projectManager: string;
  salesTeam: string[];
  
  // Features & Amenities
  amenities: string[];
  features: string[];
  
  // Documents & Media
  documents: File[];
  images: File[];
  layoutPlans: File[];
  
  // Settings
  isPublic: boolean;
  allowReservations: boolean;
  requireApproval: boolean;
}

const categories = [
  { value: 'residential', label: 'Residential', color: 'bg-blue-100 text-blue-800' },
  { value: 'commercial', label: 'Commercial', color: 'bg-green-100 text-green-800' },
  { value: 'mixed', label: 'Mixed Use', color: 'bg-purple-100 text-purple-800' },
  { value: 'land', label: 'Land Development', color: 'bg-amber-100 text-amber-800' },
];

const amenitiesList = [
  'Swimming Pool', 'Gym/Fitness Center', 'Playground', 'Security', '24/7 Power',
  'Parking', 'Garden/Landscaping', 'Water Treatment', 'Shopping Mall', 'School',
  'Hospital/Clinic', 'Restaurant', 'Clubhouse', 'Tennis Court', 'Basketball Court'
];

export function EnhancedProjectSiteForm({ project, onClose }: EnhancedProjectSiteFormProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(project?.amenities || []);
  const [blocks, setBlocks] = useState(project?.blocks || []);

  const form = useForm<ProjectFormData>({
    defaultValues: {
      name: project?.name || '',
      location: project?.location || '',
      description: project?.description || '',
      category: project?.category || '',
      projectType: project?.projectType || '',
      projectSize: project?.projectSize || 0,
      developmentStage: project?.developmentStage || '',
      totalUnits: project?.totalUnits || 0,
      projectManager: project?.projectManager || '',
      salesTeam: project?.salesTeam || [],
      amenities: project?.amenities || [],
      features: project?.features || [],
      isPublic: project?.isPublic || true,
      allowReservations: project?.allowReservations || true,
      requireApproval: project?.requireApproval || false,
    },
  });

  const selectedCategory = form.watch('category');

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat?.color || 'bg-gray-100 text-gray-800';
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const addBlock = () => {
    setBlocks(prev => [...prev, {
      id: `block-${Date.now()}`,
      name: '',
      prototype: '',
      units: 0,
      status: 'planning'
    }]);
  };

  const removeBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(b => b.id !== blockId));
  };

  const updateBlock = (blockId: string, field: string, value: any) => {
    setBlocks(prev => prev.map(b => 
      b.id === blockId ? { ...b, [field]: value } : b
    ));
  };

  const onSubmit = (data: ProjectFormData) => {
    const projectData = {
      ...data,
      amenities: selectedAmenities,
      blocks: blocks
    };
    
    console.log('Saving project:', projectData);
    toast.success(`Project "${data.name}" ${project ? 'updated' : 'created'} successfully!`);
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Project Details</TabsTrigger>
            <TabsTrigger value="team">Team & Management</TabsTrigger>
            <TabsTrigger value="features">Features & Amenities</TabsTrigger>
            <TabsTrigger value="media">Media & Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Project name is required' }}
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
                    name="location"
                    rules={{ required: 'Location is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project location" {...field} />
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
                          placeholder="Describe your project, target market, unique selling points..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectType"
                    rules={{ required: 'Project type is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Development Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new_development">New Development</SelectItem>
                            <SelectItem value="renovation">Renovation</SelectItem>
                            <SelectItem value="expansion">Expansion</SelectItem>
                            <SelectItem value="redevelopment">Redevelopment</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="projectSize"
                    rules={{ required: 'Project size is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Size (m²) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter size in square meters" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                        <FormLabel>Development Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="planning">Planning</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="handover">Handover</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {selectedCategory && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Category:</span>
                    <Badge className={getCategoryColor(selectedCategory)}>
                      {categories.find(c => c.value === selectedCategory)?.label}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="totalUnits"
                  rules={{ required: 'Total units is required', min: { value: 1, message: 'Must be at least 1' } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Units *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter total units" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Blocks Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Blocks Configuration
                  </span>
                  <Button type="button" onClick={addBlock} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Block
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {blocks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No blocks configured yet. Add your first block to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blocks.map((block, index) => (
                      <div key={block.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-900">Block {index + 1}</h4>
                          <Button 
                            type="button" 
                            onClick={() => removeBlock(block.id)} 
                            size="sm" 
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Block Name</label>
                            <Input
                              value={block.name}
                              onChange={(e) => updateBlock(block.id, 'name', e.target.value)}
                              placeholder="e.g., Block A"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Prototype</label>
                            <Select value={block.prototype} onValueChange={(value) => updateBlock(block.id, 'prototype', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bungalow">Bungalow</SelectItem>
                                <SelectItem value="duplex">Duplex</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="office">Office</SelectItem>
                                <SelectItem value="retail">Retail</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Units</label>
                            <Input
                              type="number"
                              value={block.units}
                              onChange={(e) => updateBlock(block.id, 'units', Number(e.target.value))}
                              placeholder="Number of units"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                            <Select value={block.status} onValueChange={(value) => updateBlock(block.id, 'status', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="planning">Planning</SelectItem>
                                <SelectItem value="construction">Construction</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Team & Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="projectManager"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Manager</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project manager" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="john_doe">John Doe</SelectItem>
                          <SelectItem value="jane_smith">Jane Smith</SelectItem>
                          <SelectItem value="mike_johnson">Mike Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Project Settings</label>
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <FormField
                      control={form.control}
                      name="isPublic"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Public Project</FormLabel>
                            <FormDescription>Make this project visible to potential clients</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="allowReservations"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Allow Reservations</FormLabel>
                            <FormDescription>Enable clients to reserve units online</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requireApproval"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Require Approval</FormLabel>
                            <FormDescription>All reservations need manager approval</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">Available Amenities</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {amenitiesList.map((amenity) => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
                          selectedAmenities.includes(amenity)
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                  
                  {selectedAmenities.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Selected amenities:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedAmenities.map((amenity) => (
                          <Badge key={amenity} className="bg-indigo-100 text-indigo-700">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Media & Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Project Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                    <Input type="file" accept="image/*" multiple className="hidden" id="images-upload" />
                    <label htmlFor="images-upload" className="cursor-pointer">
                      <div className="text-gray-600">
                        <p className="text-lg font-medium">Upload Project Images</p>
                        <p className="text-sm mt-1">Drag and drop or click to select multiple images</p>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB each</p>
                      </div>
                    </label>
                  </div>
                </div>

                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Layout Plans & Blueprints</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <Input type="file" accept=".pdf,.dwg,.png,.jpg" multiple className="hidden" id="layout-upload" />
                    <label htmlFor="layout-upload" className="cursor-pointer">
                      <div className="text-gray-600">
                        <p className="font-medium">Upload Layout Plans</p>
                        <p className="text-sm mt-1">PDF, DWG, PNG, JPG files</p>
                      </div>
                    </label>
                  </div>
                </div>

                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Legal Documents</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                    <Input type="file" accept=".pdf,.doc,.docx" multiple className="hidden" id="documents-upload" />
                    <label htmlFor="documents-upload" className="cursor-pointer">
                      <div className="text-gray-600">
                        <p className="font-medium">Upload Legal Documents</p>
                        <p className="text-sm mt-1">Certificates, Approvals, Permits (PDF, DOC)</p>
                      </div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={onClose} className="px-6">
            Cancel
          </Button>
          
          <div className="flex space-x-3">
            <Button type="button" variant="outline" className="px-6">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 h-auto font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {project ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
