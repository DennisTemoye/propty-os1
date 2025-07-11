import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Phone, Mail, Building, User, Globe, AlertCircle, Calendar,
  DollarSign, MapPin, Star, Clock, MessageSquare
} from 'lucide-react';
import { useResponsive } from '@/hooks/use-responsive';
import { Lead, PipelineStage } from './types';

interface ModernPipelineKanbanProps {
  leads: Lead[];
  stages: PipelineStage[];
  onDragLead: (leadId: string, newStageId: string) => void;
  onSelectLead: (lead: Lead) => void;
}

export function ModernPipelineKanban({ leads, stages, onDragLead, onSelectLead }: ModernPipelineKanbanProps) {
  const { isMobile, isTablet } = useResponsive();
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const handleDragEnd = () => {
    setDraggedLead(null);
  };

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(amount);
  };

  const getCardWidth = () => {
    if (isMobile) return 'min-w-[280px]';
    if (isTablet) return 'min-w-[260px]';
    return 'min-w-[300px]';
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 rounded-xl w-full max-w-full overflow-hidden">
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden w-full"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div 
          className={`flex gap-4 lg:gap-6 ${isMobile ? 'pb-4' : ''}`} 
          style={{ minWidth: `${stages.length * (isMobile ? 300 : 320)}px` }}
          onDragOver={handleDragOver}
        >
          {stages.map((stage) => {
            const stageLeads = getLeadsByStage(stage.id);
            const stageValue = stageLeads.reduce((sum, lead) => sum + lead.dealValue, 0);
            
            return (
              <div
                key={stage.id}
                className={`${getCardWidth()} flex-shrink-0 animate-fade-in`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                {/* Stage Header */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-4">
                  <CardHeader className="pb-3" style={{ backgroundColor: stage.color }}>
                    <CardTitle className="text-white text-center">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-white/20 rounded">
                            <Building className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-semibold">{stage.name}</span>
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                          {stageLeads.length}
                        </Badge>
                      </div>
                      <div className="text-xs mt-1 opacity-90">
                        {formatCurrency(stageValue)}
                      </div>
                    </CardTitle>
                  </CardHeader>
                </Card>
                
                {/* Lead Cards Container */}
                <div className="space-y-3 min-h-[500px] lg:min-h-[600px]">
                  {stageLeads.map((lead) => (
                    <Card
                      key={lead.id}
                      className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 shadow-lg bg-white/90 backdrop-blur-sm animate-scale-in hover-scale"
                      draggable={!isMobile}
                      onDragStart={(e) => !isMobile && handleDragStart(e, lead)}
                      onDragEnd={handleDragEnd}
                      onClick={() => onSelectLead(lead)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Client Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback 
                                  className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-semibold"
                                >
                                  {getInitials(lead.clientName)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 text-sm truncate">
                                  {lead.clientName}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                  {lead.email}
                                </div>
                              </div>
                            </div>
                            <Badge 
                              className={`${getPriorityColor(lead.priority)} text-xs px-2 py-1`}
                            >
                              {lead.priority}
                            </Badge>
                          </div>
                          
                          {/* Deal Value */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-emerald-700">
                              <DollarSign className="h-4 w-4" />
                              <span className="font-bold text-sm">
                                {formatCurrency(lead.dealValue)}
                              </span>
                            </div>
                            <Badge className={getStatusColor(lead.status)} variant="secondary">
                              {lead.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          
                          {/* Project Interest */}
                          {lead.projectInterest && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <Building className="h-3 w-3 flex-shrink-0 text-blue-600" />
                              <span className="text-xs font-medium truncate">
                                {lead.projectInterest}
                              </span>
                            </div>
                          )}
                          
                          {/* Location & Budget */}
                          <div className="space-y-1">
                            {lead.location && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                <span className="text-xs">{lead.location}</span>
                              </div>
                            )}
                            
                            {lead.budget && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Star className="h-3 w-3 flex-shrink-0" />
                                <span className="text-xs">
                                  {formatCurrency(lead.budget.min)} - {formatCurrency(lead.budget.max)}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Contact Info */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="h-3 w-3 flex-shrink-0" />
                              <span className="text-xs truncate">{lead.phone}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                              <Globe className="h-3 w-3 flex-shrink-0" />
                              <span className="text-xs">{lead.source}</span>
                            </div>
                          </div>
                          
                          {/* Tags */}
                          {lead.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {lead.tags.slice(0, 2).map((tag, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className="text-xs px-2 py-0 bg-gray-50 border-gray-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {lead.tags.length > 2 && (
                                <Badge 
                                  variant="outline" 
                                  className="text-xs px-2 py-0 bg-gray-50 border-gray-200"
                                >
                                  +{lead.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          {/* Last Activity */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs">
                                {new Date(lead.lastActivity).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {lead.assignedTo}
                            </div>
                          </div>
                          
                          {/* Quick Actions */}
                          <div className="flex gap-1 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 h-7 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`tel:${lead.phone}`, '_self');
                              }}
                            >
                              <Phone className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 h-7 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`mailto:${lead.email}`, '_blank');
                              }}
                            >
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 h-7 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}`, '_blank');
                              }}
                            >
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {stageLeads.length === 0 && (
                    <div className="text-center py-8 text-gray-400 animate-fade-in">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium">No leads</p>
                      <p className="text-xs mt-1 opacity-75">Drag leads here or add new ones</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}