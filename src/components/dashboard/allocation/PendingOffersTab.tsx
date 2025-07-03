
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Search, Eye, Send } from 'lucide-react';
import { EnhancedOfferLetterModal } from './EnhancedOfferLetterModal';
import { toast } from 'sonner';

interface PendingOffersTabProps {
  onSendOffer?: (data: any) => void;
}

const mockPendingOffers = [
  {
    id: 'offer-1',
    clientName: 'John Doe',
    projectName: 'Victoria Gardens',
    salesType: 'offer_only',
    saleAmount: '₦25,000,000',
    initialPayment: '',
    saleDate: '2024-01-15',
    status: 'pending_offer',
    marketer: 'Jane Smith',
    notes: 'Client interested in premium unit'
  },
  {
    id: 'offer-2',
    clientName: 'Sarah Johnson',
    projectName: 'Emerald Heights',
    salesType: 'offer_allocation',
    saleAmount: '₦30,000,000',
    initialPayment: '₦5,000,000',
    saleDate: '2024-01-12',
    status: 'pending_offer_allocation',
    marketer: 'Mike Davis',
    unitNumber: 'Block B - Plot 12'
  },
  {
    id: 'offer-3',
    clientName: 'Robert Brown',
    projectName: 'Golden View',
    salesType: 'offer_only',
    saleAmount: '₦22,000,000',
    initialPayment: '',
    saleDate: '2024-01-10',
    status: 'pending_offer',
    marketer: 'Sarah Johnson',
    notes: 'Corporate client - bulk purchase potential'
  }
];

export function PendingOffersTab({ onSendOffer }: PendingOffersTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [showOfferPreview, setShowOfferPreview] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const filteredOffers = mockPendingOffers.filter(offer => {
    const matchesSearch = offer.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'all' || offer.projectName === projectFilter;
    return matchesSearch && matchesProject;
  });

  const handlePreviewOffer = (offer: any) => {
    setSelectedOffer(offer);
    setShowOfferPreview(true);
  };

  const handleSendOffer = (offer: any) => {
    if (onSendOffer) {
      onSendOffer(offer);
    }
    toast.success('Offer letter sent to client!');
  };

  const projects = [...new Set(mockPendingOffers.map(o => o.projectName))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_offer':
        return 'bg-blue-100 text-blue-800';
      case 'pending_offer_allocation':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending_offer':
        return 'Pending Offer';
      case 'pending_offer_allocation':
        return 'Pending Offer + Allocation';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <CardTitle>Pending Offers</CardTitle>
            </div>
            <Badge className="bg-blue-600 text-white">
              {filteredOffers.length} pending
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Sales recorded awaiting offer letter generation and client approval
          </p>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Offers Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client & Project</TableHead>
                <TableHead>Sale Amount</TableHead>
                <TableHead>Type & Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{offer.clientName}</div>
                      <div className="text-sm text-gray-500">{offer.projectName}</div>
                      {offer.marketer && (
                        <div className="text-xs text-blue-600">Marketer: {offer.marketer}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{offer.saleAmount}</div>
                      {offer.initialPayment && (
                        <div className="text-sm text-gray-500">Initial: {offer.initialPayment}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium">
                        {offer.salesType === 'offer_only' ? 'Offer Only' : 'Offer + Allocation'}
                      </div>
                      {offer.unitNumber && (
                        <div className="text-xs text-gray-500">{offer.unitNumber}</div>
                      )}
                      {offer.notes && (
                        <div className="text-xs text-blue-600 mt-1">{offer.notes}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(offer.status)}>
                      {getStatusLabel(offer.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        onClick={() => handlePreviewOffer(offer)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send Offer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOffers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No pending offers found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <EnhancedOfferLetterModal 
        isOpen={showOfferPreview}
        onClose={() => {
          setShowOfferPreview(false);
          setSelectedOffer(null);
        }}
        offer={selectedOffer}
        onSend={(offer, options) => {
          handleSendOffer(offer);
          setShowOfferPreview(false);
          setSelectedOffer(null);
        }}
      />
    </div>
  );
}
