import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, Calendar as CalendarIcon, Clock, User, Building, Bell, 
  MapPin, Phone, Mail, MessageSquare, Filter, Search,
  CheckCircle, AlertCircle, Users, Target
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isTomorrow, addDays } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'inspection' | 'followup' | 'task' | 'meeting' | 'call' | 'site_visit';
  date: Date;
  time: string;
  duration: number; // in minutes
  clientId?: string;
  clientName?: string;
  clientPhone?: string;
  developmentId?: string;
  developmentName?: string;
  location?: string;
  description: string;
  reminder: boolean;
  reminderMinutes: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  tags: string[];
  notes?: string;
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Site Inspection - Victoria Gardens Unit A-15',
    type: 'inspection',
    date: new Date(),
    time: '10:00',
    duration: 60,
    clientId: '1',
    clientName: 'Aisha Bello',
    clientPhone: '+234-801-234-5678',
    developmentId: '1',
    developmentName: 'Victoria Gardens',
    location: 'Victoria Gardens Sales Office, Lekki',
    description: 'Property inspection for Unit A-15 with potential buyer',
    reminder: true,
    reminderMinutes: 30,
    status: 'scheduled',
    assignedTo: 'Sarah Wilson',
    priority: 'high',
    createdBy: 'Sarah Wilson',
    createdAt: new Date(Date.now() - 86400000),
    lastModified: new Date(Date.now() - 86400000),
    tags: ['hot_lead', 'ready_buyer']
  },
  {
    id: '2',
    title: 'Follow-up Call - Payment Plan Discussion',
    type: 'followup',
    date: new Date(Date.now() + 86400000), // Tomorrow
    time: '14:30',
    duration: 30,
    clientId: '2',
    clientName: 'Ibrahim Musa',
    clientPhone: '+234-802-345-6789',
    developmentId: '2',
    developmentName: 'Harmony Gardens',
    description: 'Follow up on payment schedule and finalize allocation',
    reminder: true,
    reminderMinutes: 15,
    status: 'scheduled',
    assignedTo: 'Mike Johnson',
    priority: 'medium',
    createdBy: 'Mike Johnson',
    createdAt: new Date(Date.now() - 172800000),
    lastModified: new Date(Date.now() - 172800000),
    tags: ['payment_plan']
  },
  {
    id: '3',
    title: 'Team Meeting - Weekly Pipeline Review',
    type: 'meeting',
    date: addDays(new Date(), 2),
    time: '09:00',
    duration: 90,
    location: 'Conference Room A',
    description: 'Weekly sales pipeline review and strategy meeting',
    reminder: true,
    reminderMinutes: 60,
    status: 'scheduled',
    assignedTo: 'All Team',
    priority: 'medium',
    createdBy: 'Sales Manager',
    createdAt: new Date(Date.now() - 259200000),
    lastModified: new Date(Date.now() - 259200000),
    tags: ['team_meeting', 'pipeline']
  }
];

const eventTypes = [
  { id: 'inspection', name: 'Property Inspection', color: 'bg-blue-500 text-white', icon: Building },
  { id: 'followup', name: 'Follow-up Call', color: 'bg-green-500 text-white', icon: Phone },
  { id: 'meeting', name: 'Meeting', color: 'bg-purple-500 text-white', icon: Users },
  { id: 'task', name: 'Task', color: 'bg-yellow-500 text-white', icon: Clock },
  { id: 'call', name: 'Phone Call', color: 'bg-indigo-500 text-white', icon: Phone },
  { id: 'site_visit', name: 'Site Visit', color: 'bg-orange-500 text-white', icon: MapPin }
];

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  no_show: 'bg-gray-100 text-gray-800'
};

