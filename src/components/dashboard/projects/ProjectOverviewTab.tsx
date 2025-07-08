import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Building, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Clock, 
  FileText, 
  Tag,
  Map
} from 'lucide-react';

interface ProjectOverviewTabProps {
  project: {
    id: number;
    name: string;
    location: string;
    status: string;
    type: string;
    totalUnits: number;
    soldUnits: number;
    reservedUnits: number;
    availableUnits: number;
    description?: string;
    projectManager?: string;
    projectSize?: string;
    developmentStage?: string;
  };
}

const mockProjectData = {
  description: 'A premium residential estate featuring modern amenities and strategic location with excellent infrastructure.',
  projectManager: 'John Smith',
  internalNotes: 'High-priority project with premium pricing strategy. Focus on luxury segment marketing.',
  tags: ['Residential', 'Premium', 'High-Value', 'Strategic Location'],
  totalRevenue: '₦2,340,000,000',
  allocationProgress: 68,
  blockPrototypes: [
    { type: 'Duplex', count: 2, plots: 60 },
    { type: 'Bungalow', count: 1, plots: 25 },
    { type: 'Commercial', count: 1, plots: 15 }
  ],
  recentActivity: [
    { 
      id: 1, 
      action: 'Plot A-15 allocated to John Doe', 
      time: '2 hours ago', 
      type: 'allocation',
      icon: '🏠'
    },
    { 
      id: 2, 
      action: 'Payment received for Plot B-08', 
      time: '5 hours ago', 
      type: 'payment',
      icon: '💰'
    },
    { 
      id: 3, 
      action: 'Document uploaded: Survey Plan', 
      time: '1 day ago', 
      type: 'document',
      icon: '📄'
    },
    { 
      id: 4, 
      action: 'Block C construction started', 
      time: '2 days ago', 
      type: 'construction',
      icon: '🔨'
    },
    { 
      id: 5, 
      action: 'New client registered for Plot D-22', 
      time: '3 days ago', 
      type: 'client',
      icon: '👤'
    }
  ]
};

export function ProjectOverviewTab({ project }: ProjectOverviewTabProps) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'in development':
        return 'bg-yellow-100 text-yellow-800';
      case 'paused':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'residential':
        return 'bg-blue-100 text-blue-800';
      case 'commercial':
        return 'bg-purple-100 text-purple-800';
      case 'mixed':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const allocationRate = Math.round((project.soldUnits / project.totalUnits) * 100);

  return (
    <div className="space-y-6">
      {/* Project Header Information */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                <Badge className={getCategoryColor(project.type)}>
                  {project.type}
                </Badge>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{project.location}</span>
              </div>
              
              <p className="text-muted-foreground max-w-2xl">
                {mockProjectData.description}
              </p>
            </div>
            
            <Button variant="outline" size="sm">
              <Map className="h-4 w-4 mr-2" />
              View on Map
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{project.totalUnits}</div>
                <div className="text-sm text-muted-foreground">Total Plots</div>
              </div>
              <Building className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{project.availableUnits}</div>
                <div className="text-sm text-muted-foreground">Available Plots</div>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{project.reservedUnits}</div>
                <div className="text-sm text-muted-foreground">Reserved Plots</div>
              </div>
              <Building className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{project.soldUnits}</div>
                <div className="text-sm text-muted-foreground">Allocated Plots</div>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{allocationRate}%</div>
                <div className="text-sm text-muted-foreground">Allocation Progress</div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress and Revenue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Allocation Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{allocationRate}% Complete</span>
              </div>
              <Progress value={allocationRate} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{project.soldUnits} allocated</span>
                <span>{project.reservedUnits} reserved</span>
                <span>{project.availableUnits} available</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Revenue</span>
                <span className="text-2xl font-bold text-green-600">{mockProjectData.totalRevenue}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                <span className="text-sm text-muted-foreground">From {project.soldUnits} allocated plots</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Block Prototypes and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Block Prototypes Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockProjectData.blockPrototypes.map((block, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">{block.count} {block.type} Block{block.count > 1 ? 's' : ''}</div>
                    <div className="text-sm text-muted-foreground">{block.plots} plots total</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{block.plots} plots</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockProjectData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <span className="text-lg">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => {
                // Navigate to full activity log
                window.location.href = '/company/activity-log';
              }}
            >
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Project Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Project Manager:</span>
                <span className="font-medium">{mockProjectData.projectManager}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Project Size:</span>
                <span className="font-medium">{project.projectSize || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Development Stage:</span>
                <span className="font-medium">{project.developmentStage || 'N/A'}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-muted-foreground">Internal Notes:</span>
                <p className="text-sm bg-muted p-3 rounded-md mt-1">{mockProjectData.internalNotes}</p>
              </div>
              
              <div>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mockProjectData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}