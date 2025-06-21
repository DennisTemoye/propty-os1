import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, User, Building, DollarSign, MessageSquare, Calendar, TrendingUp, Users, Target, Clock, LayoutGrid, List, Table as TableIcon, Search, Filter, MoreVertical, Phone, Mail, MapPin, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '@/hooks/use-responsive';

interface Lead {
  id: string;
  clientName: string;
  clientId: string;
  development: string;
  developmentId: string;
  stage: 'contacted' | 'inspection' | 'offer' | 'payment' | 'closed';
  dealValue: number;
  source: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  notes: { text: string; timestamp: string; author: string }[];
  createdAt: string;
  lastActivity: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    clientName: 'John Doe',
    clientId: '1',
    development: 'Victoria Gardens',
    developmentId: '1',
    stage: 'contacted',
    dealValue: 25000000,
    source: 'Website',
    assignedTo: 'Sarah Wilson',
    priority: 'high',
    notes: [
      { text: 'Initial contact made via website inquiry', timestamp: '2024-01-15T10:30:00Z', author: 'Sarah Wilson' }
    ],
    createdAt: '2024-01-15T10:30:00Z',
    lastActivity: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    clientName: 'Jane Smith',
    clientId: '2',
    development: 'Lagos Estate',
    developmentId: '2',
    stage: 'inspection',
    dealValue: 35000000,
    source: 'Referral',
    assignedTo: 'Mike Johnson',
    priority: 'medium',
    notes: [
      { text: 'Scheduled for site inspection tomorrow', timestamp: '2024-01-16T14:00:00Z', author: 'Mike Johnson' }
    ],
    createdAt: '2024-01-14T09:15:00Z',
    lastActivity: '2024-01-16T14:00:00Z'
  },
  {
    id: '3',
    clientName: 'Robert Brown',
    clientId: '3',
    development: 'Abuja Heights',
    developmentId: '3',
    stage: 'offer',
    dealValue: 42000000,
    source: 'Social Media',
    assignedTo: 'Sarah Wilson',
    priority: 'high',
    notes: [
      { text: 'Interested in 3-bedroom unit', timestamp: '2024-01-12T11:00:00Z', author: 'Sarah Wilson' },
      { text: 'Sent formal offer document', timestamp: '2024-01-13T16:30:00Z', author: 'Sarah Wilson' }
    ],
    createdAt: '2024-01-12T11:00:00Z',
    lastActivity: '2024-01-13T16:30:00Z'
  },
  {
    id: '4',
    clientName: 'Mary Johnson',
    clientId: '4',
    development: 'Victoria Gardens',
    developmentId: '1',
    stage: 'payment',
    dealValue: 28000000,
    source: 'Referral',
    assignedTo: 'David Brown',
    priority: 'high',
    notes: [
      { text: 'Offer accepted, payment processing', timestamp: '2024-01-10T09:00:00Z', author: 'David Brown' }
    ],
    createdAt: '2024-01-08T14:20:00Z',
    lastActivity: '2024-01-10T09:00:00Z'
  },
  {
    id: '5',
    clientName: 'Ahmed Hassan',
    clientId: '5',
    development: 'Lagos Estate',
    developmentId: '2',
    stage: 'closed',
    dealValue: 38000000,
    source: 'Advertisement',
    assignedTo: 'Mike Johnson',
    priority: 'medium',
    notes: [
      { text: 'Deal successfully closed', timestamp: '2024-01-05T15:45:00Z', author: 'Mike Johnson' }
    ],
    createdAt: '2024-01-01T10:00:00Z',
    lastActivity: '2024-01-05T15:45:00Z'
  },
  {
    id: '6',
    clientName: 'Linda Davis',
    clientId: '6',
    development: 'Abuja Heights',
    developmentId: '3',
    stage: 'contacted',
    dealValue: 45000000,
    source: 'Website',
    assignedTo: 'Sarah Wilson',
    priority: 'medium',
    notes: [
      { text: 'Requesting more information about amenities', timestamp: '2024-01-17T13:20:00Z', author: 'Sarah Wilson' }
    ],
    createdAt: '2024-01-17T13:20:00Z',
    lastActivity: '2024-01-17T13:20:00Z'
  },
  {
    id: '7',
    clientName: 'Peter Williams',
    clientId: '7',
    development: 'Victoria Gardens',
    developmentId: '1',
    stage: 'inspection',
    dealValue: 32000000,
    source: 'Walk-in',
    assignedTo: 'David Brown',
    priority: 'low',
    notes: [
      { text: 'Completed site inspection, very interested', timestamp: '2024-01-16T10:15:00Z', author: 'David Brown' }
    ],
    createdAt: '2024-01-15T16:30:00Z',
    lastActivity: '2024-01-16T10:15:00Z'
  },
  {
    id: '8',
    clientName: 'Grace Okafor',
    clientId: '8',
    development: 'Lagos Estate',
    developmentId: '2',
    stage: 'offer',
    dealValue: 29000000,
    source: 'Referral',
    assignedTo: 'Mike Johnson',
    priority: 'high',
    notes: [
      { text: 'Negotiating price for bulk purchase', timestamp: '2024-01-14T12:00:00Z', author: 'Mike Johnson' }
    ],
    createdAt: '2024-01-13T09:45:00Z',
    lastActivity: '2024-01-14T12:00:00Z'
  }
];

