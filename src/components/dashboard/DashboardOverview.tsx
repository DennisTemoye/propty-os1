
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, DollarSign, FileText, UserCheck, Calculator, TrendingUp, Plus, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';

const kpiData = [
  {
    title: 'Total Projects',
    value: '24',
    subtitle: '3 New This Quarter',
    icon: Building,
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-400',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Active Clients',
    value: '1,247',
    subtitle: '89 New This Month',
    icon: Users,
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-400',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Total Sales Revenue',
    value: '₦2.4B',
    subtitle: '156 Units Sold',
    icon: DollarSign,
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-400',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Pending Allocations',
    value: '23',
    subtitle: 'Awaiting Processing',
    icon: FileText,
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-amber-400',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Available Units',
    value: '187',
    subtitle: 'Ready for Allocation',
    icon: MapPin,
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-purple-400',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Monthly Collections',
    value: '₦450M',
    subtitle: '92% Collection Rate',
    icon: Calculator,
    gradientFrom: 'from-green-500',
    gradientTo: 'to-emerald-400',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Completed Deals',
    value: '89',
    subtitle: 'This Quarter',
    icon: CheckCircle,
    gradientFrom: 'from-teal-500',
    gradientTo: 'to-cyan-400',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Scheduled Inspections',
    value: '34',
    subtitle: 'Next 7 Days',
    icon: Calendar,
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-pink-400',
    iconBgColor: 'bg-white/20',
    iconColor: 'text-white',
  },
];

const salesData = [
  { month: 'Jan', sales: 65, revenue: 2.4, allocations: 58 },
  { month: 'Feb', sales: 59, revenue: 2.1, allocations: 62 },
  { month: 'Mar', sales: 80, revenue: 2.8, allocations: 75 },
  { month: 'Apr', sales: 81, revenue: 3.2, allocations: 79 },
  { month: 'May', sales: 56, revenue: 2.0, allocations: 54 },
  { month: 'Jun', sales: 72, revenue: 2.6, allocations: 68 },
];

const projectStatusData = [
  { name: 'Active Projects', value: 45, color: '#10b981' },
  { name: 'In Planning', value: 25, color: '#3b82f6' },
  { name: 'Pre-Launch', value: 20, color: '#f59e0b' },
  { name: 'Completed', value: 10, color: '#8b5cf6' },
];

const financialData = [
  { month: 'Jan', income: 450, expenses: 180, profit: 270 },
  { month: 'Feb', income: 520, expenses: 195, profit: 325 },
  { month: 'Mar', income: 480, expenses: 170, profit: 310 },
  { month: 'Apr', income: 680, expenses: 220, profit: 460 },
  { month: 'May', income: 590, expenses: 200, profit: 390 },
  { month: 'Jun', income: 720, expenses: 240, profit: 480 },
];

export function DashboardOverview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 border-b px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-purple-200 mt-1">Real Estate Sales & Project Management Overview</p>
          </div>
          <Button className="bg-white hover:bg-purple-50 text-purple-900 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="h-5 w-5 mr-2" />
            New Project Site
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

        {/* Main Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">Sales & Allocations Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    formatter={(value, name) => [
                      value, 
                      name === 'sales' ? 'Units Sold' : 
                      name === 'allocations' ? 'Allocations' : 'Revenue (₦M)'
                    ]}
                    contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="sales" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="allocations" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">Financial Overview (₦M)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    formatter={(value, name) => [
                      `₦${value}M`, 
                      name === 'income' ? 'Income' : 
                      name === 'expenses' ? 'Expenses' : 'Profit'
                    ]}
                    contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="income" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="profit" stackId="3" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.8} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">Project Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
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

          <Card className="bg-white border shadow-sm rounded-xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-xl border-l-4 border-green-500">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">New client allocation completed</p>
                    <p className="text-xs text-gray-600">John Doe - Victoria Gardens Block A, Unit 12</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">5 min ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Payment received</p>
                    <p className="text-xs text-gray-600">₦2.5M initial payment - Lagos Estate Project</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">1 hour ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Site inspection scheduled</p>
                    <p className="text-xs text-gray-600">Sunrise Estate - Tomorrow 10:00 AM</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Document uploaded</p>
                    <p className="text-xs text-gray-600">Survey plan - Greenfield Heights</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">4 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Top Performing Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Victoria Gardens</p>
                      <p className="text-xs text-gray-600">85% units sold • 127 allocations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-600">₦1.2B</span>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Lagos Estate</p>
                      <p className="text-xs text-gray-600">72% units sold • 98 allocations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">₦890M</span>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Sunrise Estate</p>
                      <p className="text-xs text-gray-600">68% units sold • 76 allocations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-purple-600">₦650M</span>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Client Allocation Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Total Allocated Units</span>
                  <span className="text-2xl font-bold text-gray-900">456</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Fully Paid</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm font-medium">298</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">On Payment Plan</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm font-medium">134</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pending Documentation</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm font-medium">24</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Collection Rate</span>
                    <span className="text-xl font-bold text-green-600">92.3%</span>
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
