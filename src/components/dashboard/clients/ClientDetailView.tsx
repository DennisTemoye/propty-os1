
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Building, FileText, DollarSign, Calendar, Phone, Mail, MapPin, CreditCard, Filter } from 'lucide-react';
import { ClientDocumentsView } from './ClientDocumentsView';
import { ClientDownloadActions } from './ClientDownloadActions';

interface ClientDetailViewProps {
  client: any;
}

export function ClientDetailView({ client }: ClientDetailViewProps) {
  const [selectedProperty, setSelectedProperty] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'unassigned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const mockPaymentHistory = [
    { id: 1, date: '2024-01-10', amount: '₦5M', type: 'Initial Payment', status: 'completed', property: 'Victoria Gardens' },
    { id: 2, date: '2024-01-25', amount: '₦5M', type: 'Milestone 1', status: 'completed', property: 'Victoria Gardens' },
    { id: 3, date: '2024-02-10', amount: '₦5M', type: 'Milestone 2', status: 'completed', property: 'Victoria Gardens' },
    { id: 4, date: '2024-02-15', amount: '₦5M', type: 'Milestone 3', status: 'pending', property: 'Victoria Gardens' },
    { id: 5, date: '2024-03-01', amount: '₦5M', type: 'Final Payment', status: 'pending', property: 'Victoria Gardens' }
  ];

  const mockBillingHistory = [
    { id: 1, date: '2024-01-15', type: 'Infrastructure Fee', amount: '₦2.5M', status: 'paid', project: 'Victoria Gardens' },
    { id: 2, date: '2024-02-01', type: 'Service Charge - Estate Management', amount: '₦50K', status: 'paid', project: 'Victoria Gardens' },
    { id: 3, date: '2024-03-01', type: 'Service Charge - Estate Management', amount: '₦50K', status: 'overdue', project: 'Victoria Gardens' },
    { id: 4, date: '2024-02-15', type: 'Infrastructure Fee (Milestone 2)', amount: '₦1.25M', status: 'pending', project: 'Victoria Gardens' }
  ];

  const mockActivityLog = [
    { id: 1, date: '2024-01-20', action: 'Property assigned', details: 'Assigned Block A - Plot 02' },
    { id: 2, date: '2024-01-15', action: 'KYC approved', details: 'All documents verified' },
    { id: 3, date: '2024-01-10', action: 'Client created', details: 'Profile created in system' }
  ];

  // Calculate financial summary based on selected property
  const getFilteredPayments = () => {
    if (selectedProperty === 'all') {
      return mockPaymentHistory;
    }
    return mockPaymentHistory.filter(payment => payment.property === selectedProperty);
  };

  const filteredPayments = getFilteredPayments();
  const totalUnitPrice = 25000000; // ₦25M - example total unit price
  const amountPaid = parseInt(client.totalPaid.replace(/[₦,M]/g, '')) * 1000000; // Convert ₦15M to 15000000
  const balanceLeft = totalUnitPrice - amountPaid;
  const paymentProgress = (amountPaid / totalUnitPrice) * 100;

  // Get unique properties for filter
  const availableProperties = ['all', ...new Set(mockPaymentHistory.map(payment => payment.property))];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Header Section - Client Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-sm">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={client.passportPhoto || ''} alt={client.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-3">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
                  <p className="text-gray-600 text-lg">ID: {client.nationalId}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Badge className={`${getStatusColor(client.status)} px-3 py-1 text-sm font-medium`}>
                    {client.status}
                  </Badge>
                  <Badge className={`${getKycStatusColor(client.kycStatus)} px-3 py-1 text-sm font-medium`}>
                    KYC {client.kycStatus}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick Stats and Download Actions */}
            <div className="text-right space-y-4">
              <div>
                <div className="text-sm text-gray-600">Total Investment</div>
                <div className="text-2xl font-bold text-green-600">{client.totalPaid}</div>
                <div className="text-sm text-gray-600">
                  {client.projects?.length || 0} Properties
                </div>
              </div>
              <ClientDownloadActions client={client} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="client-details" className="w-full">
        <TabsList className="grid w-full grid-cols-6 h-12">
          <TabsTrigger value="client-details" className="text-base">Client Details</TabsTrigger>
          <TabsTrigger value="properties" className="text-base">Properties</TabsTrigger>
          <TabsTrigger value="payments" className="text-base">Payments</TabsTrigger>
          <TabsTrigger value="billing" className="text-base">Billing</TabsTrigger>
          <TabsTrigger value="documents" className="text-base">Documents</TabsTrigger>
          <TabsTrigger value="activity" className="text-base">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="client-details" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <p className="font-medium">{client.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Date of Birth</label>
                    <p className="font-medium">March 15, 1985</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Gender</label>
                    <p className="font-medium">Male</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Marital Status</label>
                    <p className="font-medium">Married</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Nationality</label>
                    <p className="font-medium">Nigerian</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">State of Origin</label>
                    <p className="font-medium">Lagos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Primary Phone</label>
                  <p className="font-medium">{client.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Alternative Phone</label>
                  <p className="font-medium">+234 802 345 6789</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email Address</label>
                  <p className="font-medium">{client.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Residential Address</label>
                  <p className="font-medium">{client.address}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Office Address</label>
                  <p className="font-medium">456 Business District, Victoria Island, Lagos</p>
                </div>
              </CardContent>
            </Card>

            {/* Identification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Identification</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">ID Type</label>
                  <p className="font-medium">National ID Card</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">ID Number</label>
                  <p className="font-medium">{client.nationalId}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">BVN</label>
                  <p className="font-medium">22345678901</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Next of Kin</label>
                  <p className="font-medium">Mrs. Jane Doe (Spouse)</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Next of Kin Phone</label>
                  <p className="font-medium">+234 803 456 7890</p>
                </div>
              </CardContent>
            </Card>

            {/* Employment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Employment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Occupation</label>
                  <p className="font-medium">Software Engineer</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Employer</label>
                  <p className="font-medium">Tech Solutions Ltd</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Monthly Income</label>
                  <p className="font-medium">₦500,000 - ₦1,000,000</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Years of Experience</label>
                  <p className="font-medium">8 years</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Source of Investment</label>
                  <p className="font-medium">Personal Savings</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="mt-6">
          {client.projects && client.projects.length > 0 ? (
            <div className="space-y-4">
              {client.projects.slice(0, 6).map((project: any, index: number) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <p className="text-gray-600">{project.unit}</p>
                        <p className="text-sm text-gray-500">Assigned: {project.assignedDate}</p>
                      </div>
                      
                      {index === 0 && (
                        <div className="text-right space-y-2">
                          <div className="text-sm text-gray-500">Payment Progress</div>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${client.paymentProgress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{client.paymentProgress}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {client.projects.length > 6 && (
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600">
                      +{client.projects.length - 6} more properties
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Building className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Assigned</h3>
                <p className="text-gray-500 mb-6">This client hasn't been assigned a property yet.</p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Assign Property
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <div className="space-y-6">
            {/* Property Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Payment Overview</span>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Properties</SelectItem>
                        {availableProperties.filter(prop => prop !== 'all').map((property) => (
                          <SelectItem key={property} value={property}>
                            {property}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Financial Summary */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Payment Summary</CardTitle>
                {selectedProperty !== 'all' && (
                  <p className="text-sm text-gray-600">Showing data for: {selectedProperty}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Total Unit Price</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(totalUnitPrice)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Amount Paid</div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(amountPaid)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Balance Left</div>
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(balanceLeft)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Progress</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {paymentProgress.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Payment Progress</span>
                    <span>{paymentProgress.toFixed(1)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${paymentProgress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base">Date</TableHead>
                      <TableHead className="text-base">Type</TableHead>
                      <TableHead className="text-base">Property</TableHead>
                      <TableHead className="text-base">Amount</TableHead>
                      <TableHead className="text-base">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id} className="h-14">
                        <TableCell className="text-base">{payment.date}</TableCell>
                        <TableCell className="text-base">{payment.type}</TableCell>
                        <TableCell className="text-base">{payment.property}</TableCell>
                        <TableCell className="font-semibold text-base">{payment.amount}</TableCell>
                        <TableCell>
                          <Badge className={payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">₦3.75M</div>
                      <div className="text-sm text-gray-500">Infrastructure Fees</div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">₦100K</div>
                      <div className="text-sm text-gray-500">Service Charges</div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">₦50K</div>
                      <div className="text-sm text-gray-500">Outstanding</div>
                    </div>
                  </Card>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base">Date</TableHead>
                      <TableHead className="text-base">Type</TableHead>
                      <TableHead className="text-base">Project</TableHead>
                      <TableHead className="text-base">Amount</TableHead>
                      <TableHead className="text-base">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBillingHistory.map((billing) => (
                      <TableRow key={billing.id} className="h-14">
                        <TableCell className="text-base">{billing.date}</TableCell>
                        <TableCell className="text-base">{billing.type}</TableCell>
                        <TableCell className="text-base">{billing.project}</TableCell>
                        <TableCell className="font-semibold text-base">{billing.amount}</TableCell>
                        <TableCell>
                          <Badge className={
                            billing.status === 'paid' ? 'bg-green-100 text-green-800' : 
                            billing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {billing.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <ClientDocumentsView client={client} />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivityLog.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 border-l-4 border-l-blue-500 bg-blue-50 rounded-r-lg">
                    <Calendar className="h-5 w-5 mt-1 text-blue-600" />
                    <div className="flex-1">
                      <div className="font-medium text-lg">{activity.action}</div>
                      <div className="text-gray-600 mt-1">{activity.details}</div>
                      <div className="text-sm text-gray-500 mt-2">{activity.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
