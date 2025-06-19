
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Building, FileText, DollarSign, Calendar, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
import { ClientDocumentsView } from './ClientDocumentsView';

interface ClientDetailViewProps {
  client: any;
}

export function ClientDetailView({ client }: ClientDetailViewProps) {
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
    { id: 1, date: '2024-01-10', amount: '₦5M', type: 'Initial Payment', status: 'completed' },
    { id: 2, date: '2024-01-25', amount: '₦5M', type: 'Milestone 1', status: 'completed' },
    { id: 3, date: '2024-02-10', amount: '₦5M', type: 'Milestone 2', status: 'completed' },
    { id: 4, date: '2024-02-15', amount: '₦5M', type: 'Milestone 3', status: 'pending' },
    { id: 5, date: '2024-03-01', amount: '₦5M', type: 'Final Payment', status: 'pending' }
  ];

  const mockActivityLog = [
    { id: 1, date: '2024-01-20', action: 'Property assigned', details: 'Assigned Block A - Plot 02' },
    { id: 2, date: '2024-01-15', action: 'KYC approved', details: 'All documents verified' },
    { id: 3, date: '2024-01-10', action: 'Client created', details: 'Profile created in system' }
  ];

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

            {/* Quick Stats */}
            <div className="text-right space-y-2">
              <div className="text-sm text-gray-600">Total Investment</div>
              <div className="text-2xl font-bold text-green-600">{client.totalPaid}</div>
              <div className="text-sm text-gray-600">
                {client.projects?.length || 0} Properties
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{client.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{client.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{client.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="properties" className="text-base">Properties</TabsTrigger>
          <TabsTrigger value="payments" className="text-base">Payments</TabsTrigger>
          <TabsTrigger value="documents" className="text-base">Documents</TabsTrigger>
          <TabsTrigger value="activity" className="text-base">Activity</TabsTrigger>
        </TabsList>

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
                    <TableHead className="text-base">Amount</TableHead>
                    <TableHead className="text-base">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPaymentHistory.map((payment) => (
                    <TableRow key={payment.id} className="h-14">
                      <TableCell className="text-base">{payment.date}</TableCell>
                      <TableCell className="text-base">{payment.type}</TableCell>
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
