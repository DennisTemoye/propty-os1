
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
}

export function NewProjectForm({ onClose, initialData }: NewProjectFormProps) {
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
    tags: initialData?.tags?.join(', ') || '',
    image: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Project Image Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Image</CardTitle>
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-700">Upload project image</span>
                  <span className="text-gray-500"> or drag and drop</span>
                </Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-2">
                  PNG, JPG, GIF up to 10MB (16:9 aspect ratio recommended)
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
            <div>
              <Label htmlFor="name" className="text-left block text-sm font-medium mb-2">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="developmentStage" className="text-left block text-sm font-medium mb-2">Development Stage *</Label>
              <Select value={formData.developmentStage} onValueChange={(value) => handleInputChange('developmentStage', value)}>
                <SelectTrigger>
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

          <div>
            <Label htmlFor="description" className="text-left block text-sm font-medium mb-2">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter project description"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Location Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-left block text-sm font-medium mb-2">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Enter city"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="state" className="text-left block text-sm font-medium mb-2">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="Enter state"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="text-left block text-sm font-medium mb-2">Full Address</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter full address"
            />
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-left block text-sm font-medium mb-2">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="type" className="text-left block text-sm font-medium mb-2">Project Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="totalBlocks" className="text-left block text-sm font-medium mb-2">Total Blocks</Label>
              <Input
                id="totalBlocks"
                type="number"
                value={formData.totalBlocks}
                onChange={(e) => handleInputChange('totalBlocks', e.target.value)}
                placeholder="Enter number of blocks"
              />
            </div>
            
            <div>
              <Label htmlFor="totalUnits" className="text-left block text-sm font-medium mb-2">Total Units</Label>
              <Input
                id="totalUnits"
                type="number"
                value={formData.totalUnits}
                onChange={(e) => handleInputChange('totalUnits', e.target.value)}
                placeholder="Enter number of units"
              />
            </div>
            
            <div>
              <Label htmlFor="budget" className="text-left block text-sm font-medium mb-2">Budget</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                placeholder="Enter project budget"
              />
            </div>
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
            <div>
              <Label htmlFor="startDate" className="text-left block text-sm font-medium mb-2">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="expectedCompletion" className="text-left block text-sm font-medium mb-2">Expected Completion</Label>
              <Input
                id="expectedCompletion"
                type="date"
                value={formData.expectedCompletion}
                onChange={(e) => handleInputChange('expectedCompletion', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectManager" className="text-left block text-sm font-medium mb-2">Project Manager</Label>
              <Input
                id="projectManager"
                value={formData.projectManager}
                onChange={(e) => handleInputChange('projectManager', e.target.value)}
                placeholder="Enter project manager name"
              />
            </div>
            
            <div>
              <Label htmlFor="tags" className="text-left block text-sm font-medium mb-2">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="e.g., Premium, Luxury, Family"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          {initialData ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}
