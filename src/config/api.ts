// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://app.api.scmcs.org/api' // 'http://127.0.0.1:8000/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'SCMCS';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  PASSWORD_UPDATE: '/password/update',
  PASSWORD_RESET_REQUEST: '/password/reset-request',
  TOKEN_REFRESH: '/token/refresh',
  LOGOUT: '/logout',
  
  // Member Dashboard
  MEMBER_CONTRIBUTIONS: '/member/contributions',
  MEMBER_TOTAL_CONTRIBUTIONS: '/member/total-contributions',
  MEMBER_OUTSTANDING_LOANS: '/member/outstanding-loans',
  MEMBER_DEDUCTION_HISTORY: '/member/deduction-history',
  MEMBER_CONTRIBUTIONS_PIE_CHART: '/member/contributions/pie-chart',
  MEMBER_TOTAL_CONTRIBUTIONS_BAR_CHART: '/member/total-contributions/bar-chart',
} as const;

