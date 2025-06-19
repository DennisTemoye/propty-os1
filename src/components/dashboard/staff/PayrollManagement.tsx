
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Download, Calendar, Check } from 'lucide-react';

interface PayrollRecord {
  id: number;
  period: string;
  totalAmount: string;
  staffCount: number;
  status: 'pending' | 'processed' | 'paid';
  payDate: string;
}

const mockPayroll: PayrollRecord[] = [
  { id: 1, period: 'January 2024', totalAmount: '₦8,500,000', staffCount: 24, status: 'paid', payDate: '2024-01-31' },
  { id: 2, period: 'December 2023', totalAmount: '₦8,200,000', staffCount: 23, status: 'paid', payDate: '2023-12-31' },
  { id: 3, period: 'November 2023', totalAmount: '₦8,100,000', staffCount: 22, status: 'paid', payDate: '2023-11-30' },
];

export function PayrollManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Payroll Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              Process Payroll
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Schedule Payments
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              Export Reports
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payroll History */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPayroll.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{record.period}</h4>
                  <p className="text-sm text-gray-500">{record.staffCount} employees</p>
                  <p className="text-xs text-gray-500">Paid on {record.payDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{record.totalAmount}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">John Smith - Project Manager</p>
                <p className="text-sm text-gray-500">Overtime: 10 hours</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₦125,000</p>
                <Button size="sm" className="mt-1">
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Sarah Johnson - Sales Executive</p>
                <p className="text-sm text-gray-500">Commission: Q4 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₦85,000</p>
                <Button size="sm" className="mt-1">
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
