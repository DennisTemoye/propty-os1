
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MapPin, Calendar, DollarSign, User, Building, MoreVertical, Eye } from 'lucide-react';
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

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className={`${isMobile ? 'flex gap-4 overflow-x-auto pb-4' : 'grid grid-cols-6 gap-4'} min-h-[600px]`}>
        {pipelineStages.map((stage) => {
          const stageLeads = getLeadsByStage(stage.id);
          
          return (
            <div
              key={stage.id}
              className={`${isMobile ? 'min-w-[280px] flex-shrink-0' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              {/* Stage Header */}
              <div className={`${stage.color} text-white px-4 py-3 rounded-t-lg font-semibold text-center text-sm`}>
                {stage.name}
              </div>
              
              {/* Lead Cards Container */}
              <div className="bg-white border-x border-b border-gray-200 rounded-b-lg min-h-[500px] p-3 space-y-3">
                {stageLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-200 bg-white"
                    draggable={!isMobile}
                    onDragStart={(e) => !isMobile && handleDragStart(e, lead)}
                    onClick={() => onSelectLead(lead)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Client Name */}
                        <div className="font-semibold text-gray-900 text-sm">
                          {lead.clientName}
                        </div>
                        
                        {/* Project Interest */}
                        {lead.projectInterest && (
                          <div className="text-sm text-gray-700 font-medium">
                            {lead.projectInterest}
                          </div>
                        )}
                        
                        {/* Property Type/Category */}
                        <div className="text-sm text-gray-600">
                          {lead.tags.length > 0 ? lead.tags[0] : 'Housing'}
                        </div>
                        
                        {/* Contact Info */}
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{lead.phone}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-12 text-xs text-blue-600 hover:text-blue-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectLead(lead);
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {stageLeads.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <p className="text-xs">No leads</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
