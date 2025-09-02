import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Filter, Calendar as CalendarIcon, RefreshCw, Save } from 'lucide-react';
import { format } from 'date-fns';
import { ReportFilters as ReportFiltersType } from '@/services/reportService';

interface ReportFiltersProps {
  filters: ReportFiltersType;
  onFiltersChange: (filters: ReportFiltersType) => void;
  onReset: () => void;
  onSaveTemplate?: () => void;
  reportType: string;
  projects: Array<{ id: string; name: string }>;
  marketers: Array<{ id: string; name: string }>;
  clients: Array<{ id: string; name: string }>;
  loading?: boolean;
}

export function ReportFilters({
  filters,
  onFiltersChange,
  onReset,
  onSaveTemplate,
  reportType,
  projects,
  marketers,
  clients,
  loading = false
}: ReportFiltersProps) {
  const updateFilter = (key: keyof ReportFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const getStatusOptions = () => {
    switch (reportType) {
      case 'sales':
        return [
          { value: 'all', label: 'All Statuses' },
          { value: 'interested', label: 'Interested' },
          { value: 'offered', label: 'Offered' },
          { value: 'allocated', label: 'Allocated' },
          { value: 'revoked', label: 'Revoked' },
          { value: 'completed', label: 'Completed' }
        ];
      case 'project':
        return [
          { value: 'all', label: 'All Statuses' },
          { value: 'planning', label: 'Planning' },
          { value: 'active', label: 'Active' },
          { value: 'on-hold', label: 'On Hold' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' }
        ];
      case 'client':
        return [
          { value: 'all', label: 'All Statuses' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'prospect', label: 'Prospect' },
          { value: 'vip', label: 'VIP' }
        ];
      default:
        return [
          { value: 'all', label: 'All Statuses' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' }
        ];
    }
  };

  const getDateRangeOptions = () => [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'this-week', label: 'This Week' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'this-year', label: 'This Year' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleQuickDateSelect = (range: string) => {
    const now = new Date();
    let from: Date;
    let to: Date;

    switch (range) {
      case 'today':
        from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        to = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'yesterday':
        from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        to = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        break;
      case 'this-week':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        from = new Date(startOfWeek);
        to = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        break;
      case 'last-week':
        const lastWeekStart = new Date(now.setDate(now.getDate() - now.getDay() - 7));
        from = new Date(lastWeekStart);
        to = new Date(now.setDate(now.getDate() + 6));
        break;
      case 'this-month':
        from = new Date(now.getFullYear(), now.getMonth(), 1);
        to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'last-month':
        from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        to = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'this-quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        from = new Date(now.getFullYear(), quarter * 3, 1);
        to = new Date(now.getFullYear(), quarter * 3 + 3, 0);
        break;
      case 'last-quarter':
        const lastQuarter = Math.floor(now.getMonth() / 3) - 1;
        from = new Date(now.getFullYear(), lastQuarter * 3, 1);
        to = new Date(now.getFullYear(), lastQuarter * 3 + 3, 0);
        break;
      case 'this-year':
        from = new Date(now.getFullYear(), 0, 1);
        to = new Date(now.getFullYear(), 11, 31);
        break;
      case 'last-year':
        from = new Date(now.getFullYear() - 1, 0, 1);
        to = new Date(now.getFullYear() - 1, 11, 31);
        break;
      default:
        return;
    }

    updateFilter('dateFrom', from.toISOString().split('T')[0]);
    updateFilter('dateTo', to.toISOString().split('T')[0]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters & Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Date Range Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Quick Date Ranges</Label>
          <div className="flex flex-wrap gap-2">
            {getDateRangeOptions().map((option) => (
              <Button
                key={option.value}
                variant="outline"
                size="sm"
                onClick={() => handleQuickDateSelect(option.value)}
                disabled={loading}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Date Range Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>From Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateFrom ? format(new Date(filters.dateFrom), 'PPP') : 'Select start date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateFrom ? new Date(filters.dateFrom) : undefined}
                  onSelect={(date) => updateFilter('dateFrom', date?.toISOString().split('T')[0])}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>To Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateTo ? format(new Date(filters.dateTo), 'PPP') : 'Select end date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateTo ? new Date(filters.dateTo) : undefined}
                  onSelect={(date) => updateFilter('dateTo', date?.toISOString().split('T')[0])}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Project and Entity Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.length > 0 && (
            <div className="space-y-2">
              <Label>Project</Label>
              <Select
                value={filters.projectId || 'all'}
                onValueChange={(value) => updateFilter('projectId', value === 'all' ? undefined : value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {marketers.length > 0 && (
            <div className="space-y-2">
              <Label>Marketer</Label>
              <Select
                value={filters.marketerId || 'all'}
                onValueChange={(value) => updateFilter('marketerId', value === 'all' ? undefined : value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select marketer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Marketers</SelectItem>
                  {marketers.map((marketer) => (
                    <SelectItem key={marketer.id} value={marketer.id}>
                      {marketer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {clients.length > 0 && (
            <div className="space-y-2">
              <Label>Client</Label>
              <Select
                value={filters.clientId || 'all'}
                onValueChange={(value) => updateFilter('clientId', value === 'all' ? undefined : value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={filters.status || 'all'}
            onValueChange={(value) => updateFilter('status', value === 'all' ? undefined : value)}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {getStatusOptions().map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Additional Options */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Additional Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-revoked"
                checked={filters.includeRevoked || false}
                onCheckedChange={(checked) => updateFilter('includeRevoked', checked)}
                disabled={loading}
              />
              <Label htmlFor="include-revoked" className="text-sm">
                Include Revoked Allocations
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-pending"
                checked={filters.includePending || false}
                onCheckedChange={(checked) => updateFilter('includePending', checked)}
                disabled={loading}
              />
              <Label htmlFor="include-pending" className="text-sm">
                Include Pending Items
              </Label>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(filters.projectId || filters.marketerId || filters.clientId || filters.status || filters.dateFrom || filters.dateTo) && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {filters.dateFrom && (
                <Badge variant="secondary" className="text-xs">
                  From: {format(new Date(filters.dateFrom), 'MMM dd, yyyy')}
                </Badge>
              )}
              {filters.dateTo && (
                <Badge variant="secondary" className="text-xs">
                  To: {format(new Date(filters.dateTo), 'MMM dd, yyyy')}
                </Badge>
              )}
              {filters.projectId && (
                <Badge variant="secondary" className="text-xs">
                  Project: {projects.find(p => p.id === filters.projectId)?.name}
                </Badge>
              )}
              {filters.marketerId && (
                <Badge variant="secondary" className="text-xs">
                  Marketer: {marketers.find(m => m.id === filters.marketerId)?.name}
                </Badge>
              )}
              {filters.clientId && (
                <Badge variant="secondary" className="text-xs">
                  Client: {clients.find(c => c.id === filters.clientId)?.name}
                </Badge>
              )}
              {filters.status && (
                <Badge variant="secondary" className="text-xs">
                  Status: {getStatusOptions().find(s => s.value === filters.status)?.label}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={onReset}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Filters
            </Button>
            
            {onSaveTemplate && (
              <Button
                variant="outline"
                onClick={onSaveTemplate}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save as Template
              </Button>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            {loading ? 'Applying filters...' : 'Filters applied'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
