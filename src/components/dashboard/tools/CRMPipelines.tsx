
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, User, Building, DollarSign, MessageSquare, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Lead {
  id: string;
  clientName: string;
  clientId: string;
  development: string;
  developmentId: string;
  stage: 'contacted' | 'inspection' | 'offer' | 'payment' | 'closed';
  dealValue: number;
  source: string;
  assignedTo: string;
  notes: { text: string; timestamp: string; author: string }[];
  createdAt: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    clientName: 'John Doe',
    clientId: '1',
    development: 'Victoria Gardens',
    developmentId: '1',
    stage: 'contacted',
    dealValue: 25000000,
    source: 'Website',
    assignedTo: 'Sarah Wilson',
    notes: [
      { text: 'Initial contact made via website inquiry', timestamp: '2024-01-15T10:30:00Z', author: 'Sarah Wilson' }
    ],
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    clientName: 'Jane Smith',
    clientId: '2',
    development: 'Lagos Estate',
    developmentId: '2',
    stage: 'inspection',
    dealValue: 35000000,
    source: 'Referral',
    assignedTo: 'Mike Johnson',
    notes: [
      { text: 'Scheduled for site inspection tomorrow', timestamp: '2024-01-16T14:00:00Z', author: 'Mike Johnson' }
    ],
    createdAt: '2024-01-14T09:15:00Z'
  }
];

const stages = [
  { id: 'contacted', name: 'Contacted', color: 'bg-blue-100 text-blue-800' },
  { id: 'inspection', name: 'Inspection', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'offer', name: 'Offer', color: 'bg-purple-100 text-purple-800' },
  { id: 'payment', name: 'Payment', color: 'bg-orange-100 text-orange-800' },
  { id: 'closed', name: 'Closed', color: 'bg-green-100 text-green-800' }
];

export function CRMPipelinesPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const form = useForm();

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    if (draggedLead && draggedLead.stage !== targetStage) {
      setLeads(prev => prev.map(lead => 
        lead.id === draggedLead.id 
          ? { ...lead, stage: targetStage as Lead['stage'] }
          : lead
      ));
      toast.success(`Lead moved to ${stages.find(s => s.id === targetStage)?.name}`);
    }
    setDraggedLead(null);
  };

  const onSubmitLead = (data: any) => {
    const newLead: Lead = {
      id: Date.now().toString(),
      clientName: data.clientName,
      clientId: data.clientId || '1',
      development: data.development,
      developmentId: data.developmentId || '1',
      stage: data.stage,
      dealValue: parseFloat(data.dealValue),
      source: data.source,
      assignedTo: data.assignedTo,
      notes: data.notes ? [{ text: data.notes, timestamp: new Date().toISOString(), author: 'Current User' }] : [],
      createdAt: new Date().toISOString()
    };
    
    setLeads(prev => [...prev, newLead]);
    setIsAddLeadOpen(false);
    form.reset();
    toast.success('Lead added successfully');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getLeadsByStage = (stage: string) => {
    return leads.filter(lead => lead.stage === stage);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM Pipelines</h1>
          <p className="text-gray-600 mt-1">Manage leads across stages: Contacted → Inspection → Offer → Payment → Closed</p>
        </div>
        <Button onClick={() => setIsAddLeadOpen(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="bg-gray-50 rounded-lg p-4 min-h-[600px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{stage.name}</h3>
              <Badge variant="outline">{getLeadsByStage(stage.id).length}</Badge>
            </div>

            <div className="space-y-3">
              {getLeadsByStage(stage.id).map((lead) => (
                <Card
                  key={lead.id}
                  className="cursor-move hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead)}
                  onClick={() => setSelectedLead(lead)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{lead.clientName}</h4>
                        <Badge className={stage.color} variant="secondary">
                          {formatCurrency(lead.dealValue)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{lead.development}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Source: {lead.source}</span>
                        <span>{lead.assignedTo}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Lead Modal */}
      <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>
              Create a new lead in your sales pipeline
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmitLead)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Client Name</label>
                <Input {...form.register('clientName', { required: true })} placeholder="Enter client name" />
              </div>
              <div>
                <label className="text-sm font-medium">Development</label>
                <Input {...form.register('development', { required: true })} placeholder="Enter development name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Deal Value (₦)</label>
                <Input {...form.register('dealValue', { required: true })} type="number" placeholder="25000000" />
              </div>
              <div>
                <label className="text-sm font-medium">Stage</label>
                <Select onValueChange={(value) => form.setValue('stage', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>{stage.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Lead Source</label>
                <Select onValueChange={(value) => form.setValue('source', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Advertisement">Advertisement</SelectItem>
                    <SelectItem value="Walk-in">Walk-in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Assigned To</label>
                <Select onValueChange={(value) => form.setValue('assignedTo', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                    <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                    <SelectItem value="David Brown">David Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea {...form.register('notes')} placeholder="Add initial notes..." />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Add Lead</Button>
              <Button type="button" variant="outline" onClick={() => setIsAddLeadOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Lead Details Modal */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedLead?.clientName}</DialogTitle>
            <DialogDescription>Lead details and activity</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Development:</span>
                  <p className="text-gray-600">{selectedLead.development}</p>
                </div>
                <div>
                  <span className="font-medium">Deal Value:</span>
                  <p className="text-gray-600">{formatCurrency(selectedLead.dealValue)}</p>
                </div>
                <div>
                  <span className="font-medium">Source:</span>
                  <p className="text-gray-600">{selectedLead.source}</p>
                </div>
                <div>
                  <span className="font-medium">Assigned To:</span>
                  <p className="text-gray-600">{selectedLead.assignedTo}</p>
                </div>
              </div>
              <div>
                <span className="font-medium">Notes & Activity:</span>
                <div className="mt-2 space-y-2">
                  {selectedLead.notes.map((note, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm">{note.text}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        {note.author} • {new Date(note.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => navigate(`/clients/${selectedLead.clientId}`)}>
                  <User className="h-4 w-4 mr-2" />
                  View Client
                </Button>
                <Button variant="outline" onClick={() => navigate(`/developments/${selectedLead.developmentId}`)}>
                  <Building className="h-4 w-4 mr-2" />
                  View Development
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
