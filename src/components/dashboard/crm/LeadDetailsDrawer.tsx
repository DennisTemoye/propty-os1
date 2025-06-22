
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Phone, Mail, MessageSquare, Calendar, FileText, User, Building, 
  DollarSign, Clock, Tag, Edit, Trash2, Settings 
} from 'lucide-react';
import { Lead, PipelineStage, LeadNote } from './types';
import { toast } from 'sonner';

interface LeadDetailsDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateLead: (lead: Lead) => void;
  onDeleteLead?: (leadId: string) => void;
  onEditLead?: (lead: Lead) => void;
  stages: PipelineStage[];
}

export function LeadDetailsDrawer({ 
  lead, 
  isOpen, 
  onClose, 
  onUpdateLead, 
  onDeleteLead,
  onEditLead,
  stages 
}: LeadDetailsDrawerProps) {
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [selectedStage, setSelectedStage] = useState(lead?.stage || '');

  if (!lead) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCurrentStage = () => {
    return stages.find(stage => stage.id === lead.stage);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleStageChange = (newStageId: string) => {
    const updatedLead = {
      ...lead,
      stage: newStageId,
      lastActivity: new Date().toISOString()
    };
    onUpdateLead(updatedLead);
    setSelectedStage(newStageId);
    toast.success('Lead status updated successfully');
  };

  const handleDeleteLead = () => {
    if (onDeleteLead && window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      onDeleteLead(lead.id);
      onClose();
      toast.success('Lead deleted successfully');
    }
  };

  const handleEditLead = () => {
    if (onEditLead) {
      onEditLead(lead);
      onClose();
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: LeadNote = {
      id: Date.now().toString(),
      text: newNote,
      timestamp: new Date().toISOString(),
      author: 'Current User',
      type: 'note'
    };

    const updatedLead = {
      ...lead,
      notes: [...lead.notes, note],
      lastActivity: new Date().toISOString()
    };

    onUpdateLead(updatedLead);
    setNewNote('');
    setIsAddingNote(false);
    toast.success('Note added successfully');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      case 'task': return <FileText className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-indigo-100 text-indigo-700 font-medium">
                  {getInitials(lead.clientName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{lead.clientName}</span>
                  <Badge className={`border font-medium ${getPriorityColor(lead.priority)}`} variant="outline">
                    {lead.priority} priority
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">{lead.email}</div>
              </div>
            </DialogTitle>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEditLead}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteLead}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Status Change Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Lead Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Current Stage
                      </label>
                      <Select 
                        value={selectedStage || lead.stage} 
                        onValueChange={handleStageChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select stage" />
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
                    </div>
                    <div className="text-sm text-gray-600">
                      Last updated: {new Date(lead.lastActivity).toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Project Interest</div>
                        <div className="font-semibold">{lead.projectInterest || 'Not specified'}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Deal Value</div>
                        <div className="font-semibold">{formatCurrency(lead.dealValue)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Assigned To</div>
                        <div className="font-semibold">{lead.assignedTo}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tags */}
              {lead.tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {lead.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call {lead.phone}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email {lead.email}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Meeting
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6 mt-6">
              {/* Add Note */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {isAddingNote ? (
                    <div className="space-y-3">
                      <Textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a note, call summary, or activity..."
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                          Add Note
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setIsAddingNote(false);
                          setNewNote('');
                        }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => setIsAddingNote(true)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lead.notes.length > 0 ? (
                      [...lead.notes].reverse().map((note) => (
                        <div key={note.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 p-2 bg-white rounded-lg border">
                            {getActivityIcon(note.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">{note.author}</span>
                              <Badge variant="secondary" className="text-xs">
                                {note.type}
                              </Badge>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">{note.text}</p>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(note.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>No activity recorded yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6 mt-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <Input value={lead.clientName} readOnly className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <Input value={lead.email} readOnly className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <Input value={lead.phone} readOnly className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Lead Source</label>
                      <Input value={lead.source} readOnly className="mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lead Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lead Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Created Date</label>
                      <Input value={new Date(lead.createdAt).toLocaleDateString()} readOnly className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Activity</label>
                      <Input value={new Date(lead.lastActivity).toLocaleDateString()} readOnly className="mt-1" />
                    </div>
                    {lead.nextFollowUp && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Next Follow-up</label>
                        <Input value={new Date(lead.nextFollowUp).toLocaleDateString()} readOnly className="mt-1" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
