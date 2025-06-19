import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, CreditCard, DollarSign, AlertCircle, Calculator, TrendingUp, Calendar, Plus, Home } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const kpiData = [
  {
    title: 'Total Properties',
    value: '8',
    subtitle: '+1 from last month',
    icon: Building,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    cardBg: 'from-blue-50 to-blue-100',
  },
  {
    title: 'Total Units',
    value: '42',
    subtitle: '36 occupied, 6 vacant',
    icon: Home,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    cardBg: 'from-emerald-50 to-emerald-100',
  },
  {
    title: 'Occupancy Rate',
    value: '85.7%',
    subtitle: '+2.3% from last month',
    icon: Users,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    cardBg: 'from-purple-50 to-purple-100',
  },
  {
    title: 'Monthly Revenue',
    value: '$51,000',
    subtitle: '+8.2% from last month',
    icon: DollarSign,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    cardBg: 'from-emerald-50 to-emerald-100',
  },
  {
    title: 'Annual Revenue',
    value: '$620,000',
    subtitle: '+6.9% from last year',
    icon: Calendar,
    color: 'text-sky-700',
    bgColor: 'bg-sky-100',
    cardBg: 'from-sky-50 to-sky-100',
  },
  {
    title: 'Outstanding Balance',
    value: '$3,250',
    subtitle: '3 overdue accounts',
    icon: AlertCircle,
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    cardBg: 'from-red-50 to-red-100',
  },
  {
    title: 'Net Profit',
    value: '$495,000',
    subtitle: 'Annual profit margin: 79.8%',
    icon: TrendingUp,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    cardBg: 'from-emerald-50 to-emerald-100',
  },
  {
    title: 'Operating Expenses',
    value: '$11,500',
    subtitle: 'This month',
    icon: Calculator,
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    cardBg: 'from-amber-50 to-amber-100',
  },
];

const monthlyData = [
  { month: 'Jan', rent: 45000, expenses: 8500 },
  { month: 'Feb', rent: 47200, expenses: 9200 },
  { month: 'Mar', rent: 46800, expenses: 7800 },
  { month: 'Apr', rent: 48500, expenses: 10200 },
  { month: 'May', rent: 49200, expenses: 8900 },
  { month: 'Jun', rent: 51000, expenses: 11500 },
];

const annualData = [
  { year: '2022', rent: 520000, expenses: 98000 },
  { year: '2023', rent: 580000, expenses: 112000 },
  { year: '2024', rent: 620000, expenses: 125000 },
];

const occupancyData = [
  { name: 'Occupied', value: 36, color: '#10b981' },
  { name: 'Vacant', value: 6, color: '#f59e0b' },
];

const chartConfig = {
  rent: {
    label: "Rent",
    color: "#8b5cf6",
  },
  expenses: {
    label: "Expenses", 
    color: "#ef4444",
  },
};

export function LandlordOverview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Landlord Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your properties and tenants efficiently</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="h-5 w-5 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Card key={index} className={`bg-gradient-to-br ${kpi.cardBg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      {kpi.title}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                    <div className="text-xs text-gray-500">{kpi.subtitle}</div>
                  </div>
                  <div className={`p-3 rounded-xl ${kpi.bgColor} shadow-sm`}>
                    <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">Monthly Revenue vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="rent" fill="url(#rentGradient)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="url(#expenseGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="rentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                      <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#f87171" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">Annual Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={annualData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="rent" stroke="#8b5cf6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">Unit Occupancy</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={occupancyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {occupancyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border shadow-sm rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-xl">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Rent payment received</p>
                    <p className="text-xs text-gray-600">Unit 2A - John Smith - $1,200</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">2h ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-xl">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">New tenant added</p>
                    <p className="text-xs text-gray-600">Unit 3B - Sarah Johnson</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">5h ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-xl">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Maintenance request</p>
                    <p className="text-xs text-gray-600">Unit 1C - Plumbing issue</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">1d ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-xl">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Overdue payment</p>
                    <p className="text-xs text-gray-600">Unit 4A - Mike Davis - $950</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">3d ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Due Dates */}
        <Card className="bg-white border shadow-sm rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">Upcoming Due Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Unit 1A - Mike Davis</p>
                  <p className="text-xs text-gray-600">Due: Dec 1, 2024</p>
                </div>
                <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg">$950</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Unit 2C - Lisa Wong</p>
                  <p className="text-xs text-gray-600">Due: Dec 1, 2024</p>
                </div>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">$1,100</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Unit 3A - Robert Kim</p>
                  <p className="text-xs text-gray-600">Due: Dec 3, 2024</p>
                </div>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">$1,300</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
