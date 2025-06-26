import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter, Settings, LayoutGrid, List, TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { useResponsive } from '@/hooks/use-responsive';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { PipelineKanban } from './PipelineKanban';
import { PipelineTable } from './PipelineTable';
import { AddLeadModal } from './AddLeadModal';
import { LeadDetailsDrawer } from './LeadDetailsDrawer';
import { PipelineSettings } from './PipelineSettings';
import { Lead, PipelineStage } from './types';
import { mockLeads, mockStages } from './mockData';
import { toast } from 'sonner';

export function CRMPipelinesMain() {
  const { isMobile, isTablet } = useResponsive();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [stages, setStages] = useState<PipelineStage[]>(mockStages);
  const [viewType, setViewType] = useState<'kanban' | 'table'>('kanban');
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAgent, setFilterAgent] = useState('all');
  const [filterProject, setFilterProject] = useState('all');
  const [filterSource, setFilterSource] = useState('all');

  const handleDragLead = (leadId: string, newStageId: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, stage: newStageId, lastActivity: new Date().toISOString() }
        : lead
    ));
  };

  const handleAddLead = (leadData: Partial<Lead>) => {
    const newLead: Lead = {
      id: Date.now().toString(),
      clientName: leadData.clientName || '',
      email: leadData.email || '',
      phone: leadData.phone || '',
      stage: leadData.stage || 'new-lead',
      projectInterest: leadData.projectInterest || '',
      source: leadData.source || 'manual',
      assignedTo: leadData.assignedTo || '',
      priority: leadData.priority || 'medium',
      dealValue: leadData.dealValue || 0,
      notes: [],
      tags: [],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      nextFollowUp: null
    };
    
    setLeads(prev => [...prev, newLead]);
    setIsAddLeadOpen(false);
    toast.success('Lead added successfully');
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
    toast.success('Lead deleted successfully');
  };

  const handleEditLead = (lead: Lead) => {
    // For now, we'll just open the add lead modal with the data pre-filled
    // In a real implementation, you might want a separate edit modal
    setIsAddLeadOpen(true);
    toast.info('Edit functionality would open here');
  };

  const getFilteredLeads = () => {
    let filtered = leads;
    
    if (searchQuery) {
      filtered = filtered.filter(lead => 
        lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery)
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
    
    return filtered;
  };

  const calculateKPIs = () => {
    const filteredLeads = getFilteredLeads();
    const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.dealValue, 0);
    const closedWonLeads = filteredLeads.filter(lead => lead.stage === 'won_deal');
    const closedValue = closedWonLeads.reduce((sum, lead) => sum + lead.dealValue, 0);
    const conversionRate = filteredLeads.length > 0 ? (closedWonLeads.length / filteredLeads.length * 100) : 0;

    return {
      totalLeads: filteredLeads.length,
      totalValue,
      closedValue,
      conversionRate,
      activeLeads: filteredLeads.filter(lead => !['won_deal', 'lost_deal'].includes(lead.stage)).length
    };
  };

  const kpis = calculateKPIs();
  const agents = ['Sarah Wilson', 'Mike Johnson', 'David Brown', 'Lisa Chen'];
  const projects = ['Victoria Gardens', 'Lagos Estate', 'Abuja Heights', 'Emerald Park'];
  const sources = ['Website', 'Referral', 'Social Media', 'Advertisement', 'Walk-in', 'Cold Call'];

  return (
    <ResponsiveContainer fullWidth={true} padding="responsive" className="min-h-screen bg-gray-50/50">
      <div className={`space-y-6 ${isMobile ? 'p-4' : 'p-6 lg:p-8'}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              Sales Pipeline
            </h1>
            <p className={`text-gray-600 mt-1 ${isMobile ? 'text-sm' : ''}`}>
              Track and manage your leads through every stage of the sales process
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size={isMobile ? 'sm' : 'default'}
              onClick={() => setIsSettingsOpen(true)}
              className="flex-1 sm:flex-none"
            >
              <Settings className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
              Settings
            </Button>
            <Button 
              onClick={() => setIsAddLeadOpen(true)}
              className={`bg-indigo-600 hover:bg-indigo-700 flex-1 sm:flex-none ${isMobile ? 'text-sm' : ''}`}
            >
              <Plus className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
              Add Lead
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
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
                  <div className="text-lg font-bold text-purple-700">
                    ₦{(kpis.totalValue / 1000000).toFixed(0)}M
                  </div>
                  <div className="text-sm text-purple-600 font-medium">Pipeline Value</div>
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
                  <div className="text-2xl font-bold text-orange-700">
                    {kpis.conversionRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-orange-600 font-medium">Conversion</div>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col gap-4">
              {/* Search and View Toggle */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                  <Input
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`border-gray-200 ${isMobile ? 'pl-8 text-sm' : 'pl-10'}`}
                  />
                </div>
                
                <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
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
                    <List className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4 mr-1'}`} />
                    {!isMobile && 'Table'}
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Select value={filterAgent} onValueChange={setFilterAgent}>
                  <SelectTrigger className="border-gray-200">
                    <Filter className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
                    <SelectValue placeholder="Filter by agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    {agents.map(agent => (
                      <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterProject} onValueChange={setFilterProject}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue placeholder="Filter by project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {projects.map(project => (
                      <SelectItem key={project} value={project}>{project}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterSource} onValueChange={setFilterSource}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue placeholder="Filter by source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {sources.map(source => (
                      <SelectItem key={source} value={source}>{source}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Views */}
        <div className="min-h-[600px]">
          {viewType === 'kanban' ? (
            <PipelineKanban
              leads={getFilteredLeads()}
              stages={stages}
              onDragLead={handleDragLead}
              onSelectLead={setSelectedLead}
            />
          ) : (
            <PipelineTable
              leads={getFilteredLeads()}
              stages={stages}
              onSelectLead={setSelectedLead}
            />
          )}
        </div>

        {/* Modals and Drawers */}
        <AddLeadModal
          isOpen={isAddLeadOpen}
          onClose={() => setIsAddLeadOpen(false)}
          onAddLead={handleAddLead}
          stages={stages}
          agents={agents}
          projects={projects}
          sources={sources}
        />

        <LeadDetailsDrawer
          lead={selectedLead}
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateLead={(updatedLead) => {
            setLeads(prev => prev.map(lead => 
              lead.id === updatedLead.id ? updatedLead : lead
            ));
          }}
          onDeleteLead={handleDeleteLead}
          onEditLead={handleEditLead}
          stages={stages}
        />

        <PipelineSettings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          stages={stages}
          onUpdateStages={setStages}
        />
      </div>
    </ResponsiveContainer>
  );
}
