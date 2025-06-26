
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DollarSign, AlertCircle } from 'lucide-react';

interface RecordSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const mockProjects = [
  { id: 'project1', name: 'Victoria Gardens', availableUnits: 25 },
  { id: 'project2', name: 'Emerald Heights', availableUnits: 18 },
  { id: 'project3', name: 'Golden View', availableUnits: 32 },
  { id: 'project4', name: 'Ocean Breeze', availableUnits: 15 }
];

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com', crmStatus: 'qualified' },
  { id: 'client2', name: 'Sarah Johnson', email: 'sarah@example.com', crmStatus: 'lead' },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com', crmStatus: 'prospect' },
  { id: 'client4', name: 'Alice Cooper', email: 'alice@example.com', crmStatus: 'customer' }
];

const mockUnits = [
  { id: 'unit1', number: 'Block A - Plot 01', projectId: 'project1', status: 'available' },
  { id: 'unit2', number: 'Block A - Plot 02', projectId: 'project1', status: 'available' },
  { id: 'unit3', number: 'Block B - Plot 05', projectId: 'project2', status: 'available' }
];

export function RecordSaleModal({ isOpen, onClose, onSubmit }: RecordSaleModalProps) {
  const [saleType, setSaleType] = useState('pre-allocation');
  const form = useForm({
    defaultValues: {
      clientId: '',
      projectId: '',
      unitId: '',
      saleAmount: '',
      initialPayment: '',
      saleDate: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      notes: '',
      saleType: 'pre-allocation'
    }
  });

  const selectedProject = form.watch('projectId');
  const availableUnits = mockUnits.filter(unit => unit.projectId === selectedProject);

  const handleSubmit = (data: any) => {
    console.log('Recording sale with type:', saleType, data);
    
    const saleData = {
      ...data,
      saleType,
      recordedAt: new Date().toISOString(),
      recordedBy: 'Current User' // This would come from auth context
    };

    // Sync with relevant modules based on sale type
    if (saleType === 'pre-allocation') {
      // Update CRM status to customer
      // Create pending allocation record
      console.log('Creating pre-allocation sale - will update CRM and create allocation queue');
    } else {
      // Update unit status immediately
      // Update client record with allocation
      console.log('Creating post-allocation sale - immediate unit assignment');
    }

    onSubmit(saleData);
    toast.success('Sale recorded successfully!');
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Record New Sale</span>
          </DialogTitle>
          <DialogDescription>
            Record a property sale and manage allocation workflow
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Sale Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Sale Type *</Label>
            <RadioGroup value={saleType} onValueChange={setSaleType} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                <RadioGroupItem value="pre-allocation" id="pre-allocation" />
                <div className="flex-1">
                  <Label htmlFor="pre-allocation" className="font-medium cursor-pointer">Pre-Allocation Sale</Label>
                  <p className="text-sm text-gray-600">Client commits to purchase before unit is assigned</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                <RadioGroupItem value="post-allocation" id="post-allocation" />
                <div className="flex-1">
                  <Label htmlFor="post-allocation" className="font-medium cursor-pointer">Post-Allocation Sale</Label>
                  <p className="text-sm text-gray-600">Client purchases a specific assigned unit</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Client and Project Selection */}
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
                        <div className="text-xs text-gray-500">{client.email} • {client.crmStatus}</div>
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
                        <div className="text-xs text-gray-500">{project.availableUnits} units available</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Unit Selection - Only for Post-Allocation */}
          {saleType === 'post-allocation' && (
            <div>
              <Label>Specific Unit *</Label>
              <Select onValueChange={(value) => form.setValue('unitId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specific unit" />
                </SelectTrigger>
                <SelectContent>
                  {availableUnits.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Sale Details */}
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
              <Label>Sale Date *</Label>
              <Input 
                type="date"
                {...form.register('saleDate', { required: true })}
              />
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
            <Label>Additional Notes</Label>
            <Textarea 
              {...form.register('notes')}
              placeholder="Any additional notes about this sale..."
              rows={3}
            />
          </div>

          {/* Information Panel */}
          <div className={`p-4 rounded-lg border ${saleType === 'pre-allocation' ? 'border-blue-200 bg-blue-50' : 'border-purple-200 bg-purple-50'}`}>
            <div className="flex items-start space-x-2">
              <AlertCircle className={`h-5 w-5 mt-0.5 ${saleType === 'pre-allocation' ? 'text-blue-600' : 'text-purple-600'}`} />
              <div>
                <p className={`text-sm font-medium ${saleType === 'pre-allocation' ? 'text-blue-800' : 'text-purple-800'}`}>
                  {saleType === 'pre-allocation' ? 'Pre-Allocation Sale Process:' : 'Post-Allocation Sale Process:'}
                </p>
                <p className={`text-sm mt-1 ${saleType === 'pre-allocation' ? 'text-blue-700' : 'text-purple-700'}`}>
                  {saleType === 'pre-allocation' 
                    ? 'Client will be moved to customer status in CRM. Unit allocation will be processed separately based on availability and preferences.'
                    : 'The selected unit will be immediately allocated to the client and marked as sold. Client status will be updated accordingly.'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              {saleType === 'pre-allocation' ? 'Record Sale & Queue Allocation' : 'Record Sale & Allocate Unit'}
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
