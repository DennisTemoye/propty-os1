import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Phone, Mail, Building, DollarSign, MapPin, Calendar, 
  Star, Globe, Clock, User, MessageSquare, ChevronDown
} from 'lucide-react';
import { Lead, PipelineStage } from './types';
import { useResponsive } from '@/hooks/use-responsive';

interface ModernPipelineTableProps {
  leads: Lead[];
  stages: PipelineStage[];
  onSelectLead: (lead: Lead) => void;
  onUpdateLead: (lead: Lead) => void;
}

export function ModernPipelineTable({ leads, stages, onSelectLead, onUpdateLead }: ModernPipelineTableProps) {
  const { isMobile } = useResponsive();
  const [sortField, setSortField] = useState<string>('lastActivity');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed_won': return 'bg-emerald-100 text-emerald-800';
      case 'closed_lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageColor = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    return stage?.color || '#6b7280';
  };

  const getStageName = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    return stage?.name || stageId;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(amount);
  };

  const handleStageChange = (leadId: string, newStageId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      onUpdateLead({
        ...lead,
        stage: newStageId,
        lastActivity: new Date().toISOString()
      });
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    let aValue: any = a[sortField as keyof Lead];
    let bValue: any = b[sortField as keyof Lead];

    if (sortField === 'dealValue') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else if (sortField === 'lastActivity' || sortField === 'createdAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (isMobile) {
    // Mobile Card View
    return (
      <div className="space-y-4 animate-fade-in">
        {sortedLeads.map((lead) => (
          <Card 
            key={lead.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/90 backdrop-blur-sm hover-scale"
            onClick={() => onSelectLead(lead)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-semibold">
                        {getInitials(lead.clientName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{lead.clientName}</div>
                      <div className="text-xs text-gray-500">{lead.email}</div>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(lead.priority)} variant="secondary">
                    {lead.priority}
                  </Badge>
                </div>

                {/* Stage & Value */}
                <div className="flex items-center justify-between">
                  <Badge 
                    style={{ backgroundColor: getStageColor(lead.stage) }}
                    className="text-white text-xs"
                  >
                    {getStageName(lead.stage)}
                  </Badge>
                  <div className="font-bold text-emerald-600">
                    {formatCurrency(lead.dealValue)}
                  </div>
                </div>

                {/* Project & Location */}
                <div className="space-y-1">
                  {lead.projectInterest && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building className="h-3 w-3" />
                      <span className="text-xs">{lead.projectInterest}</span>
                    </div>
                  )}
                  {lead.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{lead.location}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`tel:${lead.phone}`, '_self');
                    }}
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`mailto:${lead.email}`, '_blank');
                    }}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Desktop Table View
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm animate-fade-in">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left p-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('clientName')}
                    className="font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Lead
                    <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${
                      sortField === 'clientName' && sortDirection === 'asc' ? 'rotate-180' : ''
                    }`} />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('stage')}
                    className="font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Stage
                    <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${
                      sortField === 'stage' && sortDirection === 'asc' ? 'rotate-180' : ''
                    }`} />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('dealValue')}
                    className="font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Value
                    <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${
                      sortField === 'dealValue' && sortDirection === 'asc' ? 'rotate-180' : ''
                    }`} />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <span className="font-semibold text-gray-700">Project</span>
                </th>
                <th className="text-left p-4">
                  <span className="font-semibold text-gray-700">Contact</span>
                </th>
                <th className="text-left p-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('assignedTo')}
                    className="font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Assigned To
                    <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${
                      sortField === 'assignedTo' && sortDirection === 'asc' ? 'rotate-180' : ''
                    }`} />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('lastActivity')}
                    className="font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Last Activity
                    <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${
                      sortField === 'lastActivity' && sortDirection === 'asc' ? 'rotate-180' : ''
                    }`} />
                  </Button>
                </th>
                <th className="text-center p-4">
                  <span className="font-semibold text-gray-700">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedLeads.map((lead, index) => (
                <tr 
                  key={lead.id} 
                  className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer animate-fade-in ${
                    index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => onSelectLead(lead)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-semibold">
                          {getInitials(lead.clientName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">{lead.clientName}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getPriorityColor(lead.priority)} variant="secondary">
                            {lead.priority}
                          </Badge>
                          <Badge className={getStatusColor(lead.status)} variant="secondary">
                            {lead.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Select 
                      value={lead.stage} 
                      onValueChange={(value) => handleStageChange(lead.id, value)}
                    >
                      <SelectTrigger 
                        className="w-40 border-0 bg-transparent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SelectValue>
                          <Badge 
                            style={{ backgroundColor: getStageColor(lead.stage) }}
                            className="text-white text-xs"
                          >
                            {getStageName(lead.stage)}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {stages.map((stage) => (
                          <SelectItem key={stage.id} value={stage.id}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: stage.color }}
                              />
                              {stage.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-emerald-600">
                      {formatCurrency(lead.dealValue)}
                    </div>
                    {lead.budget && (
                      <div className="text-xs text-gray-500">
                        Budget: {formatCurrency(lead.budget.min)} - {formatCurrency(lead.budget.max)}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {lead.projectInterest && (
                        <div className="flex items-center gap-1 text-gray-700">
                          <Building className="h-3 w-3" />
                          <span className="text-sm">{lead.projectInterest}</span>
                        </div>
                      )}
                      {lead.location && (
                        <div className="flex items-center gap-1 text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{lead.location}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Phone className="h-3 w-3" />
                        <span className="text-sm">{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Globe className="h-3 w-3" />
                        <span className="text-xs">{lead.source}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                          {getInitials(lead.assignedTo)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700">{lead.assignedTo}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span className="text-sm">
                        {new Date(lead.lastActivity).toLocaleDateString()}
                      </span>
                    </div>
                    {lead.nextFollowUp && (
                      <div className="flex items-center gap-1 text-amber-600 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">
                          Follow-up: {new Date(lead.nextFollowUp).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`tel:${lead.phone}`, '_self');
                        }}
                        className="hover-scale"
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`mailto:${lead.email}`, '_blank');
                        }}
                        className="hover-scale"
                      >
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}`, '_blank');
                        }}
                        className="hover-scale"
                      >
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedLeads.length === 0 && (
          <div className="text-center py-12 text-gray-500 animate-fade-in">
            <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No leads found</p>
            <p className="text-sm mt-1">Try adjusting your filters or add new leads</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}