
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Handshake } from 'lucide-react';

interface AllocateUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const mockProjects = [
  { id: 'project1', name: 'Victoria Gardens' },
  { id: 'project2', name: 'Emerald Heights' },
  { id: 'project3', name: 'Golden View' },
  { id: 'project4', name: 'Ocean Breeze' }
];

const mockAvailableUnits = [
  { id: 'unit1', name: 'Block A - Plot 25', project: 'Victoria Gardens', price: 25000000 },
  { id: 'unit2', name: 'Block B - Plot 18', project: 'Emerald Heights', price: 30000000 },
  { id: 'unit3', name: 'Block C - Plot 22', project: 'Golden View', price: 22000000 },
  { id: 'unit4', name: 'Block A - Plot 35', project: 'Ocean Breeze', price: 28000000 }
];

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com', phone: '+234 801 234 5678' },
  { id: 'client2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+234 802 345 6789' },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com', phone: '+234 803 456 7890' },
  { id: 'client4', name: 'Alice Cooper', email: 'alice@example.com', phone: '+234 804 567 8901' }
];

const mockMarketers = [
  { id: 'marketer1', name: 'Jane Smith' },
  { id: 'marketer2', name: 'Mike Davis' },
  { id: 'marketer3', name: 'Sarah Johnson' },
  { id: 'marketer4', name: 'Tom Wilson' }
];

export function AllocateUnitModal({ isOpen, onClose, onSubmit }: AllocateUnitModalProps) {
  const form = useForm({
    defaultValues: {
      clientId: '',
      unitId: '',
      marketerId: '',
      allocationType: 'sale',
      allocationDate: new Date().toISOString().split('T')[0],
      notes: ''
    }
  });

  const handleSubmit = (data: any) => {
    console.log('Allocating unit:', data);
    onSubmit(data);
    toast.success('Unit allocated successfully!');
    onClose();
    form.reset();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Handshake className="h-5 w-5 text-blue-600" />
            <span>Allocate Unit to Client</span>
          </DialogTitle>
          <DialogDescription>
            Assign an available unit to a client
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
                        <div className="text-xs text-gray-500">{client.phone}</div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <Label>Allocation Type *</Label>
              <Select onValueChange={(value) => form.setValue('allocationType', value)} defaultValue="sale">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="reservation">Reservation</SelectItem>
                  <SelectItem value="lease">Lease</SelectItem>
                  <SelectItem value="installment">Installment Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Allocation Date *</Label>
            <Input 
              type="date"
              {...form.register('allocationDate', { required: true })}
            />
          </div>

          <div>
            <Label>Additional Notes</Label>
            <Textarea 
              {...form.register('notes')}
              placeholder="Any additional notes about this allocation..."
              rows={3}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This allocation will update the unit status and create records in the 
              client profile. Commission calculations will be processed if a marketer is assigned.
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Allocate Unit
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
