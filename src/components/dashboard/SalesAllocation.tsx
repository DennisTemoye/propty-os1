import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Handshake, DollarSign, FileText, Users, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function SalesAllocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNewAllocationForm, setShowNewAllocationForm] = useState(false);

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
          <p className="text-gray-600 mt-1">Manage your sales pipeline, allocations, and contracts</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleNewAllocation}>
          <Handshake className="h-4 w-4 mr-2" />
          New Allocation
        </Button>
      </div>

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
                <div className="text-2xl font-bold text-purple-600">18</div>
                <div className="text-sm text-gray-500">Pending Contracts</div>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
