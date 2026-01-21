import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/config/api';
import { storage } from '@/utils/storage';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = storage.getRefreshToken();
      if (refreshToken) {
        try {
          // Attempt to refresh token
          const response = await axios.post(`${API_BASE_URL}/token/refresh`, {
            refresh_token: refreshToken,
          });

          const { token, refresh_token } = response.data;
          storage.setToken(token);
          storage.setRefreshToken(refresh_token);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear storage and redirect to login
          storage.clearAll();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, clear storage and redirect to login
        storage.clearAll();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

