
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
  { id: 'project1', name: 'Victoria Gardens', availableUnits: 15 },
  { id: 'project2', name: 'Emerald Heights', availableUnits: 8 },
  { id: 'project3', name: 'Golden View', availableUnits: 12 },
  { id: 'project4', name: 'Ocean Breeze', availableUnits: 6 }
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
  const [saleType, setSaleType] = useState<'sale_only' | 'sale_with_allocation'>('sale_only');
  const [createAllocation, setCreateAllocation] = useState(false);
  
  const form = useForm({
    defaultValues: {
      clientId: '',
      projectId: '',
      unitNumber: '',
      saleAmount: '',
      initialPayment: '',
      marketerId: '',
      saleDate: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      notes: '',
      // Allocation fields
      allocationType: 'sale',
      allocationDate: new Date().toISOString().split('T')[0]
    }
  });

  const handleSubmit = (data: any) => {
    const saleData = {
      ...data,
      saleType,
      createAllocation,
      allocationData: createAllocation ? {
        clientId: data.clientId,
        projectId: data.projectId,
        unitNumber: data.unitNumber,
        allocationType: data.allocationType,
        allocationDate: data.allocationDate,
        marketerId: data.marketerId
      } : null,
      timestamp: new Date().toISOString()
    };

    console.log('Recording sale with type:', saleType, saleData);
    onSubmit(saleData);
    toast.success(createAllocation ? 'Sale recorded and unit allocated!' : 'Sale recorded successfully!');
    onClose();
    form.reset();
    setCreateAllocation(false);
    setSaleType('sale_only');
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
            Record a property sale transaction with optional unit allocation
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Sale Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sale Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    saleType === 'sale_only' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSaleType('sale_only');
                    setCreateAllocation(false);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Sale Only</h4>
                      <p className="text-sm text-gray-600">Record sale without immediate allocation</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    saleType === 'sale_with_allocation' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSaleType('sale_with_allocation');
                    setCreateAllocation(true);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Handshake className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Sale + Allocation</h4>
                      <p className="text-sm text-gray-600">Record sale and allocate unit immediately</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sale Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sale Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                            <div className="text-xs text-gray-500">{project.availableUnits} units available</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

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
                <Label>Marketer</Label>
                <Select onValueChange={(value) => form.setValue('marketerId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select marketer (optional)" />
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
            </CardContent>
          </Card>

          {/* Allocation Details - Only shown when sale_with_allocation is selected */}
          {saleType === 'sale_with_allocation' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center space-x-2">
                  <Handshake className="h-4 w-4" />
                  <span>Allocation Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Unit Number *</Label>
                    <Input 
                      {...form.register('unitNumber')}
                      placeholder="e.g., Block A - Plot 15"
                    />
                  </div>

                  <div>
                    <Label>Allocation Type</Label>
                    <Select onValueChange={(value) => form.setValue('allocationType', value)} defaultValue="sale">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">Sale</SelectItem>
                        <SelectItem value="reservation">Reservation</SelectItem>
                        <SelectItem value="installment">Installment Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Allocation Date</Label>
                  <Input 
                    type="date"
                    {...form.register('allocationDate')}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div>
            <Label>Additional Notes</Label>
            <Textarea 
              {...form.register('notes')}
              placeholder="Any additional notes about this sale..."
              rows={3}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Integration Notes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Sale will be recorded in accounting module</li>
                  <li>Commission calculations will be updated</li>
                  <li>Client payment history will be updated</li>
                  {saleType === 'sale_with_allocation' && (
                    <li>Unit status will be updated and allocation created</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              {saleType === 'sale_with_allocation' ? 'Record Sale & Allocate' : 'Record Sale'}
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
