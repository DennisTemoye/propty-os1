
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreditCard, DollarSign, TrendingUp, Users, Edit, Eye } from 'lucide-react';

const subscriptionPlans = [
  {
    id: 'trial',
    name: 'Trial',
    monthlyPrice: 0,
    annualPrice: 0,
    description: '14-day free trial with basic features',
    features: ['5 Projects', '2 Team Members', 'Basic Support', 'Core Features'],
    limits: { projects: 5, teamSize: 2, storage: '1GB' },
    companies: 12
  },
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 25000,
    annualPrice: 250000,
    description: 'Perfect for small property businesses',
    features: ['25 Projects', '10 Team Members', 'Email Support', 'All Core Features'],
    limits: { projects: 25, teamSize: 10, storage: '10GB' },
    companies: 45
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: 75000,
    annualPrice: 750000,
    description: 'Ideal for growing property companies',
    features: ['100 Projects', '50 Team Members', 'Priority Support', 'Advanced Features', 'API Access'],
    limits: { projects: 100, teamSize: 50, storage: '100GB' },
    companies: 28
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 150000,
    annualPrice: 1500000,
    description: 'For large enterprises with custom needs',
    features: ['Unlimited Projects', 'Unlimited Team Members', '24/7 Support', 'All Features', 'Custom Integration'],
    limits: { projects: 'Unlimited', teamSize: 'Unlimited', storage: '1TB' },
    companies: 8
  }
];

const revenueMetrics = {
  mtd: 15200000,
  ytd: 125000000,
  totalRevenue: 245000000,
  avgRevenuePerUser: 85000
};

const mockSubscriptions = [
  {
    id: 1,
    companyName: 'ABC Properties Ltd',
    plan: 'Growth',
    status: 'active',
    nextBilling: '2024-02-15',
    revenue: 75000,
    startDate: '2024-01-15'
  },
  {
    id: 2,
    companyName: 'Global Real Estate Inc',
    plan: 'Enterprise',
    status: 'active',
    nextBilling: '2024-02-10',
    revenue: 150000,
    startDate: '2024-01-10'
  },
  {
    id: 3,
    companyName: 'Metro Housing Co',
    plan: 'Trial',
    status: 'trial',
    nextBilling: '2024-02-01',
    revenue: 0,
    startDate: '2024-01-18'
  }
];

export function BillingSubscriptions() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'trial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="plans">Plan Configuration</TabsTrigger>
          <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
          <TabsTrigger value="invoices">Invoice Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(revenueMetrics.mtd)}
                    </div>
                    <div className="text-sm text-gray-600">MTD Revenue</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(revenueMetrics.ytd)}
                    </div>
                    <div className="text-sm text-gray-600">YTD Revenue</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {subscriptionPlans.reduce((acc, plan) => acc + plan.companies, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Subscriptions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(revenueMetrics.avgRevenuePerUser)}
                    </div>
                    <div className="text-sm text-gray-600">Avg Revenue/User</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {subscriptionPlans.map((plan) => (
                  <div key={plan.id} className="p-4 border rounded-lg">
                    <div className="text-lg font-semibold">{plan.name}</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(plan.monthlyPrice * plan.companies)}
                    </div>
                    <div className="text-sm text-gray-600">{plan.companies} companies</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Subscription Plans Configuration</span>
                <Button onClick={() => setEditMode(!editMode)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {editMode ? 'Save Changes' : 'Edit Plans'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subscriptionPlans.map((plan) => (
                  <Card key={plan.id} className="relative">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <Badge variant="outline">{plan.companies} companies</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {editMode ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor={`monthly-${plan.id}`}>Monthly Price (₦)</Label>
                            <Input
                              id={`monthly-${plan.id}`}
                              type="number"
                              defaultValue={plan.monthlyPrice}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`annual-${plan.id}`}>Annual Price (₦)</Label>
                            <Input
                              id={`annual-${plan.id}`}
                              type="number"
                              defaultValue={plan.annualPrice}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`projects-${plan.id}`}>Max Projects</Label>
                            <Input
                              id={`projects-${plan.id}`}
                              defaultValue={plan.limits.projects}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`team-${plan.id}`}>Team Size</Label>
                            <Input
                              id={`team-${plan.id}`}
                              defaultValue={plan.limits.teamSize}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <div className="text-2xl font-bold">
                              {formatCurrency(plan.monthlyPrice)}
                            </div>
                            <div className="text-sm text-gray-600">per month</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold">
                              {formatCurrency(plan.annualPrice)}
                            </div>
                            <div className="text-sm text-gray-600">per year</div>
                          </div>
                          <div className="text-sm text-gray-600">
                            {plan.description}
                          </div>
                          <div className="space-y-1">
                            {plan.features.map((feature, index) => (
                              <div key={index} className="text-sm">• {feature}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead>Monthly Revenue</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell className="font-medium">
                        {subscription.companyName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {subscription.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(subscription.status)}>
                          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{subscription.startDate}</TableCell>
                      <TableCell>{subscription.nextBilling}</TableCell>
                      <TableCell>{formatCurrency(subscription.revenue)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Invoice management features will be implemented here, including:
                <div className="mt-4 space-y-2 text-sm">
                  <div>• View all company invoices</div>
                  <div>• Track payment status</div>
                  <div>• Generate manual invoices</div>
                  <div>• Payment history and disputes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
