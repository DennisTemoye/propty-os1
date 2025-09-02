import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import {
  API_CONFIG,
  HTTP_STATUS,
  ApiResponse,
  ApiError,
} from "@/constants/api";
import { defaultMiddlewareChain, MiddlewareChain } from "./middleware";

// Extend AxiosRequestConfig to include metadata
interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  metadata?: {
    startTime: Date;
  };
}

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}`,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request timeout interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add request timeout
    const timeoutId = setTimeout(() => {
      console.warn("Request timeout - cancelling request");
      // Cancel the request if it takes too long
      if (config.signal && !config.signal.aborted) {
        // Create a new AbortController to abort the request
        const controller = new AbortController();
        controller.abort();
      }
    }, API_CONFIG.TIMEOUT + 5000); // 5 seconds buffer

    // Store timeout ID for cleanup
    (config as any).timeoutId = timeoutId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor with middleware
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Execute request middleware chain
      const processedConfig =
        await defaultMiddlewareChain.executeRequestMiddleware(config);
      return processedConfig as any;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with middleware
apiClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    try {
      // Clean up timeout
      const config = response.config as any;
      if (config.timeoutId) {
        clearTimeout(config.timeoutId);
      }

      // Execute response middleware chain
      const processedResponse =
        await defaultMiddlewareChain.executeResponseMiddleware(response);
      return processedResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async (error: AxiosError) => {
    try {
      // Clean up timeout
      const config = error.config as any;
      if (config?.timeoutId) {
        clearTimeout(config.timeoutId);
      }

      // Execute error middleware chain
      const processedError =
        await defaultMiddlewareChain.executeErrorMiddleware(error);

      // Handle 401 Unauthorized - try to refresh token
      const originalRequest = error.config as any;
      if (
        error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const response = await axios.post(
              `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/auth/refresh`,
              {
                refreshToken,
              }
            );

            const { accessToken } = response.data.data;
            localStorage.setItem("accessToken", accessToken);

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(processedError);
    } catch (middlewareError) {
      return Promise.reject(error);
    }
  }
);

// Generic API service class
export class ApiService {
  private client: AxiosInstance;

  constructor(client: AxiosInstance = apiClient) {
    this.client = client;
  }

  // GET request
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // POST request
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<ApiResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // PUT request
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // PATCH request
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<ApiResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // DELETE request
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Upload file
  async upload<T = any>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await this.client.post<ApiResponse<T>>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Download file
  async download(url: string, filename?: string): Promise<void> {
    try {
      const response = await this.client.get(url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Handle API errors
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      const responseData = data as any;

      // Log detailed error information for debugging
      console.error("🚨 API Error Details:", {
        status,
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        hasAuthHeader: !!error.config?.headers?.Authorization,
        responseData,
      });

      // Special handling for auth errors
      if (status === 401) {
        console.warn("🔐 Unauthorized - Token may be expired or invalid");
        // Clear invalid tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } else if (status === 403) {
        console.warn("🚫 Forbidden - User lacks required permissions");

        // Try to refresh token and retry for 403 errors
        if (!(error.config as any)?._retry) {
          (error.config as any)._retry = true;
          console.log("🔄 Attempting automatic retry for 403 error...");

          // This will be handled by the middleware chain
          return {
            message: "Permission denied. Retrying with refreshed token...",
            status: status,
            errors: responseData?.errors,
          };
        }
      }

      return {
        message: responseData?.message || `HTTP ${status}: ${error.message}`,
        status: status,
        errors: responseData?.errors,
      };
    } else if (error.request) {
      // Request was made but no response received
      console.error("📡 No response received:", {
        url: error.config?.url,
        method: error.config?.method,
      });
      return {
        message:
          "No response received from server. Please check your internet connection.",
        status: 0,
      };
    } else {
      // Something else happened
      console.error("💥 Request setup error:", error.message);
      return {
        message: error.message || "An unexpected error occurred.",
        status: 0,
      };
    }
  }

  // Set auth token
  setAuthToken(token: string): void {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  // Remove auth token
  removeAuthToken(): void {
    delete this.client.defaults.headers.common.Authorization;
  }

  // Get axios instance (for advanced usage)
  getClient(): AxiosInstance {
    return this.client;
  }
}

// Create default API service instance
export const apiService = new ApiService();

// Export axios instance for direct use if needed
export { apiClient };

// Export types
export type { AxiosRequestConfig, AxiosResponse, AxiosError };
