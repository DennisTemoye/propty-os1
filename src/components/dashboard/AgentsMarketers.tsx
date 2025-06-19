
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp, Users, DollarSign } from 'lucide-react';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';

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

  const activeAgents = mockAgents.filter(agent => agent.status === 'active').length;
  const totalLeads = mockAgents.reduce((sum, agent) => sum + agent.leads, 0);
  const totalCommission = mockAgents.reduce((sum, agent) => {
    const commission = parseFloat(agent.commission.replace('₦', '').replace('M', ''));
    return sum + commission;
  }, 0);

  const kpiData = [
    {
      title: 'Total Agents',
      value: mockAgents.length.toString(),
      subtitle: 'All registered',
      icon: Users,
      gradient: 'bg-gradient-to-tr from-purple-500 to-blue-400',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Active',
      value: activeAgents.toString(),
      subtitle: 'Currently working',
      icon: TrendingUp,
      gradient: 'bg-gradient-to-tr from-green-400 to-teal-300',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Total Leads',
      value: totalLeads.toString(),
      subtitle: 'All time generated',
      icon: Users,
      gradient: 'bg-gradient-to-tr from-orange-400 to-amber-300',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      title: 'Total Commission',
      value: `₦${totalCommission.toFixed(1)}M`,
      subtitle: 'Earnings to date',
      icon: DollarSign,
      gradient: 'bg-gradient-to-tr from-indigo-400 to-pink-300',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agents & Marketers</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
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
            gradient={kpi.gradient}
            iconBg={kpi.iconBg}
            iconColor={kpi.iconColor}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow bg-white">
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
