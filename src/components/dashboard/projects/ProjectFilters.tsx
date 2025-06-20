
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  filteredCount: number;
  totalCount: number;
}

export function ProjectFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  viewMode,
  setViewMode,
  filteredCount,
  totalCount,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        {/* Enhanced Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects, locations, managers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white/70 backdrop-blur-sm"
          />
        </div>
        
        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] h-12 border-gray-200 bg-white/70 backdrop-blur-sm">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Priority Filter */}
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-[180px] h-12 border-gray-200 bg-white/70 backdrop-blur-sm">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between lg:justify-end gap-6">
        {/* Results Count */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100/50 px-3 py-2 rounded-lg">
          <Filter className="h-4 w-4" />
          <span className="font-medium">
            {filteredCount} of {totalCount} projects
          </span>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-1 bg-gray-100/70 rounded-lg p-1 backdrop-blur-sm">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={`${
              viewMode === 'grid' 
                ? 'bg-white shadow-sm text-indigo-600' 
                : 'hover:bg-gray-200/70 text-gray-600'
            } h-9 px-3`}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={`${
              viewMode === 'list' 
                ? 'bg-white shadow-sm text-indigo-600' 
                : 'hover:bg-gray-200/70 text-gray-600'
            } h-9 px-3`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Advanced Filters Button */}
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 border-gray-200 bg-white/70 backdrop-blur-sm hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  );
}
