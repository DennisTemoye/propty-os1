
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
  type: 'new' | 'reallocate' | 'revoke';
  allocation?: any;
  onSubmit: (data: any) => void;
}

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com', phone: '+234 801 234 5678' },
  { id: 'client2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+234 802 345 6789' },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com', phone: '+234 803 456 7890' },
  { id: 'client4', name: 'Alice Cooper', email: 'alice@example.com', phone: '+234 804 567 8901' }
];

const mockAvailableUnits = [
  { id: 'unit1', name: 'Block A - Plot 25', project: 'Victoria Gardens', price: 25000000 },
  { id: 'unit2', name: 'Block B - Plot 18', project: 'Emerald Heights', price: 30000000 },
  { id: 'unit3', name: 'Block C - Plot 22', project: 'Golden View', price: 22000000 },
  { id: 'unit4', name: 'Block A - Plot 35', project: 'Ocean Breeze', price: 28000000 }
];

const mockAllocatedUnits = [
  {
    id: 1,
    unitId: 'Block A - Plot 02',
    project: 'Victoria Gardens Estate',
    currentClient: 'John Doe',
    currentClientId: 'client1',
    allocationDate: '2024-01-15',
    price: '₦25M',
    status: 'active',
    totalPaid: '₦15M'
  },
  {
    id: 2,
    unitId: 'Block B - Plot 08',
    project: 'Golden View Towers',
    currentClient: 'Jane Williams',
    currentClientId: 'client2',
    allocationDate: '2024-01-10',
    price: '₦30M',
    status: 'active',
    totalPaid: '₦20M'
  }
];

const mockMarketers = [
  { id: 'marketer1', name: 'Jane Smith' },
  { id: 'marketer2', name: 'Mike Davis' },
  { id: 'marketer3', name: 'Sarah Johnson' },
  { id: 'marketer4', name: 'Tom Wilson' }
];

export function AllocationFlowModal({ isOpen, onClose, type, allocation, onSubmit }: AllocationFlowModalProps) {
  const [selectedUnit, setSelectedUnit] = useState<any>(allocation || null);
  const [step, setStep] = useState<'select' | 'form' | 'confirm'>(allocation ? 'form' : 'select');
  
  const form = useForm({
    defaultValues: {
      clientId: '',
      unitId: '',
      newClientId: '',
      marketerId: '',
      allocationDate: new Date().toISOString().split('T')[0],
      reason: '',
      refundType: 'full',
      refundAmount: '',
      notes: ''
    }
  });

  const getModalConfig = () => {
    switch (type) {
      case 'new':
        return {
          title: 'New Allocation',
          icon: Handshake,
          color: 'text-blue-600',
          description: 'Allocate a unit to a client'
        };
      case 'reallocate':
        return {
          title: 'Re-allocate Unit',
          icon: ArrowRight,
          color: 'text-purple-600',
          description: 'Transfer unit to another client'
        };
      case 'revoke':
        return {
          title: 'Revoke Allocation',
          icon: Ban,
          color: 'text-red-600',
          description: 'Cancel allocation and process refund'
        };
    }
  };

  const config = getModalConfig();

  const handleUnitSelect = (unit: any) => {
    setSelectedUnit(unit);
    setStep('form');
  };

  const handleSubmit = (data: any) => {
    const submitData = {
      ...data,
      type,
      selectedUnit,
      timestamp: new Date().toISOString()
    };

    onSubmit(submitData);
    toast.success(`${config.title} processed successfully!`);
    handleClose();
  };

  const handleClose = () => {
    setSelectedUnit(null);
    setStep(allocation ? 'form' : 'select');
    form.reset();
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <config.icon className={`h-5 w-5 ${config.color}`} />
            <span>{config.title}</span>
          </DialogTitle>
          <DialogDescription>
            {config.description}
          </DialogDescription>
        </DialogHeader>

        {/* Unit Selection Step */}
        {step === 'select' && !allocation && (type === 'reallocate' || type === 'revoke') && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Unit to {type === 'reallocate' ? 'Re-allocate' : 'Revoke'}</h3>
            <div className="space-y-3">
              {mockAllocatedUnits.map((unit) => (
                <Card 
                  key={unit.id} 
                  className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${
                    type === 'reallocate' ? 'border-l-purple-500' : 'border-l-red-500'
                  }`}
                  onClick={() => handleUnitSelect(unit)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <Building className="h-4 w-4" />
                          <h4 className="font-semibold">{unit.unitId}</h4>
                          <Badge className="bg-green-100 text-green-800">
                            {unit.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{unit.project}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Client: <strong>{unit.currentClient}</strong></span>
                          <span>Price: {unit.price}</span>
                          <span>Paid: {unit.totalPaid}</span>
                        </div>
                      </div>
                      <Button size="sm" className={type === 'reallocate' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-600 hover:bg-red-700'}>
                        Select
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Form Step */}
        {step === 'form' && (
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Unit Summary for reallocate/revoke */}
            {(type === 'reallocate' || type === 'revoke') && selectedUnit && (
              <Card className="bg-gray-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Selected Unit</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Unit:</span> {selectedUnit.unitId}</div>
                    <div><span className="font-medium">Project:</span> {selectedUnit.project}</div>
                    <div><span className="font-medium">Current Client:</span> {selectedUnit.currentClient}</div>
                    <div><span className="font-medium">Price:</span> {selectedUnit.price}</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* New Allocation Form */}
            {type === 'new' && (
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
                            <div className="text-xs text-green-600">{formatCurrency(unit.price)}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Reallocation Form */}
            {type === 'reallocate' && (
              <div>
                <Label>New Client *</Label>
                <Select onValueChange={(value) => form.setValue('newClientId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new client" />
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
            )}

            {/* Revocation Form */}
            {type === 'revoke' && (
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
                    <Label>Refund Amount (₦)</Label>
                    <Input 
                      {...form.register('refundAmount')}
                      placeholder="e.g., 12000000"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {type !== 'revoke' && (
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
              )}

              <div>
                <Label>{type === 'revoke' ? 'Revocation Date' : 'Allocation Date'} *</Label>
                <Input 
                  type="date"
                  {...form.register('allocationDate', { required: true })}
                />
              </div>
            </div>

            <div>
              <Label>Additional Notes</Label>
              <Textarea 
                {...form.register('notes')}
                placeholder={`Any additional notes about this ${type}...`}
                rows={3}
              />
            </div>

            {/* Warning Messages */}
            <div className={`p-4 rounded-lg border ${
              type === 'revoke' 
                ? 'bg-red-50 border-red-200' 
                : type === 'reallocate' 
                  ? 'bg-purple-50 border-purple-200' 
                  : 'bg-blue-50 border-blue-200'
            }`}>
              <p className={`text-sm ${
                type === 'revoke' 
                  ? 'text-red-800' 
                  : type === 'reallocate' 
                    ? 'text-purple-800' 
                    : 'text-blue-800'
              }`}>
                <strong>{type === 'revoke' ? 'Warning:' : 'Note:'}</strong> {
                  type === 'revoke' 
                    ? 'This will permanently revoke the allocation and mark the unit as available. A refund transaction will be recorded.'
                    : type === 'reallocate'
                      ? 'This will transfer the unit to the new client. All records and commission calculations will be updated.'
                      : 'This allocation will update the unit status and create records in the client profile.'
                }
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="submit" 
                className={`flex-1 ${
                  type === 'revoke' 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : type === 'reallocate' 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {type === 'revoke' ? 'Revoke Allocation' : type === 'reallocate' ? 'Process Re-allocation' : 'Create Allocation'}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
