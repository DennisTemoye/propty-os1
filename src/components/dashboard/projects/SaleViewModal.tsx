import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, MapPin, Calendar, DollarSign, CreditCard, FileText, Phone, Mail } from 'lucide-react';

interface SaleViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: {
    id: number;
    clientName: string;
    unitId: string;
    block: string;
    dateAllocated?: string;
    dateOffered?: string;
    status: string;
    marketer: string;
    amount: string;
    paymentStatus?: string;
    allocationStatus?: string;
    offerStatus?: string;
    clientId: number;
    expiryDate?: string;
  };
}

const mockClientDetails = {
  1: { phone: '+234 801 234 5678', email: 'john.doe@email.com', address: 'Lagos, Nigeria' },
  2: { phone: '+234 802 345 6789', email: 'jane.smith@email.com', address: 'Abuja, Nigeria' },
  3: { phone: '+234 803 456 7890', email: 'mike.johnson@email.com', address: 'Port Harcourt, Nigeria' },
  4: { phone: '+234 804 567 8901', email: 'sarah.wilson@email.com', address: 'Kano, Nigeria' },
  5: { phone: '+234 805 678 9012', email: 'david.brown@email.com', address: 'Ibadan, Nigeria' },
};

const mockPaymentHistory = [
  { date: '2024-01-15', amount: '₦5,000,000', type: 'Initial Payment', method: 'Bank Transfer', status: 'Completed' },
  { date: '2024-01-25', amount: '₦3,000,000', type: 'Second Installment', method: 'Check', status: 'Completed' },
  { date: '2024-02-05', amount: '₦7,600,000', type: 'Final Payment', method: 'Bank Transfer', status: 'Pending' },
];

export function SaleViewModal({ isOpen, onClose, sale }: SaleViewModalProps) {
  const clientDetails = mockClientDetails[sale.clientId as keyof typeof mockClientDetails] || {
    phone: 'Not available',
    email: 'Not available',
    address: 'Not available'
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'fully paid':
      case 'allocated':
        return 'bg-green-100 text-green-800';
      case 'partial':
      case 'initial payment':
      case 'installment plan':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
      case 'pending response':
        return 'bg-orange-100 text-orange-800';
      case 'under negotiation':
        return 'bg-blue-100 text-blue-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isAllocation = sale.allocationStatus === 'allocated';
  const isOffer = sale.offerStatus === 'offered';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Sale Details - {sale.unitId}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sale Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Sale Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Unit ID</label>
                  <p className="font-semibold">{sale.unitId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Block</label>
                  <p className="font-semibold">{sale.block}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Amount</label>
                  <p className="font-bold text-lg text-green-600">{sale.amount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(sale.status)}>{sale.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {isAllocation ? 'Date Allocated' : 'Date Offered'}
                  </label>
                  <p className="font-semibold flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {sale.dateAllocated || sale.dateOffered}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Marketer</label>
                  <p className="font-semibold">{sale.marketer}</p>
                </div>
              </div>

              {isOffer && sale.expiryDate && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Offer Expiry</label>
                  <p className="font-semibold text-orange-600 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {sale.expiryDate}
                  </p>
                </div>
              )}

              {isAllocation && sale.paymentStatus && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Payment Status</label>
                  <Badge className={getStatusColor(sale.paymentStatus)}>
                    {sale.paymentStatus}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Client Name</label>
                <p className="font-semibold text-lg">{sale.clientName}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="font-semibold flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {clientDetails.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="font-semibold flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {clientDetails.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p className="font-semibold flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {clientDetails.address}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`/company/clients/${sale.clientId}`, '_blank')}
                >
                  View Client Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`tel:${clientDetails.phone}`, '_blank')}
                >
                  Call Client
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment History (only for allocations) */}
        {isAllocation && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPaymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{payment.type}</span>
                        <span className="font-bold text-green-600">{payment.amount}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {payment.date}
                        </span>
                        <span>{payment.method}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(payment.status)} variant="outline">
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center font-semibold">
                <span>Total Amount:</span>
                <span className="text-lg text-green-600">{sale.amount}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => window.print()}>
            Print Details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}