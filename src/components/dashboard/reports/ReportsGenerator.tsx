
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FileText, Download, Calendar as CalendarIcon, BarChart } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { DownloadButton } from '@/components/ui/download-button';

export function ReportsGenerator() {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [projectFilter, setProjectFilter] = useState('');

  const reportTypes = [
    { value: 'sales', label: 'Sales Report' },
    { value: 'inventory', label: 'Inventory Report' },
    { value: 'financial', label: 'Financial Summary' },
    { value: 'marketing', label: 'Marketing Performance' },
    { value: 'project-status', label: 'Project Status Report' },
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
    'Customer Demographics'
  ];

  const projects = [
    'All Projects',
    'Victoria Gardens Estate',
    'Emerald Heights',
    'Golden View Apartments'
  ];

  const handleMetricChange = (metric: string, checked: boolean) => {
    if (checked) {
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
      dateRange,
      metrics: selectedMetrics,
      project: projectFilter
    });

    toast.success('Report generated successfully!');
  };

  const getReportData = () => {
    // Generate mock data based on selected filters
    return {
      reportType,
      dateRange,
      metrics: selectedMetrics,
      project: projectFilter,
      generatedAt: new Date().toISOString(),
      data: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        metric: selectedMetrics[i % selectedMetrics.length] || 'Sample Metric',
        value: Math.floor(Math.random() * 1000000),
        date: new Date().toISOString().split('T')[0]
      }))
    };
  };

  return (
    <div className="space-y-6">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Metrics to Include</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {availableMetrics.map((metric) => (
                <div key={metric} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric}
                    checked={selectedMetrics.includes(metric)}
                    onCheckedChange={(checked) => handleMetricChange(metric, checked as boolean)}
                  />
                  <Label htmlFor={metric} className="text-sm font-normal">
                    {metric}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Report Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 min-h-32 flex items-center justify-center">
            {reportType ? (
              <div className="text-center">
                <FileText className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                <p className="font-medium">
                  {reportTypes.find(t => t.value === reportType)?.label} Preview
                </p>
                <p className="text-sm text-gray-500">
                  {selectedMetrics.length} metrics selected
                  {projectFilter && ` • ${projectFilter}`}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Select a report type to see preview</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Save Template
        </Button>
        {reportType && (
          <DownloadButton
            data={getReportData()}
            filename={`${reportType}-report-${new Date().toISOString().split('T')[0]}`}
            formats={['pdf', 'csv', 'xlsx']}
            template="report"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          />
        )}
        <Button onClick={generateReport} className="bg-purple-600 hover:bg-purple-700">
          <Download className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>
    </div>
  );
}
