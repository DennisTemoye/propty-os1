
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

interface ServiceChargeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceChargeModal({ isOpen, onClose }: ServiceChargeModalProps) {
  const form = useForm({
    defaultValues: {
      project: '',
      chargeName: '',
      amount: '',
      frequency: 'monthly',
      scope: 'project',
      units: [],
      description: '',
      startDate: new Date().toISOString().split('T')[0]
    }
  });

  const { control, watch } = form;
  const scope = watch('scope');

  const onSubmit = (data: any) => {
    console.log('Creating service charge:', data);
    toast.success('Service charge configured successfully!');
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Service Charge</DialogTitle>
          <DialogDescription>
            Set up recurring service charges for projects or specific units
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="chargeName">Service Charge Name *</Label>
              <Input 
                {...form.register('chargeName', { required: true })}
                placeholder="e.g., Estate Management Fee" 
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input 
                {...form.register('amount', { required: true })}
                placeholder="e.g., ₦50,000" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="startDate">Start Date *</Label>
              <Input 
                type="date"
                {...form.register('startDate', { required: true })}
              />
            </div>
          </div>

          <div>
            <Label>Apply To *</Label>
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
                    <Label htmlFor="project">Entire Project</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="units" id="units" />
                    <Label htmlFor="units">Specific Units</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

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

          {scope === 'units' && (
            <div>
              <Label htmlFor="units">Select Units</Label>
              <Input 
                {...form.register('units')}
                placeholder="e.g., Block A - Unit 1, Block A - Unit 2" 
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter unit identifiers separated by commas
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              {...form.register('description', { required: true })}
              placeholder="Describe what this service charge covers..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Configure Service Charge
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
