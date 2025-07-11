
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectSettingsTabProps {
  project: {
    id: number;
    name: string;
    location: string;
    category: string;
    type: string;
    status: string;
    description: string;
    projectManager: string;
    internalNotes: string;
  };
}

export function ProjectSettingsTab({ project }: ProjectSettingsTabProps) {
  const [formData, setFormData] = useState({
    name: project.name,
    location: project.location,
    category: project.category.toLowerCase(),
    type: project.type.toLowerCase(),
    status: project.status,
    description: project.description,
    projectManager: project.projectManager,
    internalNotes: project.internalNotes
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving project settings:', formData);
    toast.success('Project settings saved successfully!');
  };

  const handleDeleteProject = () => {
    console.log('Deleting project:', project.id);
    toast.success(`Project "${project.name}" has been deleted successfully.`);
    // In a real app, this would redirect to projects list
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-left">Project Settings</h2>
        <div className="flex space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Project
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{project.name}"? This action cannot be undone and will remove all associated data including allocations, blocks, and units.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteProject}
                >
                  Delete Project
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={handleSaveChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-left text-lg font-semibold">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="projectName" className="text-left block text-sm font-medium mb-2">Project Name</Label>
              <Input 
                id="projectName" 
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="location" className="text-left block text-sm font-medium mb-2">Location</Label>
              <Input 
                id="location" 
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-left block text-sm font-medium mb-2">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="lands">Lands</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type" className="text-left block text-sm font-medium mb-2">Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status" className="text-left block text-sm font-medium mb-2">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="sold out">Sold Out</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-left text-lg font-semibold">Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description" className="text-left block text-sm font-medium mb-2">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="projectManager" className="text-left block text-sm font-medium mb-2">Project Manager</Label>
              <Input 
                id="projectManager" 
                value={formData.projectManager}
                onChange={(e) => handleInputChange('projectManager', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="internalNotes" className="text-left block text-sm font-medium mb-2">Internal Notes</Label>
              <Textarea 
                id="internalNotes" 
                value={formData.internalNotes}
                onChange={(e) => handleInputChange('internalNotes', e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSaveChanges} className="w-full sm:w-auto">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
}
