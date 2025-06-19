import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Building, FileText, DollarSign, Calendar, Phone, Mail, MapPin, CreditCard } from 'lucide-react';

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
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="property">Property</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={client.passportPhoto || ''} alt={client.name} />
                  <AvatarFallback>
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{client.name}</h3>
                  <p className="text-sm text-gray-600">ID: {client.nationalId}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KYC Status:</span>
                <Badge className={getKycStatusColor(client.kycStatus)}>
                  {client.kycStatus}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {client.phone}
                </div>
                <div className="flex items-start text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                  <span>{client.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Properties Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {client.projects && client.projects.length > 0 ? (
                <div className="space-y-4">
                  {client.projects.map((project: any, index: number) => (
                    <div key={index} className="border-b pb-3 last:border-b-0">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-gray-600">{project.unit}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Assigned: {project.assignedDate}
                      </div>
                    </div>
                  ))}
                  
                  {client.paymentProgress !== undefined && (
                    <>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Payment Progress</span>
                          <span className="font-medium">{client.paymentProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${client.paymentProgress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Total Paid:</span>
                          <div className="font-medium text-green-600">{client.totalPaid}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Balance:</span>
                          <div className="font-medium">{client.balance}</div>
                        </div>
                      </div>
                      
                      {client.nextPayment && (
                        <div className="text-sm">
                          <span className="text-gray-500">Next Payment:</span>
                          <div className="font-medium">{client.nextPayment}</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Building className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No properties assigned</p>
                  <Button className="mt-3 bg-green-600 hover:bg-green-700">
                    Assign Property
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Documents Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Documents Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {client.documents.map((doc: string, index: number) => (
                <div key={index} className="flex items-center p-3 border rounded-lg">
                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="property" className="space-y-6">
        {client.project ? (
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Project</label>
                  <div className="font-medium">{client.project}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Unit</label>
                  <div className="font-medium">{client.unit}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Assigned Date</label>
                  <div className="font-medium">{client.assignedDate}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Summary</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span>Total Paid:</span>
                      <span className="font-medium text-green-600">{client.totalPaid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Outstanding:</span>
                      <span className="font-medium">{client.balance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Progress:</span>
                      <span className="font-medium">{client.paymentProgress}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Next Milestone</label>
                  <div className="mt-2">
                    {client.nextPayment ? (
                      <div>
                        <div className="font-medium">{client.nextPayment}</div>
                        <div className="text-sm text-gray-600">Payment due</div>
                      </div>
                    ) : (
                      <div className="text-gray-500">All payments completed</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Building className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Property Assigned</h3>
              <p className="text-gray-500 mb-4">This client hasn't been assigned a property yet.</p>
              <Button className="bg-green-600 hover:bg-green-700">
                Assign Property
              </Button>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="payments" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPaymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell className="font-medium">{payment.amount}</TableCell>
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

      <TabsContent value="documents" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {client.documents.map((doc: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-blue-600" />
                    <span className="font-medium">{doc}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="activity" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivityLog.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border-l-4 border-l-blue-500 bg-blue-50">
                  <Calendar className="h-4 w-4 mt-0.5 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.details}</div>
                    <div className="text-xs text-gray-500 mt-1">{activity.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
