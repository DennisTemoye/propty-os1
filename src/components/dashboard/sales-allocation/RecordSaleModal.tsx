
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
import { DollarSign, Building, AlertCircle } from 'lucide-react';

interface RecordSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const mockProjects = [
  { id: 'project1', name: 'Victoria Gardens', status: 'active', phase: 'Phase 2' },
  { id: 'project2', name: 'Emerald Heights', status: 'pre-sale', phase: 'Phase 1' },
  { id: 'project3', name: 'Golden View', status: 'development', phase: 'Foundation' },
  { id: 'project4', name: 'Ocean Breeze', status: 'active', phase: 'Phase 3' }
];

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com', phone: '+234 801 234 5678' },
  { id: 'client2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+234 802 345 6789' },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com', phone: '+234 803 456 7890' },
  { id: 'client4', name: 'Alice Cooper', email: 'alice@example.com', phone: '+234 804 567 8901' }
];

const mockMarketers = [
  { id: 'marketer1', name: 'Jane Smith', team: 'Sales Team A' },
  { id: 'marketer2', name: 'Mike Davis', team: 'Sales Team B' },
  { id: 'marketer3', name: 'Sarah Johnson', team: 'Sales Team A' },
  { id: 'marketer4', name: 'Tom Wilson', team: 'Sales Team C' }
];

export function RecordSaleModal({ isOpen, onClose, onSubmit }: RecordSaleModalProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const form = useForm({
    defaultValues: {
      clientId: '',
      projectId: '',
      saleType: 'pre-allocation', // pre-allocation, with-allocation
      unitSpecification: '',
      saleAmount: '',
      initialPayment: '',
      marketerId: '',
      saleDate: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      notes: '',
      commitmentLevel: 'interested' // interested, committed, paid
    }
  });

  const saleType = form.watch('saleType');
  const projectId = form.watch('projectId');

  const handleProjectChange = (value: string) => {
    const project = mockProjects.find(p => p.id === value);
    setSelectedProject(project);
    form.setValue('projectId', value);
  };

  const handleSubmit = (data: any) => {
    console.log('Recording sale:', data);
    
    const saleData = {
      ...data,
      project: selectedProject,
      status: data.saleType === 'pre-allocation' ? 'pending_allocation' : 'allocated',
      createdAt: new Date().toISOString(),
      salesTeam: 'Sales Department'
    };

    onSubmit(saleData);
    toast.success('Sale recorded successfully!');
    onClose();
    form.reset();
  };

  const getSaleTypeInfo = (type: string) => {
    switch (type) {
      case 'pre-allocation':
        return {
          title: 'Pre-Allocation Sale',
          description: 'Sale documented for future allocation when units are available',
          color: 'bg-blue-50 border-blue-200 text-blue-800'
        };
      case 'with-allocation':
        return {
          title: 'Sale with Immediate Allocation',
          description: 'Sale with specific unit assignment',
          color: 'bg-green-50 border-green-200 text-green-800'
        };
      default:
        return { title: '', description: '', color: '' };
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Record Property Sale</span>
          </DialogTitle>
          <DialogDescription>
            Document a property sale transaction. Allocation can be processed separately by the allocation team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Sale Type Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Sale Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Sale Type *</Label>
                <Select onValueChange={(value) => form.setValue('saleType', value)} defaultValue="pre-allocation">
                  <SelectTrigger>
                    <SelectValue placeholder="Select sale type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-allocation">Pre-Allocation Sale</SelectItem>
                    <SelectItem value="with-allocation">Sale with Allocation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {saleType && (
                <div className={`p-4 rounded-lg border ${getSaleTypeInfo(saleType).color}`}>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 mt-0.5" />
                    <div>
                      <div className="font-medium">{getSaleTypeInfo(saleType).title}</div>
                      <div className="text-sm">{getSaleTypeInfo(saleType).description}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Client and Project Information */}
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
              <Select onValueChange={handleProjectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {mockProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-xs text-gray-500">{project.phase}</div>
                        </div>
                        <Badge 
                          className={`ml-2 text-xs ${
                            project.status === 'active' ? 'bg-green-100 text-green-800' :
                            project.status === 'pre-sale' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Unit Specification */}
          <div>
            <Label>Unit Specification *</Label>
            <Input 
              {...form.register('unitSpecification', { required: true })}
              placeholder={saleType === 'pre-allocation' ? 
                'e.g., 3-bedroom flat, duplex, specific block preference' : 
                'e.g., Block A - Plot 15'
              }
            />
            <p className="text-sm text-gray-500 mt-1">
              {saleType === 'pre-allocation' ? 
                'Describe preferred unit type or specifications for future allocation' :
                'Enter specific unit number if already allocated'
              }
            </p>
          </div>

          {/* Financial Information */}
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

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Commitment Level *</Label>
              <Select onValueChange={(value) => form.setValue('commitmentLevel', value)} defaultValue="interested">
                <SelectTrigger>
                  <SelectValue placeholder="Select commitment level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interested">Interested</SelectItem>
                  <SelectItem value="committed">Committed</SelectItem>
                  <SelectItem value="paid">Payment Made</SelectItem>
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
                      <div>
                        <div className="font-medium">{marketer.name}</div>
                        <div className="text-xs text-gray-500">{marketer.team}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
