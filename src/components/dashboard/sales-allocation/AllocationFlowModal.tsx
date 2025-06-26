
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Users, ArrowRight, Ban, Building } from 'lucide-react';

interface AllocationFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'new' | 'reallocation' | 'revoke';
  allocation?: any;
  onSubmit: (data: any) => void;
}

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com', hasSale: true },
  { id: 'client2', name: 'Sarah Johnson', email: 'sarah@example.com', hasSale: true },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com', hasSale: false }
];

const mockUnits = [
  { id: 'unit1', name: 'Block A - Plot 15', project: 'Victoria Gardens', status: 'available' },
  { id: 'unit2', name: 'Block B - Plot 8', project: 'Emerald Heights', status: 'available' },
  { id: 'unit3', name: 'Block C - Plot 22', project: 'Golden View', status: 'allocated' }
];

const mockMarketers = [
  { id: 'marketer1', name: 'Jane Smith' },
  { id: 'marketer2', name: 'Mike Davis' }
];

export function AllocationFlowModal({ isOpen, onClose, type, allocation, onSubmit }: AllocationFlowModalProps) {
  const [allocationType, setAllocationType] = useState('instant');
  
  const form = useForm({
    defaultValues: {
      clientId: allocation?.clientId || '',
      unitId: allocation?.unitId || '',
      marketerId: allocation?.marketerId || '',
      allocationDate: new Date().toISOString().split('T')[0],
      reason: '',
      notes: '',
      refundType: 'full',
      refundAmount: ''
    }
  });

  const getModalConfig = () => {
    switch (type) {
      case 'new':
        return {
          title: 'New Allocation',
          icon: Users,
          color: 'text-blue-600',
          description: 'Allocate a unit to a client'
        };
      case 'reallocation':
        return {
          title: 'Unit Reallocation',
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

  const handleSubmit = (data: any) => {
    const submissionData = {
      ...data,
      type,
      allocationType: type === 'new' ? allocationType : undefined,
      originalAllocation: allocation
    };
    
    onSubmit(submissionData);
    toast.success(`${config.title} processed successfully!`);
    onClose();
    form.reset();
  };

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

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {type === 'new' && (
            <div>
              <Label className="text-base font-medium">Allocation Type</Label>
              <RadioGroup 
                value={allocationType} 
                onValueChange={setAllocationType}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="instant" id="instant" />
                  <Label htmlFor="instant">Instant Allocation</Label>
                  <span className="text-xs text-gray-500">(Immediate allocation)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offer" id="offer" />
                  <Label htmlFor="offer">Sales Offer</Label>
                  <span className="text-xs text-gray-500">(Pending client acceptance)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reservation" id="reservation" />
                  <Label htmlFor="reservation">Reservation</Label>
                  <span className="text-xs text-gray-500">(Reserved for future allocation)</span>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Current Allocation Info for Reallocation/Revoke */}
          {(type === 'reallocation' || type === 'revoke') && allocation && (
            <Card className="bg-gray-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Current Allocation</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Client:</span> {allocation.clientName}</div>
                  <div><span className="font-medium">Unit:</span> {allocation.unit}</div>
                  <div><span className="font-medium">Project:</span> {allocation.projectName}</div>
                  <div><span className="font-medium">Amount:</span> {allocation.amount}</div>
                </div>
              </CardContent>
            </Card>
          )}

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
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-xs text-gray-500">{client.email}</div>
                        </div>
                        {client.hasSale && (
                          <Badge className="bg-green-100 text-green-800 text-xs">Has Sale</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {type !== 'revoke' && (
              <div>
                <Label>Unit *</Label>
                <Select onValueChange={(value) => form.setValue('unitId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUnits.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="font-medium">{unit.name}</div>
                            <div className="text-xs text-gray-500">{unit.project}</div>
                          </div>
                          <Badge className={unit.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {unit.status}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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
              <Label>{type === 'revoke' ? 'Revocation Date' : 'Allocation Date'} *</Label>
              <Input 
                type="date"
                {...form.register('allocationDate', { required: true })}
              />
            </div>
          </div>

          {type === 'reallocation' && (
            <div>
              <Label>Reallocation Reason</Label>
              <Select onValueChange={(value) => form.setValue('reason', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resale">Unit Resale</SelectItem>
                  <SelectItem value="client_transfer">Client Transfer</SelectItem>
                  <SelectItem value="administrative">Administrative Change</SelectItem>
                  <SelectItem value="payment_default">Payment Default</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {type === 'revoke' && (
            <>
              <div>
                <Label>Revocation Reason *</Label>
                <Textarea 
                  {...form.register('reason', { required: true })}
                  placeholder="Provide detailed reason for revocation..."
                />
              </div>
              
              <div>
                <Label>Refund Type</Label>
                <Select onValueChange={(value) => form.setValue('refundType', value)} defaultValue="full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select refund type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Refund</SelectItem>
                    <SelectItem value="partial">Partial Refund</SelectItem>
                    <SelectItem value="none">No Refund</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div>
            <Label>Additional Notes</Label>
            <Textarea 
              {...form.register('notes')}
              placeholder={`Any additional notes about this ${type}...`}
              rows={3}
            />
          </div>

          <div className={`p-4 rounded-lg border ${
            type === 'revoke' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm ${
              type === 'revoke' ? 'text-red-800' : 'text-blue-800'
            }`}>
              <strong>Note:</strong> {
                type === 'revoke' 
                  ? 'This action will permanently revoke the allocation and may trigger a refund process.'
                  : 'This allocation will be sent for approval based on your organization\'s workflow settings.'
              }
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              className={`flex-1 ${
                type === 'revoke' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : type === 'reallocation'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {type === 'revoke' ? 'Revoke Allocation' : type === 'reallocation' ? 'Process Reallocation' : 'Create Allocation'}
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
