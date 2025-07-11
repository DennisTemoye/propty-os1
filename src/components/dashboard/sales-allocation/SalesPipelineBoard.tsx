import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowRight, 
  Plus, 
  Search, 
  Filter,
  Users,
  Building,
  Eye,
  MoreHorizontal,
  Calendar,
  DollarSign
} from 'lucide-react';
import { SalesPipelineEntry, SalesPipelineStage } from '@/types/allocation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface SalesPipelineBoardProps {
  onMoveToStage?: (entryId: string, newStage: SalesPipelineStage) => void;
  onViewDetails?: (entry: SalesPipelineEntry) => void;
  onAllocatePlot?: (entry: SalesPipelineEntry) => void;
}

const mockPipelineData: SalesPipelineEntry[] = [
  {
    id: '1',
    clientId: 'client-1',
    clientName: 'John Doe',
    projectId: 'proj-1',
    projectName: 'Victoria Gardens',
    plotNumber: 'Block A - Plot 02',
    stage: 'lead',
    marketerId: 'market-1',
    marketerName: 'Jane Smith',
    saleAmount: '₦25,000,000',
    initialPayment: '₦5,000,000',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    notes: 'Interested in premium location',
    priority: 'high'
  },
  {
    id: '2',
    clientId: 'client-2',
    clientName: 'Sarah Johnson',
    projectId: 'proj-2',
    projectName: 'Emerald Heights',
    plotNumber: 'Block B - Plot 12',
    stage: 'inspection',
    marketerId: 'market-2',
    marketerName: 'Mike Davis',
    saleAmount: '₦30,000,000',
    createdAt: '2024-01-14T09:00:00Z',
    updatedAt: '2024-01-20T14:00:00Z',
    notes: 'Scheduled site visit completed',
    priority: 'medium'
  },
  {
    id: '3',
    clientId: 'client-3',
    clientName: 'Robert Brown',
    projectId: 'proj-3',
    projectName: 'Golden View',
    plotNumber: 'Block C - Plot 05',
    stage: 'offer',
    marketerId: 'market-1',
    marketerName: 'Jane Smith',
    saleAmount: '₦22,000,000',
    initialPayment: '₦4,400,000',
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-22T16:00:00Z',
    notes: 'Offer sent, awaiting response',
    priority: 'high'
  },
  {
    id: '4',
    clientId: 'client-4',
    clientName: 'Alice Cooper',
    projectId: 'proj-1',
    projectName: 'Victoria Gardens',
    plotNumber: 'Block A - Plot 08',
    stage: 'allocation',
    marketerId: 'market-3',
    marketerName: 'Tom Wilson',
    saleAmount: '₦28,000,000',
    initialPayment: '₦14,000,000',
    createdAt: '2024-01-10T12:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z',
    notes: 'Plot allocated, pending approval',
    priority: 'high'
  }
];

const stages: { key: SalesPipelineStage; label: string; color: string; bgColor: string }[] = [
  { key: 'lead', label: 'Lead', color: 'text-blue-700', bgColor: 'bg-blue-50' },
  { key: 'inspection', label: 'Inspection', color: 'text-purple-700', bgColor: 'bg-purple-50' },
  { key: 'offer', label: 'Offer', color: 'text-amber-700', bgColor: 'bg-amber-50' },
  { key: 'allocation', label: 'Allocation', color: 'text-green-700', bgColor: 'bg-green-50' },
  { key: 'paid', label: 'Paid', color: 'text-emerald-700', bgColor: 'bg-emerald-50' }
];

