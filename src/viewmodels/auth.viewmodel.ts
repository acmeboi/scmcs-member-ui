import { ROUTES } from '@/config/routes';
import { useNotification } from '@/hooks/useNotification';
import type {
  LoginRequest,
  PasswordResetRequest,
  PasswordUpdateRequest,
  SignUpRequest,
} from '@/models/auth.model';
import { authService } from '@/services/auth.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthViewModel = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notification = useNotification();

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      await authService.login(credentials);
      notification.showSuccess('Login successful', 'Welcome back!');
      navigate(ROUTES.DASHBOARD);
    } catch (error: unknown) {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Login failed. Please check your credentials.';
      notification.showError('Login Failed', message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpRequest) => {
    try {
      setLoading(true);
      const response = await authService.signUp(data);
      notification.showSuccess(
        'Account Created',
        response.message || 'Your account has been created successfully.'
      );
      return response;
    } catch (error: unknown) {
      const message = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Sign up failed. Please try again.';
      notification.showError('Sign Up Failed', message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (data: PasswordUpdateRequest) => {
    try {
      setLoading(true);
      const response = await authService.updatePassword(data);
      notification.showSuccess('Password Updated', response.message);
      navigate(ROUTES.LOGIN);
    } catch (error: unknown) {
      const message = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Password update failed. Please try again.';
      notification.showError('Password Update Failed', message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (data: PasswordResetRequest) => {
    try {
      setLoading(true);
      const response = await authService.requestPasswordReset(data);
      // Don't show notification here - let the UI handle success state
      return response;
    } catch (error: unknown) {
      // For security, don't reveal if email exists or not
      // Return success response anyway
      return { message: 'If an account exists with this email, a password reset link has been sent.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      notification.showSuccess('Logged out', 'You have been successfully logged out.');
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
      // Clear storage even if API call fails
      navigate(ROUTES.LOGIN);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    signUp,
    updatePassword,
    requestPasswordReset,
    logout,
    loading,
    isAuthenticated: authService.isAuthenticated,
  };
};

