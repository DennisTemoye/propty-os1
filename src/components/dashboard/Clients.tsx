import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DownloadButton } from '@/components/ui/download-button';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  DollarSign,
  FileText,
  Eye,
  Edit,
  Trash2,
  Download,
  Plus,
  UserPlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  status: 'Active' | 'Inactive' | 'Pending';
  contractValue: number;
  startDate: string;
  endDate: string;
  notes: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown',
    company: 'Acme Corp',
    status: 'Active',
    contractValue: 120000,
    startDate: '2023-01-15',
    endDate: '2024-01-15',
    notes: 'Long-term client with a solid payment history.'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    address: '456 Elm St, Anytown',
    company: 'Beta Co',
    status: 'Inactive',
    contractValue: 75000,
    startDate: '2022-05-01',
    endDate: '2023-05-01',
    notes: 'Contract ended. Potential for renewal.'
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '555-123-4567',
    address: '789 Oak St, Anytown',
    company: 'Gamma Inc',
    status: 'Pending',
    contractValue: 90000,
    startDate: '2023-09-01',
    endDate: '2024-09-01',
    notes: 'Awaiting contract signature.'
  },
  {
    id: '4',
    name: 'Bob Williams',
    email: 'bob.williams@example.com',
    phone: '111-222-3333',
    address: '321 Pine St, Anytown',
    company: 'Delta Ltd',
    status: 'Active',
    contractValue: 150000,
    startDate: '2023-03-10',
    endDate: '2024-03-10',
    notes: 'Key client. High satisfaction.'
  },
  {
    id: '5',
    name: 'Emily Brown',
    email: 'emily.brown@example.com',
    phone: '444-555-6666',
    address: '654 Maple St, Anytown',
    company: 'Epsilon LLC',
    status: 'Active',
    contractValue: 60000,
    startDate: '2023-07-01',
    endDate: '2024-07-01',
    notes: 'New client. Promising potential.'
  },
];

export function Clients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredClients = mockClients.filter(client => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const statusMatch = selectedStatus === 'all' || client.status === selectedStatus;
    return searchRegex.test(client.name) && statusMatch;
  });

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddClient = () => {
    navigate('/company/clients/add');
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsDetailOpen(true);
  };

  const handleEditClient = (client: Client) => {
    console.log('Edit client:', client.name);
    toast.success(`Editing ${client.name}`);
  };

  const handleDeleteClient = (client: Client) => {
    console.log('Delete client:', client.name);
    toast.success(`${client.name} deleted`);
  };

  const statusColors: { [key: string]: string } = {
    Active: 'green',
    Inactive: 'red',
    Pending: 'yellow',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your client database and relationships</p>
        </div>
        <Button onClick={handleAddClient} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search clients..."
            className="md:w-80 lg:w-96"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter by Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleStatusFilter('all')}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter('Active')}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter('Inactive')}>
              Inactive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter('Pending')}>
              Pending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map(client => (
              <Card key={client.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {client.name}
                    <Badge variant="secondary" className={`bg-${statusColors[client.status]}-100 text-${statusColors[client.status]}-700 border-none`}>
                      {client.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{client.company}</p>
                      <p className="text-xs text-gray-500">{client.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="ghost" size="sm" onClick={() => handleViewClient(client)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClient(client)}>
                          <Edit className="h-3 w-3 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClient(client)}>
                          <Trash2 className="h-3 w-3 mr-2" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-3 w-3 mr-2" />
                          Download Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredClients.map(client => (
                  <div key={client.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-lg font-semibold">{client.name}</p>
                          <p className="text-gray-500">{client.company}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className={`bg-${statusColors[client.status]}-100 text-${statusColors[client.status]}-700 border-none`}>
                        {client.status}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>
                        <Mail className="h-4 w-4 inline-block mr-1" />
                        {client.email}
                      </p>
                      <p>
                        <Phone className="h-4 w-4 inline-block mr-1" />
                        {client.phone}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button size="sm" onClick={() => handleViewClient(client)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Actions
                            <MoreVertical className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditClient(client)}>
                            <Edit className="h-3 w-3 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClient(client)}>
                            <Trash2 className="h-3 w-3 mr-2" />
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-3 w-3 mr-2" />
                            Download Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Client Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{selectedClient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">{selectedClient.name}</h2>
                  <p className="text-gray-500">{selectedClient.company}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Contact Information</p>
                  <p>
                    <Mail className="h-4 w-4 inline-block mr-1" />
                    {selectedClient.email}
                  </p>
                  <p>
                    <Phone className="h-4 w-4 inline-block mr-1" />
                    {selectedClient.phone}
                  </p>
                  <p>
                    <MapPin className="h-4 w-4 inline-block mr-1" />
                    {selectedClient.address}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Contract Details</p>
                  <p>
                    <Calendar className="h-4 w-4 inline-block mr-1" />
                    Start Date: {selectedClient.startDate}
                  </p>
                  <p>
                    <Calendar className="h-4 w-4 inline-block mr-1" />
                    End Date: {selectedClient.endDate}
                  </p>
                  <p>
                    <DollarSign className="h-4 w-4 inline-block mr-1" />
                    Contract Value: ${selectedClient.contractValue}
                  </p>
                  <p>
                    <Badge variant="secondary" className={`bg-${statusColors[selectedClient.status]}-100 text-${statusColors[selectedClient.status]}-700 border-none`}>
                      {selectedClient.status}
                    </Badge>
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold">Notes</p>
                <p>{selectedClient.notes}</p>
              </div>
              <div className="flex justify-end space-x-2">
                <DownloadButton
                  data={selectedClient}
                  filename={`${selectedClient.name.replace(/\s+/g, '-')}-details`}
                  formats={['pdf', 'csv']}
                  template="report"
                  variant="outline"
                  size="sm"
                />
                <Button variant="outline" size="sm" onClick={() => handleEditClient(selectedClient)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Client
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
