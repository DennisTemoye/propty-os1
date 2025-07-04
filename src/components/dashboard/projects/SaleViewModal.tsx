import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Building, DollarSign, Calendar, FileText, Phone, Mail } from 'lucide-react';

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
    clientId: number;
    expiryDate?: string;
  };
}

export function SaleViewModal({ isOpen, onClose, sale }: SaleViewModalProps) {
  const mockClientDetails = {
    email: 'john.doe@email.com',
    phone: '+234 801 234 5678',
    address: 'Lagos, Nigeria',
    occupation: 'Business Executive',
    nextOfKin: 'Jane Doe',
    nextOfKinPhone: '+234 802 345 6789'
  };

  const mockPaymentHistory = [
    { date: '2024-01-15', amount: '₦5,000,000', type: 'Initial Payment', status: 'Completed' },
    { date: '2024-02-15', amount: '₦5,000,000', type: 'Installment 1', status: 'Completed' },
    { date: '2024-03-15', amount: '₦5,600,000', type: 'Final Payment', status: 'Pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'fully paid':
        return 'bg-green-100 text-green-800';
      case 'partial':
      case 'initial payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'installment':
      case 'installment plan':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      case 'pending response':
        return 'bg-orange-100 text-orange-800';
      case 'under negotiation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
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
                  <p className="font-semibold text-green-600">{sale.amount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(sale.status)}>
                    {sale.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {sale.dateAllocated ? 'Date Allocated' : 'Date Offered'}
                  </label>
                  <p className="font-semibold">{sale.dateAllocated || sale.dateOffered}</p>
                </div>
                {sale.expiryDate && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                    <p className="font-semibold text-orange-600">{sale.expiryDate}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Marketer</label>
                <p className="font-semibold">{sale.marketer}</p>
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="font-semibold">{sale.clientName}</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockClientDetails.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockClientDetails.phone}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p className="text-sm">{mockClientDetails.address}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Occupation</label>
                <p className="text-sm">{mockClientDetails.occupation}</p>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">Next of Kin</label>
                <p className="text-sm">{mockClientDetails.nextOfKin}</p>
                <p className="text-xs text-muted-foreground">{mockClientDetails.nextOfKinPhone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPaymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{payment.type}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{payment.amount}</p>
                      <Badge className={getStatusColor(payment.status)} variant="outline">
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}