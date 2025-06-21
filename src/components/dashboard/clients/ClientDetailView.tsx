
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  FileText, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Building,
  DollarSign,
  Clock,
  Send
} from 'lucide-react';
import { ClientDocumentsView } from './ClientDocumentsView';
import { InstalmentTracking } from './InstalmentTracking';
import { ClientNoticesSection } from './ClientNoticesSection';
import { useNavigate } from 'react-router-dom';

interface ClientDetailViewProps {
  client: any;
}

export function ClientDetailView({ client }: ClientDetailViewProps) {
  const navigate = useNavigate();
  
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'unassigned':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Client Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={client.passportPhoto} alt={client.name} />
                <AvatarFallback>
                  {client.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
                <p className="text-gray-600">{client.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                  <Badge className={getKycStatusColor(client.kycStatus)}>
                    KYC {client.kycStatus}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{client.totalPaid}</div>
              <div className="text-sm text-gray-600">Total Paid</div>
              {client.balance !== '₦0' && (
                <div className="text-lg font-semibold text-orange-600 mt-1">{client.balance}</div>
              )}
              {client.balance !== '₦0' && (
                <div className="text-sm text-gray-600">Outstanding Balance</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects ({client.projects.length})</TabsTrigger>
          <TabsTrigger value="payments">Payment Tracking</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{client.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <span>{client.nationalId}</span>
                </div>
                {client.assignedDate && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Joined: {client.assignedDate}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Payment Progress</span>
                    <span>{client.paymentProgress}%</span>
                  </div>
                  <Progress value={client.paymentProgress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <div className="text-sm text-gray-600">Total Paid</div>
                    <div className="text-lg font-semibold text-green-600">{client.totalPaid}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Balance</div>
                    <div className="text-lg font-semibold text-orange-600">{client.balance}</div>
                  </div>
                </div>
                
                {client.nextPayment && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-800">
                        Next Payment Due: {client.nextPayment}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => navigate(`/company/tools/send-notice?clientId=${client.id}`)}
                  variant="outline"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Notice
                </Button>
                <Button variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
                <Button variant="outline">
                  <Building className="h-4 w-4 mr-2" />
                  Assign Property
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-4">
            {client.projects.map((project: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <p className="text-gray-600">{project.unit}</p>
                      <p className="text-sm text-gray-500">Assigned: {project.assignedDate}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {client.projects.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Assigned</h3>
                  <p className="text-gray-600">This client hasn't been assigned to any projects yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <InstalmentTracking client={client} />
        </TabsContent>

        <TabsContent value="documents">
          <ClientDocumentsView client={client} />
        </TabsContent>

        <TabsContent value="notices">
          <ClientNoticesSection clientId={client.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
