import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Gift,
  Percent,
  Clock
} from 'lucide-react';

const mockBillingData = [
  {
    id: 1,
    companyName: 'Global Real Estate Inc',
    plan: 'Enterprise',
    status: 'Active',
    billingStatus: 'Paid',
    amount: 150000,
    nextBilling: '2024-04-15',
    trialDays: 0,
    paymentMethod: 'Bank Transfer',
    discount: 0,
    referrals: 2
  },
  {
    id: 2,
    companyName: 'ABC Properties Ltd',
    plan: 'Pro',
    status: 'Active',
    billingStatus: 'Overdue',
    amount: 75000,
    nextBilling: '2024-03-20',
    trialDays: 0,
    paymentMethod: 'Card',
    discount: 10,
    referrals: 1
  },
  {
    id: 3,
    companyName: 'Metro Housing Co',
    plan: 'Pro',
    status: 'Inactive',
    billingStatus: 'Cancelled',
    amount: 75000,
    nextBilling: null,
    trialDays: 0,
    paymentMethod: 'Card',
    discount: 0,
    referrals: 0
  },
  {
    id: 4,
    companyName: 'Prime Properties',
    plan: 'Starter',
    status: 'Trial',
    billingStatus: 'Trial',
    amount: 25000,
    nextBilling: '2024-04-05',
    trialDays: 12,
    paymentMethod: null,
    discount: 0,
    referrals: 0
  }
];

const planPricing = {
  Starter: 25000,
  Pro: 75000,
  Enterprise: 150000
};

export function BillingControlTab() {
  const [billingData, setBillingData] = useState(mockBillingData);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountAmount, setDiscountAmount] = useState('');
  const [discountReason, setDiscountReason] = useState('');

  const getBillingStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Trial': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      case 'Pro': return 'bg-blue-100 text-blue-800';
      case 'Starter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handlePlanChange = (companyId: number, newPlan: string) => {
    setBillingData(prev => prev.map(company => 
      company.id === companyId ? { 
        ...company, 
        plan: newPlan,
        amount: planPricing[newPlan as keyof typeof planPricing]
      } : company
    ));
  };

  const applyDiscount = () => {
    if (selectedCompany && discountAmount) {
      setBillingData(prev => prev.map(company => 
        company.id === selectedCompany.id ? { 
          ...company, 
          discount: parseInt(discountAmount)
        } : company
      ));
      setShowDiscountModal(false);
      setDiscountAmount('');
      setDiscountReason('');
    }
  };

  const totalRevenue = billingData.reduce((sum, company) => 
    company.billingStatus === 'Paid' ? sum + company.amount : sum, 0
  );

  const overdueRevenue = billingData.reduce((sum, company) => 
    company.billingStatus === 'Overdue' ? sum + company.amount : sum, 0
  );

  const trialCompanies = billingData.filter(company => company.billingStatus === 'Trial').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Billing & Subscription Control</h3>
          <p className="text-slate-600">Manage subscriptions, billing, and payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Amount</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(overdueRevenue)}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trial Companies</p>
                <p className="text-2xl font-bold text-blue-600">{trialCompanies}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                <p className="text-2xl font-bold text-purple-600">
                  {billingData.filter(c => c.status === 'Active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Trial Days</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingData.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="font-medium">{company.companyName}</div>
                    <div className="text-sm text-gray-500">{company.paymentMethod || 'No payment method'}</div>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={company.plan} 
                      onValueChange={(value) => handlePlanChange(company.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Starter">Starter</SelectItem>
                        <SelectItem value="Pro">Pro</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{formatCurrency(company.amount)}</div>
                    {company.discount > 0 && (
                      <div className="text-sm text-green-600">-{company.discount}% discount</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getBillingStatusColor(company.billingStatus)}>
                      {company.billingStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {company.nextBilling ? (
                      <div className="text-sm">
                        {new Date(company.nextBilling).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {company.trialDays > 0 ? (
                      <Badge variant="outline" className="text-blue-600">
                        {company.trialDays} days
                      </Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {company.discount > 0 ? (
                      <Badge variant="outline" className="text-green-600">
                        {company.discount}%
                      </Badge>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedCompany(company);
                          setShowDiscountModal(true);
                        }}
                      >
                        <Percent className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="ghost" size="sm">
                        <Gift className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Discount Modal */}
      <Dialog open={showDiscountModal} onOpenChange={setShowDiscountModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply Discount</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Company</label>
              <p className="text-lg font-semibold">{selectedCompany?.companyName}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Discount Percentage</label>
              <Input
                type="number"
                placeholder="Enter discount percentage"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                max="100"
                min="0"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Reason</label>
              <Textarea
                placeholder="Enter reason for discount"
                value={discountReason}
                onChange={(e) => setDiscountReason(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowDiscountModal(false)}>
                Cancel
              </Button>
              <Button onClick={applyDiscount}>
                Apply Discount
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}