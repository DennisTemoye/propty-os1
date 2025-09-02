import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "sonner";

// Middleware types
export interface MiddlewareContext {
  request: AxiosRequestConfig;
  response?: AxiosResponse;
  error?: AxiosError;
  startTime?: number;
}

export interface MiddlewareFunction {
  (context: MiddlewareContext): Promise<MiddlewareContext> | MiddlewareContext;
}

// Request middleware
export class RequestMiddleware {
  // Authentication middleware
  static authMiddleware: MiddlewareFunction = (context) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      context.request.headers = {
        ...context.request.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return context;
  };

  // Logging middleware
  static loggingMiddleware: MiddlewareFunction = (context) => {
    context.startTime = Date.now();
    console.log(
      `🚀 API Request: ${context.request.method?.toUpperCase()} ${
        context.request.url
      }`,
      {
        data: context.request.data,
        params: context.request.params,
      }
    );
    return context;
  };

  // Request transformation middleware
  static transformRequestMiddleware: MiddlewareFunction = (context) => {
    // Add common headers
    context.request.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...context.request.headers,
    };

    // Add request ID for tracking
    context.request.headers["X-Request-ID"] = crypto.randomUUID();

    return context;
  };

  // Rate limiting middleware
  static rateLimitMiddleware: MiddlewareFunction = (context) => {
    const now = Date.now();
    const lastRequest = parseInt(localStorage.getItem("lastApiRequest") || "0");
    const minInterval = 100; // Minimum 100ms between requests

    if (now - lastRequest < minInterval) {
      const delay = minInterval - (now - lastRequest);
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem("lastApiRequest", now.toString());
          resolve(context);
        }, delay);
      });
    }

    localStorage.setItem("lastApiRequest", now.toString());
    return context;
  };

  // Retry middleware
  static retryMiddleware: MiddlewareFunction = async (context) => {
    const maxRetries = 3;
    const retryDelay = 1000;
    let retryCount = 0;

    const attemptRequest = async (): Promise<MiddlewareContext> => {
      try {
        // This will be handled by the actual axios call
        return context;
      } catch (error: any) {
        retryCount++;
        if (retryCount < maxRetries && this.isRetryableError(error)) {
          console.log(`🔄 Retrying request (${retryCount}/${maxRetries})`);
          await new Promise((resolve) =>
            setTimeout(resolve, retryDelay * retryCount)
          );
          return attemptRequest();
        }
        throw error;
      }
    };

    return attemptRequest();
  };

  private static isRetryableError(error: any): boolean {
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    return (
      retryableStatuses.includes(error?.response?.status) || !error?.response
    );
  }
}

// Response middleware
export class ResponseMiddleware {
  // Response logging middleware
  static loggingMiddleware: MiddlewareFunction = (context) => {
    if (context.response) {
      const duration = Date.now() - (context.startTime || 0);
      console.log(
        `✅ API Response: ${context.response.status} ${context.response.config.url} (${duration}ms)`,
        {
          data: context.response.data,
        }
      );
    }
    return context;
  };

  // Response transformation middleware
  static transformResponseMiddleware: MiddlewareFunction = (context) => {
    if (context.response) {
      // Standardize response format
      if (!context.response.data.hasOwnProperty("success")) {
        context.response.data = {
          success:
            context.response.status >= 200 && context.response.status < 300,
          data: context.response.data,
          message: context.response.statusText,
        };
      }
    }
    return context;
  };

  // Error handling middleware
  static errorHandlingMiddleware: MiddlewareFunction = (context) => {
    if (context.error) {
      const error = context.error;
      const status = error.response?.status;
      const message =
        (error.response?.data as any)?.message || (error as any).message;

      // Log error
      console.error(`❌ API Error: ${status} ${error.config?.url}`, {
        message,
        data: error.response?.data,
      });

      // Handle specific error types
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // window.location.href = "/login";
          break;
        case 403:
          toast.error(
            "Access denied. You do not have permission to perform this action."
          );
          // window.location.href = "/login";
          break;
        case 404:
          toast.error("Resource not found.");
          break;
        case 422:
          // Validation errors
          const validationErrors = (error.response?.data as any)?.errors;
          if (validationErrors) {
            Object.entries(validationErrors).forEach(([field, errors]) => {
              toast.error(`${field}: ${(errors as string[]).join(", ")}`);
            });
          } else {
            toast.error(message || "Validation failed");
          }
          break;
        case 429:
          toast.error("Too many requests. Please try again later.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          if (!error.response) {
            toast.error("Network error. Please check your connection.");
          } else {
            toast.error(message || "An unexpected error occurred");
          }
      }
    }
    return context;
  };

  // Success notification middleware
  static successNotificationMiddleware: MiddlewareFunction = (context) => {
    if (context.response && context.response.data?.success) {
      const message = context.response.data?.message;
      const method = context.request.method?.toUpperCase();

      // Show success notifications for POST, PUT, DELETE operations
      if (message && ["POST", "PUT", "DELETE"].includes(method || "")) {
        toast.success(message);
      }
    }
    return context;
  };
}

// Middleware chain executor
export class MiddlewareChain {
  private requestMiddlewares: MiddlewareFunction[] = [];
  private responseMiddlewares: MiddlewareFunction[] = [];

  // Add request middleware
  addRequestMiddleware(middleware: MiddlewareFunction): this {
    this.requestMiddlewares.push(middleware);
    return this;
  }

  // Add response middleware
  addResponseMiddleware(middleware: MiddlewareFunction): this {
    this.responseMiddlewares.push(middleware);
    return this;
  }

  // Execute request middleware chain
  async executeRequestMiddleware(
    request: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    let context: MiddlewareContext = { request };

    for (const middleware of this.requestMiddlewares) {
      context = await middleware(context);
    }

    return context.request;
  }

  // Execute response middleware chain
  async executeResponseMiddleware(
    response: AxiosResponse
  ): Promise<AxiosResponse> {
    let context: MiddlewareContext = {
      request: response.config,
      response,
      startTime: (response.config as any).startTime,
    };

    for (const middleware of this.responseMiddlewares) {
      context = await middleware(context);
    }

    return context.response!;
  }

  // Execute error middleware chain
  async executeErrorMiddleware(error: AxiosError): Promise<AxiosError> {
    let context: MiddlewareContext = {
      request: error.config!,
      error,
      startTime: (error.config as any)?.startTime,
    };

    for (const middleware of this.responseMiddlewares) {
      context = await middleware(context);
    }

    return context.error!;
  }
}

// Default middleware chain
export const defaultMiddlewareChain = new MiddlewareChain()
  .addRequestMiddleware(RequestMiddleware.authMiddleware)
  .addRequestMiddleware(RequestMiddleware.loggingMiddleware)
  .addRequestMiddleware(RequestMiddleware.transformRequestMiddleware)
  .addRequestMiddleware(RequestMiddleware.rateLimitMiddleware)
  .addResponseMiddleware(ResponseMiddleware.loggingMiddleware)
  .addResponseMiddleware(ResponseMiddleware.transformResponseMiddleware)
  .addResponseMiddleware(ResponseMiddleware.successNotificationMiddleware)
  .addResponseMiddleware(ResponseMiddleware.errorHandlingMiddleware);

// Utility functions
export const createCustomMiddlewareChain = () => new MiddlewareChain();

export const addMiddlewareToChain = (
  chain: MiddlewareChain,
  type: "request" | "response",
  middleware: MiddlewareFunction
) => {
  if (type === "request") {
    chain.addRequestMiddleware(middleware);
  } else {
    chain.addResponseMiddleware(middleware);
  }
  return chain;
};
