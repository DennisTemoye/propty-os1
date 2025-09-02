import { apiService } from "./api";
import { API_ENDPOINTS } from "@/constants/api";

// Types for authentication
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  businessName: string;
  businessType: string;
  companySize: string;
  phone: string;
  referralCode?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    companyId?: string;
    isEmailVerified: boolean;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: string;
  companyId?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Authentication service class
export class AuthService {
  // Login user
  static async login(credentials: LoginCredentials) {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.success && response.data) {
      // Store tokens in localStorage
      localStorage.setItem("accessToken", response.data.tokens.accessToken);
      localStorage.setItem("refreshToken", response.data.tokens.refreshToken);

      // Set token in axios headers
      apiService.setAuthToken(response.data.tokens.accessToken);
    }

    return response;
  }

  // Register new user
  static async register(data: RegisterData) {
    return await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
  }

  // Logout user
  static async logout() {
    try {
      // Call logout endpoint to invalidate tokens on server
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Continue with local cleanup even if server call fails
      console.warn("Logout server call failed, continuing with local cleanup");
    } finally {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Remove token from axios headers
      apiService.removeAuthToken();
    }
  }
  // Get current user
  static async getMe() {
    try {
      const response = await apiService.get<UserProfile>(API_ENDPOINTS.AUTH.ME);
      if (response.success && response.data) {
        // Store user data in localStorage for easy access
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error;
    }
  }

  // Refresh access token
  static async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await apiService.post<{ accessToken: string }>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken }
    );

    if (response.success && response.data) {
      localStorage.setItem("accessToken", response.data.accessToken);
      apiService.setAuthToken(response.data.accessToken);
    }

    return response;
  }

  // Forgot password
  static async forgotPassword(data: ForgotPasswordData) {
    return await apiService.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
  }

  // Reset password
  static async resetPassword(data: ResetPasswordData) {
    return await apiService.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  }

  // Verify email
  static async verifyEmail(token: string) {
    return await apiService.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
  }

  // Get current user profile
  static async getProfile() {
    return await apiService.get<UserProfile>(API_ENDPOINTS.USERS.PROFILE);
  }

  // Update user profile
  static async updateProfile(data: Partial<UserProfile>) {
    return await apiService.put<UserProfile>(
      API_ENDPOINTS.USERS.UPDATE_PROFILE,
      data
    );
  }

  // Change password
  static async changePassword(data: ChangePasswordData) {
    return await apiService.post(API_ENDPOINTS.USERS.CHANGE_PASSWORD, data);
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem("accessToken");
    return !!token;
  }

  // Get current user token
  static getToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  // Get current user refresh token
  static getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  // Clear all auth data
  static clearAuth() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    apiService.removeAuthToken();
  }
}
