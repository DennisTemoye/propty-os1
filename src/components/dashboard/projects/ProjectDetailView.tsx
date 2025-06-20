
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Edit, 
  Trash2, 
  Users, 
  DollarSign, 
  Calendar, 
  FileText, 
  Upload, 
  Download,
  Eye,
  Building,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface ProjectDetailViewProps {
  project: {
    id: number;
    name: string;
    location: string;
    totalUnits: number;
    soldUnits: number;
    reservedUnits: number;
    availableUnits: number;
    status: string;
    type: string;
    documentTitle?: string;
    projectSize?: string;
    developmentStage?: string;
  };
}

const mockProjectDetails = {
  description: 'A premium residential estate featuring modern amenities and strategic location.',
  startDate: '2024-01-15',
  expectedCompletion: '2025-12-31',
  totalRevenue: '₦2,340,000,000',
  totalBudget: '₦1,800,000,000',
  avgUnitPrice: '₦15,600,000',
  recentSales: [
    { id: 1, unit: 'Unit A-15', client: 'John Doe', amount: '₦15,600,000', date: '2024-01-10' },
    { id: 2, unit: 'Unit B-08', client: 'Jane Smith', amount: '₦15,600,000', date: '2024-01-08' },
    { id: 3, unit: 'Unit C-22', client: 'Mike Johnson', amount: '₦15,600,000', date: '2024-01-05' },
  ],
  upcomingPayments: [
    { id: 1, client: 'Sarah Wilson', amount: '₦3,900,000', dueDate: '2024-01-25', type: 'Installment' },
    { id: 2, client: 'David Brown', amount: '₦7,800,000', dueDate: '2024-01-30', type: 'Balance Payment' },
  ],
  team: [
    { name: 'Alice Johnson', role: 'Project Manager', sales: 12 },
    { name: 'Bob Williams', role: 'Sales Agent', sales: 8 },
    { name: 'Carol Davis', role: 'Marketing Lead', sales: 15 },
  ],
  blocks: [
    { id: 'A', prototype: 'Duplex', units: 30, status: 'completed', sold: 25, reserved: 3, available: 2 },
    { id: 'B', prototype: 'Bungalow', units: 25, status: 'construction', sold: 18, reserved: 4, available: 3 },
    { id: 'C', prototype: 'Duplex', units: 30, status: 'planning', sold: 0, reserved: 0, available: 30 },
  ]
};

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold out':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const salesProgress = (project.soldUnits / project.totalUnits) * 100;
  const budgetProgress = 65; // Example budget utilization

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {project.location}
          </div>
          <div className="flex items-center text-blue-600 mb-2">
            <FileText className="h-4 w-4 mr-1" />
            {project.documentTitle}
          </div>
          <p className="text-gray-600">{mockProjectDetails.description}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{project.soldUnits}</div>
                <div className="text-sm text-gray-500">Units Sold</div>
              </div>
              <Building className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{mockProjectDetails.totalRevenue}</div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{salesProgress.toFixed(1)}%</div>
                <div className="text-sm text-gray-500">Sales Progress</div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{project.availableUnits}</div>
                <div className="text-sm text-gray-500">Available Units</div>
              </div>
              <Building className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{mockProjectDetails.totalBudget}</div>
                <div className="text-sm text-gray-500">Total Budget</div>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sales Progress</span>
                <span>{salesProgress.toFixed(1)}% Complete</span>
              </div>
              <Progress value={salesProgress} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{project.soldUnits} sold</span>
                <span>{project.reservedUnits} reserved</span>
                <span>{project.availableUnits} available</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Budget Utilization</span>
                <span>{budgetProgress}% Used</span>
              </div>
              <Progress value={budgetProgress} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₦1,170,000,000 spent</span>
                <span>₦630,000,000 remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span>{project.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span>{project.projectSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Development Stage:</span>
                    <span>{project.developmentStage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span>{mockProjectDetails.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Completion:</span>
                    <span>{mockProjectDetails.expectedCompletion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Document:</span>
                    <span className="text-blue-600">{project.documentTitle}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View All Clients
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Sales Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Block Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProjectDetails.blocks.map((block) => (
                  <div key={block.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-blue-600">Block {block.id}</span>
                      </div>
                      <div>
                        <div className="font-medium">{block.prototype}</div>
                        <div className="text-sm text-gray-500">{block.units} units • {block.status}</div>
                      </div>
                    </div>
                    <div className="flex space-x-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-green-600">{block.sold}</div>
                        <div className="text-gray-500">Sold</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-yellow-600">{block.reserved}</div>
                        <div className="text-gray-500">Reserved</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-blue-600">{block.available}</div>
                        <div className="text-gray-500">Available</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProjectDetails.recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{sale.unit}</div>
                      <div className="text-sm text-gray-500">{sale.client}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">{sale.amount}</div>
                      <div className="text-sm text-gray-500">{sale.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProjectDetails.upcomingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{payment.client}</div>
                      <div className="text-sm text-gray-500">{payment.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-orange-600">{payment.amount}</div>
                      <div className="text-sm text-gray-500">Due: {payment.dueDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProjectDetails.team.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-blue-600">{member.sales} sales</div>
                      <div className="text-sm text-gray-500">This month</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-medium">Project Started</div>
                    <div className="text-sm text-gray-500">{mockProjectDetails.startDate}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-medium">First Units Sold</div>
                    <div className="text-sm text-gray-500">2024-02-01</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-medium">50% Sales Milestone</div>
                    <div className="text-sm text-gray-500">Expected: 2024-08-15</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mt-1"></div>
                  <div>
                    <div className="font-medium">Project Completion</div>
                    <div className="text-sm text-gray-500">{mockProjectDetails.expectedCompletion}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
