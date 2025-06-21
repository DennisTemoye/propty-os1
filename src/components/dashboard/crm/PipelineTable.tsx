
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MoreVertical } from 'lucide-react';
import { useResponsive } from '@/hooks/use-responsive';
import { Lead, PipelineStage } from './types';

interface PipelineTableProps {
  leads: Lead[];
  stages: PipelineStage[];
  onSelectLead: (lead: Lead) => void;
}

export function PipelineTable({ leads, stages, onSelectLead }: PipelineTableProps) {
  const { isMobile } = useResponsive();

  const formatCurrency = (amount: number) => {
    if (isMobile) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStageColor = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    return stage?.color || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStageName = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    return stage?.name || stageId;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 bg-gray-50/50">
                <TableHead className={`font-semibold text-gray-900 ${isMobile ? 'text-xs px-2' : ''}`}>
                  Client
                </TableHead>
                {!isMobile && (
                  <>
                    <TableHead className="font-semibold text-gray-900">Contact</TableHead>
                    <TableHead className="font-semibold text-gray-900">Project</TableHead>
                  </>
                )}
                <TableHead className={`font-semibold text-gray-900 ${isMobile ? 'text-xs px-2' : ''}`}>
                  Stage
                </TableHead>
                <TableHead className={`font-semibold text-gray-900 ${isMobile ? 'text-xs px-2' : ''}`}>
                  Value
                </TableHead>
                {!isMobile && (
                  <>
                    <TableHead className="font-semibold text-gray-900">Priority</TableHead>
                    <TableHead className="font-semibold text-gray-900">Assigned To</TableHead>
                    <TableHead className="font-semibold text-gray-900">Source</TableHead>
                    <TableHead className="font-semibold text-gray-900">Last Activity</TableHead>
                  </>
                )}
                <TableHead className="w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow 
                  key={lead.id} 
                  className="cursor-pointer hover:bg-gray-50/50 border-gray-100 transition-colors"
                  onClick={() => onSelectLead(lead)}
                >
                  <TableCell className={`${isMobile ? 'px-2' : ''}`}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-medium">
                          {getInitials(lead.clientName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className={`font-medium text-gray-900 ${isMobile ? 'text-sm' : ''}`}>
                          {isMobile ? lead.clientName.split(' ')[0] : lead.clientName}
                        </div>
                        {isMobile && (
                          <div className="text-xs text-gray-500 truncate">{lead.email}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  
                  {!isMobile && (
                    <>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">{lead.email}</div>
                          <div className="text-sm text-gray-600">{lead.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {lead.projectInterest || 'Not specified'}
                      </TableCell>
                    </>
                  )}
                  
                  <TableCell className={`${isMobile ? 'px-2' : ''}`}>
                    <Badge 
                      className={`border font-medium ${getStageColor(lead.stage)} ${isMobile ? 'text-xs px-1.5 py-0.5' : ''}`} 
                      variant="outline"
                    >
                      {isMobile ? getStageName(lead.stage).substring(0, 8) : getStageName(lead.stage)}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className={`font-semibold text-gray-900 ${isMobile ? 'text-xs px-2' : ''}`}>
                    {formatCurrency(lead.dealValue)}
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
                      <TableCell className="text-gray-600">
                        {new Date(lead.lastActivity).toLocaleDateString()}
                      </TableCell>
                    </>
                  )}
                  
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {isMobile ? (
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      ) : (
                        <>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
