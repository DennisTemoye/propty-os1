
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { Receipt, Search } from 'lucide-react';

interface RecordFeeModalProps {
  onClose: () => void;
}

// Mock data - in real app this would come from API
const projectClients = {
  'victoria-gardens': [
    { id: 'john-doe', name: 'John Doe' },
    { id: 'jane-smith', name: 'Jane Smith' }
  ],
  'emerald-heights': [
    { id: 'mike-johnson', name: 'Mike Johnson' },
    { id: 'sarah-wilson', name: 'Sarah Wilson' }
  ],
  'golden-view': [
    { id: 'david-brown', name: 'David Brown' },
    { id: 'lisa-davis', name: 'Lisa Davis' }
  ],
  'sunset-heights': [
    { id: 'robert-taylor', name: 'Robert Taylor' },
    { id: 'emma-white', name: 'Emma White' }
  ]
};

export function RecordFeeModal({ onClose }: RecordFeeModalProps) {
  const [clientSearch, setClientSearch] = useState('');
  const form = useForm({
    defaultValues: {
      project: '',
      clientName: '',
      unit: '',
      feeType: '',
      amount: '',
      dueDate: '',
      description: '',
      status: 'Pending'
    }
  });

  const { control, watch } = form;
  const selectedProject = watch('project');

  const availableClients = useMemo(() => {
    if (!selectedProject) return [];
    return projectClients[selectedProject as keyof typeof projectClients] || [];
  }, [selectedProject]);

  const filteredClients = useMemo(() => {
    if (!clientSearch) return availableClients;
    return availableClients.filter(client => 
      client.name.toLowerCase().includes(clientSearch.toLowerCase())
    );
  }, [availableClients, clientSearch]);

  const onSubmit = (data: any) => {
    console.log('Recording new fee:', data);
    toast.success('Fee recorded successfully!');
    onClose();
    form.reset();
    setClientSearch('');
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="project">Project *</Label>
          <Controller
            name="project"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={(value) => {
                field.onChange(value);
                form.setValue('clientName', ''); // Reset client when project changes
                setClientSearch('');
              }} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project first" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="victoria-gardens">Victoria Gardens</SelectItem>
                  <SelectItem value="emerald-heights">Emerald Heights</SelectItem>
                  <SelectItem value="golden-view">Golden View</SelectItem>
                  <SelectItem value="sunset-heights">Sunset Heights</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="clientSearch">Search & Select Client *</Label>
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={selectedProject ? "Search clients..." : "Select project first"}
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                className="pl-10"
                disabled={!selectedProject}
              />
            </div>
            <Controller
              name="clientName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select 
                  onValueChange={field.onChange} 
                  value={field.value}
                  disabled={!selectedProject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={selectedProject ? "Select client" : "Select project first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                    {filteredClients.length === 0 && selectedProject && (
                      <SelectItem value="" disabled>
                        {clientSearch ? 'No clients found' : 'No clients available'}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="unit">Unit</Label>
          <Input 
            {...form.register('unit')}
            placeholder="e.g., Block A - Plot 02"
          />
        </div>

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
                  <SelectItem value="infrastructure">Infrastructure Fee</SelectItem>
                  <SelectItem value="service">Service Charge</SelectItem>
                  <SelectItem value="maintenance">Maintenance Fee</SelectItem>
                  <SelectItem value="security">Security Deposit</SelectItem>
                  <SelectItem value="legal">Legal Fee</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label htmlFor="amount">Amount *</Label>
          <Input 
            {...form.register('amount', { required: true })}
            placeholder="e.g., ₦5,000,000"
            type="text"
          />
        </div>

        <div>
          <Label htmlFor="dueDate">Due Date *</Label>
          <Input 
            type="date"
            {...form.register('dueDate', { required: true })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description/Notes</Label>
        <Textarea 
          {...form.register('description')}
          placeholder="Additional details about this fee..."
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
          <Receipt className="h-4 w-4 mr-2" />
          Record Fee
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
