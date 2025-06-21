
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { CreditCard, DollarSign, TrendingUp, Users, Edit, Eye, Calendar } from 'lucide-react';

const subscriptionPlans = [
  {
    id: 'trial',
    name: 'Trial',
    monthlyPrice: 0,
    annualPrice: 0,
    description: '14-day free trial with core features',
    limits: { 
      projects: 2, 
      teamSize: 3, 
      storage: '500MB',
      clients: 10
    },
    features: {
      projects: true,
      clients: true,
      salesAllocation: false,
      accounting: false,
      crm: false,
      feesCollection: false,
      sendNotice: false,
      reports: false
    },
    companies: 12
  },
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 25000,
    annualPrice: 250000,
    description: 'Perfect for small property businesses',
    limits: { 
      projects: 10, 
      teamSize: 5, 
      storage: '5GB',
      clients: 50
    },
    features: {
      projects: true,
      clients: true,
      salesAllocation: true,
      accounting: true,
      crm: false,
      feesCollection: true,
      sendNotice: true,
      reports: true
    },
    companies: 45
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: 75000,
    annualPrice: 750000,
    description: 'Ideal for growing property companies',
    limits: { 
      projects: 50, 
      teamSize: 25, 
      storage: '50GB',
      clients: 500
    },
    features: {
      projects: true,
      clients: true,
      salesAllocation: true,
      accounting: true,
      crm: true,
      feesCollection: true,
      sendNotice: true,
      reports: true
    },
    companies: 28
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 150000,
    annualPrice: 1500000,
    description: 'For large enterprises with custom needs',
    limits: { 
      projects: 'Unlimited', 
      teamSize: 'Unlimited', 
      storage: '500GB',
      clients: 'Unlimited'
    },
    features: {
      projects: true,
      clients: true,
      salesAllocation: true,
      accounting: true,
      crm: true,
      feesCollection: true,
      sendNotice: true,
      reports: true
    },
    companies: 8
  }
];

const featureLabels = {
  projects: 'Projects & Units Management',
  clients: 'Client Management',
  salesAllocation: 'Sales Allocation',
  accounting: 'Accounting & Financial',
  crm: 'CRM & Pipelines',
  feesCollection: 'Fees Collection',
  sendNotice: 'Send Notice',
  reports: 'Reports & Analytics'
};

const revenueMetrics = {
  mtd: 15200000,
  ytd: 125000000,
  totalRevenue: 245000000,
  avgRevenuePerCompany: 85000
};

const mockSubscriptions = [
  {
    id: 1,
    companyName: 'ABC Properties Ltd',
    plan: 'Growth',
    status: 'active',
    nextBilling: '2024-02-15',
    revenue: 75000,
    startDate: '2024-01-15',
    billingCycle: 'monthly'
  },
  {
    id: 2,
    companyName: 'Global Real Estate Inc',
    plan: 'Enterprise',
    status: 'active',
    nextBilling: '2024-02-10',
    revenue: 150000,
    startDate: '2024-01-10',
    billingCycle: 'annual'
  },
  {
    id: 3,
    companyName: 'Metro Housing Co',
    plan: 'Trial',
    status: 'trial',
    nextBilling: '2024-02-01',
    revenue: 0,
    startDate: '2024-01-18',
    billingCycle: 'trial'
  }
];

export function BillingSubscriptions() {
  const [editMode, setEditMode] = useState(false);
  const [plans, setPlans] = useState(subscriptionPlans);

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

  const handleFeatureToggle = (planId: string, feature: string) => {
    if (!editMode) return;
    
    setPlans(plans.map(plan => 
      plan.id === planId 
        ? { 
            ...plan, 
            features: { 
              ...plan.features, 
              [feature]: !plan.features[feature as keyof typeof plan.features] 
            } 
          }
        : plan
    ));
  };

  const handleSaveChanges = () => {
    console.log('Saving plan configurations...');
    setEditMode(false);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="plans">Plan Configuration</TabsTrigger>
          <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
          <TabsTrigger value="billing">Billing Management</TabsTrigger>
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
                      {formatCurrency(revenueMetrics.avgRevenuePerCompany)}
                    </div>
                    <div className="text-sm text-gray-600">Avg Revenue/Company</div>
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
                <span>ProptyOS Subscription Plans</span>
                <Button 
                  onClick={editMode ? handleSaveChanges : () => setEditMode(true)}
                  className={editMode ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {editMode ? 'Save Changes' : 'Edit Plans'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {plans.map((plan) => (
                  <Card key={plan.id} className="relative">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{plan.name} Plan</CardTitle>
                          <p className="text-gray-600 mt-1">{plan.description}</p>
                        </div>
                        <Badge variant="outline">{plan.companies} companies</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pricing & Limits */}
                        <div className="space-y-4">
                          <h4 className="font-semibold">Pricing & Limits</h4>
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
                                <div className="text-sm text-gray-600">per year (save 17%)</div>
                              </div>
                              <div className="text-sm space-y-1">
                                <div>• Max Projects: {plan.limits.projects}</div>
                                <div>• Team Size: {plan.limits.teamSize}</div>
                                <div>• Storage: {plan.limits.storage}</div>
                                <div>• Max Clients: {plan.limits.clients}</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* ProptyOS Modules */}
                        <div className="space-y-4">
                          <h4 className="font-semibold">ProptyOS Modules Access</h4>
                          <div className="space-y-3">
                            {Object.entries(featureLabels).map(([key, label]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-sm">{label}</span>
                                <Switch 
                                  checked={plan.features[key as keyof typeof plan.features]}
                                  onCheckedChange={() => handleFeatureToggle(plan.id, key)}
                                  disabled={!editMode}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
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
              <CardTitle>Active Company Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Billing Cycle</TableHead>
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
                      <TableCell className="capitalize">{subscription.billingCycle}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{subscription.nextBilling}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(subscription.revenue)}</TableCell>
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

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">Billing Management Tools</h3>
                <p className="text-sm">Advanced billing features coming soon:</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div>• Payment history and invoice management</div>
                  <div>• Failed payment retry automation</div>
                  <div>• Custom billing cycles and discounts</div>
                  <div>• Revenue analytics and forecasting</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
