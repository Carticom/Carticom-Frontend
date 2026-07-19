// ============================================================
// CARTICOM AUTHENTICATION — React Hooks
// ============================================================

'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';
import authService from '../services/auth.service';
import type {
  RegisterBusinessOwnerDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UserDto,
  AuthTokens,
} from '../types';

// ─── Use Auth ────────────────────────────────────────────────

export function useAuth() {
  const store = useAuthStore();
  const router = useRouter();

  const handleLogin = useCallback(
    async (dto: LoginDto): Promise<{ success: boolean; error?: string }> => {
      try {
        const response = await authService.login(dto);
        
        // Service returns AuthResponse with user and tokens
        const { user, tokens } = response;
        
        if (tokens?.accessToken && user) {
          store.login(user, tokens);
          return { success: true };
        }
        
        return { success: false, error: 'Invalid response from server' };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Login failed';
        return { success: false, error: message };
      }
    },
    [store]
  );

  const handleRegister = useCallback(
    async (
      dto: RegisterBusinessOwnerDto
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const response = await authService.registerBusinessOwner(dto);
        
        // Service returns AuthResponse with user and tokens
        const { user, tokens } = response;
        
        if (tokens?.accessToken && user) {
          store.login(user, tokens);
          return { success: true };
        }
        
        return { success: false, error: 'Invalid response from server' };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Registration failed';
        return { success: false, error: message };
      }
    },
    [store]
  );

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      store.logout();
      router.push('/login');
    }
  }, [store, router]);

  const handleForgotPassword = useCallback(
    async (
      dto: ForgotPasswordDto
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        await authService.forgotPassword(dto);
        return { success: true };
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to send reset email';
        return { success: false, error: message };
      }
    },
    []
  );

  const handleResetPassword = useCallback(
    async (data: {
      email: string;
      token: string;
      newPassword: string;
    }): Promise<{ success: boolean; error?: string }> => {
      try {
        await authService.resetPassword(data);
        return { success: true };
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to reset password';
        return { success: false, error: message };
      }
    },
    []
  );

  const handleUpdateProfile = useCallback(
    async (
      data: Partial<Pick<UserDto, 'fullName' | 'phone' | 'businessName'>>
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const updatedUser = await authService.updateProfile(data);
        store.setUser(updatedUser);
        return { success: true };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to update profile';
        return { success: false, error: message };
      }
    },
    [store]
  );

  return {
    // State
    user: store?.user ?? null,
    isAuthenticated: store?.isAuthenticated ?? false,
    isLoading: store?.isLoading ?? true,
    accessToken: store?.accessToken ?? null,

    // Actions
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    updateProfile: handleUpdateProfile,
    setUser: store?.setUser ?? (() => {}),
    setTokens: store?.setTokens ?? (() => {}),
    checkSession: store?.checkSession ?? (() => false),
    hasRole: store?.hasRole ?? (() => false),
  };
}

// ─── Use Initialize Auth ─────────────────────────────────────

export function useInitializeAuth() {
  const initialize = useAuthStore((state) => state.initialize);
  const isLoading = useAuthStore((state) => state.isLoading);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initialize();
    }
  }, [initialize]);
  return isLoading;
}

// ─── Use Session Monitor ────────────────────────────────────

export function useSessionMonitor() {
  const checkSession = useAuthStore((state) => state.checkSession);
  const updateActivity = useAuthStore((state) => state.updateActivity);

  useEffect(() => {
    const interval = setInterval(() => {
      checkSession();
    }, 60_000); // Check every minute

    return () => clearInterval(interval);
  }, [checkSession]);

  useEffect(() => {
    const handleActivity = () => updateActivity();

    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity, { passive: true });
    window.addEventListener('click', handleActivity, { passive: true });
    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [updateActivity]);
}

// ─── Use Token ───────────────────────────────────────────────

export function useToken() {
  return useAuthStore((state) => state?.accessToken ?? null);
}
