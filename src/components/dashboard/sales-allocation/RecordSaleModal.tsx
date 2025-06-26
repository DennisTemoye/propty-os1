
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DollarSign, Handshake, AlertCircle } from 'lucide-react';

interface RecordSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const mockProjects = [
  { id: 'project1', name: 'Victoria Gardens' },
  { id: 'project2', name: 'Emerald Heights' },
  { id: 'project3', name: 'Golden View' }
];

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com' },
  { id: 'client2', name: 'Sarah Johnson', email: 'sarah@example.com' },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com' }
];

export function RecordSaleModal({ isOpen, onClose, onSubmit }: RecordSaleModalProps) {
  const [includeAllocation, setIncludeAllocation] = useState(false);
  
  const form = useForm({
    defaultValues: {
      clientId: '',
      projectId: '',
      unitNumber: '',
      saleAmount: '',
      initialPayment: '',
      saleDate: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      notes: ''
    }
  });

  const handleSubmit = (data: any) => {
    const saleData = {
      ...data,
      salesType: includeAllocation ? 'sale_with_allocation' : 'sale_only',
      includeAllocation,
      timestamp: new Date().toISOString()
    };
    
    console.log('Recording sale:', saleData);
    onSubmit(saleData);
    
    toast.success(
      includeAllocation 
        ? 'Sale recorded and allocation created!' 
        : 'Sale recorded successfully!'
    );
    
    onClose();
    form.reset();
    setIncludeAllocation(false);
  };

  const handleAllocationToggle = (checked: boolean | "indeterminate") => {
    setIncludeAllocation(checked === true);
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
            Record a property sale with optional allocation workflow
          </DialogDescription>
        </DialogHeader>

        {/* Sales Type Selection */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Sales Type</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeAllocation"
                checked={includeAllocation}
                onCheckedChange={handleAllocationToggle}
              />
              <Label htmlFor="includeAllocation" className="flex items-center space-x-2">
                <Handshake className="h-4 w-4 text-blue-600" />
                <span>Include allocation with this sale</span>
              </Label>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {includeAllocation 
                ? 'This sale will create an immediate allocation to the client'
                : 'This sale will be recorded without creating an allocation'
              }
            </p>
          </CardContent>
        </Card>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Basic Sale Information */}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Unit/Property *</Label>
              <Input 
                {...form.register('unitNumber', { required: true })}
                placeholder="e.g., Block A - Plot 15"
              />
            </div>

            <div>
              <Label>Sale Amount (₦) *</Label>
              <Input 
                type="number"
                {...form.register('saleAmount', { required: true })}
                placeholder="e.g., 25000000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Initial Payment (₦) *</Label>
              <Input 
                type="number"
                {...form.register('initialPayment', { required: true })}
                placeholder="e.g., 5000000"
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

          {/* Information Cards */}
          <Card className={`${includeAllocation ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                {includeAllocation ? (
                  <Handshake className="h-5 w-5 text-blue-600 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-medium mb-1">
                    {includeAllocation ? 'Sale with Allocation' : 'Sale Only'}
                  </p>
                  <p className="text-sm text-gray-700">
                    {includeAllocation 
                      ? 'This sale will automatically create an allocation record, update unit status, and sync with the accounting module.'
                      : 'This sale will be recorded in the system without creating an allocation. You can create an allocation later using the Allocation Flow.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              {includeAllocation ? 'Record Sale & Allocate' : 'Record Sale'}
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
