
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, Building, User, Globe } from 'lucide-react';
import { useResponsive } from '@/hooks/use-responsive';
import { Lead, PipelineStage } from './types';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface PipelineKanbanProps {
  leads: Lead[];
  stages: PipelineStage[];
  onDragLead: (leadId: string, newStageId: string) => void;
  onSelectLead: (lead: Lead) => void;
}

export function PipelineKanban({ leads, stages, onDragLead, onSelectLead }: PipelineKanbanProps) {
  const { isMobile, isTablet } = useResponsive();
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  // Define the correct pipeline stages
  const pipelineStages = [
    { id: 'new_lead', name: 'New Lead', color: 'bg-blue-500' },
    { id: 'contacted', name: 'Contacted', color: 'bg-blue-400' },
    { id: 'inspection_scheduled', name: 'Inspection Schedule', color: 'bg-yellow-500' },
    { id: 'inspected', name: 'Inspected', color: 'bg-green-400' },
    { id: 'won_deal', name: 'Won Deal', color: 'bg-green-500' },
    { id: 'lost_deal', name: 'Lost Deal', color: 'bg-red-500' }
  ];

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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Calculate card width based on screen size
  const getCardWidth = () => {
    if (isMobile) return 'min-w-[260px]';
    if (isTablet) return 'min-w-[240px]';
    return 'min-w-[260px]';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
      <ScrollArea className="w-full">
        <div className={`flex gap-3 lg:gap-4 ${isMobile ? 'pb-4' : ''}`} style={{ minWidth: 'fit-content' }}>
          {pipelineStages.map((stage) => {
            const stageLeads = getLeadsByStage(stage.id);
            
            return (
              <div
                key={stage.id}
                className={`${getCardWidth()} flex-shrink-0`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                {/* Stage Header */}
                <div className={`${stage.color} text-white px-3 py-2 rounded-t-lg font-medium text-center text-sm`}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs lg:text-sm">{stage.name}</span>
                    <Badge variant="secondary" className="bg-white/20 text-white text-xs h-5 px-1.5">
                      {stageLeads.length}
                    </Badge>
                  </div>
                </div>
                
                {/* Lead Cards Container */}
                <div className="bg-white border-x border-b border-gray-200 rounded-b-lg min-h-[400px] lg:min-h-[500px] p-2">
                  <ScrollArea className="h-full">
                    <div className="space-y-2">
                      {stageLeads.map((lead) => (
                        <Card
                          key={lead.id}
                          className="cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-200 bg-white hover:border-gray-300"
                          draggable={!isMobile}
                          onDragStart={(e) => !isMobile && handleDragStart(e, lead)}
                          onClick={() => onSelectLead(lead)}
                        >
                          <CardContent className="p-3">
                            <div className="space-y-2">
                              {/* Client Name and Priority */}
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <Avatar className="h-6 w-6 flex-shrink-0">
                                    <AvatarFallback className="bg-gray-100 text-gray-600 text-xs font-medium">
                                      {getInitials(lead.clientName)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-medium text-gray-900 text-xs truncate">
                                      {lead.clientName}
                                    </div>
                                  </div>
                                </div>
                                <Badge 
                                  variant={getPriorityColor(lead.priority)} 
                                  className="text-xs h-5 px-1.5 ml-1 flex-shrink-0"
                                >
                                  {lead.priority}
                                </Badge>
                              </div>
                              
                              {/* Project Interest */}
                              {lead.projectInterest && (
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <Building className="h-3 w-3 flex-shrink-0" />
                                  <span className="text-xs truncate font-medium text-blue-700">
                                    {lead.projectInterest}
                                  </span>
                                </div>
                              )}
                              
                              {/* Contact Info */}
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <Mail className="h-3 w-3 flex-shrink-0" />
                                  <span className="text-xs truncate">{lead.email}</span>
                                </div>
                                
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <Phone className="h-3 w-3 flex-shrink-0" />
                                  <span className="text-xs">{lead.phone}</span>
                                </div>
                                
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <Globe className="h-3 w-3 flex-shrink-0" />
                                  <span className="text-xs">{lead.source}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      {stageLeads.length === 0 && (
                        <div className="text-center py-6 text-gray-400">
                          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                          <p className="text-xs font-medium">No leads</p>
                          <p className="text-xs mt-1">Leads will appear here</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
