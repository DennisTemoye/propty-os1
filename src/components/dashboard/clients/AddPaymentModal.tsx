
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DollarSign, Receipt, CreditCard } from 'lucide-react';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
}

export function AddPaymentModal({ isOpen, onClose, client }: AddPaymentModalProps) {
  const [activeTab, setActiveTab] = useState('property');
  
  const propertyForm = useForm({
    defaultValues: {
      amount: '',
      paymentType: 'milestone',
      paymentMethod: 'bank_transfer',
      reference: '',
      notes: '',
      date: new Date().toISOString().split('T')[0],
      project: ''
    }
  });

  const feeForm = useForm({
    defaultValues: {
      amount: '',
      feeType: 'infrastructure',
      paymentMethod: 'bank_transfer',
      reference: '',
      notes: '',
      date: new Date().toISOString().split('T')[0],
      project: '',
      generateReceipt: true
    }
  });

  const onPropertySubmit = (data: any) => {
    console.log('Adding property payment for client:', client.id, data);
    toast.success(`Property payment of ${data.amount} recorded successfully!`);
    onClose();
    propertyForm.reset();
  };

  const onFeeSubmit = (data: any) => {
    console.log('Adding fee payment for client:', client.id, data);
    toast.success(`Fee payment of ${data.amount} recorded successfully!`);
    onClose();
    feeForm.reset();
  };

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Record Payment - {client.name}
          </DialogTitle>
          <DialogDescription>
            Record property payments or fee collections for this client
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="property" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Property Payment
            </TabsTrigger>
            <TabsTrigger value="fees" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Fee Collection
            </TabsTrigger>
          </TabsList>

          <TabsContent value="property" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={propertyForm.handleSubmit(onPropertySubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Amount *</label>
                      <Input 
                        {...propertyForm.register('amount', { required: true })}
                        placeholder="e.g., ₦5,000,000" 
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Payment Date *</label>
                      <Input 
                        type="date"
                        {...propertyForm.register('date', { required: true })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Payment Type *</label>
                      <Select onValueChange={(value) => propertyForm.setValue('paymentType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="initial">Initial Payment</SelectItem>
                          <SelectItem value="milestone">Milestone Payment</SelectItem>
                          <SelectItem value="final">Final Payment</SelectItem>
                          <SelectItem value="partial">Partial Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Payment Method *</label>
                      <Select onValueChange={(value) => propertyForm.setValue('paymentMethod', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                          <SelectItem value="card">Card Payment</SelectItem>
                          <SelectItem value="pos">POS</SelectItem>
                          <SelectItem value="online">Online Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Project</label>
                    <Select onValueChange={(value) => propertyForm.setValue('project', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {client.projects?.map((project: any, index: number) => (
                          <SelectItem key={index} value={project.name}>
                            {project.name} - {project.unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Payment Reference</label>
                    <Input 
                      {...propertyForm.register('reference')}
                      placeholder="Transaction reference or receipt number" 
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea 
                      {...propertyForm.register('notes')}
                      placeholder="Additional notes about this payment..."
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      Record Property Payment
                    </Button>
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Fee Collection Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={feeForm.handleSubmit(onFeeSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Amount *</label>
                      <Input 
                        {...feeForm.register('amount', { required: true })}
                        placeholder="e.g., ₦250,000" 
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Payment Date *</label>
                      <Input 
                        type="date"
                        {...feeForm.register('date', { required: true })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Fee Type *</label>
                      <Select onValueChange={(value) => feeForm.setValue('feeType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fee type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infrastructure">Infrastructure Fee</SelectItem>
                          <SelectItem value="service_charge">Service Charge</SelectItem>
                          <SelectItem value="maintenance">Maintenance Fee</SelectItem>
                          <SelectItem value="development">Development Levy</SelectItem>
                          <SelectItem value="legal">Legal/Documentation Fee</SelectItem>
                          <SelectItem value="utility">Utility Connection Fee</SelectItem>
                          <SelectItem value="other">Other Fee</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Payment Method *</label>
                      <Select onValueChange={(value) => feeForm.setValue('paymentMethod', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                          <SelectItem value="card">Card Payment</SelectItem>
                          <SelectItem value="pos">POS</SelectItem>
                          <SelectItem value="online">Online Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Project</label>
                    <Select onValueChange={(value) => feeForm.setValue('project', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {client.projects?.map((project: any, index: number) => (
                          <SelectItem key={index} value={project.name}>
                            {project.name} - {project.unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Payment Reference</label>
                    <Input 
                      {...feeForm.register('reference')}
                      placeholder="Transaction reference or receipt number" 
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea 
                      {...feeForm.register('notes')}
                      placeholder="Additional notes about this fee payment..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      {...feeForm.register('generateReceipt')}
                      id="generateReceipt"
                      className="rounded"
                    />
                    <label htmlFor="generateReceipt" className="text-sm font-medium">
                      Generate receipt automatically
                    </label>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                      <Receipt className="h-4 w-4 mr-2" />
                      Record Fee Payment
                    </Button>
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
