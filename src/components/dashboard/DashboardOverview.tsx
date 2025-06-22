import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Building, Users, DollarSign, TrendingUp, Eye, ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockData = [
  {
    title: 'Total Projects',
    value: '12',
    subtitle: 'All registered',
    icon: Building,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    cardBg: 'from-purple-50 to-purple-100',
  },
  {
    title: 'Total Clients',
    value: '247',
    subtitle: 'All registered clients',
    icon: Users,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    cardBg: 'from-emerald-50 to-emerald-100',
  },
  {
    title: 'Revenue Generated',
    value: '₦15.2M',
    subtitle: 'Revenue this month',
    icon: DollarSign,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    cardBg: 'from-blue-50 to-blue-100',
  },
  {
    title: 'Sales Growth',
    value: '+25%',
    subtitle: 'Compared to last month',
    icon: TrendingUp,
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    cardBg: 'from-amber-50 to-amber-100',
  },
];

const mockSalesData = [
  {
    name: 'John Doe',
    sales: 120,
    commission: '₦12,000',
    conversionRate: '2.5%',
    status: 'active',
    lastActivity: '2 days ago',
    target: 150,
  },
  {
    name: 'Jane Smith',
    sales: 95,
    commission: '₦9,500',
    conversionRate: '1.8%',
    status: 'inactive',
    lastActivity: '1 week ago',
    target: 100,
  },
  {
    name: 'Alice Johnson',
    sales: 150,
    commission: '₦15,000',
    conversionRate: '3.2%',
    status: 'active',
    lastActivity: '1 day ago',
    target: 180,
  },
  {
    name: 'Bob Williams',
    sales: 78,
    commission: '₦7,800',
    conversionRate: '1.5%',
    status: 'active',
    lastActivity: '3 days ago',
    target: 90,
  },
  {
    name: 'Charlie Brown',
    sales: 110,
    commission: '₦11,000',
    conversionRate: '2.8%',
    status: 'inactive',
    lastActivity: '5 days ago',
    target: 130,
  },
];

export function DashboardOverview() {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('30');
  const [isNewAllocationOpen, setIsNewAllocationOpen] = useState(false);

  const handleViewDetails = (name: string) => {
    alert(`View details for ${name}`);
  };

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Monitor your real estate operations and performance metrics</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate('/company/projects/new')}>
              <Building className="h-4 w-4 mr-2" />
              New Project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/company/clients/new')}>
              <Users className="h-4 w-4 mr-2" />
              New Client
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsNewAllocationOpen(true)}>
              <DollarSign className="h-4 w-4 mr-2" />
              New Allocation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockData.map((item, index) => (
          <Card key={index} className={`bg-gradient-to-br ${item.cardBg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {item.title}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.subtitle}</div>
                </div>
                <div className={`p-3 rounded-xl ${item.bgColor} shadow-sm`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Performance Overview */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Sales Performance</CardTitle>
          <select
            className="border rounded-md px-2 py-1 text-sm focus:outline-none"
            value={selectedTimeframe}
            onChange={(e) => handleTimeframeChange(e.target.value)}
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockSalesData.map((sale, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sale.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{sale.sales}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{sale.commission}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{sale.conversionRate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={sale.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {sale.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{sale.lastActivity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(sale.name)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 text-gray-600">
            <li>New client "Acme Corp" added to the system</li>
            <li>Project "Sunset Villas" moved to construction phase</li>
            <li>Sales agent John Doe closed a deal worth ₦500,000</li>
            <li>Document "Land Agreement" uploaded for project "Golden Estate"</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