export function EnhancedCalendarScheduling() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const form = useForm();

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getFilteredEvents = () => {
    let filtered = events;
    
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.developmentName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(event => event.type === filterType);
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(event => event.status === filterStatus);
    }
    
    if (filterAssignee !== 'all') {
      filtered = filtered.filter(event => event.assignedTo === filterAssignee);
    }
    
    return filtered;
  };

  const getEventTypeConfig = (type: string) => {
    return eventTypes.find(t => t.id === type) || eventTypes[0];
  };

  const onSubmitEvent = (data: any) => {
    const typeConfig = getEventTypeConfig(data.type);
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: data.title,
      type: data.type,
      date: selectedDate,
      time: data.time,
      duration: parseInt(data.duration) || 60,
      clientId: data.clientId,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      developmentId: data.developmentId,
      developmentName: data.developmentName,
      location: data.location,
      description: data.description,
      reminder: data.reminder || false,
      reminderMinutes: parseInt(data.reminderMinutes) || 15,
      status: 'scheduled',
      assignedTo: data.assignedTo || 'Current User',
      priority: data.priority || 'medium',
      createdBy: 'Current User',
      createdAt: new Date(),
      lastModified: new Date(),
      tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : [],
      notes: data.notes
    };
    
    setEvents(prev => [...prev, newEvent]);
    setIsAddEventOpen(false);
    form.reset();
    toast.success('Event created successfully');
  };

  const handleUpdateEventStatus = (eventId: string, newStatus: CalendarEvent['status']) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, status: newStatus, lastModified: new Date() }
        : event
    ));
    toast.success(`Event marked as ${newStatus.replace('_', ' ')}`);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
      setSelectedEvent(null);
      toast.success('Event deleted successfully');
    }
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => event.date >= now && event.status === 'scheduled')
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
  };

  const getTodaysEvents = () => {
    return events.filter(event => isToday(event.date)).sort((a, b) => a.time.localeCompare(b.time));
  };

  const getEventStats = () => {
    const today = new Date();
    const thisWeek = events.filter(event => 
      event.date >= today && event.date <= addDays(today, 7)
    );
    
    return {
      todayTotal: getTodaysEvents().length,
      weekTotal: thisWeek.length,
      pendingInspections: events.filter(e => e.type === 'inspection' && e.status === 'scheduled').length,
      completedToday: events.filter(e => isToday(e.date) && e.status === 'completed').length
    };
  };

  const stats = getEventStats();
  const assignees = Array.from(new Set(events.map(e => e.assignedTo))).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar & Scheduling</h1>
          <p className="text-gray-600 mt-1">Manage inspections, meetings, and client follow-ups</p>
        </div>
        <div className="flex gap-2">
          <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={() => setIsAddEventOpen(true)} 
            className="bg-gradient-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Event
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-700">{stats.todayTotal}</div>
                <div className="text-sm text-blue-600 font-medium">Today's Events</div>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-emerald-700">{stats.weekTotal}</div>
                <div className="text-sm text-emerald-600 font-medium">This Week</div>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Target className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-700">{stats.pendingInspections}</div>
                <div className="text-sm text-purple-600 font-medium">Pending Inspections</div>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-700">{stats.completedToday}</div>
                <div className="text-sm text-orange-600 font-medium">Completed Today</div>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search events, clients, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {eventTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterAssignee} onValueChange={setFilterAssignee}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  {assignees.map(assignee => (
                    <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                  setFilterStatus('all');
                  setFilterAssignee('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'month' | 'week' | 'day' | 'agenda')}>
            <TabsList className="grid grid-cols-4 w-full mb-4">
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>

            <TabsContent value="month">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    {format(selectedDate, 'MMMM yyyy')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                    // Custom day renderer with event indicators would go here
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agenda">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getFilteredEvents()
                      .filter(event => event.date >= new Date())
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .slice(0, 10)
                      .map((event) => {
                        const typeConfig = getEventTypeConfig(event.type);
                        return (
                          <div
                            key={event.id}
                            className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-md"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Badge className={typeConfig.color} variant="secondary">
                                {typeConfig.name}
                              </Badge>
                              <Badge className={statusColors[event.status]} variant="secondary">
                                {event.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                              <span>{format(event.date, 'MMM dd, yyyy')}</span>
                              <span>{event.time}</span>
                              <span>{event.assignedTo}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Today's Events */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {isToday(selectedDate) ? "Today's Events" : `Events - ${format(selectedDate, 'MMM dd, yyyy')}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getEventsForDate(selectedDate).length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No events scheduled</p>
                ) : (
                  getEventsForDate(selectedDate).map((event) => {
                    const typeConfig = getEventTypeConfig(event.type);
                    return (
                      <div
                        key={event.id}
                        className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={typeConfig.color} variant="secondary">
                            {typeConfig.name}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{event.time}</span>
                            <Badge className={statusColors[event.status]} variant="secondary">
                              {event.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        {event.clientName && (
                          <p className="text-xs text-gray-600">Client: {event.clientName}</p>
                        )}
                        {event.location && (
                          <p className="text-xs text-gray-600">📍 {event.location}</p>
                        )}
                        {event.reminder && (
                          <div className="flex items-center mt-1">
                            <Bell className="h-3 w-3 text-amber-600 mr-1" />
                            <span className="text-xs text-amber-600">Reminder set</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Event Modal */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule New Event</DialogTitle>
            <DialogDescription>
              Create a new event for {format(selectedDate, 'MMM dd, yyyy')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmitEvent)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Event Title *</label>
                <Input {...form.register('title', { required: true })} placeholder="Enter event title" />
              </div>
              <div>
                <label className="text-sm font-medium">Event Type *</label>
                <Select onValueChange={(value) => form.setValue('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Time *</label>
                <Input {...form.register('time', { required: true })} type="time" />
              </div>
              <div>
                <label className="text-sm font-medium">Duration (minutes)</label>
                <Input {...form.register('duration')} type="number" placeholder="60" />
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select onValueChange={(value) => form.setValue('priority', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Client Name</label>
                <Input {...form.register('clientName')} placeholder="Enter client name" />
              </div>
              <div>
                <label className="text-sm font-medium">Client Phone</label>
                <Input {...form.register('clientPhone')} placeholder="+234-xxx-xxx-xxxx" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Project/Development</label>
                <Input {...form.register('developmentName')} placeholder="Enter project name" />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input {...form.register('location')} placeholder="Enter meeting location" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea {...form.register('description')} placeholder="Event description..." rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Assigned To</label>
                <Select onValueChange={(value) => form.setValue('assignedTo', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {assignees.map(assignee => (
                      <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <Input {...form.register('tags')} placeholder="hot_lead, ready_buyer" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input {...form.register('reminder')} type="checkbox" id="reminder" />
                <label htmlFor="reminder" className="text-sm font-medium">Set reminder</label>
              </div>
              <div>
                <label className="text-sm font-medium">Reminder (minutes before)</label>
                <Select onValueChange={(value) => form.setValue('reminderMinutes', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="15 minutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="1440">1 day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Create Event</Button>
              <Button type="button" variant="outline" onClick={() => setIsAddEventOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedEvent && (
                <>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {React.createElement(getEventTypeConfig(selectedEvent.type).icon, { className: "h-5 w-5 text-blue-600" })}
                  </div>
                  {selectedEvent.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>Event details and actions</DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Type:</span>
                  <Badge className={getEventTypeConfig(selectedEvent.type).color} variant="secondary">
                    {getEventTypeConfig(selectedEvent.type).name}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge className={statusColors[selectedEvent.status]} variant="secondary">
                    {selectedEvent.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Date & Time:</span>
                  <p className="text-gray-600">{format(selectedEvent.date, 'MMM dd, yyyy')} at {selectedEvent.time}</p>
                </div>
                <div>
                  <span className="font-medium">Duration:</span>
                  <p className="text-gray-600">{selectedEvent.duration} minutes</p>
                </div>
                {selectedEvent.clientName && (
                  <>
                    <div>
                      <span className="font-medium">Client:</span>
                      <p className="text-gray-600">{selectedEvent.clientName}</p>
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>
                      <p className="text-gray-600">{selectedEvent.clientPhone}</p>
                    </div>
                  </>
                )}
                {selectedEvent.developmentName && (
                  <div>
                    <span className="font-medium">Project:</span>
                    <p className="text-gray-600">{selectedEvent.developmentName}</p>
                  </div>
                )}
                {selectedEvent.location && (
                  <div>
                    <span className="font-medium">Location:</span>
                    <p className="text-gray-600">{selectedEvent.location}</p>
                  </div>
                )}
                <div>
                  <span className="font-medium">Assigned To:</span>
                  <p className="text-gray-600">{selectedEvent.assignedTo}</p>
                </div>
                <div>
                  <span className="font-medium">Priority:</span>
                  <Badge variant={selectedEvent.priority === 'high' ? 'destructive' : 'secondary'}>
                    {selectedEvent.priority}
                  </Badge>
                </div>
              </div>
              
              {selectedEvent.description && (
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="text-gray-600 mt-1">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.tags.length > 0 && (
                <div>
                  <span className="font-medium">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedEvent.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {selectedEvent.status === 'scheduled' && (
                  <>
                    <Button 
                      size="sm"
                      onClick={() => handleUpdateEventStatus(selectedEvent.id, 'completed')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Complete
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleUpdateEventStatus(selectedEvent.id, 'cancelled')}
                    >
                      Cancel Event
                    </Button>
                  </>
                )}
                
                {selectedEvent.clientPhone && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`tel:${selectedEvent.clientPhone}`, '_self')}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                )}
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete Event
                </Button>
                
                <Button size="sm" variant="outline" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}