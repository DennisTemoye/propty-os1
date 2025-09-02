import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  CalendarEvent,
  CalendarView,
  Reminder,
  PaginatedResponse,
} from "@/types";
import CalendarService from "@/services/calendarService";

export interface UseCalendarReturn {
  // State
  loading: boolean;
  error: string | null;

  // Data
  events: CalendarEvent[];
  calendarView: CalendarView | null;
  reminders: Reminder[];
  eventStatistics: {
    totalEvents: number;
    completedEvents: number;
    cancelledEvents: number;
    noShowEvents: number;
    eventsByType: Array<{
      type: string;
      count: number;
      percentage: number;
    }>;
    eventsByPriority: Array<{
      priority: string;
      count: number;
      percentage: number;
    }>;
    averageDuration: number;
  } | null;
  workloadAnalysis: {
    totalEvents: number;
    totalHours: number;
    eventsByType: Array<{
      type: string;
      count: number;
      hours: number;
    }>;
    averageEventsPerDay: number;
    busiestDay: string;
    busiestTimeSlot: string;
  } | null;

  // Filters
  filters: {
    date?: string;
    type?: string;
    assignedTo?: string;
    status?: string;
    priority?: string;
    clientId?: string;
    developmentId?: string;
  };
  setFilters: (filters: Partial<UseCalendarReturn["filters"]>) => void;

  // Actions
  fetchEvents: (filters?: any) => Promise<void>;
  createEvent: (eventData: Partial<CalendarEvent>) => Promise<CalendarEvent>;
  updateEvent: (
    eventId: string,
    updates: Partial<CalendarEvent>
  ) => Promise<CalendarEvent>;
  deleteEvent: (eventId: string) => Promise<void>;
  updateEventStatus: (
    eventId: string,
    status: string,
    notes?: string
  ) => Promise<CalendarEvent>;

  // Calendar Views
  getCalendarView: (
    view: string,
    date: string,
    userId?: string
  ) => Promise<void>;
  getEventsByDateRange: (
    startDate: string,
    endDate: string,
    filters?: any
  ) => Promise<void>;

  // Reminders & Notifications
  fetchUpcomingReminders: (userId?: string) => Promise<void>;
  markReminderAsSent: (reminderId: string) => Promise<void>;

  // Analytics
  fetchEventStatistics: (startDate: string, endDate: string) => Promise<void>;
  fetchWorkloadAnalysis: (
    userId: string,
    startDate: string,
    endDate: string
  ) => Promise<void>;

  // Event Templates
  createRecurringEvents: (
    template: Partial<CalendarEvent>,
    recurrence: {
      frequency: "daily" | "weekly" | "monthly";
      interval: number;
      endDate: string;
      daysOfWeek?: number[];
    }
  ) => Promise<CalendarEvent[]>;

  // Utilities
  clearError: () => void;
  resetFilters: () => void;
}

