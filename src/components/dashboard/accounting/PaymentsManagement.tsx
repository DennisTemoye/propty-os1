
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Download, Plus, DollarSign, Building, Users, Calendar } from 'lucide-react';
import { InfrastructureFeeModal } from './InfrastructureFeeModal';
import { ServiceChargeModal } from './ServiceChargeModal';

// Mock data for all payments
const mockPayments = [
  {
    id: 1,
    type: 'Property Sale',
    client: 'John Doe',
    project: 'Victoria Gardens',
    marketer: 'Jane Smith',
    amount: 25000000,
    status: 'completed',
    date: '2024-01-15',
    reference: 'PAY-001'
  },
  {
    id: 2,
    type: 'Infrastructure Fee',
    client: 'Sarah Johnson',
    project: 'Golden View Towers',
    marketer: 'Mike Davis',
    amount: 2500000,
    status: 'pending',
    date: '2024-01-20',
    reference: 'INF-002'
  },
  {
    id: 3,
    type: 'Service Charge',
    client: 'David Wilson',
    project: 'Emerald Heights',
    marketer: 'Sarah Johnson',
    amount: 150000,
    status: 'overdue',
    date: '2024-01-01',
    reference: 'SVC-003'
  }
];

const mockInfrastructureFees = [
  {
    id: 1,
    project: 'Victoria Gardens',
    feeAmount: 5000000,
    chargeType: 'milestone',
    milestones: ['Foundation', 'Roofing', 'Completion'],
    clients: [
      { name: 'John Doe', status: 'paid', amountPaid: 5000000 },
      { name: 'Jane Smith', status: 'partially_paid', amountPaid: 2500000 }
    ]
  }
];

const mockServiceCharges = [
  {
    id: 1,
    project: 'Victoria Gardens',
    chargeName: 'Estate Management',
    amount: 50000,
    frequency: 'monthly',
    description: 'Monthly estate management and security fees',
    clients: [
      { name: 'John Doe', status: 'paid', lastPayment: '2024-01-15' },
      { name: 'Jane Smith', status: 'overdue', lastPayment: '2023-12-15' }
    ]
  }
];

export function PaymentsManagement() {
  const [activeTab, setActiveTab] = useState('all-payments');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [showInfraModal, setShowInfraModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'partially_paid':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesProject = projectFilter === 'all' || payment.project === projectFilter;
    return matchesSearch && matchesStatus && matchesProject;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payments Management</h2>
          <p className="text-gray-600">Centralized payment tracking and fee management</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowInfraModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Building className="h-4 w-4 mr-2" />
            Infrastructure Fee
          </Button>
          <Button 
            onClick={() => setShowServiceModal(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Service Charge
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">₦127M</div>
                <div className="text-sm text-gray-500">Total Collected</div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">₦15M</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">₦8M</div>
                <div className="text-sm text-gray-500">Overdue</div>
              </div>
              <Users className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-gray-500">Total Transactions</div>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-payments">All Payments</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure Fees</TabsTrigger>
          <TabsTrigger value="service-charges">Service Charges</TabsTrigger>
        </TabsList>

        <TabsContent value="all-payments" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={projectFilter} onValueChange={setProjectFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="Victoria Gardens">Victoria Gardens</SelectItem>
                    <SelectItem value="Golden View Towers">Golden View Towers</SelectItem>
                    <SelectItem value="Emerald Heights">Emerald Heights</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Marketer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.reference}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{payment.client}</TableCell>
                      <TableCell>{payment.project}</TableCell>
                      <TableCell>{payment.marketer}</TableCell>
                      <TableCell className="font-bold">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Fees by Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockInfrastructureFees.map((infra) => (
                  <div key={infra.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{infra.project}</h3>
                        <p className="text-gray-600">Fee: {formatCurrency(infra.feeAmount)}</p>
                        <p className="text-sm text-gray-500">
                          Charge Type: {infra.chargeType === 'milestone' ? 'Milestone-based' : 'Full upfront'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Client Status</h4>
                        <div className="space-y-2">
                          {infra.clients.map((client, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span>{client.name}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">{formatCurrency(client.amountPaid)}</span>
                                <Badge className={getStatusColor(client.status)}>
                                  {client.status.replace('_', ' ')}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {infra.chargeType === 'milestone' && (
                        <div>
                          <h4 className="font-medium mb-2">Milestones</h4>
                          <div className="space-y-1">
                            {infra.milestones.map((milestone, idx) => (
                              <div key={idx} className="p-2 bg-blue-50 rounded text-sm">
                                {milestone}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service-charges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Charges by Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockServiceCharges.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{service.chargeName}</h3>
                        <p className="text-gray-600">{service.project}</p>
                        <p className="text-sm text-gray-500">{service.description}</p>
                        <p className="text-sm font-medium mt-1">
                          {formatCurrency(service.amount)} / {service.frequency}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Client Payment Status</h4>
                      <div className="space-y-2">
                        {service.clients.map((client, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span>{client.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">Last: {client.lastPayment}</span>
                              <Badge className={getStatusColor(client.status)}>
                                {client.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <InfrastructureFeeModal 
        isOpen={showInfraModal}
        onClose={() => setShowInfraModal(false)}
      />
      <ServiceChargeModal 
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
      />
    </div>
  );
}
