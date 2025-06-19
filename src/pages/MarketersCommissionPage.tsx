
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, TrendingUp, Users, DollarSign, Eye, Edit, Trash2, ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const mockMarketers = [
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
    projects: ['Victoria Gardens', 'Emerald Heights', 'Golden View', 'Metro Heights'],
    joinDate: '2024-01-15',
    bio: 'Experienced real estate marketer with 5+ years in luxury properties.',
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

const mockCommissions = [
  {
    id: 1,
    marketerId: 1,
    marketerName: 'Jane Smith',
    project: 'Victoria Gardens',
    client: 'Michael Brown',
    amount: '₦850,000',
    status: 'paid',
    date: '2024-01-15',
    saleAmount: '₦45,000,000',
    commissionRate: '1.9%'
  },
  {
    id: 2,
    marketerId: 2,
    marketerName: 'Mike Davis',
    project: 'Golden View',
    client: 'Sarah Wilson',
    amount: '₦1,200,000',
    status: 'pending',
    date: '2024-01-20',
    saleAmount: '₦65,000,000',
    commissionRate: '1.8%'
  },
  {
    id: 3,
    marketerId: 1,
    marketerName: 'Jane Smith',
    project: 'Emerald Heights',
    client: 'David Lee',
    amount: '₦950,000',
    status: 'approved',
    date: '2024-01-18',
    saleAmount: '₦52,000,000',
    commissionRate: '1.8%'
  },
];

export default function MarketersCommissionPage() {
  const navigate = useNavigate();
  const [marketers, setMarketers] = useState(mockMarketers);
  const [commissions, setCommissions] = useState(mockCommissions);
  const [isAddMarketerOpen, setIsAddMarketerOpen] = useState(false);
  const [viewMarketer, setViewMarketer] = useState<any>(null);
  const [editMarketer, setEditMarketer] = useState<any>(null);

  const form = useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const onSubmitMarketer = (data: any) => {
    const newMarketer = {
      id: marketers.length + 1,
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
    
    setMarketers([...marketers, newMarketer]);
    setIsAddMarketerOpen(false);
    form.reset();
    toast.success('Marketer added successfully');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this marketer?')) {
      setMarketers(marketers.filter(marketer => marketer.id !== id));
      toast.success('Marketer deleted successfully');
    }
  };

  const handleEdit = (marketer: any) => {
    setEditMarketer(marketer);
    form.reset({
      name: marketer.name,
      email: marketer.email,
      phone: marketer.phone,
      bio: marketer.bio,
    });
  };

  const onUpdateMarketer = (data: any) => {
    setMarketers(marketers.map(marketer => 
      marketer.id === editMarketer.id 
        ? { ...marketer, ...data }
        : marketer
    ));
    setEditMarketer(null);
    form.reset();
    toast.success('Marketer updated successfully');
  };

  const totalMarketers = marketers.length;
  const activeMarketers = marketers.filter(m => m.status === 'active').length;
  const totalLeads = marketers.reduce((sum, m) => sum + m.leads, 0);
  const totalCommission = marketers.reduce((sum, m) => sum + parseFloat(m.commission.replace('₦', '').replace('M', '')), 0);

  const pendingCommissions = commissions.filter(c => c.status === 'pending').length;
  const paidCommissions = commissions.filter(c => c.status === 'paid').length;
  const approvedCommissions = commissions.filter(c => c.status === 'approved').length;

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
              <h1 className="text-3xl font-bold text-gray-900">Marketers & Commission</h1>
            </div>
            <Button onClick={() => setIsAddMarketerOpen(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Marketer
            </Button>
          </div>
        </div>

        <Tabs defaultValue="marketers" className="space-y-6">
          <TabsList>
            <TabsTrigger value="marketers">Marketers</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
          </TabsList>

          <TabsContent value="marketers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{totalMarketers}</div>
                      <div className="text-sm text-gray-500">Total Marketers</div>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{activeMarketers}</div>
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
              {marketers.map((marketer) => (
                <Card key={marketer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-600">
                            {marketer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{marketer.name}</CardTitle>
                          <p className="text-sm text-gray-500">{marketer.email}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(marketer.status)}>
                        {marketer.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-600">{marketer.leads}</div>
                          <div className="text-xs text-gray-500">Leads</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">{marketer.conversions}</div>
                          <div className="text-xs text-gray-500">Conversions</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">{marketer.sales}</div>
                          <div className="text-xs text-gray-500">Sales</div>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Commission:</span>
                          <span className="font-bold text-purple-600">{marketer.commission}</span>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="text-xs text-gray-500 mb-1">Assigned Projects:</div>
                        <div className="flex flex-wrap gap-1">
                          {marketer.projects.map((project, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {project}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-3">
                        <Button variant="outline" size="sm" onClick={() => setViewMarketer(marketer)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(marketer)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(marketer.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="commissions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{pendingCommissions}</div>
                      <div className="text-sm text-gray-500">Pending</div>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{paidCommissions}</div>
                      <div className="text-sm text-gray-500">Paid</div>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{approvedCommissions}</div>
                      <div className="text-sm text-gray-500">Approved</div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">₦3.0M</div>
                      <div className="text-sm text-gray-500">Total Outstanding</div>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Commission Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commissions.map((commission) => (
                    <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-medium">{commission.marketerName}</div>
                          <div className="text-sm text-gray-500">{commission.project} • {commission.client}</div>
                          <div className="text-xs text-gray-400">{commission.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">{commission.amount}</div>
                          <div className="text-sm text-gray-500">{commission.commissionRate} of {commission.saleAmount}</div>
                        </div>
                        <Badge className={getStatusColor(commission.status)}>
                          {commission.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Marketer Modal */}
        <Dialog open={isAddMarketerOpen} onOpenChange={setIsAddMarketerOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Marketer</DialogTitle>
              <DialogDescription>
                Add a new marketer to your team
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmitMarketer)} className="space-y-4">
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
                <Textarea {...form.register('bio')} placeholder="Marketer bio and specialization..." />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Add Marketer</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddMarketerOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Marketer Modal */}
        <Dialog open={!!editMarketer} onOpenChange={() => setEditMarketer(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Marketer</DialogTitle>
              <DialogDescription>
                Update marketer information
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onUpdateMarketer)} className="space-y-4">
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
                <Textarea {...form.register('bio')} placeholder="Marketer bio and specialization..." />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Update Marketer</Button>
                <Button type="button" variant="outline" onClick={() => setEditMarketer(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Marketer Modal */}
        <Dialog open={!!viewMarketer} onOpenChange={() => setViewMarketer(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{viewMarketer?.name}</DialogTitle>
              <DialogDescription>Marketer details and performance</DialogDescription>
            </DialogHeader>
            {viewMarketer && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Email:</span> {viewMarketer.email}</div>
                  <div><span className="font-medium">Phone:</span> {viewMarketer.phone}</div>
                  <div><span className="font-medium">Status:</span> {viewMarketer.status}</div>
                  <div><span className="font-medium">Join Date:</span> {viewMarketer.joinDate}</div>
                </div>
                <div>
                  <span className="font-medium">Bio:</span>
                  <p className="mt-1 text-gray-600">{viewMarketer.bio}</p>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{viewMarketer.leads}</div>
                    <div className="text-sm text-gray-500">Leads</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{viewMarketer.conversions}</div>
                    <div className="text-sm text-gray-500">Conversions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{viewMarketer.sales}</div>
                    <div className="text-sm text-gray-500">Sales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{viewMarketer.commission}</div>
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
