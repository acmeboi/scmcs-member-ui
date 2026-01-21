import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import type {
  LoginRequest,
  LoginResponse,
  PasswordUpdateRequest,
  PasswordUpdateResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignUpRequest,
  SignUpResponse,
} from '@/models/auth.model';
import type {
  ContributionsChartResponse,
  ContributionsResponse,
  DeductionHistoryResponse,
  OutstandingLoansResponse,
  TotalContributionsChartResponse,
  TotalContributionsResponse,
} from '@/models/member.model';
import { storage } from '@/utils/storage';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Custom axios baseQuery for RTK Query
const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = 'GET', data, params, headers }, { signal }) => {
    try {
      // Get token from storage
      const token = storage.getToken();
      
      // Prepare request config
      const config: AxiosRequestConfig = {
        url: url.startsWith('http') ? url : `${API_BASE_URL}${url}`,
        method,
        data,
        params,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...headers,
        },
        signal,
      };

      // Make request
      const result = await axios.request(config);
      
      return {
        data: result.data,
        meta: {
          request: {
            url: result.config.url,
            method: result.config.method,
          },
          response: {
            status: result.status,
            statusText: result.statusText,
          },
        },
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      
      // Handle 401 Unauthorized - try to refresh token
      if (err.response?.status === 401) {
        const refreshToken = storage.getRefreshToken();
        
        if (refreshToken) {
          try {
            // Attempt to refresh token
            const refreshResponse = await axios.post<RefreshTokenResponse>(
              `${API_BASE_URL}${API_ENDPOINTS.TOKEN_REFRESH}`,
              { refresh_token: refreshToken }
            );

            const { token, refresh_token } = refreshResponse.data;
            storage.setToken(token);
            storage.setRefreshToken(refresh_token);

            // Retry original request with new token
            const retryConfig: AxiosRequestConfig = {
              url: url.startsWith('http') ? url : `${API_BASE_URL}${url}`,
              method,
              data,
              params,
              headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...headers,
              },
              signal,
            };

            const retryResult = await axios.request(retryConfig);
            
            return {
              data: retryResult.data,
              meta: {
                request: {
                  url: retryResult.config.url,
                  method: retryResult.config.method,
                },
                response: {
                  status: retryResult.status,
                  statusText: retryResult.statusText,
                },
                    },
                  };
                } catch {
                  // Refresh failed, clear storage and redirect
                  storage.clearAll();
                  window.location.href = '/login';
            
            return {
              error: {
                status: 401,
                data: { message: 'Authentication failed. Please login again.' },
              },
            };
          }
        } else {
          // No refresh token, clear storage and redirect
          storage.clearAll();
          window.location.href = '/login';
          
          return {
            error: {
              status: 401,
              data: { message: 'Authentication required. Please login.' },
            },
          };
        }
      }

      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || { message: err.message || 'An error occurred' },
        },
      };
    }
  };

// Create API slice with axios baseQuery
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    'Auth',
    'User',
    'Member',
    'Contributions',
    'TotalContributions',
    'Loans',
    'Deductions',
    'ContributionsChart',
    'TotalContributionsChart',
  ],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_ENDPOINTS.LOGIN,
        method: 'POST',
        data: credentials,
      }),
      invalidatesTags: ['Auth', 'User', 'Member'],
    }),

    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: API_ENDPOINTS.SIGNUP,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    updatePassword: builder.mutation<PasswordUpdateResponse, PasswordUpdateRequest>({
      query: (data) => ({
        url: API_ENDPOINTS.PASSWORD_UPDATE,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (data) => ({
        url: API_ENDPOINTS.TOKEN_REFRESH,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_ENDPOINTS.LOGOUT,
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User', 'Member', 'Contributions', 'TotalContributions', 'Loans', 'Deductions', 'ContributionsChart', 'TotalContributionsChart'],
    }),

    // Member Dashboard endpoints
    getContributions: builder.query<ContributionsResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.MEMBER_CONTRIBUTIONS,
        method: 'GET',
      }),
      providesTags: ['Contributions'],
      // Cache for 5 minutes
      keepUnusedDataFor: 300,
    }),

    getTotalContributions: builder.query<TotalContributionsResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.MEMBER_TOTAL_CONTRIBUTIONS,
        method: 'GET',
      }),
      providesTags: ['TotalContributions'],
      // Cache for 5 minutes
      keepUnusedDataFor: 300,
    }),

    getOutstandingLoans: builder.query<OutstandingLoansResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.MEMBER_OUTSTANDING_LOANS,
        method: 'GET',
      }),
      providesTags: ['Loans'],
      // Cache for 5 minutes
      keepUnusedDataFor: 300,
    }),

    getDeductionHistory: builder.query<DeductionHistoryResponse, { months?: number }>({
      query: (params) => ({
        url: API_ENDPOINTS.MEMBER_DEDUCTION_HISTORY,
        method: 'GET',
        params: params.months ? { months: params.months } : {},
      }),
      providesTags: (_result, _error, arg) => [
        { type: 'Deductions', id: `months-${arg.months || 12}` },
        'Deductions',
      ],
      // Cache for 5 minutes
      keepUnusedDataFor: 300,
    }),

    getContributionsChart: builder.query<ContributionsChartResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.MEMBER_CONTRIBUTIONS_PIE_CHART,
        method: 'GET',
      }),
      providesTags: ['ContributionsChart'],
      // Cache for 5 minutes
      keepUnusedDataFor: 300,
    }),

    getTotalContributionsChart: builder.query<TotalContributionsChartResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.MEMBER_TOTAL_CONTRIBUTIONS_BAR_CHART,
        method: 'GET',
      }),
      providesTags: ['TotalContributionsChart'],
      // Cache for 5 minutes
      keepUnusedDataFor: 300,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useSignUpMutation,
  useUpdatePasswordMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetContributionsQuery,
  useGetTotalContributionsQuery,
  useGetOutstandingLoansQuery,
  useGetDeductionHistoryQuery,
  useGetContributionsChartQuery,
  useGetTotalContributionsChartQuery,
} = apiSlice;

// Export utility functions for cache invalidation
// These return thunks that can be dispatched
export const invalidateContributions = () =>
  apiSlice.util.invalidateTags(['Contributions', 'TotalContributions', 'ContributionsChart', 'TotalContributionsChart']);

export const invalidateLoans = () =>
  apiSlice.util.invalidateTags(['Loans']);

export const invalidateDeductions = () =>
  apiSlice.util.invalidateTags(['Deductions']);

export const invalidateAllMemberData = () =>
  apiSlice.util.invalidateTags([
    'Member',
    'Contributions',
    'TotalContributions',
    'Loans',
    'Deductions',
    'ContributionsChart',
    'TotalContributionsChart',
  ]);
