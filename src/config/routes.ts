// Route definitions
export const ROUTES = {
  // Public routes
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
  PASSWORD_RESET: '/password-reset',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  LOANS: '/loans',
  DEDUCTIONS: '/deductions',
} as const;