export function useCalendar(): UseCalendarReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [calendarView, setCalendarView] = useState<CalendarView | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [eventStatistics, setEventStatistics] =
    useState<UseCalendarReturn["eventStatistics"]>(null);
  const [workloadAnalysis, setWorkloadAnalysis] =
    useState<UseCalendarReturn["workloadAnalysis"]>(null);

  const [filters, setFilters] = useState<UseCalendarReturn["filters"]>({});

  // ===== Event Management =====

  const fetchEvents = useCallback(
    async (additionalFilters?: any) => {
      try {
        setLoading(true);
        setError(null);

        const allFilters = { ...filters, ...additionalFilters };
        const response = await CalendarService.getEvents(allFilters);
        setEvents(response.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch events";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const createEvent = useCallback(
    async (eventData: Partial<CalendarEvent>): Promise<CalendarEvent> => {
      try {
        setLoading(true);
        setError(null);

        const newEvent = await CalendarService.createEvent(eventData);
        setEvents((prev) => [...prev, newEvent]);
        toast.success("Event created successfully");
        return newEvent;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create event";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateEvent = useCallback(
    async (
      eventId: string,
      updates: Partial<CalendarEvent>
    ): Promise<CalendarEvent> => {
      try {
        setLoading(true);
        setError(null);

        const updatedEvent = await CalendarService.updateEvent(
          eventId,
          updates
        );
        setEvents((prev) =>
          prev.map((event) => (event.id === eventId ? updatedEvent : event))
        );
        toast.success("Event updated successfully");
        return updatedEvent;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update event";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteEvent = useCallback(async (eventId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await CalendarService.deleteEvent(eventId);
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      toast.success("Event deleted successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete event";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEventStatus = useCallback(
    async (
      eventId: string,
      status: string,
      notes?: string
    ): Promise<CalendarEvent> => {
      try {
        setLoading(true);
        setError(null);

        const updatedEvent = await CalendarService.updateEventStatus(
          eventId,
          status,
          notes
        );
        setEvents((prev) =>
          prev.map((event) => (event.id === eventId ? updatedEvent : event))
        );
        toast.success("Event status updated successfully");
        return updatedEvent;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update event status";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ===== Calendar Views =====

  const getCalendarView = useCallback(
    async (view: string, date: string, userId?: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const viewData = await CalendarService.getCalendarView(
          view,
          date,
          userId
        );
        setCalendarView(viewData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch calendar view";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getEventsByDateRange = useCallback(
    async (
      startDate: string,
      endDate: string,
      additionalFilters?: any
    ): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const allFilters = { ...filters, ...additionalFilters };
        const eventsInRange = await CalendarService.getEventsByDateRange(
          startDate,
          endDate,
          allFilters
        );
        setEvents(eventsInRange);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch events by date range";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  // ===== Reminders & Notifications =====

  const fetchUpcomingReminders = useCallback(
    async (userId?: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const upcomingReminders = await CalendarService.getUpcomingReminders(
          userId
        );
        setReminders(upcomingReminders);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch upcoming reminders";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const markReminderAsSent = useCallback(
    async (reminderId: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        await CalendarService.markReminderAsSent(reminderId);
        setReminders((prev) =>
          prev.map((reminder) =>
            reminder.id === reminderId
              ? { ...reminder, isSent: true, sentAt: new Date().toISOString() }
              : reminder
          )
        );
        toast.success("Reminder marked as sent");
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to mark reminder as sent";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ===== Analytics =====

  const fetchEventStatistics = useCallback(
    async (startDate: string, endDate: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const statistics = await CalendarService.getEventStatistics(
          startDate,
          endDate
        );
        setEventStatistics(statistics);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch event statistics";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchWorkloadAnalysis = useCallback(
    async (
      userId: string,
      startDate: string,
      endDate: string
    ): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const analysis = await CalendarService.getUserWorkloadAnalysis(
          userId,
          startDate,
          endDate
        );
        setWorkloadAnalysis(analysis);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch workload analysis";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ===== Event Templates =====

  const createRecurringEvents = useCallback(
    async (
      template: Partial<CalendarEvent>,
      recurrence: {
        frequency: "daily" | "weekly" | "monthly";
        interval: number;
        endDate: string;
        daysOfWeek?: number[];
      }
    ): Promise<CalendarEvent[]> => {
      try {
        setLoading(true);
        setError(null);

        const recurringEvents = await CalendarService.createRecurringEvents(
          template,
          recurrence
        );
        setEvents((prev) => [...prev, ...recurringEvents]);
        toast.success(
          `${recurringEvents.length} recurring events created successfully`
        );
        return recurringEvents;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to create recurring events";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ===== Utilities =====

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // ===== Effects =====

  useEffect(() => {
    fetchEvents();
    fetchUpcomingReminders();
  }, [fetchEvents, fetchUpcomingReminders]);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      fetchEvents();
    }
  }, [filters, fetchEvents]);

  return {
    // State
    loading,
    error,

    // Data
    events,
    calendarView,
    reminders,
    eventStatistics,
    workloadAnalysis,

    // Filters
    filters,
    setFilters,

    // Actions
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    updateEventStatus,

    // Calendar Views
    getCalendarView,
    getEventsByDateRange,

    // Reminders & Notifications
    fetchUpcomingReminders,
    markReminderAsSent,

    // Analytics
    fetchEventStatistics,
    fetchWorkloadAnalysis,

    // Event Templates
    createRecurringEvents,

    // Utilities
    clearError,
    resetFilters,
  };
}