const stages = [
  { id: 'contacted', name: 'Contacted', color: 'bg-blue-50 text-blue-700 border-blue-200', count: 0, icon: MessageSquare },
  { id: 'inspection', name: 'Inspection', color: 'bg-amber-50 text-amber-700 border-amber-200', count: 0, icon: Eye },
  { id: 'offer', name: 'Offer', color: 'bg-purple-50 text-purple-700 border-purple-200', count: 0, icon: Target },
  { id: 'payment', name: 'Payment', color: 'bg-orange-50 text-orange-700 border-orange-200', count: 0, icon: DollarSign },
  { id: 'closed', name: 'Closed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', count: 0, icon: TrendingUp }
];

export function CRMPipelinesPage() {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTeamMember, setSelectedTeamMember] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<'kanban' | 'table' | 'list'>('kanban');
  const form = useForm();

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    if (draggedLead && draggedLead.stage !== targetStage) {
      setLeads(prev => prev.map(lead => 
        lead.id === draggedLead.id 
          ? { ...lead, stage: targetStage as Lead['stage'], lastActivity: new Date().toISOString() }
          : lead
      ));
      toast.success(`Lead moved to ${stages.find(s => s.id === targetStage)?.name}`);
    }
    setDraggedLead(null);
  };

  const onSubmitLead = (data: any) => {
    const newLead: Lead = {
      id: Date.now().toString(),
      clientName: data.clientName,
      clientId: data.clientId || '1',
      development: data.development,
      developmentId: data.developmentId || '1',
      stage: data.stage,
      dealValue: parseFloat(data.dealValue),
      source: data.source,
      assignedTo: data.assignedTo,
      priority: data.priority || 'medium',
      notes: data.notes ? [{ text: data.notes, timestamp: new Date().toISOString(), author: 'Current User' }] : [],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    
    setLeads(prev => [...prev, newLead]);
    setIsAddLeadOpen(false);
    form.reset();
    toast.success('Lead added successfully');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getFilteredLeads = () => {
    let filtered = leads;
    
    if (activeFilter !== 'all') {
      if (activeFilter === 'high-priority') {
        filtered = filtered.filter(lead => lead.priority === 'high');
      } else if (activeFilter === 'recent') {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        filtered = filtered.filter(lead => new Date(lead.lastActivity) > threeDaysAgo);
      }
    }

    if (selectedTeamMember && selectedTeamMember !== 'all') {
      filtered = filtered.filter(lead => lead.assignedTo === selectedTeamMember);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(lead => 
        lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.development.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getLeadsByStage = (stage: string) => {
    return getFilteredLeads().filter(lead => lead.stage === stage);
  };

  const calculateKPIs = () => {
    const totalValue = leads.reduce((sum, lead) => sum + lead.dealValue, 0);
    const closedValue = leads.filter(lead => lead.stage === 'closed').reduce((sum, lead) => sum + lead.dealValue, 0);
    const conversionRate = leads.length > 0 ? (leads.filter(lead => lead.stage === 'closed').length / leads.length * 100) : 0;
    const avgDealSize = leads.length > 0 ? totalValue / leads.length : 0;

    return {
      totalLeads: leads.length,
      totalValue,
      closedValue,
      conversionRate,
      avgDealSize,
      activeLeads: leads.filter(lead => lead.stage !== 'closed').length
    };
  };

  const kpis = calculateKPIs();
  const teamMembers = ['Sarah Wilson', 'Mike Johnson', 'David Brown'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const renderKanbanView = () => (
    <div className={`${isMobile ? 'flex gap-3 overflow-x-auto pb-4' : 'grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6'} min-h-[400px] sm:min-h-[600px]`}>
      {stages.map((stage) => {
        const stageLeads = getLeadsByStage(stage.id);
        const StageIcon = stage.icon;
        
        return (
          <div
            key={stage.id}
            className={`bg-white rounded-xl border border-gray-200 p-3 sm:p-4 ${isMobile ? 'min-w-[260px] flex-shrink-0' : ''}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-1 sm:p-1.5 rounded-lg ${stage.color}`}>
                  <StageIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <h3 className={`font-semibold text-gray-900 ${isMobile ? 'text-xs' : 'text-sm'}`}>{stage.name}</h3>
              </div>
              <Badge variant="outline" className={`font-medium ${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'}`}>
                {stageLeads.length}
              </Badge>
            </div>

            <div className={`space-y-2 sm:space-y-3 ${isMobile ? 'max-h-[400px]' : 'max-h-[500px]'} overflow-y-auto`}>
              {stageLeads.map((lead) => (
                <Card
                  key={lead.id}
                  className="cursor-move hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white group"
                  draggable={!isMobile}
                  onDragStart={(e) => !isMobile && handleDragStart(e, lead)}
                  onClick={() => setSelectedLead(lead)}
                >
                  <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
                    <div className={`space-y-${isMobile ? '2' : '3'}`}>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`font-semibold text-gray-900 leading-tight line-clamp-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {lead.clientName}
                        </h4>
                        <Badge 
                          className={`font-medium border ${getPriorityColor(lead.priority)} ${isMobile ? 'text-xs px-1.5 py-0.5' : ''}`}
                          variant="outline"
                        >
                          {isMobile ? lead.priority.charAt(0).toUpperCase() : lead.priority}
                        </Badge>
                      </div>
                      
                      <div className={`space-y-${isMobile ? '1.5' : '2'}`}>
                        <div className={`flex items-center gap-1.5 text-gray-600 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                          <Building className={`${isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'}`} />
                          <span className="line-clamp-1">{lead.development}</span>
                        </div>
                        
                        <div className={`flex items-center gap-1.5 text-gray-600 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                          <DollarSign className={`${isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'}`} />
                          <span className={`font-semibold text-gray-900 ${isMobile ? 'text-xs' : ''}`}>
                            {isMobile ? `₦${(lead.dealValue / 1000000).toFixed(0)}M` : formatCurrency(lead.dealValue)}
                          </span>
                        </div>
                        
                        {!isMobile && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <User className="h-3 w-3" />
                            <span>{lead.assignedTo}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className={`flex items-center justify-between pt-${isMobile ? '1.5' : '2'} border-t border-gray-100`}>
                        <span className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-xs'}`}>{lead.source}</span>
                        <span className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                          {new Date(lead.lastActivity).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {stageLeads.length === 0 && (
                <div className="text-center py-6 sm:py-8 text-gray-400">
                  <div className={`mx-auto mb-2 sm:mb-3 rounded-full bg-gray-100 flex items-center justify-center ${isMobile ? 'w-8 h-8' : 'w-12 h-12'}`}>
                    <StageIcon className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'}`} />
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>No leads in this stage</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderTableView = () => (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className={`font-semibold text-gray-900 ${isMobile ? 'text-xs px-2' : ''}`}>Client</TableHead>
                {!isMobile && <TableHead className="font-semibold text-gray-900">Development</TableHead>}
                <TableHead className={`font-semibold text-gray-900 ${isMobile ? 'text-xs px-2' : ''}`}>Stage</TableHead>
                <TableHead className={`font-semibold text-gray-900 ${isMobile ? 'text-xs px-2' : ''}`}>Value</TableHead>
                {!isMobile && (
                  <>
                    <TableHead className="font-semibold text-gray-900">Priority</TableHead>
                    <TableHead className="font-semibold text-gray-900">Assigned To</TableHead>
                    <TableHead className="font-semibold text-gray-900">Source</TableHead>
                    <TableHead className="font-semibold text-gray-900">Last Activity</TableHead>
                  </>
                )}
                <TableHead className="w-8 sm:w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredLeads().map((lead) => (
                <TableRow 
                  key={lead.id} 
                  className="cursor-pointer hover:bg-gray-50 border-gray-100 transition-colors"
                  onClick={() => setSelectedLead(lead)}
                >
                  <TableCell className={`font-medium text-gray-900 ${isMobile ? 'text-xs px-2' : ''}`}>
                    {isMobile ? lead.clientName.split(' ')[0] : lead.clientName}
                  </TableCell>
                  {!isMobile && <TableCell className="text-gray-600">{lead.development}</TableCell>}
                  <TableCell>
                    <Badge 
                      className={`${stages.find(s => s.id === lead.stage)?.color} border font-medium ${isMobile ? 'text-xs px-1.5 py-0.5' : ''}`} 
                      variant="outline"
                    >
                      {isMobile ? stages.find(s => s.id === lead.stage)?.name.substring(0, 3) : stages.find(s => s.id === lead.stage)?.name}
                    </Badge>
                  </TableCell>
                  <TableCell className={`font-semibold ${isMobile ? 'text-xs px-2' : ''}`}>
                    {isMobile ? `₦${(lead.dealValue / 1000000).toFixed(0)}M` : formatCurrency(lead.dealValue)}
                  </TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>
                        <Badge 
                          className={`border font-medium ${getPriorityColor(lead.priority)}`}
                          variant="outline"
                        >
                          {lead.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{lead.assignedTo}</TableCell>
                      <TableCell className="text-gray-600">{lead.source}</TableCell>
                      <TableCell className="text-gray-600">{new Date(lead.lastActivity).toLocaleDateString()}</TableCell>
                    </>
                  )}
                  <TableCell>
                    <Button variant="ghost" size="icon" className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  const renderListView = () => (
    <div className={`space-y-${isMobile ? '3' : '4'}`}>
      {getFilteredLeads().map((lead) => (
        <Card 
          key={lead.id} 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white"
          onClick={() => setSelectedLead(lead)}
        >
          <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}`}>
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className={`font-semibold text-gray-900 ${isMobile ? 'text-sm' : ''}`}>{lead.clientName}</h4>
                  <Badge 
                    className={`border font-medium ${getPriorityColor(lead.priority)} ${isMobile ? 'text-xs px-1.5 py-0.5' : ''}`}
                    variant="outline"
                  >
                    {lead.priority}
                  </Badge>
                </div>
                <div className={`flex items-center gap-1.5 text-gray-600 ${isMobile ? 'text-sm' : 'text-sm'}`}>
                  <Building className="h-4 w-4" />
                  <span>{lead.development}</span>
                </div>
              </div>
              
              {!isMobile && (
                <>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-500">Stage</div>
                    <Badge 
                      className={`${stages.find(s => s.id === lead.stage)?.color} border font-medium`}
                      variant="outline"
                    >
                      {stages.find(s => s.id === lead.stage)?.name}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-500">Deal Value</div>
                    <div className="font-semibold text-lg text-gray-900">{formatCurrency(lead.dealValue)}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-500">Assigned To</div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{lead.assignedTo}</span>
                    </div>
                    <div className="text-xs text-gray-500">Source: {lead.source}</div>
                    <div className="text-xs text-gray-500">Last: {new Date(lead.lastActivity).toLocaleDateString()}</div>
                  </div>
                </>
              )}
              
              {isMobile && (
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="text-sm font-semibold text-gray-900">{formatCurrency(lead.dealValue)}</div>
                  <Badge 
                    className={`${stages.find(s => s.id === lead.stage)?.color} border font-medium text-xs`}
                    variant="outline"
                  >
                    {stages.find(s => s.id === lead.stage)?.name}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className={`max-w-7xl mx-auto py-4 sm:py-8 space-y-6 sm:space-y-8 ${isMobile ? 'px-3' : 'px-4 sm:px-6 lg:px-8'}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-xl' : 'text-3xl'}`}>Sales Pipeline</h1>
            <p className={`text-gray-600 mt-1 ${isMobile ? 'text-sm' : ''}`}>Track and manage your sales leads through every stage</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className={`flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm ${isMobile ? 'flex-1' : ''}`}>
              <Button
                variant={viewType === 'kanban' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewType('kanban')}
                className={`${isMobile ? 'px-2 flex-1 text-xs' : 'px-3'}`}
              >
                <LayoutGrid className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4 mr-1'}`} />
                {!isMobile && 'Kanban'}
              </Button>
              <Button
                variant={viewType === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewType('table')}
                className={`${isMobile ? 'px-2 flex-1 text-xs' : 'px-3'}`}
              >
                <TableIcon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4 mr-1'}`} />
                {!isMobile && 'Table'}
              </Button>
              <Button
                variant={viewType === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewType('list')}
                className={`${isMobile ? 'px-2 flex-1 text-xs' : 'px-3'}`}
              >
                <List className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4 mr-1'}`} />
                {!isMobile && 'List'}
              </Button>
            </div>
            <Button 
              onClick={() => setIsAddLeadOpen(true)} 
              className={`bg-indigo-600 hover:bg-indigo-700 ${isMobile ? 'px-3 py-2 text-sm' : ''}`}
            >
              <Plus className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
              {isMobile ? 'Add' : 'Add Lead'}
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className={`grid gap-3 sm:gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'}`}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-700">{kpis.totalLeads}</div>
                  <div className="text-sm text-blue-600 font-medium">Total Leads</div>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-emerald-700">{kpis.activeLeads}</div>
                  <div className="text-sm text-emerald-600 font-medium">Active</div>
                </div>
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-purple-700">₦{(kpis.totalValue / 1000000).toFixed(0)}M</div>
                  <div className="text-sm text-purple-600 font-medium">Pipeline</div>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-orange-700">₦{(kpis.closedValue / 1000000).toFixed(0)}M</div>
                  <div className="text-sm text-orange-600 font-medium">Closed</div>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-700">{kpis.conversionRate.toFixed(1)}%</div>
                  <div className="text-sm text-red-600 font-medium">Conversion</div>
                </div>
                <div className="p-2 bg-red-100 rounded-lg">
                  <Target className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-indigo-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-indigo-700">₦{(kpis.avgDealSize / 1000000).toFixed(0)}M</div>
                  <div className="text-sm text-indigo-600 font-medium">Avg Deal</div>
                </div>
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <div className="flex flex-col gap-3 sm:gap-4 items-start">
              <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
                <TabsList className={`grid w-full grid-cols-3 bg-gray-100 ${isMobile ? 'text-xs' : ''}`}>
                  <TabsTrigger value="all" className="data-[state=active]:bg-white">All Leads</TabsTrigger>
                  <TabsTrigger value="high-priority" className="data-[state=active]:bg-white">High Priority</TabsTrigger>
                  <TabsTrigger value="recent" className="data-[state=active]:bg-white">Recent</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="relative flex-1">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                  <Input
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`border-gray-200 ${isMobile ? 'pl-8 text-sm' : 'pl-10'}`}
                  />
                </div>
                <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
                  <SelectTrigger className={`border-gray-200 ${isMobile ? 'text-sm' : 'w-48'}`}>
                    <Filter className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
                    <SelectValue placeholder="Filter by team member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Team Members</SelectItem>
                    {teamMembers.map((member) => (
                      <SelectItem key={member} value={member}>{member}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Views */}
        <div className="pb-4 sm:pb-8">
          {viewType === 'kanban' && renderKanbanView()}
          {viewType === 'table' && renderTableView()}
          {viewType === 'list' && renderListView()}
        </div>

        {/* Add Lead Modal */}
        <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>
                Create a new lead in your sales pipeline
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmitLead)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Client Name</label>
                  <Input {...form.register('clientName', { required: true })} placeholder="Enter client name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Development</label>
                  <Input {...form.register('development', { required: true })} placeholder="Enter development name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Deal Value (₦)</label>
                  <Input {...form.register('dealValue', { required: true })} type="number" placeholder="25000000" />
                </div>
                <div>
                  <label className="text-sm font-medium">Stage</label>
                  <Select onValueChange={(value) => form.setValue('stage', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((stage) => (
                        <SelectItem key={stage.id} value={stage.id}>{stage.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Lead Source</label>
                  <Select onValueChange={(value) => form.setValue('source', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Advertisement">Advertisement</SelectItem>
                      <SelectItem value="Walk-in">Walk-in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Assigned To</label>
                  <Select onValueChange={(value) => form.setValue('assignedTo', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                      <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                      <SelectItem value="David Brown">David Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select onValueChange={(value) => form.setValue('priority', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea {...form.register('notes')} placeholder="Add initial notes..." />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Add Lead</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddLeadOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Lead Details Modal */}
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedLead?.clientName}
                <Badge 
                  className={`border font-medium ${getPriorityColor(selectedLead?.priority || 'medium')}`}
                  variant="outline"
                >
                  {selectedLead?.priority} priority
                </Badge>
              </DialogTitle>
              <DialogDescription>Lead details and activity</DialogDescription>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Development:</span>
                    <p className="text-gray-600">{selectedLead.development}</p>
                  </div>
                  <div>
                    <span className="font-medium">Deal Value:</span>
                    <p className="text-gray-600">{formatCurrency(selectedLead.dealValue)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Source:</span>
                    <p className="text-gray-600">{selectedLead.source}</p>
                  </div>
                  <div>
                    <span className="font-medium">Assigned To:</span>
                    <p className="text-gray-600">{selectedLead.assignedTo}</p>
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>
                    <p className="text-gray-600">{new Date(selectedLead.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium">Last Activity:</span>
                    <p className="text-gray-600">{new Date(selectedLead.lastActivity).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium">Notes & Activity:</span>
                  <div className="mt-2 space-y-2">
                    {selectedLead.notes.map((note, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm">{note.text}</p>
                        <div className="text-xs text-gray-500 mt-1">
                          {note.author} • {new Date(note.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => navigate(`/clients/${selectedLead.clientId}`)}>
                    <User className="h-4 w-4 mr-2" />
                    View Client
                  </Button>
                  <Button variant="outline" onClick={() => navigate(`/developments/${selectedLead.developmentId}`)}>
                    <Building className="h-4 w-4 mr-2" />
                    View Development
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
