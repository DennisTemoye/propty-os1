
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Search, Filter, Activity, Building2, Users, Settings } from 'lucide-react';

const mockLogs = [
  {
    id: 1,
    timestamp: '2024-01-20 14:30:25',
    actor: 'admin@propyos.com',
    action: 'Company Suspended',
    module: 'Companies',
    target: 'Sunset Developments',
    details: 'Company suspended due to payment failure - subscription expired',
    severity: 'high',
    ipAddress: '192.168.1.100'
  },
  {
    id: 2,
    timestamp: '2024-01-20 14:15:12',
    actor: 'admin@propyos.com',
    action: 'Super Admin Login',
    module: 'Authentication',
    target: 'Super Admin Portal',
    details: 'Successful login to super admin dashboard',
    severity: 'low',
    ipAddress: '192.168.1.100'
  },
  {
    id: 3,
    timestamp: '2024-01-20 13:45:33',
    actor: 'admin@propyos.com',
    action: 'Module Toggle',
    module: 'Global Settings',
    target: 'CRM & Pipelines',
    details: 'CRM module enabled for Growth and Enterprise plans',
    severity: 'medium',
    ipAddress: '192.168.1.100'
  },
  {
    id: 4,
    timestamp: '2024-01-20 13:30:45',
    actor: 'admin@propyos.com',
    action: 'Company Impersonation',
    module: 'Companies',
    target: 'ABC Properties Ltd',
    details: 'Admin accessed company dashboard for technical support',
    severity: 'high',
    ipAddress: '192.168.1.100'
  },
  {
    id: 5,
    timestamp: '2024-01-20 12:20:10',
    actor: 'system',
    action: 'Subscription Billing',
    module: 'Billing',
    target: 'Monthly Subscriptions',
    details: 'Automated billing cycle processed for 93 companies - total revenue ₦15.2M',
    severity: 'low',
    ipAddress: 'system'
  },
  {
    id: 6,
    timestamp: '2024-01-20 11:55:22',
    actor: 'admin@propyos.com',
    action: 'Plan Upgrade',
    module: 'Billing',
    target: 'Global Real Estate Inc',
    details: 'Company plan upgraded from Growth to Enterprise - effective immediately',
    severity: 'medium',
    ipAddress: '192.168.1.100'
  },
  {
    id: 7,
    timestamp: '2024-01-20 11:30:15',
    actor: 'system',
    action: 'Database Backup',
    module: 'System',
    target: 'Primary Database',
    details: 'Scheduled backup completed successfully - 2.3GB archived',
    severity: 'low',
    ipAddress: 'system'
  },
  {
    id: 8,
    timestamp: '2024-01-20 10:45:30',
    actor: 'admin@propyos.com',
    action: 'Email Template Update',
    module: 'Global Settings',
    target: 'Welcome Email Template',
    details: 'Updated welcome email template with new ProptyOS branding',
    severity: 'medium',
    ipAddress: '192.168.1.100'
  },
  {
    id: 9,
    timestamp: '2024-01-20 09:15:42',
    actor: 'system',
    action: 'Company Signup',
    module: 'Companies',
    target: 'Prime Properties Lagos',
    details: 'New company registered with Growth plan - 14-day trial started',
    severity: 'low',
    ipAddress: '41.74.123.45'
  },
  {
    id: 10,
    timestamp: '2024-01-20 08:30:18',
    actor: 'admin@propyos.com',
    action: 'Role Configuration',
    module: 'Global Settings',
    target: 'Default Company Roles',
    details: 'Updated permissions for Sales Officer role - removed accounting access',
    severity: 'medium',
    ipAddress: '192.168.1.100'
  }
];

const activitySummary = {
  last7Days: 156,
  last30Days: 743,
  last90Days: 2156,
  criticalActions: 23,
  systemAlerts: 8,
  companySignups: 12
};

export function SystemLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [actorFilter, setActorFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesActor = actorFilter === 'all' || log.actor === actorFilter;
    const matchesAction = actionFilter === 'all' || log.action.toLowerCase().includes(actionFilter.toLowerCase());
    
    return matchesSearch && matchesModule && matchesSeverity && matchesActor && matchesAction;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getModuleColor = (module: string) => {
    switch (module) {
      case 'Companies':
        return 'bg-blue-100 text-blue-800';
      case 'Billing':
        return 'bg-green-100 text-green-800';
      case 'Authentication':
        return 'bg-purple-100 text-purple-800';
      case 'Global Settings':
        return 'bg-orange-100 text-orange-800';
      case 'System':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExport = (format: string) => {
    console.log(`Exporting ProptyOS system logs as ${format}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-slate-600" />
                <span>ProptyOS System Logs & Audit Trail</span>
              </CardTitle>
              <p className="text-slate-600 mt-1">Monitor all system-level activities and administrative actions</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('json')}>
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Activity Summary */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{activitySummary.last7Days}</div>
                  <div className="text-sm text-gray-600">Last 7 Days</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{activitySummary.last30Days}</div>
                  <div className="text-sm text-gray-600">Last 30 Days</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{activitySummary.last90Days}</div>
                  <div className="text-sm text-gray-600">Last 90 Days</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-red-600">{activitySummary.criticalActions}</div>
                  <div className="text-sm text-gray-600">Critical Actions</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{activitySummary.systemAlerts}</div>
                  <div className="text-sm text-gray-600">System Alerts</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">{activitySummary.companySignups}</div>
                  <div className="text-sm text-gray-600">New Signups</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Modules" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="Companies">Companies</SelectItem>
                <SelectItem value="Billing">Billing</SelectItem>
                <SelectItem value="Authentication">Authentication</SelectItem>
                <SelectItem value="Global Settings">Global Settings</SelectItem>
                <SelectItem value="System">System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">Login Actions</SelectItem>
                <SelectItem value="suspend">Suspensions</SelectItem>
                <SelectItem value="impersonate">Impersonations</SelectItem>
                <SelectItem value="toggle">Module Toggles</SelectItem>
                <SelectItem value="signup">Company Signups</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Select value={actorFilter} onValueChange={setActorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Actors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actors</SelectItem>
                <SelectItem value="admin@propyos.com">admin@propyos.com</SelectItem>
                <SelectItem value="system">System Automated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logs Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${log.actor === 'system' ? 'bg-gray-400' : 'bg-blue-400'}`} />
                        <span className="text-sm">{log.actor}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{log.action}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getModuleColor(log.module)}>
                        {log.module}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{log.target}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getSeverityColor(log.severity)}>
                        {log.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 max-w-md">
                      {log.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No logs found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
