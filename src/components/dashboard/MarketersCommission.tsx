import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, MoreHorizontal, FileText, Users, Mail, Phone, Building, DollarSign, TrendingUp, Download, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { AvatarGroup } from '@/components/ui/avatar-group';
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"

const roleOptions = [
  {
    label: "Sales Manager",
    value: "sales_manager",
  },
  {
    label: "Senior Marketer",
    value: "senior_marketer",
  },
  {
    label: "Marketer",
    value: "marketer",
  },
]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Marketer Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  role: z.string().min(2, {
    message: "Role must be selected.",
  }),
  projects: z.array(z.string()).optional(),
})

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
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Mike Davis',
      email: 'mike@proptyos.com',
      phone: '+234 802 222 3333',
      role: 'Sales Manager',
      leads: 62,
      conversions: 18,
      sales: 12,
      totalSalesVolume: '₦350M',
      commission: '₦4.2M',
      commissionPaid: '₦3.5M',
      commissionPending: '₦700K',
      status: 'active',
      projects: ['Emerald Heights', 'The Grandeur'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah@proptyos.com',
      phone: '+234 803 333 4444',
      role: 'Marketer',
      leads: 30,
      conversions: 8,
      sales: 5,
      totalSalesVolume: '₦120M',
      commission: '₦1.5M',
      commissionPaid: '₦1.2M',
      commissionPending: '₦300K',
      status: 'inactive',
      projects: ['Victoria Gardens'],
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
  ]);
  const [isAddMarketerModalOpen, setIsAddMarketerModalOpen] = useState(false);
  const [isEditMarketerModalOpen, setIsEditMarketerModalOpen] = useState(false);
  const [selectedMarketer, setSelectedMarketer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      projects: [],
    },
  })

  const filteredMarketers = marketers.filter(marketer =>
    marketer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    marketer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    marketer.phone.includes(searchQuery)
  );

  const handleEditMarketer = (marketer: any) => {
    setSelectedMarketer(marketer);
    setIsEditMarketerModalOpen(true);
  };

  const handleUpdateMarketer = (updatedMarketer: any) => {
    setMarketers(prev =>
      prev.map(marketer =>
        marketer.id === updatedMarketer.id ? updatedMarketer : marketer
      )
    );
    setIsEditMarketerModalOpen(false);
    toast.success('Marketer updated successfully');
  };

  const handleDeleteMarketer = (id: number) => {
    setMarketers(prev => prev.filter(marketer => marketer.id !== id));
    toast.success('Marketer deleted successfully');
  };

  const handleAddMarketer = (newMarketer: any) => {
    setMarketers(prev => [...prev, {
      id: Date.now(),
      name: newMarketer.name,
      email: newMarketer.email,
      phone: newMarketer.phone,
      role: newMarketer.role,
      leads: 0,
      conversions: 0,
      sales: 0,
      totalSalesVolume: '₦0',
      commission: '₦0',
      commissionPaid: '₦0',
      commissionPending: '₦0',
      status: 'active',
      projects: newMarketer.projects || [],
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
    }]);
    setIsAddMarketerModalOpen(false);
    toast.success('Marketer added successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketers & Commissions</h1>
          <p className="text-gray-600 mt-1">Manage marketers, track performance, and process commissions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Dialog open={isAddMarketerModalOpen} onOpenChange={setIsAddMarketerModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Marketer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Marketer</DialogTitle>
                <DialogDescription>Create a new marketer profile</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddMarketer)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marketer Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jane@proptyos.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+234 801 111 2222" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roleOptions.map((role) => (
                              <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Add Marketer</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle>Marketers List</CardTitle>
            <Input
              placeholder="Search marketers..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Sales</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMarketers.map((marketer) => (
                <TableRow key={marketer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={marketer.avatar} alt={marketer.name} />
                        <AvatarFallback>{marketer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{marketer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{marketer.email}</div>
                    <div className="text-gray-500">{marketer.phone}</div>
                  </TableCell>
                  <TableCell>{marketer.role}</TableCell>
                  <TableCell className="text-right">{marketer.sales}</TableCell>
                  <TableCell className="text-right">{marketer.commission}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={marketer.status === 'active' ? 'default' : 'secondary'}>
                      {marketer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem onClick={() => handleEditMarketer(marketer)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Marketer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteMarketer(marketer.id)} className="text-red-600 focus:text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Marketer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Generate Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Marketer Modal */}
      <Dialog open={isEditMarketerModalOpen} onOpenChange={setIsEditMarketerModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Marketer</DialogTitle>
            <DialogDescription>Update marketer information</DialogDescription>
          </DialogHeader>
          {selectedMarketer && (
            <EditMarketerForm
              marketer={selectedMarketer}
              onUpdate={handleUpdateMarketer}
              onClose={() => setIsEditMarketerModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface EditMarketerFormProps {
  marketer: any;
  onUpdate: (updatedMarketer: any) => void;
  onClose: () => void;
}

function EditMarketerForm({ marketer, onUpdate, onClose }: EditMarketerFormProps) {
  const [name, setName] = useState(marketer.name);
  const [email, setEmail] = useState(marketer.email);
  const [phone, setPhone] = useState(marketer.phone);
  const [role, setRole] = useState(marketer.role);
  const [status, setStatus] = useState(marketer.status);
  const [projects, setProjects] = useState(marketer.projects);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedMarketer = { ...marketer, name, email, phone, role, status, projects };
    onUpdate(updatedMarketer);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Input type="text" id="role" value={role} onChange={e => setRole(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Input type="text" id="status" value={status} onChange={e => setStatus(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="projects">Projects</Label>
        <Input type="text" id="projects" value={projects} onChange={e => setProjects(e.target.value)} />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit">Update Marketer</Button>
      </div>
    </form>
  );
}
