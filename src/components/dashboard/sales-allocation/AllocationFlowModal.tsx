
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Handshake, ArrowRight, Ban } from 'lucide-react';

interface AllocationFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const mockProjects = [
  { id: 'project1', name: 'Victoria Gardens', availableUnits: 12 },
  { id: 'project2', name: 'Emerald Heights', availableUnits: 8 },
  { id: 'project3', name: 'Golden View', availableUnits: 15 }
];

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com' },
  { id: 'client2', name: 'Sarah Johnson', email: 'sarah@example.com' },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com' }
];

const mockAllocatedUnits = [
  { id: 'alloc1', unit: 'Block A - Plot 02', client: 'John Doe', project: 'Victoria Gardens' },
  { id: 'alloc2', unit: 'Block B - Plot 08', client: 'Jane Williams', project: 'Golden View' }
];

export function AllocationFlowModal({ isOpen, onClose, onSubmit }: AllocationFlowModalProps) {
  const [allocationType, setAllocationType] = useState<'new' | 'reallocation' | 'revoke'>('new');
  
  const form = useForm({
    defaultValues: {
      clientId: '',
      projectId: '',
      unitNumber: '',
      allocationDate: new Date().toISOString().split('T')[0],
      notes: '',
      // Reallocation specific
      existingAllocationId: '',
      newClientId: '',
      reason: '',
      // Revocation specific
      refundType: 'full',
      refundAmount: ''
    }
  });

  const handleSubmit = (data: any) => {
    const submissionData = {
      ...data,
      allocationType,
      timestamp: new Date().toISOString()
    };
    
    onSubmit(submissionData);
    
    const messages = {
      new: 'New allocation created successfully!',
      reallocation: 'Unit reallocated successfully!',
      revoke: 'Allocation revoked successfully!'
    };
    
    toast.success(messages[allocationType]);
    onClose();
    form.reset();
  };

  const getIcon = () => {
    switch (allocationType) {
      case 'new': return <Handshake className="h-5 w-5 text-blue-600" />;
      case 'reallocation': return <ArrowRight className="h-5 w-5 text-purple-600" />;
      case 'revoke': return <Ban className="h-5 w-5 text-red-600" />;
    }
  };

  const getTitle = () => {
    switch (allocationType) {
      case 'new': return 'New Allocation';
      case 'reallocation': return 'Reallocate Unit';
      case 'revoke': return 'Revoke Allocation';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getIcon()}
            <span>{getTitle()}</span>
          </DialogTitle>
          <DialogDescription>
            Choose allocation type and complete the workflow
          </DialogDescription>
        </DialogHeader>

        {/* Allocation Type Selection */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Button
            variant={allocationType === 'new' ? 'default' : 'outline'}
            onClick={() => setAllocationType('new')}
            className="flex items-center space-x-2"
          >
            <Handshake className="h-4 w-4" />
            <span>New</span>
          </Button>
          <Button
            variant={allocationType === 'reallocation' ? 'default' : 'outline'}
            onClick={() => setAllocationType('reallocation')}
            className="flex items-center space-x-2"
          >
            <ArrowRight className="h-4 w-4" />
            <span>Reallocate</span>
          </Button>
          <Button
            variant={allocationType === 'revoke' ? 'default' : 'outline'}
            onClick={() => setAllocationType('revoke')}
            className="flex items-center space-x-2"
          >
            <Ban className="h-4 w-4" />
            <span>Revoke</span>
          </Button>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* New Allocation Form */}
          {allocationType === 'new' && (
            <>
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
                            <div className="text-xs text-green-600">{project.availableUnits} units available</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Unit Number *</Label>
                <Input 
                  {...form.register('unitNumber', { required: true })}
                  placeholder="e.g., Block A - Plot 15"
                />
              </div>
            </>
          )}

          {/* Reallocation Form */}
          {allocationType === 'reallocation' && (
            <>
              <div>
                <Label>Existing Allocation *</Label>
                <Select onValueChange={(value) => form.setValue('existingAllocationId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select allocation to transfer" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAllocatedUnits.map((allocation) => (
                      <SelectItem key={allocation.id} value={allocation.id}>
                        <div>
                          <div className="font-medium">{allocation.unit}</div>
                          <div className="text-xs text-gray-500">
                            {allocation.client} - {allocation.project}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                <Label>Reallocation Reason</Label>
                <Select onValueChange={(value) => form.setValue('reason', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resale">Unit Resale</SelectItem>
                    <SelectItem value="transfer">Client Transfer</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                    <SelectItem value="default">Payment Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Revocation Form */}
          {allocationType === 'revoke' && (
            <>
              <div>
                <Label>Allocation to Revoke *</Label>
                <Select onValueChange={(value) => form.setValue('existingAllocationId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select allocation to revoke" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAllocatedUnits.map((allocation) => (
                      <SelectItem key={allocation.id} value={allocation.id}>
                        <div>
                          <div className="font-medium">{allocation.unit}</div>
                          <div className="text-xs text-gray-500">
                            {allocation.client} - {allocation.project}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Refund Type *</Label>
                  <Select onValueChange={(value) => form.setValue('refundType', value)} defaultValue="full">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Refund</SelectItem>
                      <SelectItem value="partial">Partial Refund</SelectItem>
                      <SelectItem value="none">No Refund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {form.watch('refundType') === 'partial' && (
                  <div>
                    <Label>Refund Amount</Label>
                    <Input 
                      type="number"
                      {...form.register('refundAmount')}
                      placeholder="Enter amount"
                    />
                  </div>
                )}
              </div>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <p className="text-sm text-red-800">
                    <strong>Warning:</strong> This action will permanently revoke the allocation 
                    and process refunds according to company policy.
                  </p>
                </CardContent>
              </Card>
            </>
          )}

          {/* Common Fields */}
          <div>
            <Label>Date</Label>
            <Input 
              type="date"
              {...form.register('allocationDate', { required: true })}
            />
          </div>

          <div>
            <Label>Additional Notes</Label>
            <Textarea 
              {...form.register('notes')}
              placeholder="Enter any additional notes..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {allocationType === 'new' && 'Create Allocation'}
              {allocationType === 'reallocation' && 'Process Reallocation'}
              {allocationType === 'revoke' && 'Revoke Allocation'}
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
