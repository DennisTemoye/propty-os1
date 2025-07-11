import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, Search, Filter, Settings, LayoutGrid, List, TrendingUp, 
  Users, Target, DollarSign, Trophy, Calendar, Download 
} from 'lucide-react';
import { useResponsive } from '@/hooks/use-responsive';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { ModernPipelineKanban } from './ModernPipelineKanban';
import { ModernPipelineTable } from './ModernPipelineTable';
import { ModernLeadModal } from './ModernLeadModal';
import { ModernLeadDetails } from './ModernLeadDetails';
import { ModernPipelineSettings } from './ModernPipelineSettings';
import { Lead, PipelineStage, PipelineMetrics } from './types';
import { mockLeads, mockStages } from './mockData';
import { toast } from 'sonner';

export function CRMPipelinesMain() {
  const { isMobile, isTablet } = useResponsive();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [stages, setStages] = useState<PipelineStage[]>(mockStages);
  const [viewType, setViewType] = useState<'kanban' | 'table'>('kanban');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAgent, setFilterAgent] = useState('all');
  const [filterProject, setFilterProject] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleDragLead = (leadId: string, newStageId: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, stage: newStageId, lastActivity: new Date().toISOString() }
        : lead
    ));
    toast.success('Lead stage updated successfully');
  };

  const handleAddLead = (leadData: Partial<Lead>) => {
    const newLead: Lead = {
      id: Date.now().toString(),
      clientName: leadData.clientName || '',
      email: leadData.email || '',
      phone: leadData.phone || '',
      stage: leadData.stage || 'new_lead',
      projectInterest: leadData.projectInterest || '',
      source: leadData.source || 'manual',
      assignedTo: leadData.assignedTo || 'Current User',
      priority: leadData.priority || 'medium',
      dealValue: leadData.dealValue || 0,
      notes: [],
      tags: leadData.tags || [],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      nextFollowUp: leadData.nextFollowUp || null,
      status: 'active',
      location: leadData.location,
      budget: leadData.budget,
      preferences: leadData.preferences || []
    };
    
    setLeads(prev => [...prev, newLead]);
    setIsLeadModalOpen(false);
    toast.success('Lead added successfully');
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(prev => prev.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));
    toast.success('Lead updated successfully');
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(prev => prev.filter(lead => lead.id !== leadId));
      setSelectedLead(null);
      setIsDetailsOpen(false);
      toast.success('Lead deleted successfully');
    }
  };

  const handleConvertToClient = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      setLeads(prev => prev.map(l => 
        l.id === leadId 
          ? { ...l, stage: 'won_deal', status: 'closed_won', lastActivity: new Date().toISOString() }
          : l
      ));
      toast.success(`${lead.clientName} converted to client successfully!`);
    }
  };

  const getFilteredLeads = () => {
    let filtered = leads;
    
    if (searchQuery) {
      filtered = filtered.filter(lead => 
        lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery) ||
        lead.projectInterest?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterAgent !== 'all') {
      filtered = filtered.filter(lead => lead.assignedTo === filterAgent);
    }

    if (filterProject !== 'all') {
      filtered = filtered.filter(lead => lead.projectInterest === filterProject);
    }

    if (filterSource !== 'all') {
      filtered = filtered.filter(lead => lead.source === filterSource);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(lead => lead.priority === filterPriority);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }
    
    return filtered;
  };

  const calculateMetrics = (): PipelineMetrics => {
    const filteredLeads = getFilteredLeads();
    const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.dealValue, 0);
    const wonLeads = filteredLeads.filter(lead => lead.status === 'closed_won');
    const lostLeads = filteredLeads.filter(lead => lead.status === 'closed_lost');
    const activeLeads = filteredLeads.filter(lead => lead.status === 'active');
    const wonValue = wonLeads.reduce((sum, lead) => sum + lead.dealValue, 0);
    const conversionRate = filteredLeads.length > 0 ? (wonLeads.length / filteredLeads.length * 100) : 0;
    const averageDealSize = wonLeads.length > 0 ? wonValue / wonLeads.length : 0;

    return {
      totalLeads: filteredLeads.length,
      conversionRate,
      averageDealSize,
      totalValue,
      wonDeals: wonLeads.length,
      lostDeals: lostLeads.length,
      activeLeads: activeLeads.length
    };
  };

  const metrics = calculateMetrics();
  const agents = Array.from(new Set(leads.map(l => l.assignedTo))).filter(Boolean);
  const projects = Array.from(new Set(leads.map(l => l.projectInterest))).filter(Boolean);
  const sources = Array.from(new Set(leads.map(l => l.source))).filter(Boolean);

  const handleExportData = () => {
    const csvData = leads.map(lead => ({
      Name: lead.clientName,
      Email: lead.email,
      Phone: lead.phone,
      Stage: lead.stage,
      Project: lead.projectInterest,
      Source: lead.source,
      AssignedTo: lead.assignedTo,
      Priority: lead.priority,
      DealValue: lead.dealValue,
      Status: lead.status,
      CreatedAt: lead.createdAt,
      LastActivity: lead.lastActivity
    }));
    
    // Convert to CSV and trigger download
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads_export.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Leads data exported successfully');
  };

  return (
    <ResponsiveContainer className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <div className={`space-y-6 ${isMobile ? 'p-4' : 'p-6 lg:p-8'} animate-fade-in`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="animate-slide-in-right">
            <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              CRM Pipeline
            </h1>
            <p className={`text-gray-600 mt-1 ${isMobile ? 'text-sm' : ''}`}>
              Manage leads through your sales pipeline with modern tools and insights
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto animate-scale-in">
            <Button
              variant="outline"
              size={isMobile ? 'sm' : 'default'}
              onClick={handleExportData}
              className="flex-1 sm:flex-none hover-scale"
            >
              <Download className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
              Export
            </Button>
            <Button
              variant="outline"
              size={isMobile ? 'sm' : 'default'}
              onClick={() => setIsSettingsOpen(true)}
              className="flex-1 sm:flex-none hover-scale"
            >
              <Settings className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
              Settings
            </Button>
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              className={`bg-gradient-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0 flex-1 sm:flex-none ${isMobile ? 'text-sm' : ''}`}
            >
              <Plus className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
              Add Lead
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} animate-fade-in`}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white hover-scale">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{metrics.totalLeads}</div>
                  <div className="text-sm font-medium opacity-90">Total Leads</div>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover-scale">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{metrics.activeLeads}</div>
                  <div className="text-sm font-medium opacity-90">Active Leads</div>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Target className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white hover-scale">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold">
                    ₦{(metrics.totalValue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm font-medium opacity-90">Pipeline Value</div>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white hover-scale">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {metrics.conversionRate.toFixed(1)}%
                  </div>
                  <div className="text-sm font-medium opacity-90">Conversion Rate</div>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm animate-fade-in">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col gap-4">
              {/* Search and View Toggle */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                  <Input
                    placeholder="Search leads, projects, emails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`border-gray-200 bg-white/80 backdrop-blur-sm ${isMobile ? 'pl-8 text-sm' : 'pl-10'} focus:bg-white transition-all duration-200`}
                  />
                </div>
                
                <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                  <Button
                    variant={viewType === 'kanban' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewType('kanban')}
                    className={`${isMobile ? 'px-2 flex-1 text-xs' : 'px-3'} transition-all duration-200`}
                  >
                    <LayoutGrid className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4 mr-1'}`} />
                    {!isMobile && 'Kanban'}
                  </Button>
                  <Button
                    variant={viewType === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewType('table')}
                    className={`${isMobile ? 'px-2 flex-1 text-xs' : 'px-3'} transition-all duration-200`}
                  >
                    <List className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4 mr-1'}`} />
                    {!isMobile && 'Table'}
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <Select value={filterAgent} onValueChange={setFilterAgent}>
                  <SelectTrigger className="border-gray-200 bg-white/80 backdrop-blur-sm">
                    <Filter className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
                    <SelectValue placeholder="All Agents" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    <SelectItem value="all">All Agents</SelectItem>
                    {agents.map(agent => (
                      <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterProject} onValueChange={setFilterProject}>
                  <SelectTrigger className="border-gray-200 bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="All Projects" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    <SelectItem value="all">All Projects</SelectItem>
                    {projects.map(project => (
                      <SelectItem key={project} value={project}>{project}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterSource} onValueChange={setFilterSource}>
                  <SelectTrigger className="border-gray-200 bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    <SelectItem value="all">All Sources</SelectItem>
                    {sources.map(source => (
                      <SelectItem key={source} value={source}>{source}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="border-gray-200 bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="All Priorities" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setFilterAgent('all');
                    setFilterProject('all');
                    setFilterSource('all');
                    setFilterPriority('all');
                    setFilterStatus('all');
                  }}
                  className="bg-white/80 backdrop-blur-sm hover-scale"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Views */}
        <div className="min-h-[600px] animate-fade-in">
          {viewType === 'kanban' ? (
            <ModernPipelineKanban
              leads={getFilteredLeads()}
              stages={stages}
              onDragLead={handleDragLead}
              onSelectLead={(lead) => {
                setSelectedLead(lead);
                setIsDetailsOpen(true);
              }}
            />
          ) : (
            <ModernPipelineTable
              leads={getFilteredLeads()}
              stages={stages}
              onSelectLead={(lead) => {
                setSelectedLead(lead);
                setIsDetailsOpen(true);
              }}
              onUpdateLead={handleUpdateLead}
            />
          )}
        </div>

        {/* Modals */}
        <ModernLeadModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          onSaveLead={handleAddLead}
          stages={stages}
          agents={agents}
          projects={projects}
          sources={sources}
        />

        <ModernLeadDetails
          lead={selectedLead}
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedLead(null);
          }}
          onUpdateLead={handleUpdateLead}
          onDeleteLead={handleDeleteLead}
          onConvertToClient={handleConvertToClient}
          stages={stages}
        />

        <ModernPipelineSettings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          stages={stages}
          onUpdateStages={setStages}
        />
      </div>
    </ResponsiveContainer>
  );
}