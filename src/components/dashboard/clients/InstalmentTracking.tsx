
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Download, Plus, Receipt, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { AddInstalmentModal } from './AddInstalmentModal';
import { MarkAsPaidModal } from './MarkAsPaidModal';

interface Instalment {
  id: number;
  stageName: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  paymentMethod?: string;
  referenceId?: string;
  receiptUrl?: string;
}

interface InstalmentTrackingProps {
  client: any;
}

export function InstalmentTracking({ client }: InstalmentTrackingProps) {
  const [instalments, setInstalments] = useState<Instalment[]>([
    {
      id: 1,
      stageName: 'Deposit',
      amount: 1500000,
      dueDate: '2024-01-10',
      status: 'paid',
      paidDate: '2024-01-09',
      paymentMethod: 'Transfer',
      referenceId: 'TXN001234',
      receiptUrl: '#'
    },
    {
      id: 2,
      stageName: 'Midstage Payment',
      amount: 2000000,
      dueDate: '2024-03-10',
      status: 'pending'
    },
    {
      id: 3,
      stageName: 'Final Payment',
      amount: 2500000,
      dueDate: '2024-06-10',
      status: 'overdue'
    }
  ]);

  const [isAddInstalmentOpen, setIsAddInstalmentOpen] = useState(false);
  const [isMarkAsPaidOpen, setIsMarkAsPaidOpen] = useState(false);
  const [selectedInstalment, setSelectedInstalment] = useState<Instalment | null>(null);

  const totalAmount = instalments.reduce((sum, inst) => sum + inst.amount, 0);
  const paidAmount = instalments.filter(inst => inst.status === 'paid').reduce((sum, inst) => sum + inst.amount, 0);
  const balanceLeft = totalAmount - paidAmount;
  const progressPercentage = (paidAmount / totalAmount) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleMarkAsPaid = (instalment: Instalment) => {
    setSelectedInstalment(instalment);
    setIsMarkAsPaidOpen(true);
  };

  const handleInstalmentPaid = (instalmentId: number, paymentData: any) => {
    setInstalments(prev => prev.map(inst => 
      inst.id === instalmentId 
        ? { 
            ...inst, 
            status: 'paid' as const,
            paidDate: paymentData.paymentDate,
            paymentMethod: paymentData.paymentMethod,
            referenceId: paymentData.referenceId,
            receiptUrl: '#'
          }
        : inst
    ));
  };

  const handleAddInstalment = (instalmentData: any) => {
    const newInstalment: Instalment = {
      id: instalments.length + 1,
      stageName: instalmentData.stageName,
      amount: instalmentData.amount,
      dueDate: instalmentData.dueDate,
      status: 'pending'
    };
    setInstalments(prev => [...prev, newInstalment]);
  };

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
              <p className="text-gray-600">
                {client.projects?.[0]?.name} - {client.projects?.[0]?.unit}
              </p>
            </div>
            <Button 
              onClick={() => setIsAddInstalmentOpen(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Instalment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Total Unit Price</div>
              <div className="text-xl font-bold text-gray-900">
                {formatCurrency(totalAmount)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Amount Paid</div>
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(paidAmount)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Balance Left</div>
              <div className="text-xl font-bold text-orange-600">
                {formatCurrency(balanceLeft)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="text-xl font-bold text-blue-600">
                {progressPercentage.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Payment Progress</span>
              <span>{progressPercentage.toFixed(1)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instalment Plan Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Instalment Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stage Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instalments.map((instalment) => (
                <TableRow key={instalment.id} className="h-16">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(instalment.status)}
                      <span className="font-medium">{instalment.stageName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(instalment.amount)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(instalment.dueDate).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(instalment.status)}>
                      {instalment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {instalment.paidDate ? (
                      <div>
                        <div>{new Date(instalment.paidDate).toLocaleDateString()}</div>
                        {instalment.paymentMethod && (
                          <div className="text-xs text-gray-500">
                            via {instalment.paymentMethod}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {instalment.status === 'paid' ? (
                        <Button variant="outline" size="sm">
                          <Receipt className="h-3 w-3 mr-1" />
                          Receipt
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkAsPaid(instalment)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Mark Paid
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Instalment Modal */}
      <AddInstalmentModal 
        isOpen={isAddInstalmentOpen}
        onClose={() => setIsAddInstalmentOpen(false)}
        onAdd={handleAddInstalment}
      />

      {/* Mark as Paid Modal */}
      {selectedInstalment && (
        <MarkAsPaidModal 
          isOpen={isMarkAsPaidOpen}
          onClose={() => {
            setIsMarkAsPaidOpen(false);
            setSelectedInstalment(null);
          }}
          instalment={selectedInstalment}
          onMarkPaid={handleInstalmentPaid}
        />
      )}
    </div>
  );
}
