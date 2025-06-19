
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, DollarSign, FileText, UserCheck, Calculator, Truck, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';

const kpiData = [
  {
    title: 'Total Sales',
    value: '₦2.4B',
    subtitle: '156 Units Sold',
    icon: DollarSign,
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-blue-400',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Ongoing Projects',
    value: '12',
    subtitle: '3 New This Month',
    icon: Building,
    gradientFrom: 'from-green-400',
    gradientTo: 'to-teal-300',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Total Clients',
    value: '1,247',
    subtitle: '89 Active',
    icon: Users,
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-amber-300',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Pending Allocations',
    value: '23',
    subtitle: 'Awaiting Approval',
    icon: FileText,
    gradientFrom: 'from-indigo-400',
    gradientTo: 'to-pink-300',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Active Marketers',
    value: '45',
    subtitle: '8 Top Performers',
    icon: UserCheck,
    gradientFrom: 'from-violet-400',
    gradientTo: 'to-purple-300',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Commissions Paid',
    value: '₦45.2M',
    subtitle: 'This Month',
    icon: Calculator,
    gradientFrom: 'from-emerald-400',
    gradientTo: 'to-cyan-300',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Monthly Expenses',
    value: '₦12.8M',
    subtitle: 'Operational Costs',
    icon: Truck,
    gradientFrom: 'from-rose-400',
    gradientTo: 'to-pink-300',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's your business overview</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="h-5 w-5 mr-2" />
            Add New Project
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <GradientKpiCard
              key={index}
              title={kpi.title}
              value={kpi.value}
              subtitle={kpi.subtitle}
              icon={kpi.icon}
              gradientFrom={kpi.gradientFrom}
              gradientTo={kpi.gradientTo}
              iconBgColor={kpi.iconBgColor}
              iconColor={kpi.iconColor}
            />
          ))}
        </div>

        {/* Charts and Additional Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white border shadow-sm rounded-xl lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'sales' ? 'Units Sold' : 'Revenue (₦B)']}
                    contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="sales" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">Project Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-xl">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">New client onboarded</p>
                    <p className="text-xs text-gray-600">John Doe - Lagos Estate</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">2 min ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-xl">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Payment received</p>
                    <p className="text-xs text-gray-600">₦2.5M - Victoria Gardens</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">1 hour ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-xl">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Commission approved</p>
                    <p className="text-xs text-gray-600">Agent Smith - ₦125K</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">3 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Top Performing Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold text-white">JS</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Jane Smith</p>
                      <p className="text-xs text-gray-600">16 sales this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-600">₦4.2M</span>
                    <div className="text-xs text-gray-500">Commission</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold text-white">MD</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Mike Davis</p>
                      <p className="text-xs text-gray-600">8 sales this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-600">₦3.1M</span>
                    <div className="text-xs text-gray-500">Commission</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold text-white">SJ</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Sarah Johnson</p>
                      <p className="text-xs text-gray-600">6 sales this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-600">₦2.8M</span>
                    <div className="text-xs text-gray-500">Commission</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
