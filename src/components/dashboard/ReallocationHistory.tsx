
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, User, Calendar, FileText, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ReallocationHistoryProps {
  unitId?: string;
  clientId?: string;
  projectId?: string;
}

const mockReallocations = [
  {
    id: 1,
    unitId: 'Block A - Plot 02',
    project: 'Victoria Gardens Estate',
    fromClient: 'Michael Smith',
    toClient: 'John Doe',
    fromMarketer: 'Tom Wilson',
    toMarketer: 'Jane Smith',
    date: '2024-01-15',
    reason: 'Unit Resale',
    price: '₦25M',
    processedBy: 'Admin User',
    notes: 'Client requested transfer due to family relocation'
  },
  {
    id: 2,
    unitId: 'Block B - Plot 08',
    project: 'Golden View Towers',
    fromClient: 'Sarah Johnson',
    toClient: 'Jane Williams',
    fromMarketer: 'Jane Smith',
    toMarketer: 'Mike Davis',
    date: '2024-01-10',
    reason: 'Payment Default',
    price: '₦30M',
    processedBy: 'Admin User',
    notes: 'Original client defaulted on payment plan'
  },
  {
    id: 3,
    unitId: 'Block C - Plot 15',
    project: 'Emerald Heights',
    fromClient: 'David Wilson',
    toClient: 'Robert Brown',
    fromMarketer: 'Sarah Johnson',
    toMarketer: 'Sarah Johnson',
    date: '2024-01-20',
    reason: 'Administrative',
    price: '₦22M',
    processedBy: 'Admin User',
    notes: 'Internal restructuring of client portfolio'
  }
];

export function ReallocationHistory({ unitId, clientId, projectId }: ReallocationHistoryProps) {
  const navigate = useNavigate();
  
  // Filter reallocations based on provided filters
  const filteredReallocations = mockReallocations.filter(reallocation => {
    if (unitId && reallocation.unitId !== unitId) return false;
    if (clientId && reallocation.toClient !== clientId && reallocation.fromClient !== clientId) return false;
    if (projectId && reallocation.project !== projectId) return false;
    return true;
  });
  
  const handleViewDetails = (reallocation: any) => {
    // Navigate to detailed view
    navigate('/company/sales');
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'Unit Resale':
        return 'bg-green-100 text-green-800';
      case 'Payment Default':
        return 'bg-red-100 text-red-800';
      case 'Administrative':
        return 'bg-blue-100 text-blue-800';
      case 'Client Transfer':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (filteredReallocations.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <ArrowRight className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Reallocations Found</h3>
          <p className="text-gray-500">No reallocation history available for the selected criteria.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ArrowRight className="h-5 w-5 text-purple-600" />
          <span>Reallocation History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredReallocations.map((reallocation) => (
            <div key={reallocation.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{reallocation.unitId}</h4>
                    <Badge className={getReasonColor(reallocation.reason)}>
                      {reallocation.reason}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{reallocation.project}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{reallocation.date}</span>
                    <span>•</span>
                    <span>Processed by {reallocation.processedBy}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-lg font-semibold text-purple-600">{reallocation.price}</div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewDetails(reallocation)}
                    className="hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Client Transfer Flow */}
              <div className="flex items-center space-x-4 py-3 bg-gray-50 rounded-lg mb-3">
                <div className="flex items-center space-x-2 flex-1">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                      {reallocation.fromClient.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{reallocation.fromClient}</div>
                    <div className="text-xs text-gray-500">From: {reallocation.fromMarketer}</div>
                  </div>
                </div>
                
                <ArrowRight className="h-4 w-4 text-gray-400" />
                
                <div className="flex items-center space-x-2 flex-1">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                      {reallocation.toClient.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{reallocation.toClient}</div>
                    <div className="text-xs text-gray-500">To: {reallocation.toMarketer}</div>
                  </div>
                </div>
              </div>

              {reallocation.notes && (
                <div className="flex items-start space-x-2 text-sm">
                  <FileText className="h-3 w-3 mt-0.5 text-gray-400" />
                  <span className="text-gray-600">{reallocation.notes}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
