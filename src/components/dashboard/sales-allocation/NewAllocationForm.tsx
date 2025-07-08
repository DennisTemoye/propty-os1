import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface NewAllocationFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com' },
  { id: 'client2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com' }
];

const mockProjects = [
  { id: 'project1', name: 'Victoria Gardens' },
  { id: 'project2', name: 'Emerald Heights' },
  { id: 'project3', name: 'Golden View' }
];

const mockAvailablePlots = [
  { id: 'plot1', number: 'Block A - Plot 15', project: 'Victoria Gardens', price: '₦25,000,000' },
  { id: 'plot2', number: 'Block B - Plot 22', project: 'Emerald Heights', price: '₦30,000,000' },
  { id: 'plot3', number: 'Block C - Plot 08', project: 'Golden View', price: '₦22,000,000' }
];

const mockMarketers = [
  { id: 'marketer1', name: 'Jane Smith' },
  { id: 'marketer2', name: 'Mike Davis' },
  { id: 'marketer3', name: 'Sarah Johnson' }
];

export function NewAllocationForm({ onSubmit, onCancel }: NewAllocationFormProps) {
  const form = useForm({
    defaultValues: {
      clientId: '',
      projectId: '',
      plotId: '',
      saleAmount: '',
      initialPayment: '',
      marketerId: '',
      allocationMode: 'instant_allocation',
      notes: ''
    }
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    toast.success('Allocation submitted for approval!');
  };

  const selectedProject = form.watch('projectId');
  const availablePlots = mockAvailablePlots.filter(plot => 
    !selectedProject || plot.project === mockProjects.find(p => p.id === selectedProject)?.name
  );

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Client *</Label>
          <Select onValueChange={(value) => form.setValue('clientId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {mockClients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-xs text-gray-500">{client.email}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Project *</Label>
          <Select onValueChange={(value) => form.setValue('projectId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {mockProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Available Plot *</Label>
          <Select onValueChange={(value) => form.setValue('plotId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select plot" />
            </SelectTrigger>
            <SelectContent>
              {availablePlots.map((plot) => (
                <SelectItem key={plot.id} value={plot.id}>
                  <div>
                    <div className="font-medium">{plot.number}</div>
                    <div className="text-xs text-gray-500">{plot.price}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Marketer</Label>
          <Select onValueChange={(value) => form.setValue('marketerId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select marketer" />
            </SelectTrigger>
            <SelectContent>
              {mockMarketers.map((marketer) => (
                <SelectItem key={marketer.id} value={marketer.id}>
                  {marketer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Sale Amount (₦) *</Label>
          <Input 
            type="number"
            {...form.register('saleAmount', { required: true })}
            placeholder="e.g., 25000000"
          />
        </div>

        <div>
          <Label>Initial Payment (₦)</Label>
          <Input 
            type="number"
            {...form.register('initialPayment')}
            placeholder="e.g., 5000000"
          />
        </div>
      </div>

      <div>
        <Label>Allocation Mode *</Label>
        <Select onValueChange={(value) => form.setValue('allocationMode', value)} defaultValue="instant_allocation">
          <SelectTrigger>
            <SelectValue placeholder="Select allocation mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="instant_allocation">Instant Allocation</SelectItem>
            <SelectItem value="sales_offer">Sales Offer First</SelectItem>
            <SelectItem value="reservation">Reservation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Notes</Label>
        <Textarea 
          {...form.register('notes')}
          placeholder="Additional notes or special instructions..."
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Submit for Approval
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}