export function SalesPipelineBoard({ onMoveToStage, onViewDetails, onAllocatePlot }: SalesPipelineBoardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [marketerFilter, setMarketerFilter] = useState('all');
  const [pipelineData, setPipelineData] = useState(mockPipelineData);

  const filteredData = pipelineData.filter(entry => {
    const matchesSearch = entry.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.plotNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'all' || entry.projectName === projectFilter;
    const matchesMarketer = marketerFilter === 'all' || entry.marketerName === marketerFilter;
    
    return matchesSearch && matchesProject && matchesMarketer;
  });

  const getEntriesForStage = (stage: SalesPipelineStage) => {
    return filteredData.filter(entry => entry.stage === stage);
  };

  const handleMoveToNextStage = (entry: SalesPipelineEntry) => {
    const currentStageIndex = stages.findIndex(s => s.key === entry.stage);
    if (currentStageIndex < stages.length - 1) {
      const nextStage = stages[currentStageIndex + 1].key;
      setPipelineData(prev => 
        prev.map(item => 
          item.id === entry.id 
            ? { ...item, stage: nextStage, updatedAt: new Date().toISOString() }
            : item
        )
      );
      onMoveToStage?.(entry.id, nextStage);
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const projects = [...new Set(mockPipelineData.map(entry => entry.projectName))];
  const marketers = [...new Set(mockPipelineData.map(entry => entry.marketerName))];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-blue-600" />
            <span>Sales Pipeline - Lead to Paid</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients or plots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={marketerFilter} onValueChange={setMarketerFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Marketers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Marketers</SelectItem>
                {marketers.map(marketer => (
                  <SelectItem key={marketer} value={marketer}>{marketer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-[600px]">
        {stages.map((stage) => {
          const entries = getEntriesForStage(stage.key);
          return (
            <Card key={stage.key} className={`${stage.bgColor} border-2`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-lg ${stage.color}`}>
                    {stage.label}
                  </CardTitle>
                  <Badge className={`${stage.color.replace('text-', 'bg-').replace('-700', '-100')} ${stage.color} border-current`}>
                    {entries.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {entries.map((entry) => (
                  <Card key={entry.id} className="bg-white border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Priority indicator and client name */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(entry.priority)}`}></div>
                            <h4 className="font-medium text-sm">{entry.clientName}</h4>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onViewDetails?.(entry)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {stage.key === 'allocation' && (
                                <DropdownMenuItem onClick={() => onAllocatePlot?.(entry)}>
                                  <Building className="h-4 w-4 mr-2" />
                                  Manage Allocation
                                </DropdownMenuItem>
                              )}
                              {stage.key !== 'paid' && (
                                <DropdownMenuItem onClick={() => handleMoveToNextStage(entry)}>
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  Move to {stages[stages.findIndex(s => s.key === stage.key) + 1]?.label}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Project and plot */}
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">{entry.projectName}</p>
                          <p className="text-xs font-medium text-gray-800">{entry.plotNumber}</p>
                        </div>

                        {/* Amount */}
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3 text-green-600" />
                          <span className="text-sm font-medium text-green-700">{entry.saleAmount}</span>
                        </div>

                        {/* Marketer */}
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 text-blue-600" />
                          <span className="text-xs text-blue-700">{entry.marketerName}</span>
                        </div>

                        {/* Last updated */}
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            {new Date(entry.updatedAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Notes */}
                        {entry.notes && (
                          <p className="text-xs text-gray-600 italic truncate" title={entry.notes}>
                            {entry.notes}
                          </p>
                        )}

                        {/* Quick actions */}
                        <div className="flex space-x-1 pt-2 border-t">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 text-xs"
                            onClick={() => onViewDetails?.(entry)}
                          >
                            View
                          </Button>
                          {stage.key !== 'paid' && (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 text-xs"
                              onClick={() => handleMoveToNextStage(entry)}
                            >
                              Move →
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add new entry button for Lead stage */}
                {stage.key === 'lead' && (
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Lead
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pipeline Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stages.map((stage) => {
              const entries = getEntriesForStage(stage.key);
              const totalValue = entries.reduce((sum, entry) => {
                const amount = parseFloat(entry.saleAmount.replace(/[₦,]/g, ''));
                return sum + amount;
              }, 0);
              
              return (
                <div key={stage.key} className="text-center space-y-2">
                  <div className={`p-3 rounded-lg ${stage.bgColor}`}>
                    <div className={`text-2xl font-bold ${stage.color}`}>
                      {entries.length}
                    </div>
                    <div className="text-sm text-gray-600">{stage.label}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    ₦{totalValue.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}