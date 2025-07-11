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
  DollarSign, Clock, Tag, Edit, Trash2, Settings, MapPin, Star,
  Globe, Trophy, Target, CheckCircle, AlertCircle, Users, Send
} from 'lucide-react';
import { Lead, PipelineStage, LeadNote } from './types';
import { toast } from 'sonner';

interface ModernLeadDetailsProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateLead: (lead: Lead) => void;
  onDeleteLead?: (leadId: string) => void;
  onConvertToClient?: (leadId: string) => void;
  stages: PipelineStage[];
}

export function ModernLeadDetails({ 
  lead, 
  isOpen, 
  onClose, 
  onUpdateLead, 
  onDeleteLead,
  onConvertToClient,
  stages 
}: ModernLeadDetailsProps) {
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [selectedStage, setSelectedStage] = useState(lead?.stage || '');

  if (!lead) return null;

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
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed_won': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'closed_lost': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
      maximumFractionDigits: 0,
      notation: 'compact'
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
    toast.success('Lead stage updated successfully');
  };

  const handleDeleteLead = () => {
    if (onDeleteLead && window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      onDeleteLead(lead.id);
      onClose();
    }
  };

  const handleConvertToClient = () => {
    if (onConvertToClient) {
      onConvertToClient(lead.id);
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
      case 'call': return <Phone className="h-4 w-4 text-blue-600" />;
      case 'email': return <Mail className="h-4 w-4 text-green-600" />;
      case 'meeting': return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'task': return <FileText className="h-4 w-4 text-orange-600" />;
      case 'sms': return <MessageSquare className="h-4 w-4 text-indigo-600" />;
      case 'whatsapp': return <MessageSquare className="h-4 w-4 text-green-500" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-50 border-blue-200';
      case 'email': return 'bg-green-50 border-green-200';
      case 'meeting': return 'bg-purple-50 border-purple-200';
      case 'task': return 'bg-orange-50 border-orange-200';
      case 'sms': return 'bg-indigo-50 border-indigo-200';
      case 'whatsapp': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden flex flex-col bg-white/95 backdrop-blur-sm animate-scale-in">
        <DialogHeader className="flex-shrink-0 pb-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-4 ring-blue-100">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                  {getInitials(lead.clientName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">{lead.clientName}</span>
                  <Badge className={`${getPriorityColor(lead.priority)} text-sm px-3 py-1`}>
                    {lead.priority} priority
                  </Badge>
                  <Badge className={`border ${getStatusColor(lead.status)}`} variant="outline">
                    {lead.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {lead.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {lead.phone}
                  </span>
                  {lead.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {lead.location}
                    </span>
                  )}
                </div>
              </div>
            </DialogTitle>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteLead}
                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover-scale"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-100/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-white">Activity</TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-white">Details</TabsTrigger>
              <TabsTrigger value="actions" className="data-[state=active]:bg-white">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Stage Management */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    Pipeline Stage
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
                        <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm">
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-sm">
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
                      <div className="font-medium">Last updated:</div>
                      <div>{new Date(lead.lastActivity).toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-lg">
                        <DollarSign className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="text-sm font-medium opacity-90">Deal Value</div>
                        <div className="text-2xl font-bold">{formatCurrency(lead.dealValue)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-lg">
                        <Building className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="text-sm font-medium opacity-90">Project Interest</div>
                        <div className="text-lg font-bold">{lead.projectInterest || 'Not specified'}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-lg">
                        <User className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="text-sm font-medium opacity-90">Assigned To</div>
                        <div className="text-lg font-bold">{lead.assignedTo}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Budget & Preferences */}
              {(lead.budget || lead.preferences?.length) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lead.budget && (
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500" />
                          Budget Range
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Minimum:</span>
                            <span className="font-bold text-green-600">{formatCurrency(lead.budget.min)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Maximum:</span>
                            <span className="font-bold text-green-600">{formatCurrency(lead.budget.max)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {lead.preferences && lead.preferences.length > 0 && (
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Target className="h-5 w-5 text-indigo-500" />
                          Client Preferences
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {lead.preferences.map((preference, index) => (
                            <Badge key={index} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                              {preference.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Tags */}
              {lead.tags.length > 0 && (
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="h-5 w-5 text-pink-500" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {lead.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-pink-50 text-pink-700 border-pink-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activity" className="space-y-6 mt-6">
              {/* Add Note */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Add Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {isAddingNote ? (
                    <div className="space-y-4">
                      <Textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a note, call summary, or activity..."
                        rows={4}
                        className="bg-white/80 backdrop-blur-sm resize-none"
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleAddNote} 
                          disabled={!newNote.trim()}
                          className="bg-gradient-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Add Note
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setIsAddingNote(false);
                          setNewNote('');
                        }} className="hover-scale">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => setIsAddingNote(true)}
                      className="bg-gradient-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Activity
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lead.notes.length > 0 ? (
                      [...lead.notes].reverse().map((note, index) => (
                        <div 
                          key={note.id} 
                          className={`flex gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getActivityBgColor(note.type)} animate-fade-in`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex-shrink-0 p-2 bg-white rounded-lg border shadow-sm">
                            {getActivityIcon(note.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-gray-900">{note.author}</span>
                              <Badge variant="secondary" className="text-xs">
                                {note.type}
                              </Badge>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(note.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-700">{note.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No activity recorded yet</p>
                        <p className="text-sm mt-1">Start by adding a note or activity above</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6 mt-6">
              {/* Contact Information */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <Input value={lead.clientName} readOnly className="mt-1 bg-gray-50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <Input value={lead.email} readOnly className="mt-1 bg-gray-50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <Input value={lead.phone} readOnly className="mt-1 bg-gray-50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Lead Source</label>
                      <Input value={lead.source} readOnly className="mt-1 bg-gray-50" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lead Information */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Lead Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Created Date</label>
                      <Input value={new Date(lead.createdAt).toLocaleDateString()} readOnly className="mt-1 bg-gray-50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Activity</label>
                      <Input value={new Date(lead.lastActivity).toLocaleDateString()} readOnly className="mt-1 bg-gray-50" />
                    </div>
                    {lead.nextFollowUp && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Next Follow-up</label>
                        <Input value={new Date(lead.nextFollowUp).toLocaleDateString()} readOnly className="mt-1 bg-gray-50" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-6 mt-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 h-12 hover-scale"
                      onClick={() => window.open(`tel:${lead.phone}`, '_self')}
                    >
                      <Phone className="h-5 w-5 text-blue-600" />
                      Call {lead.phone}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 h-12 hover-scale"
                      onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
                    >
                      <Mail className="h-5 w-5 text-green-600" />
                      Email {lead.email}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 h-12 hover-scale"
                      onClick={() => window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}`, '_blank')}
                    >
                      <MessageSquare className="h-5 w-5 text-green-500" />
                      WhatsApp Chat
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 h-12 hover-scale"
                      onClick={() => {
                        const eventTitle = encodeURIComponent(`Meeting with ${lead.clientName}`);
                        const eventDetails = encodeURIComponent(`Sales meeting for ${lead.projectInterest || 'property interest'}`);
                        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDetails}`;
                        window.open(calendarUrl, '_blank');
                      }}
                    >
                      <Calendar className="h-5 w-5 text-purple-600" />
                      Schedule Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lead Actions */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Lead Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lead.status === 'active' && onConvertToClient && (
                      <Button 
                        onClick={handleConvertToClient}
                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 h-12 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <Trophy className="h-5 w-5 mr-2" />
                        Convert to Client
                      </Button>
                    )}
                    
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={onClose} className="flex-1 hover-scale">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Close
                      </Button>
                    </div>
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