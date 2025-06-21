import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Users, Mail, Phone, Building } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from 'sonner';

export function MarketersCommission() {
  const [marketers, setMarketers] = useState([
    {
      id: 1,
      name: 'Jane Smith',
      email: 'jane@proptyos.com',
      phone: '+234 801 111 2222',
      role: 'Senior Marketer',
      leads: 45,
      conversions: 12,
      sales: 8,
      totalSalesVolume: '₦200M',
      commission: '₦2.4M',
      commissionPaid: '₦1.8M',
      commissionPending: '₦600K',
      status: 'active',
      projects: ['Victoria Gardens', 'Emerald Heights'],
      avatar: `https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face`
    },
    {
      id: 2,
      name: 'Mike Davis',
      email: 'mike@proptyos.com',
      phone: '+234 902 222 3333',
      role: 'Marketer',
      leads: 30,
      conversions: 8,
      sales: 5,
      totalSalesVolume: '₦125M',
      commission: '₦1.5M',
      commissionPaid: '₦1.2M',
      commissionPending: '₦300K',
      status: 'active',
      projects: ['Emerald Heights'],
      avatar: `https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?w=150&h=150&fit=crop&crop=face`
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah@proptyos.com',
      phone: '+234 703 333 4444',
      role: 'Junior Marketer',
      leads: 20,
      conversions: 5,
      sales: 3,
      totalSalesVolume: '₦75M',
      commission: '₦900K',
      commissionPaid: '₦700K',
      commissionPending: '₦200K',
      status: 'inactive',
      projects: ['Victoria Gardens'],
      avatar: `https://images.unsplash.com/photo-1531427186611-ecfd6d936e79?w=150&h=150&fit=crop&crop=face`
    }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMarketer, setEditingMarketer] = useState<any>(null);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    projects: [] as string[]
  });
  const [availableProjects] = useState(['Victoria Gardens', 'Emerald Heights', 'The Grand Residences']);

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

  const handleOpenForm = () => {
    setIsFormOpen(true);
    setFormValues({ name: '', email: '', phone: '', role: '', projects: [] });
    setEditingMarketer(null);
  };

  const handleEditMarketer = (marketer: any) => {
    setEditingMarketer(marketer);
    setFormValues({
      name: marketer.name,
      email: marketer.email,
      phone: marketer.phone,
      role: marketer.role,
      projects: marketer.projects
    });
    setIsFormOpen(true);
  };

  const handleDeleteMarketer = (id: number) => {
    setMarketers(prev => prev.filter(marketer => marketer.id !== id));
    toast.success('Marketer deleted successfully');
  };

  const handleFormValueChange = (field: string, value: any) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleProjectSelect = (project: string) => {
    if (formValues.projects.includes(project)) {
      setFormValues(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p !== project)
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        projects: [...prev.projects, project]
      }));
    }
  };

  const handleSaveMarketer = (marketerData: any) => {
    if (editingMarketer) {
      setMarketers(prev => prev.map(m => 
        m.id === editingMarketer.id 
          ? {
              ...m,
              name: marketerData.name,
              email: marketerData.email,
              phone: marketerData.phone,
              role: marketerData.role,
              projects: marketerData.projects,
              totalSalesVolume: m.totalSalesVolume
            }
          : m
      ));
      toast.success('Marketer updated successfully');
    } else {
      const newMarketer = {
        id: Date.now(),
        name: marketerData.name,
        email: marketerData.email,
        phone: marketerData.phone,
        role: marketerData.role,
        leads: 0,
        conversions: 0,
        sales: 0,
        totalSalesVolume: '₦0',
        commission: '₦0',
        commissionPaid: '₦0',
        commissionPending: '₦0',
        status: 'active',
        projects: marketerData.projects,
        avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`
      };
      setMarketers(prev => [...prev, newMarketer]);
      toast.success('Marketer added successfully');
    }
    setIsFormOpen(false);
    setEditingMarketer(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketers & Commissions</h1>
          <p className="text-gray-600 mt-1">Manage marketers and track their commissions</p>
        </div>
        <Button onClick={handleOpenForm} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Marketer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Marketers List</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketers.map((marketer) => (
                  <TableRow key={marketer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={marketer.avatar} alt={marketer.name} />
                          <AvatarFallback>{marketer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{marketer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        <p className="flex items-center"><Mail className="h-3 w-3 mr-1" />{marketer.email}</p>
                        <p className="flex items-center"><Phone className="h-3 w-3 mr-1" />{marketer.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{marketer.role}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {marketer.projects.map((project, index) => (
                          <Badge key={index} variant="secondary">{project}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>{marketer.leads}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4 text-green-500" />
                        <span>{marketer.sales}</span>
                      </div>
                    </TableCell>
                    <TableCell>{marketer.commission}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(marketer.status)}>
                        {marketer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditMarketer(marketer)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteMarketer(marketer.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingMarketer ? 'Edit Marketer' : 'Add Marketer'}</DialogTitle>
            <DialogDescription>
              {editingMarketer ? 'Update marketer details' : 'Create a new marketer'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={formValues.name} onChange={(e) => handleFormValueChange('name', e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" type="email" value={formValues.email} onChange={(e) => handleFormValueChange('email', e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input id="phone" value={formValues.phone} onChange={(e) => handleFormValueChange('phone', e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <Input id="role" value={formValues.role} onChange={(e) => handleFormValueChange('role', e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right mt-2">Projects</Label>
              <div className="col-span-3 space-y-1">
                {availableProjects.map((project) => (
                  <div key={project} className="flex items-center space-x-2">
                    <Input
                      type="checkbox"
                      id={project}
                      checked={formValues.projects.includes(project)}
                      onChange={() => handleProjectSelect(project)}
                    />
                    <Label htmlFor={project}>{project}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleSaveMarketer(formValues)}>
              {editingMarketer ? 'Update' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
