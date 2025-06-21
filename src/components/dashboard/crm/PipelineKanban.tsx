
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MapPin, Calendar, DollarSign, User, Building, MoreVertical, Eye } from 'lucide-react';
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
    { id: 'inspection_scheduled', name: 'Inspection Scheduled', color: 'bg-yellow-500' },
    { id: 'offer_sent', name: 'Offer Sent', color: 'bg-green-400' },
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

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 1000000).toFixed(1)}M`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Calculate card width based on screen size
  const getCardWidth = () => {
    if (isMobile) return 'min-w-[320px]';
    if (isTablet) return 'min-w-[280px]';
    return 'min-w-[300px]';
  };

  return (
    <div className="bg-gray-50 p-4 lg:p-6 rounded-lg">
      <ScrollArea className="w-full">
        <div className={`flex gap-4 lg:gap-6 ${isMobile ? 'pb-4' : ''}`} style={{ minWidth: 'fit-content' }}>
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
                <div className={`${stage.color} text-white px-4 py-3 rounded-t-lg font-semibold text-center text-sm lg:text-base`}>
                  <div className="flex items-center justify-center gap-2">
                    <span>{stage.name}</span>
                    <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                      {stageLeads.length}
                    </Badge>
                  </div>
                </div>
                
                {/* Lead Cards Container */}
                <div className="bg-white border-x border-b border-gray-200 rounded-b-lg min-h-[500px] lg:min-h-[600px] p-3 lg:p-4">
                  <ScrollArea className="h-full">
                    <div className="space-y-3">
                      {stageLeads.map((lead) => (
                        <Card
                          key={lead.id}
                          className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 bg-white hover:border-gray-300"
                          draggable={!isMobile}
                          onDragStart={(e) => !isMobile && handleDragStart(e, lead)}
                          onClick={() => onSelectLead(lead)}
                        >
                          <CardContent className="p-4 lg:p-5">
                            <div className="space-y-3">
                              {/* Client Info Header */}
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                                    <AvatarFallback className="bg-gray-100 text-gray-600 text-xs lg:text-sm font-medium">
                                      {getInitials(lead.clientName)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-semibold text-gray-900 text-sm lg:text-base">
                                      {lead.clientName}
                                    </div>
                                    <div className="text-xs lg:text-sm text-gray-500">
                                      {lead.email}
                                    </div>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectLead(lead);
                                  }}
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              {/* Project Interest */}
                              {lead.projectInterest && (
                                <div className="bg-blue-50 px-3 py-2 rounded-md">
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-900">
                                      {lead.projectInterest}
                                    </span>
                                  </div>
                                </div>
                              )}
                              
                              {/* Deal Value */}
                              {lead.dealValue > 0 && (
                                <div className="flex items-center gap-2 text-green-600">
                                  <DollarSign className="h-4 w-4" />
                                  <span className="font-semibold text-sm lg:text-base">
                                    {formatCurrency(lead.dealValue)}
                                  </span>
                                </div>
                              )}
                              
                              {/* Tags */}
                              {lead.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {lead.tags.slice(0, 2).map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {lead.tags.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{lead.tags.length - 2} more
                                    </Badge>
                                  )}
                                </div>
                              )}
                              
                              {/* Contact Info */}
                              <div className="border-t pt-3 space-y-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Phone className="h-3 w-3" />
                                  <span className="text-xs lg:text-sm">{lead.phone}</span>
                                </div>
                                
                                {lead.source && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Source: {lead.source}</span>
                                    {lead.priority && (
                                      <Badge 
                                        variant={lead.priority === 'high' ? 'destructive' : lead.priority === 'medium' ? 'default' : 'secondary'} 
                                        className="text-xs"
                                      >
                                        {lead.priority}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                              
                              {/* Action Button */}
                              <div className="border-t pt-3">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full text-xs lg:text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectLead(lead);
                                  }}
                                >
                                  <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      {stageLeads.length === 0 && (
                        <div className="text-center py-8 lg:py-12 text-gray-400">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="h-6 w-6" />
                          </div>
                          <p className="text-sm lg:text-base font-medium">No leads</p>
                          <p className="text-xs lg:text-sm mt-1">Leads will appear here when added</p>
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
