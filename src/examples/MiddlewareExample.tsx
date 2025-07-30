import React from "react";
import {
  createCustomMiddlewareChain,
  addMiddlewareToChain,
} from "@/services/middleware";
import { ProjectsService } from "@/services/projectsService";

// Example of creating custom middleware
export const MiddlewareExample: React.FC = () => {
  // Example 1: Custom logging middleware
  const customLoggingMiddleware = (context: any) => {
    console.log("🔍 Custom Logging:", {
      url: context.request.url,
      method: context.request.method,
      timestamp: new Date().toISOString(),
    });
    return context;
  };

  // Example 2: Performance monitoring middleware
  const performanceMiddleware = (context: any) => {
    const startTime = Date.now();

    // Add performance tracking to response
    if (context.response) {
      const duration = Date.now() - startTime;
      console.log(`⏱️ Performance: ${duration}ms for ${context.request.url}`);

      // Track slow requests
      if (duration > 2000) {
        console.warn(`🐌 Slow request detected: ${duration}ms`);
      }
    }

    return context;
  };

  // Example 3: Cache middleware
  const cacheMiddleware = (context: any) => {
    const cacheKey = `${context.request.method}-${context.request.url}`;
    const cachedResponse = localStorage.getItem(cacheKey);

    if (context.request.method === "GET" && cachedResponse) {
      const { data, timestamp } = JSON.parse(cachedResponse);
      const cacheAge = Date.now() - timestamp;

      // Cache for 5 minutes
      if (cacheAge < 5 * 60 * 1000) {
        console.log("💾 Serving from cache:", cacheKey);
        return {
          ...context,
          response: {
            ...context.response,
            data: data,
            fromCache: true,
          },
        };
      }
    }

    // Cache successful GET responses
    if (
      context.response &&
      context.request.method === "GET" &&
      context.response.status === 200
    ) {
      const cacheData = {
        data: context.response.data,
        timestamp: Date.now(),
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      console.log("💾 Cached response:", cacheKey);
    }

    return context;
  };

  // Example 4: Analytics middleware
  const analyticsMiddleware = (context: any) => {
    if (context.response) {
      // Track API calls for analytics
      const analyticsData = {
        endpoint: context.request.url,
        method: context.request.method,
        status: context.response.status,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };

      // Send to analytics service (example)
      console.log("📊 Analytics:", analyticsData);

      // You could send this to your analytics service
      // analyticsService.track('api_call', analyticsData);
    }

    return context;
  };

  // Create custom middleware chain
  const customChain = createCustomMiddlewareChain()
    .addRequestMiddleware(customLoggingMiddleware)
    .addResponseMiddleware(performanceMiddleware)
    .addResponseMiddleware(cacheMiddleware)
    .addResponseMiddleware(analyticsMiddleware);

  // Example usage with custom middleware
  const fetchProjectsWithCustomMiddleware = async () => {
    try {
      // This would use the custom middleware chain
      // You would need to modify the API service to accept custom middleware
      const response = await ProjectsService.getProjects();
      console.log("Projects fetched with custom middleware:", response);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Middleware Examples</h2>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Custom Logging Middleware</h3>
          <p className="text-sm text-gray-600">
            Logs detailed information about each API request
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Performance Monitoring</h3>
          <p className="text-sm text-gray-600">
            Tracks request duration and warns about slow requests
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Cache Middleware</h3>
          <p className="text-sm text-gray-600">
            Caches GET requests for 5 minutes to improve performance
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Analytics Middleware</h3>
          <p className="text-sm text-gray-600">
            Tracks API usage for analytics and monitoring
          </p>
        </div>
      </div>

      <button
        onClick={fetchProjectsWithCustomMiddleware}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Test Custom Middleware
      </button>
    </div>
  );
};

export default MiddlewareExample;
