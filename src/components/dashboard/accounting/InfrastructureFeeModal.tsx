
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';

interface InfrastructureFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfrastructureFeeModal({ isOpen, onClose }: InfrastructureFeeModalProps) {
  const form = useForm({
    defaultValues: {
      project: '',
      feeAmount: '',
      chargeType: 'full',
      milestones: [''],
      description: ''
    }
  });

  const { control, watch, setValue } = form;
  const chargeType = watch('chargeType');
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
    console.log('Creating infrastructure fee:', data);
    toast.success('Infrastructure fee configured successfully!');
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Infrastructure Development Fee</DialogTitle>
          <DialogDescription>
            Set up infrastructure fees for a project with flexible payment options
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="project">Project *</Label>
              <Controller
                name="project"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="victoria-gardens">Victoria Gardens</SelectItem>
                      <SelectItem value="golden-view">Golden View Towers</SelectItem>
                      <SelectItem value="emerald-heights">Emerald Heights</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label htmlFor="feeAmount">Infrastructure Fee Amount *</Label>
              <Input 
                {...form.register('feeAmount', { required: true })}
                placeholder="e.g., ₦5,000,000" 
              />
            </div>
          </div>

          <div>
            <Label>Payment Structure *</Label>
            <Controller
              name="chargeType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full">Full payment upfront</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="milestone" id="milestone" />
                    <Label htmlFor="milestone">Milestone-based payments</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          {chargeType === 'milestone' && (
            <div>
              <Label>Development Milestones</Label>
              <div className="space-y-2 mt-2">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={milestone}
                      onChange={(e) => updateMilestone(index, e.target.value)}
                      placeholder={`Milestone ${index + 1} (e.g., Foundation, Roofing)`}
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

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              {...form.register('description')}
              placeholder="Additional details about the infrastructure fee..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Configure Fee
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
