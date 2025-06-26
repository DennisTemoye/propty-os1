
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DollarSign } from 'lucide-react';

interface RecordSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const mockProjects = [
  { id: 'project1', name: 'Victoria Gardens', status: 'completed' },
  { id: 'project2', name: 'Emerald Heights', status: 'ongoing' },
  { id: 'project3', name: 'Golden View', status: 'development' },
  { id: 'project4', name: 'Ocean Breeze', status: 'presale' }
];

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com' },
  { id: 'client2', name: 'Sarah Johnson', email: 'sarah@example.com' },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com' }
];

const mockMarketers = [
  { id: 'marketer1', name: 'Jane Smith' },
  { id: 'marketer2', name: 'Mike Davis' },
  { id: 'marketer3', name: 'Sarah Johnson' }
];

export function RecordSaleModal({ isOpen, onClose, onSubmit }: RecordSaleModalProps) {
  const form = useForm({
    defaultValues: {
      clientId: '',
      projectId: '',
      unitNumber: '',
      saleAmount: '',
      initialPayment: '',
      marketerId: '',
      saleDate: new Date().toISOString().split('T')[0],
      salesType: 'pre_allocation',
      paymentMethod: '',
      notes: ''
    }
  });

  const salesType = form.watch('salesType');

  const handleSubmit = (data: any) => {
    console.log('Recording sale:', data);
    onSubmit(data);
    toast.success('Sale recorded successfully!');
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Record New Sale</span>
          </DialogTitle>
          <DialogDescription>
            Document a property sale with appropriate sales type classification
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Sales Type Selection */}
          <div>
            <Label className="text-base font-medium">Sales Type *</Label>
            <RadioGroup 
              value={salesType} 
              onValueChange={(value) => form.setValue('salesType', value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pre_allocation" id="pre_allocation" />
                <Label htmlFor="pre_allocation">Pre-Allocation Sale</Label>
                <span className="text-xs text-gray-500">(Sale without immediate allocation)</span>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="with_allocation" id="with_allocation" />
                <Label htmlFor="with_allocation">Sale with Allocation</Label>
                <span className="text-xs text-gray-500">(Sale with immediate unit assignment)</span>
              </div>
            </RadioGroup>
          </div>

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
                      <div className="flex items-center justify-between w-full">
                        <span>{project.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          project.status === 'completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'development' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {salesType === 'with_allocation' && (
            <div>
              <Label>Unit Number *</Label>
              <Input 
                {...form.register('unitNumber', { required: salesType === 'with_allocation' })}
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
              <Label>Sale Date *</Label>
              <Input 
                type="date"
                {...form.register('saleDate', { required: true })}
              />
            </div>
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

          <div>
            <Label>Additional Notes</Label>
            <Textarea 
              {...form.register('notes')}
              placeholder="Any additional notes about this sale..."
              rows={3}
            />
          </div>

          <div className={`p-4 rounded-lg border ${
            salesType === 'pre_allocation' ? 'bg-purple-50 border-purple-200' : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm ${
              salesType === 'pre_allocation' ? 'text-purple-800' : 'text-blue-800'
            }`}>
              <strong>Note:</strong> {
                salesType === 'pre_allocation' 
                  ? 'This sale will be recorded without immediate allocation. The client will appear in pending allocations for the allocation team to process when ready.'
                  : 'This sale will create an immediate allocation and update unit status. Commission calculations and accounting records will be updated accordingly.'
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
