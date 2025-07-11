import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Calendar, 
  FileText,
  HelpCircle,
  MessageSquare,
  BarChart3,
  Settings,
  Package,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';

const modules = [
  { 
    id: 'projects', 
    name: 'Projects & Units', 
    description: 'Manage properties, plots, and units',
    icon: Building2,
    category: 'Core'
  },
  { 
    id: 'clients', 
    name: 'Client Management', 
    description: 'Customer relationship management',
    icon: Users,
    category: 'Core'
  },
  { 
    id: 'sales', 
    name: 'Sales & Allocation', 
    description: 'Sales tracking and unit allocation',
    icon: DollarSign,
    category: 'Core'
  },
  { 
    id: 'accounting', 
    name: 'Accounting & Fees', 
    description: 'Financial management and fee collection',
    icon: BarChart3,
    category: 'Core'
  },
  { 
    id: 'marketers', 
    name: 'Marketers & Commission', 
    description: 'Marketer management and commission tracking',
    icon: Users,
    category: 'Core'
  },
  { 
    id: 'crm', 
    name: 'CRM Pipelines', 
    description: 'Lead management and pipeline tracking',
    icon: MessageSquare,
    category: 'Advanced'
  },
  { 
    id: 'calendar', 
    name: 'Calendar & Scheduling', 
    description: 'Appointment and event management',
    icon: Calendar,
    category: 'Advanced'
  },
  { 
    id: 'documents', 
    name: 'Document Manager', 
    description: 'Document storage and management',
    icon: FileText,
    category: 'Advanced'
  },
  { 
    id: 'notices', 
    name: 'Notice System', 
    description: 'Automated notice generation and sending',
    icon: MessageSquare,
    category: 'Professional'
  },
  { 
    id: 'referrals', 
    name: 'Referral Program', 
    description: 'Referral tracking and rewards',
    icon: Users,
    category: 'Professional'
  },
  { 
    id: 'reports', 
    name: 'Advanced Reports', 
    description: 'Detailed analytics and reporting',
    icon: BarChart3,
    category: 'Professional'
  },
  { 
    id: 'support', 
    name: 'Help & Support', 
    description: 'Customer support tools',
    icon: HelpCircle,
    category: 'Enterprise'
  }
];

const mockCompanies = [
  {
    id: 1,
    name: 'Global Real Estate Inc',
    plan: 'Enterprise',
    modules: ['projects', 'clients', 'sales', 'accounting', 'marketers', 'crm', 'calendar', 'documents', 'notices', 'referrals', 'reports', 'support']
  },
  {
    id: 2,
    name: 'ABC Properties Ltd',
    plan: 'Pro',
    modules: ['projects', 'clients', 'sales', 'accounting', 'marketers', 'crm', 'calendar', 'documents']
  },
  {
    id: 3,
    name: 'Metro Housing Co',
    plan: 'Pro',
    modules: ['projects', 'clients', 'sales', 'accounting', 'marketers', 'documents']
  },
  {
    id: 4,
    name: 'Prime Properties',
    plan: 'Starter',
    modules: ['projects', 'clients', 'sales', 'accounting']
  }
];

export function ModuleAccessTab() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || module.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleModuleForCompany = (companyId: number, moduleId: string) => {
    setCompanies(prev => prev.map(company => {
      if (company.id === companyId) {
        const hasModule = company.modules.includes(moduleId);
        return {
          ...company,
          modules: hasModule 
            ? company.modules.filter(m => m !== moduleId)
            : [...company.modules, moduleId]
        };
      }
      return company;
    }));
  };

  const getModuleUsage = (moduleId: string) => {
    const companiesWithModule = companies.filter(company => 
      company.modules.includes(moduleId)
    ).length;
    return {
      count: companiesWithModule,
      percentage: Math.round((companiesWithModule / companies.length) * 100)
    };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Core': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      case 'Professional': return 'bg-green-100 text-green-800';
      case 'Enterprise': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      case 'Pro': return 'bg-blue-100 text-blue-800';
      case 'Starter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Module Access Control</h3>
          <p className="text-slate-600">Enable or disable modules for each company</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'core', 'advanced', 'professional', 'enterprise'].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Module Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredModules.slice(0, 4).map((module) => {
          const usage = getModuleUsage(module.id);
          return (
            <Card key={module.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <module.icon className="h-5 w-5 text-blue-600" />
                  <div className="text-sm font-medium">{module.name}</div>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {usage.count}/{companies.length}
                </div>
                <div className="text-xs text-gray-500">
                  {usage.percentage}% adoption
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${usage.percentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Module Access Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Module Access Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Module</th>
                  {companies.map((company) => (
                    <th key={company.id} className="text-center p-4 font-medium min-w-40">
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <Badge className={`text-xs ${getPlanColor(company.plan)}`}>
                          {company.plan}
                        </Badge>
                      </div>
                    </th>
                  ))}
                  <th className="text-center p-4 font-medium">Usage</th>
                </tr>
              </thead>
              <tbody>
                {filteredModules.map((module) => {
                  const usage = getModuleUsage(module.id);
                  return (
                    <tr key={module.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <module.icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <div className="font-medium">{module.name}</div>
                            <div className="text-sm text-gray-500">{module.description}</div>
                            <Badge className={`text-xs ${getCategoryColor(module.category)}`}>
                              {module.category}
                            </Badge>
                          </div>
                        </div>
                      </td>
                      {companies.map((company) => (
                        <td key={company.id} className="p-4 text-center">
                          <Switch
                            checked={company.modules.includes(module.id)}
                            onCheckedChange={() => toggleModuleForCompany(company.id, module.id)}
                          />
                        </td>
                      ))}
                      <td className="p-4 text-center">
                        <div className="text-sm font-medium">{usage.count}/{companies.length}</div>
                        <div className="text-xs text-gray-500">{usage.percentage}%</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="font-medium mb-1">Enable All Core Modules</div>
            <div className="text-sm text-gray-500">Enable essential modules for all companies</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="font-medium mb-1">Plan-Based Access</div>
            <div className="text-sm text-gray-500">Auto-configure modules based on subscription plans</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Settings className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="font-medium mb-1">Module Templates</div>
            <div className="text-sm text-gray-500">Create and apply module configuration templates</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}