import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Download,
  Filter
} from 'lucide-react';

const projectData = [
  { name: 'Victoria Gardens', collected: 8500000, outstanding: 3200000, overdue: 1200000 },
  { name: 'Emerald Heights', collected: 6200000, outstanding: 4800000, overdue: 800000 },
  { name: 'Golden View', collected: 9100000, outstanding: 2100000, overdue: 400000 },
  { name: 'Sunset Heights', collected: 4300000, outstanding: 5600000, overdue: 1800000 }
];

const feeTypeData = [
  { name: 'Infrastructure Fee', value: 75, color: '#8884d8' },
  { name: 'Service Charge', value: 20, color: '#82ca9d' },
  { name: 'Maintenance Fee', value: 5, color: '#ffc658' }
];

const overdueAlerts = [
  {
    client: 'John Doe',
    project: 'Victoria Gardens',
    amount: '₦1,200,000',
    daysOverdue: 15,
    feeType: 'Infrastructure Fee'
  },
  {
    client: 'Jane Smith',
    project: 'Emerald Heights',
    amount: '₦50,000',
    daysOverdue: 8,
    feeType: 'Service Charge'
  },
  {
    client: 'Mike Johnson',
    project: 'Sunset Heights',
    amount: '₦800,000',
    daysOverdue: 22,
    feeType: 'Infrastructure Fee'
  }
];

export function FeeMonitoringDashboard() {
  const totalCollected = projectData.reduce((sum, project) => sum + Number(project.collected), 0);
  const totalOutstanding = projectData.reduce((sum, project) => sum + Number(project.outstanding), 0);
  const totalOverdue = projectData.reduce((sum, project) => sum + Number(project.overdue), 0);
  
  const collectionRate = (totalCollected / (totalCollected + totalOutstanding)) * 100;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {collectionRate.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-500">Collection Rate</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <Progress value={collectionRate} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  ₦{(totalOverdue / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-500">Overdue Amount</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {overdueAlerts.length} overdue payments
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">15</div>
                <div className="text-sm text-gray-500">Pending This Month</div>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ₦{(totalOutstanding / 1000000).toFixed(1)}M outstanding
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  ₦{(totalCollected / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-500">Collected YTD</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collection by Project */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Collection by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
                <Bar dataKey="collected" fill="#10b981" name="Collected" />
                <Bar dataKey="outstanding" fill="#f59e0b" name="Outstanding" />
                <Bar dataKey="overdue" fill="#ef4444" name="Overdue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={feeTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {feeTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Overdue Payments Alert</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overdueAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <div>
                    <div className="font-medium">{alert.client}</div>
                    <div className="text-sm text-gray-600">
                      {alert.project} • {alert.feeType}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-red-600">{alert.amount}</div>
                  <Badge variant="destructive" className="text-xs">
                    {alert.daysOverdue} days overdue
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Send Reminder
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Record Payment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Download className="h-4 w-4 mr-2" />
              Collection Summary (PDF)
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="h-4 w-4 mr-2" />
              Overdue Report (CSV)
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="h-4 w-4 mr-2" />
              Fee Analysis (Excel)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
