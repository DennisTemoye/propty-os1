
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FormInput } from '@/components/shared/FormInput';
import { FormSelect } from '@/components/shared/FormSelect';
import { useFormValidation } from '@/hooks/useFormValidation';
import { salesFormSchema, SalesFormData, salesTypeOptions, paymentMethodOptions, mockClients, mockProjects, mockUnits } from '@/forms/salesFormSchema';
import { FileText, DollarSign, Calendar, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface UnifiedSalesFormProps {
  onSubmit: (data: SalesFormData) => void;
  onCancel: () => void;
  initialData?: Partial<SalesFormData>;
}

export function UnifiedSalesForm({ onSubmit, onCancel, initialData }: UnifiedSalesFormProps) {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [availableUnits, setAvailableUnits] = useState<any[]>([]);

  const form = useFormValidation(salesFormSchema, {
    clientId: '',
    projectId: '',
    unitIds: [],
    salesType: 'instant-allocation',
    salesDate: new Date().toISOString().split('T')[0],
    ...initialData
  });

  const salesType = form.watch('salesType');
  const projectId = form.watch('projectId');

  // Update available units when project changes
  useEffect(() => {
    if (projectId) {
      const units = mockUnits.filter(unit => unit.project === projectId && unit.status === 'available');
      setAvailableUnits(units);
      form.setValue('unitIds', []);
    }
  }, [projectId, form]);

  const handleSubmit = (data: SalesFormData) => {
    console.log('Sales form submitted:', data);
    toast.success('Sales record created successfully');
    onSubmit(data);
  };

  const getSalesTypeInfo = (type: string) => {
    return salesTypeOptions.find(option => option.value === type);
  };

  const selectedSalesType = getSalesTypeInfo(salesType);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Record New Sale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Basic Sale Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  control={form.control}
                  name="clientId"
                  label="Select Client"
                  options={mockClients}
                  placeholder="Choose a client"
                  required
                />
                
                <FormSelect
                  control={form.control}
                  name="projectId"
                  label="Select Project"
                  options={mockProjects}
                  placeholder="Choose a project"
                  required
                />
              </div>

              {/* Sales Type Selection */}
              <div className="space-y-3">
                <FormSelect
                  control={form.control}
                  name="salesType"
                  label="Sales Type"
                  options={salesTypeOptions}
                  placeholder="Select sales type"
                  required
                />
                
                {selectedSalesType && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{selectedSalesType.label}</Badge>
                      <span className="text-sm text-gray-600">{selectedSalesType.description}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Unit Selection */}
              {projectId && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">Select Unit(s) *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availableUnits.map((unit) => (
                      <label key={unit.value} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          value={unit.value}
                          onChange={(e) => {
                            const currentUnits = form.getValues('unitIds') || [];
                            if (e.target.checked) {
                              form.setValue('unitIds', [...currentUnits, unit.value]);
                            } else {
                              form.setValue('unitIds', currentUnits.filter(id => id !== unit.value));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm font-medium">{unit.label}</span>
                      </label>
                    ))}
                  </div>
                  {availableUnits.length === 0 && (
                    <p className="text-sm text-gray-500">No available units in this project</p>
                  )}
                </div>
              )}

              <Separator />

              {/* Sale Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  control={form.control}
                  name="salesDate"
                  label="Sales Date"
                  type="date"
                  required
                />
                
                {salesType !== 'reservation' && (
                  <FormInput
                    control={form.control}
                    name="totalAmount"
                    label="Total Amount"
                    placeholder="e.g., ₦25,000,000"
                  />
                )}
              </div>

              {/* Payment Information (for Instant Allocation and Sales Offer) */}
              {salesType !== 'reservation' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Payment Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      control={form.control}
                      name="initialPayment"
                      label="Initial Payment"
                      placeholder="e.g., ₦5,000,000"
                    />
                    
                    <FormSelect
                      control={form.control}
                      name="paymentMethod"
                      label="Payment Method"
                      options={paymentMethodOptions}
                      placeholder="Select payment method"
                    />
                  </div>
                </div>
              )}

              {/* Allocation Section (only for Instant Allocation) */}
              {salesType === 'instant-allocation' && (
                <div className="space-y-4">
                  <Separator />
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Allocation Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      control={form.control}
                      name="allocationDate"
                      label="Allocation Date"
                      type="date"
                    />
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Upload Documents</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Drop files here or click to upload</p>
                        <p className="text-xs text-gray-500">Contracts, agreements, etc.</p>
                      </div>
                    </div>
                  </div>
                  
                  <FormInput
                    control={form.control}
                    name="contractDetails"
                    label="Contract Details"
                    type="textarea"
                    placeholder="Additional contract terms and conditions..."
                  />
                </div>
              )}

              {/* Offer Section (only for Sales Offer) */}
              {salesType === 'sales-offer' && (
                <div className="space-y-4">
                  <Separator />
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Offer Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      control={form.control}
                      name="offerExpiryDate"
                      label="Offer Expiry Date"
                      type="date"
                    />
                    
                    <FormInput
                      control={form.control}
                      name="offerTerms"
                      label="Offer Terms"
                      type="textarea"
                      placeholder="Special terms and conditions for this offer..."
                    />
                  </div>
                </div>
              )}

              {/* Notes */}
              <FormInput
                control={form.control}
                name="notes"
                label="Additional Notes"
                type="textarea"
                placeholder="Any additional information or remarks..."
              />

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" type="button" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {salesType === 'instant-allocation' ? 'Complete Sale & Allocate' : 
                   salesType === 'sales-offer' ? 'Generate Offer' : 
                   'Create Reservation'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
