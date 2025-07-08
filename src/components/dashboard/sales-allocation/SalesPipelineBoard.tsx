import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Building, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowRight, 
  Eye, 
  Edit, 
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Tag
} from 'lucide-react';
import { SalesPipelineItem, PipelineStage } from '@/types/allocation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const pipelineStages: { 
  stage: PipelineStage; 
  title: string; 
  color: string; 
  bgColor: string; 
}[] = [
  { stage: 'lead', title: 'Lead', color: 'text-blue-700', bgColor: 'bg-blue-50' },
  { stage: 'inspection', title: 'Inspection', color: 'text-purple-700', bgColor: 'bg-purple-50' },
  { stage: 'offer', title: 'Offer', color: 'text-amber-700', bgColor: 'bg-amber-50' },
  { stage: 'allocation', title: 'Allocation', color: 'text-green-700', bgColor: 'bg-green-50' },
  { stage: 'paid', title: 'Paid', color: 'text-emerald-700', bgColor: 'bg-emerald-50' }
];

const mockPipelineData: SalesPipelineItem[] = [
  {
    id: '1',
    stage: 'lead',
    clientId: 'client-1',
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    projectId: 'project-1',
    projectName: 'Victoria Gardens',
    marketerId: 'marketer-1',
    marketerName: 'Sarah Wilson',
    assignedAt: '2024-01-15T10:00:00Z',
    lastUpdated: '2024-01-15T10:00:00Z',
    priority: 'high',
    tags: ['Hot Lead', 'Referred']
  },
  {
    id: '2',
    stage: 'inspection',
    clientId: 'client-2',
    clientName: 'Jane Smith',
    clientEmail: 'jane@example.com',
    projectId: 'project-2',
    projectName: 'Emerald Heights',
    plotNumber: 'Block B - Plot 15',
    saleAmount: '₦30,000,000',
    marketerId: 'marketer-2',
    marketerName: 'Mike Davis',
    assignedAt: '2024-01-14T14:30:00Z',
    lastUpdated: '2024-01-15T09:15:00Z',
    priority: 'medium',
    tags: ['Scheduled']
  },
  {
    id: '3',
    stage: 'offer',
    clientId: 'client-3',
    clientName: 'Robert Brown',
    clientEmail: 'robert@example.com',
    projectId: 'project-1',
    projectName: 'Victoria Gardens',
    plotNumber: 'Block A - Plot 8',
    saleAmount: '₦25,000,000',
    initialPayment: '₦5,000,000',
    marketerId: 'marketer-1',
    marketerName: 'Sarah Wilson',
    assignedAt: '2024-01-12T11:00:00Z',
    lastUpdated: '2024-01-14T16:45:00Z',
    priority: 'high',
    tags: ['Offer Sent', 'Pending Response']
  },
  {
    id: '4',
    stage: 'allocation',
    clientId: 'client-4',
    clientName: 'Alice Cooper',
    clientEmail: 'alice@example.com',
    projectId: 'project-3',
    projectName: 'Golden View',
    plotNumber: 'Block C - Plot 22',
    saleAmount: '₦35,000,000',
    initialPayment: '₦10,000,000',
    marketerId: 'marketer-3',
    marketerName: 'Tom Johnson',
    assignedAt: '2024-01-10T09:00:00Z',
    lastUpdated: '2024-01-13T14:20:00Z',
    priority: 'medium',
    tags: ['Allocated', 'Awaiting Payment']
  },
  {
    id: '5',
    stage: 'paid',
    clientId: 'client-5',
    clientName: 'David Wilson',
    clientEmail: 'david@example.com',
    projectId: 'project-2',
    projectName: 'Emerald Heights',
    plotNumber: 'Block A - Plot 5',
    saleAmount: '₦28,000,000',
    initialPayment: '₦28,000,000',
    marketerId: 'marketer-2',
    marketerName: 'Mike Davis',
    assignedAt: '2024-01-08T08:00:00Z',
    lastUpdated: '2024-01-12T12:00:00Z',
    priority: 'low',
    tags: ['Completed', 'Fully Paid']
  }
];

const mockProjects = [
  { id: 'all', name: 'All Projects' },
  { id: 'project-1', name: 'Victoria Gardens' },
  { id: 'project-2', name: 'Emerald Heights' },
  { id: 'project-3', name: 'Golden View' }
];

const mockMarketers = [
  { id: 'all', name: 'All Marketers' },
  { id: 'marketer-1', name: 'Sarah Wilson' },
  { id: 'marketer-2', name: 'Mike Davis' },
  { id: 'marketer-3', name: 'Tom Johnson' }
];

