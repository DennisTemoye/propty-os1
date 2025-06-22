
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for existing project
const mockProject = {
  id: 1,
  name: 'Victoria Gardens Estate',
  description: 'A premium residential development in the heart of Lekki',
  location: 'Plot 123, Admiralty Way, Lekki Phase 1',
  city: 'Lagos',
  state: 'Lagos State',
  category: 'Housing',
  type: 'Residential',
  developmentStage: 'Construction',
  totalBlocks: '5',
  totalUnits: '150',
  budget: '₦2.5B',
  startDate: '2024-01-15',
  expectedCompletion: '2025-12-31',
  projectManager: 'John Doe',
  tags: 'Premium, Luxury, Family',
  image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=450&fit=crop'
};

export function EditProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    city: '',
    state: '',
    category: '',
    type: '',
    developmentStage: '',
    totalBlocks: '',
    totalUnits: '',
    budget: '',
    startDate: '',
    expectedCompletion: '',
    projectManager: '',
    tags: '',
    image: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Load project data
    if (projectId) {
      setFormData({
        name: mockProject.name,
        description: mockProject.description,
        location: mockProject.location,
        city: mockProject.city,
        state: mockProject.state,
        category: mockProject.category,
        type: mockProject.type,
        developmentStage: mockProject.developmentStage,
        totalBlocks: mockProject.totalBlocks,
        totalUnits: mockProject.totalUnits,
        budget: mockProject.budget,
        startDate: mockProject.startDate,
        expectedCompletion: mockProject.expectedCompletion,
        projectManager: mockProject.projectManager,
        tags: mockProject.tags,
        image: null
      });
      setImagePreview(mockProject.image);
    }
  }, [projectId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setHasUnsavedChanges(true);
      
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
    setHasUnsavedChanges(true);
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmed) return;
    }
    navigate(`/company/projects/${projectId}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.city || !formData.state || !formData.category || !formData.developmentStage) {
      toast.error('Please fill in all required fields');
      return;
    }

    console.log('Updating project with data:', formData);
    toast.success(`Project "${formData.name}" updated successfully!`);
    navigate(`/company/projects/${projectId}`);
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
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Project</span>
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
          <div className="w-32" />
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
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
                      <span className="text-purple-600 hover:text-purple-700">Upload project image</span>
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
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter project name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="developmentStage">Development Stage *</Label>
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

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
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
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter city"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Enter state"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Full Address</Label>
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
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
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
                
                <div className="space-y-2">
                  <Label htmlFor="type">Project Type</Label>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="totalBlocks">Total Blocks</Label>
                  <Input
                    id="totalBlocks"
                    type="number"
                    value={formData.totalBlocks}
                    onChange={(e) => handleInputChange('totalBlocks', e.target.value)}
                    placeholder="Enter number of blocks"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="totalUnits">Total Units</Label>
                  <Input
                    id="totalUnits"
                    type="number"
                    value={formData.totalUnits}
                    onChange={(e) => handleInputChange('totalUnits', e.target.value)}
                    placeholder="Enter number of units"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
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
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expectedCompletion">Expected Completion</Label>
                  <Input
                    id="expectedCompletion"
                    type="date"
                    value={formData.expectedCompletion}
                    onChange={(e) => handleInputChange('expectedCompletion', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectManager">Project Manager</Label>
                  <Input
                    id="projectManager"
                    value={formData.projectManager}
                    onChange={(e) => handleInputChange('projectManager', e.target.value)}
                    placeholder="Enter project manager name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
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

          {/* Bottom padding for fixed button */}
          <div className="pb-20" />
        </form>

        {/* Fixed Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={handleBack}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleSubmit}
            >
              Update Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
