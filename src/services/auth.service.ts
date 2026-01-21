import apiClient from './api.service';
import { API_ENDPOINTS } from '@/config/api';
import { storage } from '@/utils/storage';
import type {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  PasswordUpdateRequest,
  PasswordUpdateResponse,
} from '@/models/auth.model';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.LOGIN,
      credentials
    );
    
    // Store tokens and user data
    if (response.data) {
      storage.setToken(response.data.token);
      storage.setRefreshToken(response.data.refresh_token);
      storage.setUser(response.data.user);
      storage.setProfile(response.data.profile);
    }
    
    return response.data;
  },

  signUp: async (data: SignUpRequest): Promise<SignUpResponse> => {
    const response = await apiClient.post<SignUpResponse>(
      API_ENDPOINTS.SIGNUP,
      data
    );
    return response.data;
  },

  updatePassword: async (data: PasswordUpdateRequest): Promise<PasswordUpdateResponse> => {
    const response = await apiClient.post<PasswordUpdateResponse>(
      API_ENDPOINTS.PASSWORD_UPDATE,
      data
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      const refreshToken = storage.getRefreshToken();
      if (refreshToken) {
        await apiClient.post(API_ENDPOINTS.LOGOUT, {
          refresh_token: refreshToken,
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      storage.clearAll();
    }
  },

  isAuthenticated: (): boolean => {
    return !!storage.getToken();
  },
};

