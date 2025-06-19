
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp, Users, DollarSign, UserCheck } from 'lucide-react';

const kpiData = [
  {
    title: 'Total Agents',
    value: '45',
    subtitle: '8 New This Month',
    icon: Users,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    cardBg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    border: 'border-purple-200',
    valueColor: 'text-purple-900',
  },
  {
    title: 'Active Agents',
    value: '38',
    subtitle: '84% Active Rate',
    icon: UserCheck,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    cardBg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    valueColor: 'text-emerald-900',
  },
  {
    title: 'Total Leads',
    value: '112',
    subtitle: '23 This Week',
    icon: TrendingUp,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-sky-500 to-sky-600',
    cardBg: 'bg-gradient-to-br from-sky-50 to-sky-100',
    border: 'border-sky-200',
    valueColor: 'text-sky-900',
  },
  {
    title: 'Total Commission',
    value: '₦7.3M',
    subtitle: 'This Month',
    icon: DollarSign,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
    cardBg: 'bg-gradient-to-br from-amber-50 to-amber-100',
    border: 'border-amber-200',
    valueColor: 'text-amber-900',
  },
];

const mockAgents = [
  {
    id: 1,
    name: 'Jane Smith',
    email: 'jane@proptyos.com',
    phone: '+234 801 111 2222',
    leads: 45,
    conversions: 12,
    sales: 8,
    commission: '₦2.4M',
    status: 'active',
    projects: ['Victoria Gardens', 'Emerald Heights'],
  },
  {
    id: 2,
    name: 'Mike Davis',
    email: 'mike@proptyos.com',
    phone: '+234 802 333 4444',
    leads: 38,
    conversions: 15,
    sales: 10,
    commission: '₦3.1M',
    status: 'active',
    projects: ['Golden View', 'Victoria Gardens'],
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah@proptyos.com',
    phone: '+234 803 555 6666',
    leads: 29,
    conversions: 8,
    sales: 6,
    commission: '₦1.8M',
    status: 'inactive',
    projects: ['Emerald Heights'],
  },
];

export function AgentsMarketers() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agents & Marketers</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className={`${kpi.cardBg} ${kpi.border} border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {kpi.title}
                  </div>
                  <div className={`text-3xl font-bold ${kpi.valueColor} mb-1`}>{kpi.value}</div>
                  <div className="text-xs text-gray-600">{kpi.subtitle}</div>
                </div>
                <div className={`p-3 rounded-xl ${kpi.iconBg} shadow-lg`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-600">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <p className="text-sm text-gray-500">{agent.email}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{agent.leads}</div>
                    <div className="text-xs text-gray-500">Leads</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-600">{agent.conversions}</div>
                    <div className="text-xs text-gray-500">Conversions</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{agent.sales}</div>
                    <div className="text-xs text-gray-500">Sales</div>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Commission:</span>
                    <span className="font-bold text-purple-600">{agent.commission}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="text-xs text-gray-500 mb-1">Assigned Projects:</div>
                  <div className="flex flex-wrap gap-1">
                    {agent.projects.map((project, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Export Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
