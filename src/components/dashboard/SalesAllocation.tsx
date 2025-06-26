
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Handshake, TrendingUp, Building, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NewAllocationForm } from './forms/NewAllocationForm';
import { ReallocationHistory } from './ReallocationHistory';
import { PendingAllocationsTab } from './allocation/PendingAllocationsTab';
import { SystemNotifications } from './notifications/SystemNotifications';

const mockTransactions = [
  {
    id: 1,
    type: 'sale',
    clientName: 'John Doe',
    projectName: 'Victoria Gardens',
    unit: 'Block A - Plot 02',
    amount: '₦25M',
    date: '2024-01-10',
    status: 'completed',
    hasAllocation: true
  },
  {
    id: 2,
    type: 'sale',
    clientName: 'Jane Smith',
    projectName: 'Emerald Heights',
    unit: 'Block B - Plot 12',
    amount: '₦30M',
    date: '2024-01-15',
    status: 'completed',
    hasAllocation: false
  },
  {
    id: 3,
    type: 'allocation',
    clientName: 'Mike Johnson',
    projectName: 'Golden View',
    unit: 'Block C - Plot 05',
    amount: '₦20M',
    date: '2024-01-20',
    status: 'active',
    hasAllocation: true
  }
];

export function SalesAllocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNewAllocationForm, setShowNewAllocationForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/new')) {
      setShowNewAllocationForm(true);
    }
  }, [location.pathname]);

  const handleNewAllocation = () => {
    navigate('/company/sales-allocations/new');
    setShowNewAllocationForm(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (showNewAllocationForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">New Allocation</h1>
            <p className="text-gray-600 mt-1">Create a new unit allocation</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setShowNewAllocationForm(false);
              navigate('/company/sales');
            }}
          >
            Back to Sales
          </Button>
        </div>
        <NewAllocationForm onClose={() => {
          setShowNewAllocationForm(false);
          navigate('/company/sales');
        }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales & Allocation</h1>
          <p className="text-gray-600 mt-1">Monitor sales transactions and allocation activities</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => setShowNotifications(true)}
            className="relative"
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
              2
            </Badge>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleNewAllocation}>
            <Handshake className="h-4 w-4 mr-2" />
            New Allocation
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">₦4.2B</div>
                <div className="text-sm text-gray-500">Total Sales</div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-gray-500">Active Allocations</div>
              </div>
              <Handshake className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">89</div>
                <div className="text-sm text-gray-500">Available Units</div>
              </div>
              <Building className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">+24%</div>
                <div className="text-sm text-gray-500">Growth Rate</div>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Transaction Overview</TabsTrigger>
          <TabsTrigger value="history">Reallocation History</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Approvals
            <Badge className="ml-2 bg-yellow-600 text-white text-xs">2</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Project/Unit</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Allocation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="capitalize">{transaction.type}</TableCell>
                      <TableCell>{transaction.clientName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.projectName}</div>
                          <div className="text-sm text-gray-500">{transaction.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.amount}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.hasAllocation ? "default" : "secondary"}>
                          {transaction.hasAllocation ? 'Allocated' : 'No Allocation'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <ReallocationHistory />
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <PendingAllocationsTab />
        </TabsContent>
      </Tabs>

      <SystemNotifications 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onNotificationClick={(notification) => {
          console.log('Notification clicked:', notification);
          setShowNotifications(false);
        }}
      />
    </div>
  );
}
