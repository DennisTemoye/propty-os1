
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, DollarSign, FileText, UserCheck, Calculator, Truck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const kpiData = [
  {
    title: 'Total Sales',
    value: '₦2.4B',
    subtitle: '156 Units Sold',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Ongoing Projects',
    value: '12',
    subtitle: '3 New This Month',
    icon: Building,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Total Clients',
    value: '1,247',
    subtitle: '89 Active',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Pending Allocations',
    value: '23',
    subtitle: 'Awaiting Approval',
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    title: 'Active Marketers',
    value: '45',
    subtitle: '8 Top Performers',
    icon: UserCheck,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    title: 'Commissions Paid',
    value: '₦45.2M',
    subtitle: 'This Month',
    icon: Calculator,
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
  },
  {
    title: 'Monthly Expenses',
    value: '₦12.8M',
    subtitle: 'Operational Costs',
    icon: Truck,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
];

const salesData = [
  { month: 'Jan', sales: 65, revenue: 2.4 },
  { month: 'Feb', sales: 59, revenue: 2.1 },
  { month: 'Mar', sales: 80, revenue: 2.8 },
  { month: 'Apr', sales: 81, revenue: 3.2 },
  { month: 'May', sales: 56, revenue: 2.0 },
  { month: 'Jun', sales: 55, revenue: 1.9 },
];

const projectStatusData = [
  { name: 'Completed', value: 40, color: '#10b981' },
  { name: 'In Progress', value: 35, color: '#3b82f6' },
  { name: 'Planning', value: 25, color: '#f59e0b' },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <p className="text-xs text-gray-500 mt-1">{kpi.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [value, name === 'sales' ? 'Units Sold' : 'Revenue (₦B)']} />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New client onboarded</p>
                  <p className="text-xs text-gray-500">John Doe - Lagos Estate</p>
                </div>
                <span className="text-xs text-gray-400">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment received</p>
                  <p className="text-xs text-gray-500">₦2.5M - Victoria Gardens</p>
                </div>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Commission approved</p>
                  <p className="text-xs text-gray-500">Agent Smith - ₦125K</p>
                </div>
                <span className="text-xs text-gray-400">3 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-600">JS</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-xs text-gray-500">16 sales this month</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">₦4.2M</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">MD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mike Davis</p>
                    <p className="text-xs text-gray-500">8 sales this month</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">₦3.1M</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">SJ</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-xs text-gray-500">6 sales this month</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">₦2.8M</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
