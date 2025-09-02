import { apiService } from "./api";
import { API_ENDPOINTS } from "@/constants/api";
import {
  CalendarEvent,
  CalendarView,
  Reminder,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

export class CalendarService {
  // ===== Event Management =====

  /**
   * Fetch calendar events with optional filters
   */
  static async getEvents(filters?: {
    date?: string;
    type?: string;
    assignedTo?: string;
    status?: string;
    priority?: string;
    clientId?: string;
    developmentId?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<CalendarEvent>> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.CALENDAR.EVENTS.BASE,
        {
          params: filters,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch events: ${error}`);
    }
  }

  /**
   * Create a new calendar event
   */
  static async createEvent(
    eventData: Partial<CalendarEvent>
  ): Promise<CalendarEvent> {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.CALENDAR.EVENTS.BASE,
        eventData
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to create event: ${error}`);
    }
  }

  /**
   * Update an existing calendar event
   */
  static async updateEvent(
    eventId: string,
    updates: Partial<CalendarEvent>
  ): Promise<CalendarEvent> {
    try {
      const response = await apiService.put(
        API_ENDPOINTS.CALENDAR.EVENTS.BY_ID(eventId),
        updates
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to update event: ${error}`);
    }
  }

  /**
   * Delete a calendar event
   */
  static async deleteEvent(eventId: string): Promise<void> {
    try {
      await apiService.delete(API_ENDPOINTS.CALENDAR.EVENTS.BY_ID(eventId));
    } catch (error) {
      throw new Error(`Failed to delete event: ${error}`);
    }
  }

  /**
   * Update event status
   */
  static async updateEventStatus(
    eventId: string,
    status: string,
    notes?: string
  ): Promise<CalendarEvent> {
    try {
      const response = await apiService.patch(
        API_ENDPOINTS.CALENDAR.EVENTS.STATUS(eventId),
        { status, notes }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to update event status: ${error}`);
    }
  }

  // ===== Calendar Views =====

  /**
   * Get calendar view (month, week, day)
   */
  static async getCalendarView(
    view: string,
    date: string,
    userId?: string
  ): Promise<CalendarView> {
    try {
      const response = await apiService.get(API_ENDPOINTS.CALENDAR.VIEW, {
        params: { view, date, userId },
      });
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch calendar view: ${error}`);
    }
  }

  /**
   * Get events for a specific date range
   */
  static async getEventsByDateRange(
    startDate: string,
    endDate: string,
    filters?: {
      type?: string;
      assignedTo?: string;
      status?: string;
    }
  ): Promise<CalendarEvent[]> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.CALENDAR.EVENTS.BASE,
        {
          params: {
            startDate,
            endDate,
            ...filters,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch events by date range: ${error}`);
    }
  }

  // ===== Reminders & Notifications =====

  /**
   * Get upcoming reminders for a user
   */
  static async getUpcomingReminders(userId?: string): Promise<Reminder[]> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.CALENDAR.REMINDERS.BASE,
        {
          params: { userId, upcoming: true },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch upcoming reminders: ${error}`);
    }
  }

  /**
   * Mark a reminder as sent
   */
  static async markReminderAsSent(reminderId: string): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.CALENDAR.REMINDERS.SENT(reminderId));
    } catch (error) {
      throw new Error(`Failed to mark reminder as sent: ${error}`);
    }
  }

  // ===== Event Analytics =====

  /**
   * Get event statistics for a date range
   */
  static async getEventStatistics(
    startDate: string,
    endDate: string
  ): Promise<{
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
  }> {
    try {
      const events = await this.getEventsByDateRange(startDate, endDate);

      const totalEvents = events.length;
      const completedEvents = events.filter(
        (e) => e.status === "completed"
      ).length;
      const cancelledEvents = events.filter(
        (e) => e.status === "cancelled"
      ).length;
      const noShowEvents = events.filter((e) => e.status === "no_show").length;

      // Group by type
      const typeCount = new Map<string, number>();
      events.forEach((event) => {
        typeCount.set(event.type, (typeCount.get(event.type) || 0) + 1);
      });

      const eventsByType = Array.from(typeCount.entries()).map(
        ([type, count]) => ({
          type,
          count,
          percentage: totalEvents > 0 ? (count / totalEvents) * 100 : 0,
        })
      );

      // Group by priority
      const priorityCount = new Map<string, number>();
      events.forEach((event) => {
        priorityCount.set(
          event.priority,
          (priorityCount.get(event.priority) || 0) + 1
        );
      });

      const eventsByPriority = Array.from(priorityCount.entries()).map(
        ([priority, count]) => ({
          priority,
          count,
          percentage: totalEvents > 0 ? (count / totalEvents) * 100 : 0,
        })
      );

      // Calculate average duration
      const totalDuration = events.reduce(
        (sum, event) => sum + event.duration,
        0
      );
      const averageDuration = totalEvents > 0 ? totalDuration / totalEvents : 0;

      return {
        totalEvents,
        completedEvents,
        cancelledEvents,
        noShowEvents,
        eventsByType,
        eventsByPriority,
        averageDuration,
      };
    } catch (error) {
      throw new Error(`Failed to fetch event statistics: ${error}`);
    }
  }

  /**
   * Get user workload analysis
   */
  static async getUserWorkloadAnalysis(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<{
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
  }> {
    try {
      const events = await this.getEventsByDateRange(startDate, endDate, {
        assignedTo: userId,
      });

      const totalEvents = events.length;
      const totalHours = events.reduce(
        (sum, event) => sum + event.duration / 60,
        0
      );

      // Group by type
      const typeStats = new Map<string, { count: number; hours: number }>();
      events.forEach((event) => {
        const current = typeStats.get(event.type) || { count: 0, hours: 0 };
        current.count++;
        current.hours += event.duration / 60;
        typeStats.set(event.type, current);
      });

      const eventsByType = Array.from(typeStats.entries()).map(
        ([type, stats]) => ({
          type,
          count: stats.count,
          hours: stats.hours,
        })
      );

      // Calculate average events per day
      const start = new Date(startDate);
      const end = new Date(endDate);
      const daysDiff = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      const averageEventsPerDay = daysDiff > 0 ? totalEvents / daysDiff : 0;

      // Find busiest day and time slot
      const dayCount = new Map<string, number>();
      const timeSlotCount = new Map<string, number>();

      events.forEach((event) => {
        const eventDate = new Date(event.date);
        const day = eventDate.toLocaleDateString("en-US", { weekday: "long" });
        dayCount.set(day, (dayCount.get(day) || 0) + 1);

        const timeSlot = this.getTimeSlot(event.time);
        timeSlotCount.set(timeSlot, (timeSlotCount.get(timeSlot) || 0) + 1);
      });

      const busiestDay = Array.from(dayCount.entries()).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];

      const busiestTimeSlot = Array.from(timeSlotCount.entries()).reduce(
        (a, b) => (a[1] > b[1] ? a : b)
      )[0];

      return {
        totalEvents,
        totalHours,
        eventsByType,
        averageEventsPerDay,
        busiestDay,
        busiestTimeSlot,
      };
    } catch (error) {
      throw new Error(`Failed to fetch user workload analysis: ${error}`);
    }
  }

  /**
   * Helper method to categorize time into slots
   */
  private static getTimeSlot(time: string): string {
    const hour = parseInt(time.split(":")[0]);
    if (hour < 9) return "Early Morning (6-9 AM)";
    if (hour < 12) return "Morning (9-12 PM)";
    if (hour < 15) return "Afternoon (12-3 PM)";
    if (hour < 18) return "Late Afternoon (3-6 PM)";
    if (hour < 21) return "Evening (6-9 PM)";
    return "Late Evening (9 PM+)";
  }

  // ===== Event Templates =====

  /**
   * Create recurring events
   */
  static async createRecurringEvents(
    template: Partial<CalendarEvent>,
    recurrence: {
      frequency: "daily" | "weekly" | "monthly";
      interval: number;
      endDate: string;
      daysOfWeek?: number[]; // For weekly recurrence
    }
  ): Promise<CalendarEvent[]> {
    try {
      const events: CalendarEvent[] = [];
      const startDate = new Date(template.date!);
      const endDate = new Date(recurrence.endDate);
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const eventData = {
          ...template,
          date: currentDate.toISOString().split("T")[0],
        };

        const event = await this.createEvent(eventData);
        events.push(event);

        // Calculate next occurrence
        switch (recurrence.frequency) {
          case "daily":
            currentDate.setDate(currentDate.getDate() + recurrence.interval);
            break;
          case "weekly":
            currentDate.setDate(
              currentDate.getDate() + 7 * recurrence.interval
            );
            break;
          case "monthly":
            currentDate.setMonth(currentDate.getMonth() + recurrence.interval);
            break;
        }
      }

      return events;
    } catch (error) {
      throw new Error(`Failed to create recurring events: ${error}`);
    }
  }
}

export default CalendarService;
