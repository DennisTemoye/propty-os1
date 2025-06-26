
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DollarSign } from 'lucide-react';

interface RecordSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const mockProjects = [
  { id: 'project1', name: 'Victoria Gardens', status: 'available' },
  { id: 'project2', name: 'Emerald Heights', status: 'available' },
  { id: 'project3', name: 'Golden View', status: 'development' },
  { id: 'project4', name: 'Ocean Breeze', status: 'pre_launch' }
];

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com' },
  { id: 'client2', name: 'Sarah Johnson', email: 'sarah@example.com' },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com' },
  { id: 'client4', name: 'Alice Cooper', email: 'alice@example.com' }
];

const mockMarketers = [
  { id: 'marketer1', name: 'Jane Smith' },
  { id: 'marketer2', name: 'Mike Davis' },
  { id: 'marketer3', name: 'Sarah Johnson' },
  { id: 'marketer4', name: 'Tom Wilson' }
];

export function RecordSaleModal({ isOpen, onClose, onSubmit }: RecordSaleModalProps) {
  const form = useForm({
    defaultValues: {
      clientId: '',
      projectId: '',
      saleType: 'pre_allocation',
      unitNumber: '',
      saleAmount: '',
      initialPayment: '',
      marketerId: '',
      saleDate: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      notes: ''
    }
  });

  const saleType = form.watch('saleType');
  const selectedProject = mockProjects.find(p => p.id === form.watch('projectId'));

  const handleSubmit = (data: any) => {
    console.log('Recording sale:', data);
    onSubmit(data);
    toast.success('Sale recorded successfully!');
    onClose();
    form.reset();
  };

  const getSaleTypeDescription = (type: string) => {
    switch (type) {
      case 'pre_allocation':
        return 'Sale documented before unit allocation (pre-sales, development phase)';
      case 'with_allocation':
        return 'Sale with immediate unit allocation';
      default:
        return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Record Property Sale</span>
          </DialogTitle>
          <DialogDescription>
            Document a property sale transaction with flexible allocation timing
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{project.status.replace('_', ' ')}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Sale Type *</Label>
            <Select onValueChange={(value) => form.setValue('saleType', value)} defaultValue="pre_allocation">
              <SelectTrigger>
                <SelectValue placeholder="Select sale type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pre_allocation">Pre-Allocation Sale</SelectItem>
                <SelectItem value="with_allocation">Sale with Allocation</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">{getSaleTypeDescription(saleType)}</p>
          </div>

          {saleType === 'with_allocation' && (
            <div>
              <Label>Unit Number *</Label>
              <Input 
                {...form.register('unitNumber', { required: saleType === 'with_allocation' })}
                placeholder="e.g., Block A - Plot 15"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Sale Amount (₦) *</Label>
              <Input 
                type="number"
                {...form.register('saleAmount', { required: true })}
                placeholder="e.g., 25000000"
              />
            </div>

            <div>
              <Label>Initial Payment (₦) *</Label>
              <Input 
                type="number"
                {...form.register('initialPayment', { required: true })}
                placeholder="e.g., 5000000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label>Payment Method</Label>
              <Select onValueChange={(value) => form.setValue('paymentMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="mortgage">Mortgage</SelectItem>
                  <SelectItem value="installment">Installment Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Sale Date *</Label>
            <Input 
              type="date"
              {...form.register('saleDate', { required: true })}
            />
          </div>

          <div>
            <Label>Additional Notes</Label>
            <Textarea 
              {...form.register('notes')}
              placeholder="Any additional notes about this sale..."
              rows={3}
            />
          </div>

          <div className={`p-4 rounded-lg border ${saleType === 'pre_allocation' ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'}`}>
            <p className={`text-sm ${saleType === 'pre_allocation' ? 'text-blue-800' : 'text-green-800'}`}>
              <strong>Note:</strong> {saleType === 'pre_allocation' 
                ? 'This sale will be recorded for future allocation. The client will appear in pending allocations for the allocation team to process when units become available.'
                : 'This sale will be recorded with immediate allocation. The unit will be assigned to the client and commission calculations will be processed.'
              }
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Record Sale
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
