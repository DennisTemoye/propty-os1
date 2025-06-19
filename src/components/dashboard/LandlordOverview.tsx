
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, DollarSign, Wrench, Home, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';

const kpiData = [
  {
    title: 'Total Properties',
    value: '8',
    subtitle: 'Active portfolio',
    icon: Building,
    gradient: 'bg-gradient-to-tr from-purple-500 to-blue-400',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Occupied Units',
    value: '42',
    subtitle: '95% occupancy rate',
    icon: Home,
    gradient: 'bg-gradient-to-tr from-green-400 to-teal-300',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Monthly Rent',
    value: '$48,500',
    subtitle: 'Collected this month',
    icon: DollarSign,
    gradient: 'bg-gradient-to-tr from-orange-400 to-amber-300',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Maintenance Tasks',
    value: '6',
    subtitle: '2 urgent',
    icon: Wrench,
    gradient: 'bg-gradient-to-tr from-indigo-400 to-pink-300',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Active Tenants',
    value: '42',
    subtitle: 'Current leases',
    icon: Users,
    gradient: 'bg-gradient-to-tr from-emerald-400 to-cyan-300',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
  },
  {
    title: 'Lease Renewals',
    value: '5',
    subtitle: 'Due this quarter',
    icon: Calendar,
    gradient: 'bg-gradient-to-tr from-rose-400 to-pink-300',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
  },
];

const rentData = [
  { month: 'Jan', collected: 45000, expected: 48500 },
  { month: 'Feb', collected: 48500, expected: 48500 },
  { month: 'Mar', collected: 46800, expected: 48500 },
  { month: 'Apr', collected: 48500, expected: 48500 },
  { month: 'May', collected: 47200, expected: 48500 },
  { month: 'Jun', collected: 48500, expected: 48500 },
];

export function LandlordOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Landlord Dashboard</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Add New Property
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <GradientKpiCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            subtitle={kpi.subtitle}
            icon={kpi.icon}
            gradient={kpi.gradient}
            iconBg={kpi.iconBg}
            iconColor={kpi.iconColor}
          />
        ))}
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Rent Collection Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="collected" fill="#8b5cf6" name="Collected" />
                <Bar dataKey="expected" fill="#e5e7eb" name="Expected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Rent Payment Received</p>
                  <p className="text-sm text-gray-500">Unit 2A - $1,200</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">Maintenance Request</p>
                  <p className="text-sm text-gray-500">Unit 3B - Plumbing issue</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Lease Renewal Due</p>
                  <p className="text-sm text-gray-500">Unit 1C - Next month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Overview */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Property Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Building className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-gray-500">Total Properties</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Home className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-gray-500">Total Units</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">42</div>
              <div className="text-sm text-gray-500">Occupied</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-gray-500">Vacant</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
