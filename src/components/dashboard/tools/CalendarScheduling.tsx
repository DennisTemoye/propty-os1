
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Plus, Calendar as CalendarIcon, Clock, User, Building, Bell } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'inspection' | 'followup' | 'task' | 'meeting';
  date: Date;
  time: string;
  clientId?: string;
  clientName?: string;
  developmentId?: string;
  developmentName?: string;
  description: string;
  reminder: boolean;
  createdBy: string;
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Site Inspection - Victoria Gardens',
    type: 'inspection',
    date: new Date(),
    time: '10:00',
    clientId: '1',
    clientName: 'John Doe',
    developmentId: '1',
    developmentName: 'Victoria Gardens',
    description: 'Property inspection for Unit A-15',
    reminder: true,
    createdBy: 'Sarah Wilson'
  },
  {
    id: '2',
    title: 'Follow-up Call',
    type: 'followup',
    date: new Date(Date.now() + 86400000), // Tomorrow
    time: '14:30',
    clientId: '2',
    clientName: 'Jane Smith',
    description: 'Follow up on payment schedule discussion',
    reminder: true,
    createdBy: 'Mike Johnson'
  }
];

const eventTypes = [
  { id: 'inspection', name: 'Inspection', color: 'bg-blue-100 text-blue-800', icon: Building },
  { id: 'followup', name: 'Follow-up', color: 'bg-green-100 text-green-800', icon: User },
  { id: 'task', name: 'Task', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  { id: 'meeting', name: 'Meeting', color: 'bg-purple-100 text-purple-800', icon: CalendarIcon }
];

export function CalendarSchedulingPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const form = useForm();

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getEventTypeConfig = (type: string) => {
    return eventTypes.find(t => t.id === type) || eventTypes[0];
  };

  const onSubmitEvent = (data: any) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: data.title,
      type: data.type,
      date: selectedDate,
      time: data.time,
      clientId: data.clientId,
      clientName: data.clientName,
      developmentId: data.developmentId,
      developmentName: data.developmentName,
      description: data.description,
      reminder: data.reminder || false,
      createdBy: 'Current User'
    };
    
    setEvents(prev => [...prev, newEvent]);
    setIsAddEventOpen(false);
    form.reset();
    toast.success('Event created successfully');
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setSelectedEvent(null);
    toast.success('Event deleted successfully');
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    return eachDayOfInterval({ start, end });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar & Scheduling</h1>
          <p className="text-gray-600 mt-1">Track inspections, meetings, and follow-up deadlines</p>
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
            </SelectContent>
          </Select>
          <Button onClick={() => setIsAddEventOpen(true)} className="bg-gradient-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
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
              />
            </CardContent>
          </Card>
        </div>

        {/* Events for Selected Date */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                Events - {format(selectedDate, 'MMM dd, yyyy')}
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
                          <span className="text-sm text-gray-600">{event.time}</span>
                        </div>
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        {event.clientName && (
                          <p className="text-xs text-gray-600">Client: {event.clientName}</p>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Schedule a new event for {format(selectedDate, 'MMM dd, yyyy')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmitEvent)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Event Title</label>
              <Input {...form.register('title', { required: true })} placeholder="Enter event title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Event Type</label>
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
              <div>
                <label className="text-sm font-medium">Time</label>
                <Input {...form.register('time', { required: true })} type="time" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Client (Optional)</label>
                <Input {...form.register('clientName')} placeholder="Enter client name" />
              </div>
              <div>
                <label className="text-sm font-medium">Development (Optional)</label>
                <Input {...form.register('developmentName')} placeholder="Enter development name" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea {...form.register('description')} placeholder="Event description..." />
            </div>
            <div className="flex items-center space-x-2">
              <input {...form.register('reminder')} type="checkbox" id="reminder" />
              <label htmlFor="reminder" className="text-sm font-medium">Set reminder</label>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>Event details</DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Type:</span>
                  <Badge className={getEventTypeConfig(selectedEvent.type).color} variant="secondary">
                    {getEventTypeConfig(selectedEvent.type).name}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Time:</span>
                  <p className="text-gray-600">{selectedEvent.time}</p>
                </div>
                {selectedEvent.clientName && (
                  <div>
                    <span className="font-medium">Client:</span>
                    <p className="text-gray-600">{selectedEvent.clientName}</p>
                  </div>
                )}
                {selectedEvent.developmentName && (
                  <div>
                    <span className="font-medium">Development:</span>
                    <p className="text-gray-600">{selectedEvent.developmentName}</p>
                  </div>
                )}
              </div>
              <div>
                <span className="font-medium">Description:</span>
                <p className="text-gray-600 mt-1">{selectedEvent.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                  Delete Event
                </Button>
                <Button onClick={() => setSelectedEvent(null)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
