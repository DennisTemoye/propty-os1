
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, FileText, Tag, Clock, Activity, Image } from 'lucide-react';
import { getProjectImage, handleImageError } from '@/lib/utils';


interface ProjectOverviewContentProps {
  project: {
    description: string;
    projectManager: string;
    internalNotes: string;
    tags: string[];
    allocationRate: number;
    image?: string;
    name: string;
  };
}

export function ProjectOverviewContent({ project }: ProjectOverviewContentProps) {
  const recentActivities = [
    { id: 1, action: 'Unit A-15 allocated to John Doe', time: '2 hours ago', type: 'allocation' },
    { id: 2, action: 'Payment received for Unit B-08', time: '5 hours ago', type: 'payment' },
    { id: 3, action: 'Document uploaded: Survey Plan', time: '1 day ago', type: 'document' },
    { id: 4, action: 'Project status updated to Active', time: '2 days ago', type: 'status' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'allocation': return '🏠';
      case 'payment': return '💰';
      case 'document': return '📄';
      case 'status': return '🔄';
      default: return '📋';
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Core Information Panel */}
        <div className="xl:col-span-2 space-y-6">
          {/* Project Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-left">
                <Image className="h-5 w-5 mr-2" />
                Project Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img 
                  src={getProjectImage(project)} 
                  alt={project.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-left">
                <FileText className="h-5 w-5 mr-2" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-left">
                <h4 className="text-sm font-medium text-gray-500 mb-2 text-left">Project Description</h4>
                <p className="text-gray-900 text-left">{project.description}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Project Manager:</span>
                <span className="font-medium">{project.projectManager}</span>
              </div>

              <div className="text-left">
                <h4 className="text-sm font-medium text-gray-500 mb-2 text-left">Document Title</h4>
                <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-md text-left">CofO, Family Receipt, Survey Plan</p>
              </div>

              <div className="text-left">
                <h4 className="text-sm font-medium text-gray-500 mb-2 text-left">Internal Notes</h4>
                <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-md text-left">{project.internalNotes}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center text-left">
                  <Tag className="h-4 w-4 mr-1" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-left">Allocation Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Allocation Rate</span>
                  <span>{project.allocationRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${project.allocationRate}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {project.allocationRate >= 75 ? 'Excellent progress!' : 'Good momentum, keep going!'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Log */}
        <div className="xl:col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center text-left">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
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
      </div>
    </div>
  );
}
