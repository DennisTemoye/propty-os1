import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Lead, PipelineStage } from './types';
import { 
  User, Mail, Phone, Building, DollarSign, MapPin, 
  Tag, Calendar, Star, Users, Globe 
} from 'lucide-react';

interface ModernLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLead: (lead: Partial<Lead>) => void;
  stages: PipelineStage[];
  agents: string[];
  projects: string[];
  sources: string[];
  editLead?: Lead | null;
}

export function ModernLeadModal({ 
  isOpen, 
  onClose, 
  onSaveLead, 
  stages, 
  agents, 
  projects, 
  sources,
  editLead
}: ModernLeadModalProps) {
  const form = useForm<Partial<Lead>>();
  const isEditing = !!editLead;

  useEffect(() => {
    if (editLead) {
      form.reset(editLead);
    } else {
      form.reset({
        priority: 'medium',
        stage: 'new_lead',
        status: 'active'
      });
    }
  }, [editLead, form, isOpen]);

  const onSubmit = (data: Partial<Lead>) => {
    if (!data.clientName || !data.email || !data.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    const leadData = {
      ...data,
      dealValue: data.dealValue ? Number(data.dealValue) : 0,
      stage: data.stage || 'new_lead',
      priority: data.priority || 'medium',
      status: data.status || 'active',
      tags: data.tags || [],
      budget: data.budget ? {
        min: Number(data.budget.min) || 0,
        max: Number(data.budget.max) || 0
      } : undefined,
      preferences: data.preferences || []
    };

    onSaveLead(leadData);
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm animate-scale-in">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            {isEditing ? 'Edit Lead' : 'Add New Lead'}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isEditing ? 'Update lead information and stage' : 'Create a new lead in your sales pipeline'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Contact Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              <User className="h-5 w-5 text-blue-600" />
              Contact Information
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="clientName"
                  {...form.register('clientName', { required: true })}
                  placeholder="Enter client's full name"
                  className="bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    {...form.register('email', { required: true })}
                    placeholder="client@example.com"
                    className="pl-10 bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    {...form.register('phone', { required: true })}
                    placeholder="+234-xxx-xxx-xxxx"
                    className="pl-10 bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="location"
                    {...form.register('location')}
                    placeholder="City or State"
                    className="pl-10 bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Lead Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              <Building className="h-5 w-5 text-blue-600" />
              Lead Details
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectInterest" className="text-sm font-medium text-gray-700">
                  Project Interest
                </Label>
                <Select onValueChange={(value) => form.setValue('projectInterest', value)}>
                  <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-300">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {projects.map((project) => (
                      <SelectItem key={project} value={project}>
                        {project}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source" className="text-sm font-medium text-gray-700">
                  Lead Source
                </Label>
                <Select onValueChange={(value) => form.setValue('source', value)}>
                  <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-300">
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select lead source" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {sources.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="stage" className="text-sm font-medium text-gray-700">
                  Pipeline Stage
                </Label>
                <Select onValueChange={(value) => form.setValue('stage', value)}>
                  <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-300">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {stages.filter(stage => !stage.isClosedStage).map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: stage.color }}
                          />
                          {stage.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assignedTo" className="text-sm font-medium text-gray-700">
                  Assign To
                </Label>
                <Select onValueChange={(value) => form.setValue('assignedTo', value)}>
                  <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-300">
                    <Users className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {agents.map((agent) => (
                      <SelectItem key={agent} value={agent}>
                        {agent}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                  Priority Level
                </Label>
                <Select onValueChange={(value) => form.setValue('priority', value as 'high' | 'medium' | 'low')}>
                  <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-300">
                    <Star className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    <SelectItem value="high">
                      <Badge className="bg-red-500 text-white">High Priority</Badge>
                    </SelectItem>
                    <SelectItem value="medium">
                      <Badge className="bg-yellow-500 text-white">Medium Priority</Badge>
                    </SelectItem>
                    <SelectItem value="low">
                      <Badge className="bg-gray-500 text-white">Low Priority</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Financial Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              Financial Information
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dealValue" className="text-sm font-medium text-gray-700">
                  Expected Deal Value (₦)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="dealValue"
                    type="number"
                    {...form.register('dealValue')}
                    placeholder="25000000"
                    className="pl-10 bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budgetMin" className="text-sm font-medium text-gray-700">
                  Budget Range - Minimum (₦)
                </Label>
                <Input
                  id="budgetMin"
                  type="number"
                  {...form.register('budget.min')}
                  placeholder="20000000"
                  className="bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budgetMax" className="text-sm font-medium text-gray-700">
                  Budget Range - Maximum (₦)
                </Label>
                <Input
                  id="budgetMax"
                  type="number"
                  {...form.register('budget.max')}
                  placeholder="30000000"
                  className="bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              <Tag className="h-5 w-5 text-blue-600" />
              Additional Information
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nextFollowUp" className="text-sm font-medium text-gray-700">
                  Next Follow-up Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="nextFollowUp"
                    type="datetime-local"
                    {...form.register('nextFollowUp')}
                    className="pl-10 bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
                  Tags (comma separated)
                </Label>
                <Input
                  id="tags"
                  placeholder="first_time_buyer, mortgage_needed"
                  className="bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 transition-all duration-200"
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                    form.setValue('tags', tags);
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preferences" className="text-sm font-medium text-gray-700">
                Client Preferences (comma separated)
              </Label>
              <Input
                id="preferences"
                placeholder="3_bedroom, parking, swimming_pool"
                className="bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 transition-all duration-200"
                onChange={(e) => {
                  const preferences = e.target.value.split(',').map(pref => pref.trim()).filter(Boolean);
                  form.setValue('preferences', preferences);
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Initial Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any initial notes about this lead..."
                rows={4}
                className="bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 transition-all duration-200 resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0"
            >
              {isEditing ? 'Update Lead' : 'Create Lead'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="px-8 bg-white/80 backdrop-blur-sm hover-scale"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}