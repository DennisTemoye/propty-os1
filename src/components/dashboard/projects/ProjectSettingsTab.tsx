
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Trash2 } from 'lucide-react';

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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-left">Project Settings</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Project
          </Button>
          <Button>
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
              <Input id="projectName" defaultValue={project.name} />
            </div>
            
            <div>
              <Label htmlFor="location" className="text-left block text-sm font-medium mb-2">Location</Label>
              <Input id="location" defaultValue={project.location} />
            </div>

            <div>
              <Label htmlFor="category" className="text-left block text-sm font-medium mb-2">Category</Label>
              <Select defaultValue={project.category.toLowerCase()}>
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
              <Select defaultValue={project.type.toLowerCase()}>
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
              <Select defaultValue={project.status}>
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
                defaultValue={project.description}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="projectManager" className="text-left block text-sm font-medium mb-2">Project Manager</Label>
              <Input id="projectManager" defaultValue={project.projectManager} />
            </div>

            <div>
              <Label htmlFor="internalNotes" className="text-left block text-sm font-medium mb-2">Internal Notes</Label>
              <Textarea 
                id="internalNotes" 
                defaultValue={project.internalNotes}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
