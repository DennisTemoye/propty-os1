
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Handshake, ArrowRight, Ban, Building, User, AlertTriangle } from 'lucide-react';

interface AllocationFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'new' | 'reallocate' | 'revoke';
  allocation?: any;
  onSubmit: (data: any) => void;
}

const mockAvailableUnits = [
  { id: 'unit1', name: 'Block A - Plot 25', project: 'Victoria Gardens', price: 25000000, status: 'available' },
  { id: 'unit2', name: 'Block B - Plot 18', project: 'Emerald Heights', price: 30000000, status: 'available' },
  { id: 'unit3', name: 'Block C - Plot 22', project: 'Golden View', price: 22000000, status: 'available' }
];

const mockPendingSales = [
  { id: 'sale1', clientName: 'John Doe', project: 'Victoria Gardens', amount: '₦25M', specification: '3-bedroom flat' },
  { id: 'sale2', clientName: 'Sarah Johnson', project: 'Emerald Heights', amount: '₦30M', specification: 'Duplex' }
];

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com' },
  { id: 'client2', name: 'Sarah Johnson', email: 'sarah@example.com' },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com' }
];

export function AllocationFlowModal({ isOpen, onClose, mode, allocation, onSubmit }: AllocationFlowModalProps) {
  const [step, setStep] = useState(1);
  
  const form = useForm({
    defaultValues: {
      clientId: '',
      unitId: '',
      allocationDate: new Date().toISOString().split('T')[0],
      notes: '',
      reason: '',
      refundType: 'full',
      refundAmount: '',
      newClientId: ''
    }
  });

  const handleSubmit = (data: any) => {
    console.log(`Processing ${mode}:`, data);
    
    const actionData = {
      ...data,
      mode,
      allocation,
      timestamp: new Date().toISOString(),
      processedBy: 'Allocation Team'
    };

    onSubmit(actionData);
    
    const successMessages = {
      new: 'Unit allocated successfully!',
      reallocate: 'Unit reallocated successfully!',
      revoke: 'Allocation revoked successfully!'
    };
    
    toast.success(successMessages[mode]);
    onClose();
    form.reset();
    setStep(1);
  };

  const getModalConfig = () => {
    switch (mode) {
      case 'new':
        return {
          title: 'New Unit Allocation',
          icon: Handshake,
          color: 'text-blue-600',
          description: 'Allocate a unit to a client from pending sales or new allocation'
        };
      case 'reallocate':
        return {
          title: 'Reallocate Unit',
          icon: ArrowRight,
          color: 'text-purple-600',
          description: 'Transfer unit allocation from one client to another'
        };
      case 'revoke':
        return {
          title: 'Revoke Allocation',
          icon: Ban,
          color: 'text-red-600',
          description: 'Cancel allocation and process refund'
        };
      default:
        return { title: '', icon: Handshake, color: '', description: '' };
    }
  };

  const config = getModalConfig();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <config.icon className={`h-5 w-5 ${config.color}`} />
            <span>{config.title}</span>
          </DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {mode === 'new' && (
            <>
              {/* Step 1: Choose allocation source */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Choose Allocation Source</h3>
                  
                  <div className="space-y-3">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                          onClick={() => setStep(2)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">From Pending Sales</h4>
                            <p className="text-sm text-gray-600">Allocate to clients with recorded sales</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">{mockPendingSales.length} pending</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-green-500"
                          onClick={() => setStep(3)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Direct Allocation</h4>
                            <p className="text-sm text-gray-600">Allocate directly to any client</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Step 2: Pending sales allocation */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Select Pending Sale</h3>
                    <Button variant="outline" size="sm" onClick={() => setStep(1)}>Back</Button>
                  </div>
                  
                  <div className="space-y-3">
                    {mockPendingSales.map((sale) => (
                      <Card key={sale.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{sale.clientName}</h4>
                              <p className="text-sm text-gray-600">{sale.project} - {sale.specification}</p>
                              <p className="text-sm font-medium text-green-600">{sale.amount}</p>
                            </div>
                            <Button size="sm" onClick={() => {
                              form.setValue('clientId', sale.id);
                              setStep(4);
                            }}>
                              Select
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Direct allocation */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Select Client</h3>
                    <Button variant="outline" size="sm" onClick={() => setStep(1)}>Back</Button>
                  </div>
                  
                  <div>
                    <Label>Client *</Label>
                    <Select onValueChange={(value) => {
                      form.setValue('clientId', value);
                      setStep(4);
                    }}>
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
                </div>
              )}

              {/* Step 4: Unit selection */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Select Available Unit</h3>
                    <Button variant="outline" size="sm" onClick={() => setStep(step === 4 ? (form.getValues('clientId') ? 3 : 2) : step - 1)}>Back</Button>
                  </div>
                  
                  <div>
                    <Label>Available Unit *</Label>
                    <Select onValueChange={(value) => form.setValue('unitId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockAvailableUnits.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            <div>
                              <div className="font-medium">{unit.name}</div>
                              <div className="text-xs text-gray-500">{unit.project}</div>
                              <div className="text-xs text-green-600">₦{unit.price.toLocaleString()}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Allocation Date *</Label>
                    <Input 
                      type="date"
                      {...form.register('allocationDate', { required: true })}
                    />
                  </div>

                  <div>
                    <Label>Notes</Label>
                    <Textarea 
                      {...form.register('notes')}
                      placeholder="Any additional notes about this allocation..."
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {mode === 'reallocate' && (
            <div className="space-y-4">
              <div>
                <Label>New Client *</Label>
                <Select onValueChange={(value) => form.setValue('newClientId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Reallocation Date *</Label>
                <Input 
                  type="date"
                  {...form.register('allocationDate', { required: true })}
                />
              </div>

              <div>
                <Label>Reason</Label>
                <Select onValueChange={(value) => form.setValue('reason', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resale">Unit Resale</SelectItem>
                    <SelectItem value="client_transfer">Client Transfer</SelectItem>
                    <SelectItem value="administrative">Administrative Change</SelectItem>
                    <SelectItem value="payment_default">Payment Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea 
                  {...form.register('notes')}
                  placeholder="Additional notes about this reallocation..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {mode === 'revoke' && (
            <div className="space-y-4">
              <div>
                <Label>Reason for Revocation *</Label>
                <Textarea 
                  {...form.register('reason', { required: true })}
                  placeholder="Provide a detailed reason for revoking this allocation..."
                />
              </div>

              <div>
                <Label>Refund Option *</Label>
                <Select onValueChange={(value) => form.setValue('refundType', value)} defaultValue="full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select refund type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Refund</SelectItem>
                    <SelectItem value="partial">Partial Refund</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {form.watch('refundType') === 'partial' && (
                <div>
                  <Label>Refund Amount</Label>
                  <Input 
                    {...form.register('refundAmount')}
                    placeholder="e.g., ₦12,000,000"
                  />
                </div>
              )}

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <strong>Warning:</strong> This will permanently revoke the allocation and mark the unit as available. 
                    A refund transaction will be recorded in the accounting module.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          {(mode !== 'new' || step === 4) && (
            <div className="flex gap-2 pt-4">
              <Button 
                type="submit" 
                className={`flex-1 ${
                  mode === 'new' ? 'bg-blue-600 hover:bg-blue-700' :
                  mode === 'reallocate' ? 'bg-purple-600 hover:bg-purple-700' :
                  'bg-red-600 hover:bg-red-700'
                }`}
              >
                {mode === 'new' ? 'Allocate Unit' :
                 mode === 'reallocate' ? 'Reallocate Unit' :
                 'Revoke Allocation'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
