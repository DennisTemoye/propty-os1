
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Handshake, DollarSign, FileText, Users, TrendingUp, ArrowRight, History } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NewAllocationForm } from './forms/NewAllocationForm';
import { ReallocationModal } from './forms/ReallocationModal';
import { ReallocationHistory } from './ReallocationHistory';

export function SalesAllocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNewAllocationForm, setShowNewAllocationForm] = useState(false);
  const [showReallocationModal, setShowReallocationModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Check if we're on the /new route
  useEffect(() => {
    if (location.pathname.includes('/new')) {
      setShowNewAllocationForm(true);
    }
  }, [location.pathname]);

  const handleNewAllocation = () => {
    navigate('/company/sales-allocations/new');
    setShowNewAllocationForm(true);
  };

  const handleReallocation = (data: any) => {
    console.log('Processing reallocation:', data);
    // Here you would typically update your backend/state management
    // For now, we'll just log the data
  };

  if (showNewAllocationForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">New Allocation</h1>
            <p className="text-gray-600 mt-1">Allocate a unit to a client</p>
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
          <p className="text-gray-600 mt-1">Manage your sales pipeline, allocations, and reallocations</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => setShowReallocationModal(true)}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Re-allocate Unit
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleNewAllocation}>
            <Handshake className="h-4 w-4 mr-2" />
            New Allocation
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">45</div>
                <div className="text-sm text-gray-500">Active Leads</div>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">23</div>
                <div className="text-sm text-gray-500">Units Allocated</div>
              </div>
              <Handshake className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">₦2.4B</div>
                <div className="text-sm text-gray-500">Total Sales</div>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-500">Reallocations</div>
              </div>
              <ArrowRight className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocations">Active Allocations</TabsTrigger>
          <TabsTrigger value="history">Reallocation History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Sales Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {['Contacted', 'Inspection', 'Offer', 'Payment', 'Closed'].map((stage, index) => (
                  <div key={stage} className="text-center">
                    <div className="bg-gray-100 rounded-lg p-4 mb-2">
                      <div className="text-2xl font-bold text-gray-800">{12 - index * 2}</div>
                      <div className="text-sm text-gray-600">{stage}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((12 - index * 2) / 45 * 100)}% of total
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity with clickable items */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100"
                  onClick={() => navigate('/company/clients/1')}
                >
                  <div>
                    <div className="font-medium">Unit A-15 Allocated</div>
                    <div className="text-sm text-gray-600">Client: John Doe - Victoria Gardens</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <div 
                  className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100"
                  onClick={() => navigate('/company/clients/2')}
                >
                  <div>
                    <div className="font-medium">Payment Pending</div>
                    <div className="text-sm text-gray-600">Client: Jane Smith - ₦3.2M due</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </div>
                <div 
                  className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100"
                >
                  <div>
                    <div className="font-medium">Unit Re-allocated</div>
                    <div className="text-sm text-gray-600">Block A - Plot 02 transferred to John Doe</div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Re-allocated</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Unit Allocations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* This would typically be populated from your data source */}
                <div className="text-center py-8 text-gray-500">
                  <Handshake className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Allocation Management</h3>
                  <p className="text-gray-500 mb-6">View and manage all active unit allocations here.</p>
                  <Button onClick={handleNewAllocation} className="bg-purple-600 hover:bg-purple-700">
                    Create New Allocation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <ReallocationHistory />
        </TabsContent>
      </Tabs>

      {/* Reallocation Modal */}
      <ReallocationModal 
        isOpen={showReallocationModal}
        onClose={() => setShowReallocationModal(false)}
        onReallocation={handleReallocation}
      />
    </div>
  );
}
