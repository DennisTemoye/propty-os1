
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, User, FileText, Check } from 'lucide-react';

interface AssignUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: any;
}

const mockClients = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    kycStatus: 'approved',
    hasActiveProperty: false
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+234 802 345 6789',
    kycStatus: 'approved',
    hasActiveProperty: true
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+234 803 456 7890',
    kycStatus: 'pending',
    hasActiveProperty: false
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+234 804 567 8901',
    kycStatus: 'approved',
    hasActiveProperty: false
  }
];

export function AssignUnitModal({ isOpen, onClose, unit }: AssignUnitModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [assignmentType, setAssignmentType] = useState<'reserved' | 'sold'>('reserved');
  const [step, setStep] = useState<'search' | 'confirm' | 'success'>('search');

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClientSelect = (client: any) => {
    setSelectedClient(client);
    setStep('confirm');
  };

  const handleConfirmAssignment = () => {
    console.log('Assigning unit', unit?.plotId, 'to client', selectedClient?.name, 'as', assignmentType);
    setStep('success');
    
    // Auto-close after 2 seconds
    setTimeout(() => {
      onClose();
      resetModal();
    }, 2000);
  };

  const resetModal = () => {
    setSearchTerm('');
    setSelectedClient(null);
    setAssignmentType('reserved');
    setStep('search');
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!unit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {step === 'search' && `Assign Unit: ${unit.plotId}`}
            {step === 'confirm' && 'Confirm Assignment'}
            {step === 'success' && 'Assignment Successful'}
          </DialogTitle>
          <DialogDescription>
            {step === 'search' && 'Search and select a client to assign this unit to'}
            {step === 'confirm' && 'Review the assignment details before confirming'}
            {step === 'success' && 'The unit has been successfully assigned to the client'}
          </DialogDescription>
        </DialogHeader>

        {step === 'search' && (
          <div className="space-y-4">
            {/* Unit Details */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Plot ID:</span> {unit.plotId}
                  </div>
                  <div>
                    <span className="font-medium">Size:</span> {unit.size}
                  </div>
                  <div>
                    <span className="font-medium">Price:</span> {unit.price}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> 
                    <Badge className="ml-2 bg-green-100 text-green-800">Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Clients */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Clients</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Client List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredClients.map((client) => (
                <Card 
                  key={client.id} 
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    client.kycStatus !== 'approved' ? 'opacity-60' : ''
                  }`}
                  onClick={() => client.kycStatus === 'approved' && handleClientSelect(client)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{client.name}</span>
                          <Badge className={getKycStatusColor(client.kycStatus)}>
                            {client.kycStatus}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          <div>{client.email}</div>
                          <div>{client.phone}</div>
                        </div>
                        {client.hasActiveProperty && (
                          <div className="text-xs text-orange-600 mt-1">
                            Already has an assigned property
                          </div>
                        )}
                      </div>
                      {client.kycStatus === 'approved' && (
                        <Button size="sm" variant="outline">
                          Select
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredClients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No clients found matching your search
              </div>
            )}
          </div>
        )}

        {step === 'confirm' && selectedClient && (
          <div className="space-y-4">
            {/* Assignment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Unit Details</h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">Plot ID:</span> {unit.plotId}</div>
                    <div><span className="font-medium">Size:</span> {unit.size}</div>
                    <div><span className="font-medium">Price:</span> {unit.price}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Client Details</h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">Name:</span> {selectedClient.name}</div>
                    <div><span className="font-medium">Email:</span> {selectedClient.email}</div>
                    <div><span className="font-medium">Phone:</span> {selectedClient.phone}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assignment Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Assignment Type</label>
              <Select value={assignmentType} onValueChange={(value: 'reserved' | 'sold') => setAssignmentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reserved">Reserved (Pending Payment)</SelectItem>
                  <SelectItem value="sold">Sold (Payment Completed)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Documents to Generate */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Documents to be Generated
                </h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Allocation Letter</li>
                  <li>• Memorandum of Understanding (MoU)</li>
                  <li>• Payment Schedule</li>
                  {assignmentType === 'sold' && <li>• Certificate of Occupancy</li>}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={() => setStep('search')} variant="outline" className="flex-1">
                Back
              </Button>
              <Button onClick={handleConfirmAssignment} className="flex-1 bg-green-600 hover:bg-green-700">
                Confirm Assignment
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-green-900 mb-2">Assignment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Unit {unit.plotId} has been assigned to {selectedClient?.name} as {assignmentType}.
            </p>
            <p className="text-sm text-gray-500">
              Documents are being generated and will be available in the client's profile.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
