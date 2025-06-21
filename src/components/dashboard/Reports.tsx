
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FileText, Download, Calendar as CalendarIcon, BarChart, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function Reports() {
  const [reportType, setReportType] = useState('');
  const [allocationStatus, setAllocationStatus] = useState('all');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [projectFilter, setProjectFilter] = useState('');
  const [includeRevoked, setIncludeRevoked] = useState(false);

  const reportTypes = [
    { value: 'sales', label: 'Sales Report' },
    { value: 'allocation-status', label: 'Allocation Status Report' },
    { value: 'inventory', label: 'Inventory Report' },
    { value: 'financial', label: 'Financial Summary' },
    { value: 'marketing', label: 'Marketing Performance' },
    { value: 'project-status', label: 'Project Status Report' },
    { value: 'revocation', label: 'Revocation & Refunds Report' }
  ];

  const allocationStatuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'interested', label: 'Interested' },
    { value: 'offered', label: 'Offered' },
    { value: 'allocated', label: 'Allocated' },
    { value: 'revoked', label: 'Revoked' }
  ];

  const availableMetrics = [
    'Total Sales',
    'Units Sold',
    'Revenue Generated',
    'Commission Paid',
    'Available Units',
    'Reserved Units',
    'Agent Performance',
    'Payment Status',
    'Project Progress',
    'Customer Demographics',
    'Allocation Status Distribution',
    'Revocation Reasons',
    'Refund Analysis'
  ];

  const projects = [
    'All Projects',
    'Victoria Gardens Estate',
    'Emerald Heights',
    'Golden View Apartments'
  ];

  const handleMetricChange = (metric: string, checked: boolean | string) => {
    if (checked === true) {
      setSelectedMetrics([...selectedMetrics, metric]);
    } else {
      setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
    }
  };

  const generateReport = () => {
    if (!reportType) {
      toast.error('Please select a report type');
      return;
    }

    console.log('Generating report:', {
      type: reportType,
      allocationStatus,
      dateRange,
      metrics: selectedMetrics,
      project: projectFilter,
      includeRevoked
    });

    toast.success('Report generated successfully!');
  };

  const downloadReport = (format: 'pdf' | 'excel') => {
    console.log(`Downloading report as ${format}`);
    toast.success(`Report downloaded as ${format.toUpperCase()}!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <div className="text-sm text-gray-500 mt-1">
            Generate detailed reports for your business including payments, infrastructure fees, service charges, and allocation tracking
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => downloadReport('excel')}>
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => downloadReport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Report Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <Select onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="allocation-status">Allocation Status Filter</Label>
              <Select onValueChange={setAllocationStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select allocation status" />
                </SelectTrigger>
                <SelectContent>
                  {allocationStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="project-filter">Project Filter</Label>
              <Select onValueChange={setProjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Date Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, 'PPP') : 'From date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, 'PPP') : 'To date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-revoked" 
                checked={includeRevoked}
                onCheckedChange={(checked) => setIncludeRevoked(checked === true)}
              />
              <Label htmlFor="include-revoked">Include revoked allocations with refund details</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Metrics & Data Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableMetrics.map((metric) => (
                <div key={metric} className="flex items-center space-x-2">
                  <Checkbox 
                    id={metric}
                    checked={selectedMetrics.includes(metric)}
                    onCheckedChange={(checked) => handleMetricChange(metric, checked)}
                  />
                  <Label htmlFor={metric} className="text-sm">{metric}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Generate Report</h3>
              <p className="text-gray-600">
                Configure your report settings above and click generate to create your custom report.
              </p>
            </div>
            <Button onClick={generateReport} className="bg-purple-600 hover:bg-purple-700">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview/Results would go here */}
      {reportType && (
        <Card>
          <CardHeader>
            <CardTitle>Report Preview - {reportTypes.find(t => t.value === reportType)?.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>Report preview will be displayed here based on your configuration.</p>
              {allocationStatus !== 'all' && (
                <p className="mt-2 text-sm">Filtered by status: <strong>{allocationStatuses.find(s => s.value === allocationStatus)?.label}</strong></p>
              )}
              {includeRevoked && (
                <p className="mt-1 text-sm text-orange-600">Including revocation and refund details</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