interface SalesPipelineBoardProps {
  onItemSelect?: (item: SalesPipelineItem) => void;
  onStageMove?: (itemId: string, newStage: PipelineStage) => void;
  onItemAction?: (action: string, item: SalesPipelineItem) => void;
}

export function SalesPipelineBoard({ onItemSelect, onStageMove, onItemAction }: SalesPipelineBoardProps) {
  const [pipelineItems, setPipelineItems] = useState(mockPipelineData);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [marketerFilter, setMarketerFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredItems = pipelineItems.filter(item => {
    const matchesSearch = item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.plotNumber && item.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProject = projectFilter === 'all' || item.projectId === projectFilter;
    const matchesMarketer = marketerFilter === 'all' || item.marketerId === marketerFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    
    return matchesSearch && matchesProject && matchesMarketer && matchesPriority;
  });

  const getItemsByStage = (stage: PipelineStage) => {
    return filteredItems.filter(item => item.stage === stage);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleItemAction = (action: string, item: SalesPipelineItem) => {
    onItemAction?.(action, item);
  };

  const handleStageMove = (itemId: string, newStage: PipelineStage) => {
    setPipelineItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, stage: newStage, lastUpdated: new Date().toISOString() }
          : item
      )
    );
    onStageMove?.(itemId, newStage);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Pipeline Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients, projects, plots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Project" />
              </SelectTrigger>
              <SelectContent>
                {mockProjects.map(project => (
                  <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={marketerFilter} onValueChange={setMarketerFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Marketer" />
              </SelectTrigger>
              <SelectContent>
                {mockMarketers.map(marketer => (
                  <SelectItem key={marketer.id} value={marketer.id}>{marketer.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Board */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-5 gap-4 min-w-[1200px] pb-4">
          {pipelineStages.map(({ stage, title, color, bgColor }) => {
            const stageItems = getItemsByStage(stage);
            return (
              <Card key={stage} className={`${bgColor} border-2`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-sm font-semibold ${color}`}>
                      {title}
                    </CardTitle>
                    <Badge variant="outline" className={color}>
                      {stageItems.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                  {stageItems.map(item => (
                    <Card 
                      key={item.id} 
                      className="bg-white border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => onItemSelect?.(item)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {item.clientName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-sm">{item.clientName}</p>
                                <p className="text-xs text-gray-500">{item.projectName}</p>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleItemAction('view', item)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleItemAction('edit', item)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleItemAction('call', item)}>
                                  <Phone className="h-4 w-4 mr-2" />
                                  Call Client
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleItemAction('email', item)}>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Email
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Plot & Amount Info */}
                          {item.plotNumber && (
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1">
                                <Building className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600">{item.plotNumber}</span>
                              </div>
                              {item.saleAmount && (
                                <div className="flex items-center space-x-1">
                                  <DollarSign className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs font-medium">{item.saleAmount}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Marketer */}
                          {item.marketerName && (
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{item.marketerName}</span>
                            </div>
                          )}

                          {/* Priority & Tags */}
                          <div className="space-y-2">
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority} priority
                            </Badge>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {item.tags.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {item.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{item.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Last Updated */}
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(item.lastUpdated).toLocaleDateString()}</span>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex space-x-1">
                            {stage !== 'paid' && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs h-6 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const nextStageIndex = pipelineStages.findIndex(s => s.stage === stage) + 1;
                                  if (nextStageIndex < pipelineStages.length) {
                                    handleStageMove(item.id, pipelineStages[nextStageIndex].stage);
                                  }
                                }}
                              >
                                <ArrowRight className="h-3 w-3 mr-1" />
                                Next Stage
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {stageItems.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <p className="text-sm">No items in this stage</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pipeline Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {pipelineStages.map(({ stage, title, color }) => {
              const count = getItemsByStage(stage).length;
              const totalValue = getItemsByStage(stage)
                .filter(item => item.saleAmount)
                .reduce((sum, item) => {
                  const amount = parseInt(item.saleAmount?.replace(/[₦,]/g, '') || '0');
                  return sum + amount;
                }, 0);
              
              return (
                <div key={stage} className="text-center">
                  <div className={`text-2xl font-bold ${color}`}>{count}</div>
                  <div className="text-sm text-gray-600">{title}</div>
                  {totalValue > 0 && (
                    <div className="text-xs text-gray-500">
                      ₦{totalValue.toLocaleString()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}