
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Search, Filter, Calendar } from 'lucide-react';

const mockLogs = [
  {
    id: 1,
    timestamp: '2024-01-20 14:30:25',
    actor: 'admin@propyos.com',
    action: 'Company Suspended',
    module: 'Companies',
    target: 'Sunset Developments',
    severity: 'high',
    details: 'Company suspended due to payment failure'
  },
  {
    id: 2,
    timestamp: '2024-01-20 14:15:12',
    actor: 'admin@propyos.com',
    action: 'Login Attempt',
    module: 'Authentication',
    target: 'Super Admin Portal',
    severity: 'low',
    details: 'Successful login from IP: 192.168.1.100'
  },
  {
    id: 3,
    timestamp: '2024-01-20 13:45:33',
    actor: 'admin@propyos.com',
    action: 'Feature Toggle',
    module: 'Global Settings',
    target: 'Calendar & Scheduling',
    severity: 'medium',
    details: 'Feature enabled for Enterprise plans'
  },
  {
    id: 4,
    timestamp: '2024-01-20 13:30:45',
    actor: 'admin@propyos.com',
    action: 'Impersonation',
    module: 'Companies',
    target: 'ABC Properties Ltd',
    severity: 'high',
    details: 'Admin impersonated company account for support'
  },
  {
    id: 5,
    timestamp: '2024-01-20 12:20:10',
    actor: 'system',
    action: 'Billing Cycle',
    module: 'Billing',
    target: 'Monthly Subscriptions',
    severity: 'low',
    details: 'Automated billing cycle processed for 93 companies'
  },
  {
    id: 6,
    timestamp: '2024-01-20 11:55:22',
    actor: 'admin@propyos.com',
    action: 'Plan Update',
    module: 'Billing',
    target: 'Global Real Estate Inc',
    severity: 'medium',
    details: 'Company plan upgraded from Growth to Enterprise'
  },
  {
    id: 7,
    timestamp: '2024-01-20 11:30:15',
    actor: 'system',
    action: 'Database Backup',
    module: 'System',
    target: 'Primary Database',
    severity: 'low',
    details: 'Scheduled backup completed successfully'
  },
  {
    id: 8,
    timestamp: '2024-01-20 10:45:30',
    actor: 'admin@propyos.com',
    action: 'Config Change',
    module: 'Global Settings',
    target: 'Email Templates',
    severity: 'medium',
    details: 'Updated welcome email template'
  }
];

const activitySummary = {
  last7Days: 156,
  last30Days: 743,
  last90Days: 2156,
  criticalActions: 23
};

export function SystemLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [actorFilter, setActorFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesActor = actorFilter === 'all' || log.actor === actorFilter;
    
    return matchesSearch && matchesModule && matchesSeverity && matchesActor;
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
    console.log(`Exporting logs as ${format}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-slate-600" />
              <span>System Logs & Audit Trail</span>
            </CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="text-2xl font-bold text-blue-600">{activitySummary.last7Days}</div>
              <div className="text-sm text-gray-600">Last 7 Days</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-green-600">{activitySummary.last30Days}</div>
              <div className="text-sm text-gray-600">Last 30 Days</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-purple-600">{activitySummary.last90Days}</div>
              <div className="text-sm text-gray-600">Last 90 Days</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-red-600">{activitySummary.criticalActions}</div>
              <div className="text-sm text-gray-600">Critical Actions</div>
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
            <Select value="all" onValueChange={() => {}}>
              <SelectTrigger>
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">Login Attempts</SelectItem>
                <SelectItem value="suspend">Suspensions</SelectItem>
                <SelectItem value="impersonate">Impersonations</SelectItem>
                <SelectItem value="config">Config Changes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={actorFilter} onValueChange={setActorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Actors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actors</SelectItem>
                <SelectItem value="admin@propyos.com">admin@propyos.com</SelectItem>
                <SelectItem value="system">System</SelectItem>
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
                    <TableCell>{log.target}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getSeverityColor(log.severity)}>
                        {log.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 max-w-xs truncate">
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
