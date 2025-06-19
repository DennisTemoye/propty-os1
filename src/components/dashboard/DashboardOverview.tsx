
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, DollarSign, FileText, UserCheck, Calculator, Truck, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const kpiData = [
  {
    title: 'Total Sales',
    value: '₦2.4B',
    subtitle: '156 Units Sold',
    icon: DollarSign,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    cardBg: 'from-emerald-50/50 to-emerald-100/30',
    trend: '+12.5%'
  },
  {
    title: 'Ongoing Projects',
    value: '12',
    subtitle: '3 New This Month',
    icon: Building,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    cardBg: 'from-blue-50/50 to-blue-100/30',
    trend: '+25%'
  },
  {
    title: 'Total Clients',
    value: '1,247',
    subtitle: '89 Active',
    icon: Users,
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    cardBg: 'from-purple-50/50 to-purple-100/30',
    trend: '+8.3%'
  },
  {
    title: 'Pending Allocations',
    value: '23',
    subtitle: 'Awaiting Approval',
    icon: FileText,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    cardBg: 'from-amber-50/50 to-amber-100/30',
    trend: '-5.2%'
  },
  {
    title: 'Active Marketers',
    value: '45',
    subtitle: '8 Top Performers',
    icon: UserCheck,
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    iconBg: 'bg-indigo-100',
    cardBg: 'from-indigo-50/50 to-indigo-100/30',
    trend: '+15.7%'
  },
  {
    title: 'Commissions Paid',
    value: '₦45.2M',
    subtitle: 'This Month',
    icon: Calculator,
    color: 'text-teal-700',
    bgColor: 'bg-teal-50',
    iconBg: 'bg-teal-100',
    cardBg: 'from-teal-50/50 to-teal-100/30',
    trend: '+18.9%'
  },
  {
    title: 'Monthly Expenses',
    value: '₦12.8M',
    subtitle: 'Operational Costs',
    icon: Truck,
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    cardBg: 'from-rose-50/50 to-rose-100/30',
    trend: '+3.1%'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-8 py-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent">
              Company Dashboard
            </h1>
            <p className="text-slate-600 text-lg font-medium">Welcome back! Here's your business overview</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold">
            <Plus className="h-5 w-5 mr-3" />
            Add New Project
          </Button>
        </div>
      </div>

      <div className="px-8 py-8 max-w-7xl mx-auto space-y-10">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Card key={index} className={`bg-gradient-to-br ${kpi.cardBg} border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-3xl overflow-hidden group`}>
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      {kpi.title}
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{kpi.value}</div>
                    <div className="text-sm text-slate-500 font-medium">{kpi.subtitle}</div>
                    <div className={`text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'} bg-white/60 px-3 py-1 rounded-full inline-block`}>
                      {kpi.trend}
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl ${kpi.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <kpi.icon className={`h-7 w-7 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Additional Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl lg:col-span-2 overflow-hidden">
            <CardHeader className="pb-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
              <CardTitle className="text-2xl font-bold text-slate-800">Sales Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} fontWeight={500} />
                  <YAxis stroke="#64748b" fontSize={12} fontWeight={500} />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'sales' ? 'Units Sold' : 'Revenue (₦B)']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '16px', 
                      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  />
                  <Bar dataKey="sales" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
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

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="pb-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
              <CardTitle className="text-2xl font-bold text-slate-800">Project Status</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelStyle={{ fontSize: '12px', fontWeight: '600' }}
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '16px', 
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                    fontSize: '14px',
                    fontWeight: '500'
                  }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
              <CardTitle className="text-2xl font-bold text-slate-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-white rounded-2xl border border-emerald-100">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg"></div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-slate-800">New client onboarded</p>
                    <p className="text-sm text-slate-600 font-medium">John Doe - Lagos Estate</p>
                  </div>
                  <span className="text-xs text-slate-500 bg-white/80 px-3 py-2 rounded-xl font-medium">2 min ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-100">
                  <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-slate-800">Payment received</p>
                    <p className="text-sm text-slate-600 font-medium">₦2.5M - Victoria Gardens</p>
                  </div>
                  <span className="text-xs text-slate-500 bg-white/80 px-3 py-2 rounded-xl font-medium">1 hour ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-white rounded-2xl border border-purple-100">
                  <div className="w-3 h-3 bg-purple-500 rounded-full shadow-lg"></div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-slate-800">Commission approved</p>
                    <p className="text-sm text-slate-600 font-medium">Agent Smith - ₦125K</p>
                  </div>
                  <span className="text-xs text-slate-500 bg-white/80 px-3 py-2 rounded-xl font-medium">3 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
              <CardTitle className="text-2xl font-bold text-slate-800">Top Performing Agents</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-white rounded-2xl border border-purple-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-base font-bold text-white">JS</span>
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-800">Jane Smith</p>
                      <p className="text-sm text-slate-600 font-medium">16 sales this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-600">₦4.2M</span>
                    <div className="text-xs text-slate-500 font-medium">Commission</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-base font-bold text-white">MD</span>
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-800">Mike Davis</p>
                      <p className="text-sm text-slate-600 font-medium">8 sales this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-600">₦3.1M</span>
                    <div className="text-xs text-slate-500 font-medium">Commission</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-white rounded-2xl border border-emerald-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-base font-bold text-white">SJ</span>
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-800">Sarah Johnson</p>
                      <p className="text-sm text-slate-600 font-medium">6 sales this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-600">₦2.8M</span>
                    <div className="text-xs text-slate-500 font-medium">Commission</div>
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
