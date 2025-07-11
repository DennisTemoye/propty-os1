
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  Settings,
  FileText,
  Shield,
  Server,
  Database,
  Globe,
  BarChart3,
  Calendar,
  UserCheck,
  Home,
  CreditCard,
  Clock,
  Eye,
  UserPlus,
  Pause,
  Play,
  Trash2,
  Download,
  MessageSquare,
  HelpCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  Zap,
  Target,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';
import { CompanyManagementTab } from './superadmin/CompanyManagementTab';
import { BillingControlTab } from './superadmin/BillingControlTab';
import { ModuleAccessTab } from './superadmin/ModuleAccessTab';
import { ReportsAnalyticsTab } from './superadmin/ReportsAnalyticsTab';
import { SupportToolsTab } from './superadmin/SupportToolsTab';

export function SuperAdminOverview() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Super Admin Dashboard</h2>
          <p className="text-slate-600 mt-1">Centralized control and oversight of the ProptyOS platform</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Companies</p>
                    <p className="text-2xl font-bold">247</p>
                    <p className="text-xs text-green-600">+12 this month</p>
                  </div>
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                    <p className="text-2xl font-bold">189</p>
                    <p className="text-xs text-green-600">76% of total</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold">₦15.2M</p>
                    <p className="text-xs text-green-600">+24% vs last month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Platform Health</p>
                    <p className="text-2xl font-bold text-green-600">99.9%</p>
                    <p className="text-xs text-gray-600">System uptime</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="companies">
          <CompanyManagementTab />
        </TabsContent>

        <TabsContent value="billing">
          <BillingControlTab />
        </TabsContent>

        <TabsContent value="modules">
          <ModuleAccessTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsAnalyticsTab />
        </TabsContent>

        <TabsContent value="support">
          <SupportToolsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
