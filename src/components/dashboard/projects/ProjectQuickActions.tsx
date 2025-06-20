
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, Edit, MoreHorizontal, Archive, Share, Copy, FileText, Users, BarChart3 } from 'lucide-react';

interface DevelopmentQuickActionsProps {
  project: any;
  onView: () => void;
  onEdit: () => void;
}

export function ProjectQuickActions({ project, onView, onEdit }: DevelopmentQuickActionsProps) {
  const handleAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    switch (action) {
      case 'view':
        onView();
        break;
      case 'edit':
        onEdit();
        break;
      case 'duplicate':
        console.log('Duplicating development:', project.name);
        break;
      case 'archive':
        console.log('Archiving development:', project.name);
        break;
      case 'share':
        console.log('Sharing development:', project.name);
        break;
      case 'reports':
        console.log('Generating reports for:', project.name);
        break;
      case 'team':
        console.log('Managing team for:', project.name);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => handleAction('view', e)}
        className="h-8 px-3 border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
      >
        <Eye className="h-3 w-3 mr-1" />
        View
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 border-gray-200 hover:bg-gray-50"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
          <DropdownMenuItem onClick={(e) => handleAction('edit', e)} className="cursor-pointer hover:bg-indigo-50">
            <Edit className="h-4 w-4 mr-3 text-gray-500" />
            Edit Development
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={(e) => handleAction('duplicate', e)} className="cursor-pointer hover:bg-blue-50">
            <Copy className="h-4 w-4 mr-3 text-gray-500" />
            Duplicate Development
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={(e) => handleAction('share', e)} className="cursor-pointer hover:bg-green-50">
            <Share className="h-4 w-4 mr-3 text-gray-500" />
            Share Development
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-gray-200" />
          
          <DropdownMenuItem onClick={(e) => handleAction('reports', e)} className="cursor-pointer hover:bg-purple-50">
            <BarChart3 className="h-4 w-4 mr-3 text-gray-500" />
            View Reports
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={(e) => handleAction('team', e)} className="cursor-pointer hover:bg-cyan-50">
            <Users className="h-4 w-4 mr-3 text-gray-500" />
            Manage Team
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={(e) => handleAction('documents', e)} className="cursor-pointer hover:bg-amber-50">
            <FileText className="h-4 w-4 mr-3 text-gray-500" />
            Documents
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-gray-200" />
          
          <DropdownMenuItem onClick={(e) => handleAction('archive', e)} className="cursor-pointer hover:bg-red-50 text-red-600">
            <Archive className="h-4 w-4 mr-3" />
            Archive Development
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
