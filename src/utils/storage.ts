// LocalStorage helpers
const TOKEN_KEY = 'scmcs_token';
const REFRESH_TOKEN_KEY = 'scmcs_refresh_token';
const USER_KEY = 'scmcs_user';
const PROFILE_KEY = 'scmcs_profile';

export const storage = {
  // Token management
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  // Refresh token management
  setRefreshToken: (refreshToken: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  
  removeRefreshToken: () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  
  // User data
  setUser: (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  
  getUser: (): any | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },
  
  // Profile data
  setProfile: (profile: any) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },
  
  getProfile: (): any | null => {
    const profile = localStorage.getItem(PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
  },
  
  removeProfile: () => {
    localStorage.removeItem(PROFILE_KEY);
  },
  
  // Clear all
  clearAll: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(PROFILE_KEY);
  },
};

