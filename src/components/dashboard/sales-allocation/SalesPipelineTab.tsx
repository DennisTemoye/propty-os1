
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar, 
  Eye, 
  Edit, 
  Download, 
  Search,
  Filter
} from 'lucide-react';

const mockSalesPipeline = [
  {
    id: 1,
    clientName: 'John Doe',
    unit: 'Block A - Plot 02',
    project: 'Victoria Gardens',
    stage: 'interested',
    saleAmount: 25000000,
    initialPayment: 5000000,
    marketer: 'Jane Smith',
    dateCreated: '2024-01-15',
    lastActivity: '2024-01-20',
    probability: 75,
    nextAction: 'Follow up call'
  },
  {
    id: 2,
    clientName: 'Sarah Johnson',
    unit: 'Block B - Plot 08',
    project: 'Emerald Heights',
    stage: 'negotiating',
    saleAmount: 30000000,
    initialPayment: 8000000,
    marketer: 'Mike Davis',
    dateCreated: '2024-01-10',
    lastActivity: '2024-01-22',
    probability: 60,
    nextAction: 'Send proposal'
  },
  {
    id: 3,
    clientName: 'Robert Brown',
    unit: 'Block C - Plot 15',
    project: 'Golden View',
    stage: 'proposal_sent',
    saleAmount: 22000000,
    initialPayment: 4400000,
    marketer: 'Sarah Johnson',
    dateCreated: '2024-01-20',
    lastActivity: '2024-01-23',
    probability: 85,
    nextAction: 'Contract preparation'
  },
  {
    id: 4,
    clientName: 'Alice Cooper',
    unit: 'Block A - Plot 12',
    project: 'Ocean Breeze',
    stage: 'closed_won',
    saleAmount: 28000000,
    initialPayment: 14000000,
    marketer: 'Tom Wilson',
    dateCreated: '2024-01-25',
    lastActivity: '2024-01-26',
    probability: 100,
    nextAction: 'Allocation processing'
  }
];

export function SalesPipelineTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [marketerFilter, setMarketerFilter] = useState('all');

  const filteredPipeline = mockSalesPipeline.filter(sale => {
    const matchesSearch = sale.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || sale.stage === stageFilter;
    const matchesMarketer = marketerFilter === 'all' || sale.marketer === marketerFilter;
    
    return matchesSearch && matchesStage && matchesMarketer;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'interested':
        return 'bg-blue-100 text-blue-800';
      case 'negotiating':
        return 'bg-yellow-100 text-yellow-800';
      case 'proposal_sent':
        return 'bg-purple-100 text-purple-800';
      case 'closed_won':
        return 'bg-green-100 text-green-800';
      case 'closed_lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageName = (stage: string) => {
    switch (stage) {
      case 'interested':
        return 'Interested';
      case 'negotiating':
        return 'Negotiating';
      case 'proposal_sent':
        return 'Proposal Sent';
      case 'closed_won':
        return 'Closed Won';
      case 'closed_lost':
        return 'Closed Lost';
      default:
        return stage;
    }
  };

  const getPipelineStats = () => {
    const totalValue = filteredPipeline.reduce((sum, sale) => sum + sale.saleAmount, 0);
    const averageProbability = filteredPipeline.reduce((sum, sale) => sum + sale.probability, 0) / filteredPipeline.length || 0;
    const closedWon = filteredPipeline.filter(sale => sale.stage === 'closed_won').length;
    
    return { totalValue, averageProbability, closedWon };
  };

  const stats = getPipelineStats();

  return (
    <div className="space-y-6">
      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pipeline Value</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Average Probability</p>
                <p className="text-2xl font-bold">{stats.averageProbability.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-2xl font-bold">{filteredPipeline.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Closed Won</p>
                <p className="text-2xl font-bold">{stats.closedWon}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Sales Pipeline with History</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients or units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="negotiating">Negotiating</SelectItem>
                <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                <SelectItem value="closed_won">Closed Won</SelectItem>
                <SelectItem value="closed_lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={marketerFilter} onValueChange={setMarketerFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Marketers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Marketers</SelectItem>
                <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                <SelectItem value="Mike Davis">Mike Davis</SelectItem>
                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                <SelectItem value="Tom Wilson">Tom Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pipeline Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client & Unit</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Sale Amount</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Marketer</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Next Action</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPipeline.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.clientName}</div>
                      <div className="text-sm text-gray-500">{sale.unit}</div>
                    </div>
                  </TableCell>
                  <TableCell>{sale.project}</TableCell>
                  <TableCell>
                    <Badge className={getStageColor(sale.stage)}>
                      {getStageName(sale.stage)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{formatCurrency(sale.saleAmount)}</div>
                      <div className="text-sm text-gray-500">
                        Initial: {formatCurrency(sale.initialPayment)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${sale.probability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{sale.probability}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{sale.marketer}</TableCell>
                  <TableCell>{sale.lastActivity}</TableCell>
                  <TableCell className="text-sm text-gray-600">{sale.nextAction}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPipeline.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No sales pipeline data found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
