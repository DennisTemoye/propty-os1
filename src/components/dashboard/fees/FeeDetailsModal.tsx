
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, DollarSign, FileText, User, MapPin } from 'lucide-react';

interface FeeDetailsModalProps {
  fee: any;
  onClose: () => void;
  onRecordPayment: (fee: any) => void;
}

export function FeeDetailsModal({ fee, onClose, onRecordPayment }: FeeDetailsModalProps) {
  if (!fee) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Partially Paid':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{fee.feeType}</h3>
          <p className="text-gray-600">{fee.project}</p>
        </div>
        <Badge className={getStatusColor(fee.status)}>
          {fee.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Client Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-gray-600">Name:</span>
              <p className="font-medium">{fee.clientName}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Project:</span>
              <p className="font-medium">{fee.project}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Unit:</span>
              <p className="font-medium">{fee.unit}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Financial Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-gray-600">Total Amount:</span>
              <p className="font-medium text-lg">{fee.amount}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Paid:</span>
              <p className="font-medium text-green-600">{fee.paid}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Outstanding:</span>
              <p className="font-medium text-red-600">{fee.outstanding}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Payment Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="text-sm text-gray-600">Due Date:</span>
            <p className="font-medium">{fee.dueDate}</p>
          </div>
          {fee.lastPayment && (
            <div>
              <span className="text-sm text-gray-600">Last Payment:</span>
              <p className="font-medium">{fee.lastPayment}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="flex space-x-2">
          {fee.status !== 'Paid' && (
            <Button 
              onClick={() => {
                onRecordPayment(fee);
                onClose();
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Record Payment
            </Button>
          )}
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Statement
          </Button>
        </div>
      </div>
    </div>
  );
}
