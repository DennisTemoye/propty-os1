import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  MapPin, 
  Home, 
  Calendar, 
  DollarSign, 
  CreditCard, 
  Users, 
  FileText,
  Clock,
  TrendingUp
} from 'lucide-react';

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
  if (!sale) return null;

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'installment':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOfferStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending response':
        return 'bg-yellow-100 text-yellow-800';
      case 'under negotiation':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      case 'fully paid':
        return 'bg-green-100 text-green-800';
      case 'initial payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'installment plan':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isAllocation = sale.dateAllocated !== undefined;
  const primaryDate = isAllocation ? sale.dateAllocated : sale.dateOffered;
  const dateLabel = isAllocation ? 'Date Allocated' : 'Date Offered';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Sale Details - {sale.unitId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge 
              className={`text-sm px-4 py-2 ${
                isAllocation 
                  ? getPaymentStatusColor(sale.paymentStatus || sale.status)
                  : getOfferStatusColor(sale.status)
              }`}
            >
              {sale.status}
            </Badge>
          </div>

          {/* Client & Property Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Client Name:</span>
                  <span className="font-medium">{sale.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Client ID:</span>
                  <span className="font-medium">#{sale.clientId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Marketer:</span>
                  <span className="font-medium">{sale.marketer}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Property Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Unit ID:</span>
                  <span className="font-medium">{sale.unitId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Block:</span>
                  <span className="font-medium">{sale.block}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium text-green-600">{sale.amount}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Transaction Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">{dateLabel}:</span>
                  <span className="font-medium">{primaryDate}</span>
                </div>
                {sale.expiryDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expiry Date:</span>
                    <span className="font-medium text-orange-600">{sale.expiryDate}</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Transaction Type</h4>
                <div className="flex items-center gap-2">
                  {isAllocation ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span>Full Allocation Sale</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span>Pending Offer</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information (for allocations) */}
          {isAllocation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Payment Status:</span>
                  <Badge className={getPaymentStatusColor(sale.paymentStatus || '')}>
                    {sale.paymentStatus || 'Unknown'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Amount:</span>
                  <span className="font-medium text-2xl text-green-600">{sale.amount}</span>
                </div>
                
                {/* Payment Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payment Progress</span>
                    <span>
                      {sale.paymentStatus === 'completed' ? '100%' : 
                       sale.paymentStatus === 'partial' ? '30%' : 
                       sale.paymentStatus === 'installment' ? '60%' : '0%'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${
                          sale.paymentStatus === 'completed' ? 100 : 
                          sale.paymentStatus === 'partial' ? 30 : 
                          sale.paymentStatus === 'installment' ? 60 : 0
                        }%` 
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Action Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">
                      {isAllocation ? 'Unit Allocated' : 'Unit Offered'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {primaryDate} • {sale.marketer}
                    </p>
                  </div>
                </div>
                
                {isAllocation && sale.paymentStatus === 'completed' && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Payment Completed</p>
                      <p className="text-sm text-gray-500">Full payment received</p>
                    </div>
                  </div>
                )}

                {!isAllocation && sale.expiryDate && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Offer Expires</p>
                      <p className="text-sm text-gray-500">{sale.expiryDate}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button variant="outline" className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              View Client
            </Button>
            <Button variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}