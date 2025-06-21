
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NewMarketerFormProps {
  onClose?: () => void;
}

export function NewMarketerForm({ onClose }: NewMarketerFormProps) {
  const navigate = useNavigate();
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [commissionStructure, setCommissionStructure] = useState('percentage');

  // Mock projects data
  const availableProjects = [
    'Victoria Gardens',
    'Emerald Heights',
    'Golden View',
    'Sunset Residences',
    'Royal Palm Estate'
  ];

  const handleProjectToggle = (project: string) => {
    setSelectedProjects(prev => 
      prev.includes(project) 
        ? prev.filter(p => p !== project)
        : [...prev, project]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating new marketer...');
    // Add submission logic here
    if (onClose) {
      onClose();
    } else {
      navigate('/company/marketers');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Marketer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter email address" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketer">External Marketer</SelectItem>
                  <SelectItem value="sales-agent">Internal Sales Agent</SelectItem>
                  <SelectItem value="senior-marketer">Senior Marketer</SelectItem>
                  <SelectItem value="team-lead">Marketing Team Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Project Assignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Project Assignment</h3>
            <div className="space-y-2">
              <Label>Assigned Projects</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableProjects.map((project) => (
                  <div key={project} className="flex items-center space-x-2">
                    <Checkbox
                      id={project}
                      checked={selectedProjects.includes(project)}
                      onCheckedChange={() => handleProjectToggle(project)}
                    />
                    <Label htmlFor={project} className="text-sm">{project}</Label>
                  </div>
                ))}
              </div>
              {selectedProjects.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedProjects.map((project) => (
                    <Badge key={project} variant="secondary" className="flex items-center gap-1">
                      {project}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleProjectToggle(project)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Commission Structure */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Commission Structure</h3>
            
            <div className="space-y-2">
              <Label>Commission Type</Label>
              <Select value={commissionStructure} onValueChange={setCommissionStructure}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage of Sale</SelectItem>
                  <SelectItem value="fixed">Fixed Amount per Unit</SelectItem>
                  <SelectItem value="tiered">Tiered Commission</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {commissionStructure === 'percentage' && (
              <div className="space-y-2">
                <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                <Input 
                  id="commissionRate" 
                  type="number" 
                  step="0.1" 
                  min="0" 
                  max="100" 
                  placeholder="e.g., 2.5" 
                />
              </div>
            )}

            {commissionStructure === 'fixed' && (
              <div className="space-y-2">
                <Label htmlFor="fixedAmount">Fixed Amount (₦)</Label>
                <Input 
                  id="fixedAmount" 
                  type="number" 
                  min="0" 
                  placeholder="e.g., 500000" 
                />
              </div>
            )}

            {commissionStructure === 'tiered' && (
              <div className="space-y-2">
                <Label>Tiered Structure</Label>
                <div className="text-sm text-gray-500">
                  Configure tiered commission rates based on sales volume
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tier1">First 5 sales (%)</Label>
                    <Input id="tier1" type="number" step="0.1" placeholder="e.g., 2.0" />
                  </div>
                  <div>
                    <Label htmlFor="tier2">Next 10 sales (%)</Label>
                    <Input id="tier2" type="number" step="0.1" placeholder="e.g., 2.5" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Additional Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Add any additional notes or special instructions..." 
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose || (() => navigate('/company/marketers'))}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Create Marketer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
