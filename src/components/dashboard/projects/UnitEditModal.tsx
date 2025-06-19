
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { TrendingUp, Calendar } from 'lucide-react';

interface UnitEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: any;
}

interface PriceHistory {
  id: number;
  price: string;
  date: string;
  reason: string;
  updatedBy: string;
}

const mockPriceHistory: PriceHistory[] = [
  {
    id: 1,
    price: '₦23M',
    date: '2024-01-01',
    reason: 'Initial pricing',
    updatedBy: 'Admin'
  },
  {
    id: 2,
    price: '₦24M',
    date: '2024-03-15',
    reason: 'Market adjustment',
    updatedBy: 'John Doe'
  },
  {
    id: 3,
    price: '₦25M',
    date: '2024-06-01',
    reason: 'Inflation adjustment',
    updatedBy: 'Admin'
  }
];

export function UnitEditModal({ isOpen, onClose, unit }: UnitEditModalProps) {
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>(mockPriceHistory);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  
  const form = useForm({
    defaultValues: {
      plotId: unit?.plotId || '',
      size: unit?.size || '',
      currentPrice: unit?.price || '',
      priceUpdateReason: '',
      description: unit?.description || ''
    }
  });

  const onSubmit = (data: any) => {
    // Check if price was updated
    if (data.currentPrice !== unit?.price && data.priceUpdateReason) {
      const newPriceEntry: PriceHistory = {
        id: priceHistory.length + 1,
        price: data.currentPrice,
        date: new Date().toISOString().split('T')[0],
        reason: data.priceUpdateReason,
        updatedBy: 'Current User'
      };
      setPriceHistory([...priceHistory, newPriceEntry]);
    }
    
    console.log('Updated unit data:', data);
    onClose();
  };

  if (!unit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Unit: {unit.plotId}</DialogTitle>
          <DialogDescription>
            Update unit details and pricing information
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Unit Form */}
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Plot ID</label>
                <Input {...form.register('plotId')} />
              </div>

              <div>
                <label className="text-sm font-medium">Plot Size</label>
                <Input {...form.register('size')} placeholder="e.g., 500sqm" />
              </div>

              <div>
                <label className="text-sm font-medium">Current Price</label>
                <Input {...form.register('currentPrice')} placeholder="e.g., ₦25M" />
              </div>

              <div>
                <label className="text-sm font-medium">Price Update Reason</label>
                <Input 
                  {...form.register('priceUpdateReason')} 
                  placeholder="Reason for price change (if any)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty if price is not being changed
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  {...form.register('description')} 
                  placeholder="Additional unit details..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Update Unit
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Price History */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Price History
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPriceHistory(!showPriceHistory)}
                  >
                    {showPriceHistory ? 'Hide' : 'Show'} Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Current Price */}
                  <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-green-800">{unit.price}</div>
                        <div className="text-sm text-green-600">Current Price</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>

                  {/* Price History List */}
                  {showPriceHistory && (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {priceHistory.reverse().map((entry) => (
                        <div key={entry.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{entry.price}</div>
                              <div className="text-sm text-gray-600">{entry.reason}</div>
                              <div className="text-xs text-gray-500 flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                {entry.date} by {entry.updatedBy}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Price Trend Summary */}
                  <div className="pt-3 border-t">
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Total Updates:</span>
                        <span className="font-medium">{priceHistory.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Original Price:</span>
                        <span className="font-medium">{priceHistory[0]?.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price Increase:</span>
                        <span className="font-medium text-green-600">
                          {((parseFloat(unit.price.replace(/[^\d]/g, '')) - 
                             parseFloat(priceHistory[0]?.price.replace(/[^\d]/g, '') || '0')) / 
                            parseFloat(priceHistory[0]?.price.replace(/[^\d]/g, '') || '1') * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
