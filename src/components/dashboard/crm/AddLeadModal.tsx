
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Lead, PipelineStage } from './types';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Partial<Lead>) => void;
  stages: PipelineStage[];
  agents: string[];
  projects: string[];
  sources: string[];
  editLead?: Lead | null;
  onConvertToClient?: (leadId: string) => void;
}

export function AddLeadModal({ 
  isOpen, 
  onClose, 
  onAddLead, 
  stages, 
  agents, 
  projects, 
  sources,
  editLead,
  onConvertToClient
}: AddLeadModalProps) {
  const form = useForm<Partial<Lead>>();
  const isEditing = !!editLead;

  React.useEffect(() => {
    if (editLead) {
      form.reset(editLead);
    } else {
      form.reset();
    }
  }, [editLead, form]);

  const onSubmit = (data: Partial<Lead>) => {
    if (!data.clientName || !data.email || !data.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    onAddLead({
      ...data,
      dealValue: data.dealValue ? Number(data.dealValue) : 0,
      stage: data.stage || 'new-lead',
      priority: data.priority || 'medium'
    });
    
    form.reset();
    toast.success('Lead added successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update lead information' : 'Create a new lead in your sales pipeline'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Full Name *</Label>
                <Input
                  id="clientName"
                  {...form.register('clientName', { required: true })}
                  placeholder="Enter client's full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email', { required: true })}
                  placeholder="client@example.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  {...form.register('phone', { required: true })}
                  placeholder="+234-xxx-xxx-xxxx"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source">Lead Source</Label>
                <Select onValueChange={(value) => form.setValue('source', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lead source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((source) => (
                      <SelectItem key={source} value={source.toLowerCase().replace(' ', '-')}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Lead Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectInterest">Project Interest</Label>
                <Select onValueChange={(value) => form.setValue('projectInterest', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project} value={project}>
                        {project}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dealValue">Expected Deal Value (₦)</Label>
                <Input
                  id="dealValue"
                  type="number"
                  {...form.register('dealValue')}
                  placeholder="25000000"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stage">Initial Stage</Label>
                <Select onValueChange={(value) => form.setValue('stage', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.filter(stage => !stage.isClosedStage).map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign To</Label>
                <Select onValueChange={(value) => form.setValue('assignedTo', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent} value={agent}>
                        {agent}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select onValueChange={(value) => form.setValue('priority', value as 'high' | 'medium' | 'low')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Initial Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Initial Notes</Label>
            <Textarea
              id="notes"
              {...form.register('notes')}
              placeholder="Add any initial notes about this lead..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {isEditing ? 'Update Lead' : 'Add Lead'}
            </Button>
            {isEditing && onConvertToClient && (
              <Button 
                type="button" 
                onClick={() => {
                  onConvertToClient(editLead.id);
                  onClose();
                }}
                className="bg-gradient-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0"
              >
                Convert to Client
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
