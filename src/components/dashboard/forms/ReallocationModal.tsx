
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { User, Building, ArrowRight, Calendar, FileText } from 'lucide-react';

interface ReallocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReallocation: (data: any) => void;
}

const mockAllocatedUnits = [
  {
    id: 1,
    unitId: 'Block A - Plot 02',
    project: 'Victoria Gardens Estate',
    currentClient: 'John Doe',
    currentClientId: 'client1',
    allocationDate: '2024-01-15',
    marketer: 'Jane Smith',
    price: '₦25M',
    status: 'active'
  },
  {
    id: 2,
    unitId: 'Block B - Plot 08',
    project: 'Golden View Towers',
    currentClient: 'Jane Williams',
    currentClientId: 'client2',
    allocationDate: '2024-01-10',
    marketer: 'Mike Davis',
    price: '₦30M',
    status: 'active'
  },
  {
    id: 3,
    unitId: 'Block C - Plot 15',
    project: 'Emerald Heights',
    currentClient: 'Robert Brown',
    currentClientId: 'client3',
    allocationDate: '2024-01-20',
    marketer: 'Sarah Johnson',
    price: '₦22M',
    status: 'completed'
  }
];

const mockClients = [
  { id: 'client4', name: 'Alice Cooper', email: 'alice@example.com', phone: '+234 801 999 8888' },
  { id: 'client5', name: 'David Wilson', email: 'david@example.com', phone: '+234 802 777 6666' },
  { id: 'client6', name: 'Emma Thompson', email: 'emma@example.com', phone: '+234 803 555 4444' },
  { id: 'client7', name: 'Michael Johnson', email: 'michael@example.com', phone: '+234 804 333 2222' }
];

const mockMarketers = [
  { id: 'marketer1', name: 'Jane Smith' },
  { id: 'marketer2', name: 'Mike Davis' },
  { id: 'marketer3', name: 'Sarah Johnson' },
  { id: 'marketer4', name: 'Tom Wilson' }
];

export function ReallocationModal({ isOpen, onClose, onReallocation }: ReallocationModalProps) {
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [step, setStep] = useState<'select' | 'form' | 'confirm'>('select');
  
  const form = useForm({
    defaultValues: {
      newClientId: '',
      newMarketerId: '',
      reallocationDate: new Date().toISOString().split('T')[0],
      reason: '',
      notes: ''
    }
  });

  const handleUnitSelect = (unit: any) => {
    setSelectedUnit(unit);
    setStep('form');
  };

  const onSubmit = (data: any) => {
    const newClient = mockClients.find(c => c.id === data.newClientId);
    const newMarketer = mockMarketers.find(m => m.id === data.newMarketerId);
    
    const reallocationData = {
      ...data,
      selectedUnit,
      newClient,
      newMarketer,
      timestamp: new Date().toISOString()
    };
    
    setStep('confirm');
    setTimeout(() => {
      onReallocation(reallocationData);
      toast.success('Unit successfully reallocated!');
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setSelectedUnit(null);
    setStep('select');
    form.reset();
    onClose();
  };

  const handleBack = () => {
    if (step === 'form') {
      setStep('select');
      setSelectedUnit(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5 text-purple-600" />
            <span>Re-allocate Unit</span>
          </DialogTitle>
          <DialogDescription>
            Transfer an allocated unit to a new client while maintaining proper documentation
          </DialogDescription>
        </DialogHeader>

        {step === 'select' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Unit to Re-allocate</h3>
            <div className="space-y-3">
              {mockAllocatedUnits.map((unit) => (
                <Card 
                  key={unit.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-purple-500"
                  onClick={() => handleUnitSelect(unit)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <Building className="h-4 w-4 text-purple-600" />
                          <h4 className="font-semibold">{unit.unitId}</h4>
                          <Badge className={unit.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {unit.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{unit.project}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Current Client: <strong>{unit.currentClient}</strong></span>
                          <span>Marketer: {unit.marketer}</span>
                          <span>Price: {unit.price}</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Select
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'form' && selectedUnit && (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Re-allocation Details</h3>
              <Button variant="outline" onClick={handleBack}>
                Back to Selection
              </Button>
            </div>

            {/* Unit Summary */}
            <Card className="bg-gray-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Unit Being Re-allocated</CardTitle>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">New Client *</label>
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

              <div>
                <label className="text-sm font-medium">New Marketer</label>
                <Select onValueChange={(value) => form.setValue('newMarketerId', value)}>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Re-allocation Date *</label>
                <Input 
                  type="date"
                  {...form.register('reallocationDate', { required: true })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Reason</label>
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
            </div>

            <div>
              <label className="text-sm font-medium">Additional Notes</label>
              <Textarea 
                {...form.register('notes')}
                placeholder="Enter any additional notes about this reallocation..."
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                Process Re-allocation
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {step === 'confirm' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-green-900 mb-2">Re-allocation Successful!</h3>
            <p className="text-gray-600 mb-4">
              {selectedUnit?.unitId} has been successfully reallocated.
            </p>
            <p className="text-sm text-gray-500">
              All records, commission calculations, and activity logs have been updated automatically.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
