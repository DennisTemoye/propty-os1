
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RolesList } from './roles/RolesList';
import { UserManagement } from './roles/UserManagement';
import { Shield, Plus, Users, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';

export function RolesPermissions() {
  const kpiData = [
    {
      title: 'User Roles',
      value: '8',
      subtitle: 'Active roles',
      icon: Shield,
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-blue-400',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Active Users',
      value: '45',
      subtitle: 'Currently logged',
      icon: Users,
      gradientFrom: 'from-green-400',
      gradientTo: 'to-teal-300',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Pending Invites',
      value: '12',
      subtitle: 'Awaiting response',
      icon: Users,
      gradientFrom: 'from-orange-400',
      gradientTo: 'to-amber-300',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Permissions',
      value: '156',
      subtitle: 'Total configured',
      icon: Settings,
      gradientFrom: 'from-indigo-400',
      gradientTo: 'to-pink-300',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Roles & Permissions</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Invite User</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <RolesList />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
