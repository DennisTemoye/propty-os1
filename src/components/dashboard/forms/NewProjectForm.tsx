
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface NewProjectFormProps {
  onClose: () => void;
  initialData?: any;
  isFullPage?: boolean;
}

export function NewProjectForm({ onClose, initialData, isFullPage = false }: NewProjectFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    category: initialData?.category || '',
    type: initialData?.type || '',
    developmentStage: initialData?.developmentStage || '',
    totalBlocks: initialData?.totalBlocks?.toString() || '',
    totalUnits: initialData?.totalUnits?.toString() || '',
    budget: initialData?.budget || '',
    startDate: initialData?.startDate || '',
    expectedCompletion: initialData?.expectedCompletion || '',
    projectManager: initialData?.projectManager || '',
    tags: initialData?.tags?.join ? initialData.tags.join(', ') : initialData?.tags || '',
    image: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setHasChanges(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    setHasChanges(true);
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.city || !formData.state || !formData.category || !formData.developmentStage) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate API call
    console.log(initialData ? 'Updating project with data:' : 'Creating project with data:', formData);
    toast.success(`Project "${formData.name}" ${initialData ? 'updated' : 'created'} successfully!`);
    onClose();
  };

  const developmentStages = [
    'Planning',
    'Pre-Launch', 
    'Marketing',
    'Construction',
    'Handover',
    'Completed'
  ];

  const categories = [
    'Housing',
    'Commercial',
    'Mixed',
    'Land'
  ];

  const projectTypes = [
    'Residential',
    'Commercial',
    'Mixed-Use',
    'Waterfront',
    'Land Project'
  ];

  const formClass = isFullPage ? 'space-y-8' : 'space-y-6';
  const cardClass = isFullPage ? 'shadow-sm' : '';

  return (
    <div className={isFullPage ? 'pb-24' : ''}>
      <form onSubmit={handleSubmit} className={formClass}>
        {/* Project Image Upload */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Project Image</CardTitle>
          </CardHeader>
          <CardContent>
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Project preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
                <div className="text-center">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <span className="text-lg text-blue-600 hover:text-blue-700 font-medium">Upload project image</span>
                    <span className="block text-gray-500 mt-2">or drag and drop</span>
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500 mt-4">
                    PNG, JPG, GIF up to 10MB (16:9 aspect ratio recommended)
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Project Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter project name"
                  className="h-11"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="developmentStage" className="text-sm font-medium">Development Stage *</Label>
                <Select value={formData.developmentStage} onValueChange={(value) => handleInputChange('developmentStage', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select development stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {developmentStages.map((stage) => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter project description"
                className="min-h-[120px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Location Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                  className="h-11"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter state"
                  className="h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">Full Address</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter full address"
                className="h-11"
              />
            </div>
          </CardContent>
        </Card>

        {/* Project Details */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium">Project Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="totalBlocks" className="text-sm font-medium">Total Blocks</Label>
                <Input
                  id="totalBlocks"
                  type="number"
                  value={formData.totalBlocks}
                  onChange={(e) => handleInputChange('totalBlocks', e.target.value)}
                  placeholder="Enter number of blocks"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="totalUnits" className="text-sm font-medium">Total Units</Label>
                <Input
                  id="totalUnits"
                  type="number"
                  value={formData.totalUnits}
                  onChange={(e) => handleInputChange('totalUnits', e.target.value)}
                  placeholder="Enter number of units"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium">Budget</Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="Enter project budget"
                  className="h-11"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline & Management */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Timeline & Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expectedCompletion" className="text-sm font-medium">Expected Completion</Label>
                <Input
                  id="expectedCompletion"
                  type="date"
                  value={formData.expectedCompletion}
                  onChange={(e) => handleInputChange('expectedCompletion', e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectManager" className="text-sm font-medium">Project Manager</Label>
                <Input
                  id="projectManager"
                  value={formData.projectManager}
                  onChange={(e) => handleInputChange('projectManager', e.target.value)}
                  placeholder="Enter project manager name"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="e.g., Premium, Luxury, Family"
                  className="h-11"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Fixed Action Bar for Full Page */}
      {isFullPage && (
        <div className="fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 p-4 z-20">
          <div className="max-w-4xl mx-auto flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={handleCancel} className="px-6">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="bg-purple-600 hover:bg-purple-700 px-8"
            >
              {initialData ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </div>
      )}

      {/* Inline Actions for Modal */}
      {!isFullPage && (
        <div className="flex justify-end space-x-4 pt-6 border-t mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
            {initialData ? 'Update Project' : 'Create Project'}
          </Button>
        </div>
      )}
    </div>
  );
}
