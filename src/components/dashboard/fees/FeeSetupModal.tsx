
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';

interface FeeSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeeSetupModal({ isOpen, onClose }: FeeSetupModalProps) {
  const form = useForm({
    defaultValues: {
      feeType: '',
      customFeeType: '',
      feeName: '',
      amount: '',
      frequency: 'one-time',
      scope: 'project',
      projects: [],
      description: '',
      linkedToMilestones: false,
      milestones: [''],
      autoAssign: true
    }
  });

  const { control, watch, setValue } = form;
  const feeType = watch('feeType');
  const frequency = watch('frequency');
  const scope = watch('scope');
  const linkedToMilestones = watch('linkedToMilestones');
  const milestones = watch('milestones');

  const addMilestone = () => {
    setValue('milestones', [...milestones, '']);
  };

  const removeMilestone = (index: number) => {
    const newMilestones = milestones.filter((_, i) => i !== index);
    setValue('milestones', newMilestones);
  };

  const updateMilestone = (index: number, value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index] = value;
    setValue('milestones', newMilestones);
  };

  const onSubmit = (data: any) => {
    console.log('Setting up fee:', data);
    toast.success('Fee type configured successfully!');
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Setup Fee Type</DialogTitle>
          <DialogDescription>
            Configure a new fee type for collection from clients
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="feeType">Fee Type *</Label>
              <Controller
                name="feeType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fee type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="infrastructure">Infrastructure Development Fee</SelectItem>
                      <SelectItem value="service">Service Charge</SelectItem>
                      <SelectItem value="maintenance">Maintenance Fee</SelectItem>
                      <SelectItem value="application">Application Form Fee</SelectItem>
                      <SelectItem value="custom">Custom Fee Type</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {feeType === 'custom' && (
              <div>
                <Label htmlFor="customFeeType">Custom Fee Type Name *</Label>
                <Input 
                  {...form.register('customFeeType', { required: feeType === 'custom' })}
                  placeholder="e.g., Security Deposit" 
                />
              </div>
            )}

            <div>
              <Label htmlFor="feeName">Fee Name *</Label>
              <Input 
                {...form.register('feeName', { required: true })}
                placeholder="e.g., Q1 2024 Infrastructure Fee" 
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input 
                {...form.register('amount', { required: true })}
                placeholder="e.g., ₦5,000,000" 
              />
            </div>
          </div>

          <div>
            <Label>Frequency *</Label>
            <Controller
              name="frequency"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time">One-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yearly" id="yearly" />
                    <Label htmlFor="yearly">Yearly</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          <div>
            <Label>Scope *</Label>
            <Controller
              name="scope"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="project" id="project" />
                    <Label htmlFor="project">Apply to entire project(s)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="global" id="global" />
                    <Label htmlFor="global">Apply globally to all projects</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          {scope === 'project' && (
            <div>
              <Label htmlFor="projects">Select Projects *</Label>
              <div className="space-y-2 mt-2">
                {['Victoria Gardens', 'Emerald Heights', 'Golden View', 'Sunset Heights'].map((project) => (
                  <div key={project} className="flex items-center space-x-2">
                    <Checkbox id={project} />
                    <Label htmlFor={project}>{project}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {feeType === 'infrastructure' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Controller
                  name="linkedToMilestones"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="linkedToMilestones"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="linkedToMilestones">Link to development milestones</Label>
              </div>

              {linkedToMilestones && (
                <div>
                  <Label>Development Milestones</Label>
                  <div className="space-y-2 mt-2">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={milestone}
                          onChange={(e) => updateMilestone(index, e.target.value)}
                          placeholder={`Milestone ${index + 1} (e.g., Foundation Complete)`}
                        />
                        {milestones.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeMilestone(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addMilestone}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Milestone
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Controller
              name="autoAssign"
              control={control}
              render={({ field }) => (
                <Checkbox 
                  id="autoAssign"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="autoAssign">Auto-assign to new clients upon allocation</Label>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              {...form.register('description')}
              placeholder="Additional details about this fee..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Setup Fee Type
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
