
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  DollarSign, 
  TrendingUp,
  Users,
  Calculator
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const salesTrends = [
  { month: 'Jan', preAllocation: 8, postAllocation: 12, totalRevenue: 450000000 },
  { month: 'Feb', preAllocation: 12, postAllocation: 15, totalRevenue: 680000000 },
  { month: 'Mar', preAllocation: 15, postAllocation: 18, totalRevenue: 820000000 },
  { month: 'Apr', preAllocation: 18, postAllocation: 22, totalRevenue: 950000000 },
  { month: 'May', preAllocation: 20, postAllocation: 25, totalRevenue: 1100000000 },
  { month: 'Jun', preAllocation: 24, postAllocation: 28, totalRevenue: 1250000000 }
];

const projectPerformance = [
  { project: 'Victoria Gardens', sales: 45, revenue: 1200000000, type: 'mixed' },
  { project: 'Emerald Heights', sales: 32, revenue: 960000000, type: 'pre' },
  { project: 'Golden View', sales: 28, revenue: 840000000, type: 'post' },
  { project: 'Ocean Breeze', sales: 25, revenue: 750000000, type: 'mixed' }
];

const saleTypeDistribution = [
  { type: 'Pre-Allocation', count: 78, percentage: 60 },
  { type: 'Post-Allocation', count: 52, percentage: 40 }
];

export function OverviewTab() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Sales Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              <span>Sales Type Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {saleTypeDistribution.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-purple-600'}`} />
                    <span className="font-medium">{type.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{type.count} sales</div>
                    <div className="text-sm text-gray-500">{type.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Sales Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Sale Value</span>
                <span className="font-bold text-green-600">₦32.5M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="font-bold text-blue-600">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time to Allocation</span>
                <span className="font-bold text-purple-600">12 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Client Satisfaction</span>
                <span className="font-bold text-orange-600">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Sales Trends by Type</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="preAllocation" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="postAllocation" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Project Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-green-600" />
            <span>Project Sales Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectPerformance.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium">{project.project}</div>
                    <div className="text-sm text-gray-600">
                      {project.sales} units sold • 
                      <Badge variant="outline" className="ml-2">
                        {project.type === 'mixed' ? 'Mixed Sales' : project.type === 'pre' ? 'Pre-Allocation' : 'Post-Allocation'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{formatCurrency(project.revenue)}</div>
                  <div className="text-sm text-gray-500">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
