
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MapPin, Calendar, DollarSign, User, Building, MoreVertical } from 'lucide-react';
import { useResponsive } from '@/hooks/use-responsive';
import { Lead, PipelineStage } from './types';

interface PipelineKanbanProps {
  leads: Lead[];
  stages: PipelineStage[];
  onDragLead: (leadId: string, newStageId: string) => void;
  onSelectLead: (lead: Lead) => void;
}

export function PipelineKanban({ leads, stages, onDragLead, onSelectLead }: PipelineKanbanProps) {
  const { isMobile, isTablet } = useResponsive();
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const getLeadsByStage = (stageId: string) => {
    return leads.filter(lead => lead.stage === stageId);
  };

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    if (isMobile) return;
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    if (draggedLead && draggedLead.stage !== targetStageId) {
      onDragLead(draggedLead.id, targetStageId);
    }
    setDraggedLead(null);
  };

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 1000000).toFixed(1)}M`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className={`${isMobile ? 'flex gap-3 overflow-x-auto pb-4' : 'grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6'} min-h-[600px]`}>
      {stages.map((stage) => {
        const stageLeads = getLeadsByStage(stage.id);
        const stageValue = stageLeads.reduce((sum, lead) => sum + lead.dealValue, 0);
        
        return (
          <div
            key={stage.id}
            className={`bg-white rounded-xl border border-gray-200 p-4 ${isMobile ? 'min-w-[280px] flex-shrink-0' : ''}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            {/* Stage Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {stage.name}
                </h3>
                <Badge variant="outline" className="font-medium">
                  {stageLeads.length}
                </Badge>
              </div>
              <div className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                {formatCurrency(stageValue)} total
              </div>
            </div>

            {/* Lead Cards */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {stageLeads.map((lead) => (
                <Card
                  key={lead.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white group"
                  draggable={!isMobile}
                  onDragStart={(e) => !isMobile && handleDragStart(e, lead)}
                  onClick={() => onSelectLead(lead)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-medium">
                              {getInitials(lead.clientName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-semibold text-gray-900 leading-tight truncate ${isMobile ? 'text-sm' : 'text-sm'}`}>
                              {lead.clientName}
                            </h4>
                            <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                          </div>
                        </div>
                        <Badge 
                          className={`text-xs border ${getPriorityColor(lead.priority)}`}
                          variant="outline"
                        >
                          {lead.priority}
                        </Badge>
                      </div>
                      
                      {/* Details */}
                      <div className="space-y-2">
                        {lead.projectInterest && (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Building className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{lead.projectInterest}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <DollarSign className="h-3 w-3 flex-shrink-0" />
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(lead.dealValue)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <User className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{lead.assignedTo}</span>
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">{lead.source}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Tags */}
                      {lead.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {lead.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0.5">
                              {tag}
                            </Badge>
                          ))}
                          {lead.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                              +{lead.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {stageLeads.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <p className="text-sm">No leads in this stage</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
