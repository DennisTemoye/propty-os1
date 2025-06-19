
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, TrendingUp, Users, DollarSign, Eye, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const mockAgents = [
  {
    id: 1,
    name: 'Jane Smith',
    email: 'jane@proptyos.com',
    phone: '+234 801 111 2222',
    leads: 45,
    conversions: 12,
    sales: 8,
    commission: '₦2.4M',
    status: 'active',
    projects: ['Victoria Gardens', 'Emerald Heights'],
    joinDate: '2024-01-15',
    bio: 'Experienced real estate agent with 5+ years in luxury properties.',
  },
  {
    id: 2,
    name: 'Mike Davis',
    email: 'mike@proptyos.com',
    phone: '+234 802 333 4444',
    leads: 38,
    conversions: 15,
    sales: 10,
    commission: '₦3.1M',
    status: 'active',
    projects: ['Golden View', 'Victoria Gardens'],
    joinDate: '2024-01-10',
    bio: 'Top performer specializing in commercial real estate.',
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah@proptyos.com',
    phone: '+234 803 555 6666',
    leads: 29,
    conversions: 8,
    sales: 6,
    commission: '₦1.8M',
    status: 'inactive',
    projects: ['Emerald Heights'],
    joinDate: '2023-12-01',
    bio: 'Marketing specialist with digital advertising expertise.',
  },
];

export default function AgentsMarketersPage() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState(mockAgents);
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [viewAgent, setViewAgent] = useState<any>(null);
  const [editAgent, setEditAgent] = useState<any>(null);

  const form = useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const onSubmitAgent = (data: any) => {
    const newAgent = {
      id: agents.length + 1,
      name: data.name,
      email: data.email,
      phone: data.phone,
      leads: 0,
      conversions: 0,
      sales: 0,
      commission: '₦0',
      status: 'active',
      projects: [],
      joinDate: new Date().toISOString().split('T')[0],
      bio: data.bio || '',
    };
    
    setAgents([...agents, newAgent]);
    setIsAddAgentOpen(false);
    form.reset();
    toast.success('Agent added successfully');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      setAgents(agents.filter(agent => agent.id !== id));
      toast.success('Agent deleted successfully');
    }
  };

  const handleEdit = (agent: any) => {
    setEditAgent(agent);
    form.reset({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      bio: agent.bio,
    });
  };

  const onUpdateAgent = (data: any) => {
    setAgents(agents.map(agent => 
      agent.id === editAgent.id 
        ? { ...agent, ...data }
        : agent
    ));
    setEditAgent(null);
    form.reset();
    toast.success('Agent updated successfully');
  };

  const totalAgents = agents.length;
  const activeAgents = agents.filter(a => a.status === 'active').length;
  const totalLeads = agents.reduce((sum, a) => sum + a.leads, 0);
  const totalCommission = agents.reduce((sum, a) => sum + parseFloat(a.commission.replace('₦', '').replace('M', '')), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/company/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">Agents & Marketers</h1>
            </div>
            <Button onClick={() => setIsAddAgentOpen(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{totalAgents}</div>
                  <div className="text-sm text-gray-500">Total Agents</div>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{activeAgents}</div>
                  <div className="text-sm text-gray-500">Active</div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalLeads}</div>
                  <div className="text-sm text-gray-500">Total Leads</div>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-600">₦{totalCommission.toFixed(1)}M</div>
                  <div className="text-sm text-gray-500">Total Commission</div>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <p className="text-sm text-gray-500">{agent.email}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">{agent.leads}</div>
                      <div className="text-xs text-gray-500">Leads</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-600">{agent.conversions}</div>
                      <div className="text-xs text-gray-500">Conversions</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{agent.sales}</div>
                      <div className="text-xs text-gray-500">Sales</div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Commission:</span>
                      <span className="font-bold text-purple-600">{agent.commission}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="text-xs text-gray-500 mb-1">Assigned Projects:</div>
                    <div className="flex flex-wrap gap-1">
                      {agent.projects.map((project, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-3">
                    <Button variant="outline" size="sm" onClick={() => setViewAgent(agent)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(agent)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(agent.id)} className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Agent Modal */}
        <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
              <DialogDescription>
                Add a new agent or marketer to your team
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmitAgent)} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input {...form.register('name', { required: true })} placeholder="Enter full name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input {...form.register('email', { required: true })} type="email" placeholder="Enter email" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input {...form.register('phone', { required: true })} placeholder="Enter phone number" />
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <Textarea {...form.register('bio')} placeholder="Agent bio and specialization..." />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Add Agent</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddAgentOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Agent Modal */}
        <Dialog open={!!editAgent} onOpenChange={() => setEditAgent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Agent</DialogTitle>
              <DialogDescription>
                Update agent information
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onUpdateAgent)} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input {...form.register('name', { required: true })} placeholder="Enter full name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input {...form.register('email', { required: true })} type="email" placeholder="Enter email" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input {...form.register('phone', { required: true })} placeholder="Enter phone number" />
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <Textarea {...form.register('bio')} placeholder="Agent bio and specialization..." />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Update Agent</Button>
                <Button type="button" variant="outline" onClick={() => setEditAgent(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Agent Modal */}
        <Dialog open={!!viewAgent} onOpenChange={() => setViewAgent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{viewAgent?.name}</DialogTitle>
              <DialogDescription>Agent details and performance</DialogDescription>
            </DialogHeader>
            {viewAgent && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Email:</span> {viewAgent.email}</div>
                  <div><span className="font-medium">Phone:</span> {viewAgent.phone}</div>
                  <div><span className="font-medium">Status:</span> {viewAgent.status}</div>
                  <div><span className="font-medium">Join Date:</span> {viewAgent.joinDate}</div>
                </div>
                <div>
                  <span className="font-medium">Bio:</span>
                  <p className="mt-1 text-gray-600">{viewAgent.bio}</p>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{viewAgent.leads}</div>
                    <div className="text-sm text-gray-500">Leads</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{viewAgent.conversions}</div>
                    <div className="text-sm text-gray-500">Conversions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{viewAgent.sales}</div>
                    <div className="text-sm text-gray-500">Sales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{viewAgent.commission}</div>
                    <div className="text-sm text-gray-500">Commission</div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
