// ============================================================
// CARTICOM AUTHENTICATION — Zustand State Store
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserDto, AuthTokens } from '../types';
import { setAccessToken } from '@/lib/axios';
import authService from '../services/auth.service';

const setCookie = (name: string, value: string, maxAge: number) => {
  document.cookie = `${name}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax; Secure`;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
};

// ─── Constants ───────────────────────────────────────────────

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes idle timeout
const STORAGE_KEY = 'carticom-auth';

// ─── State Interface ─────────────────────────────────────────

interface AuthState {
  // State
  user: UserDto | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  lastActivity: number | null;

  // Actions
  login: (user: UserDto, tokens: AuthTokens) => void;
  logout: () => void;
  setUser: (user: UserDto) => void;
  setTokens: (tokens: AuthTokens) => void;
  setLoading: (loading: boolean) => void;
  updateActivity: () => void;
  checkSession: () => boolean;
  hasRole: (roles: string[]) => boolean;
  initialize: () => Promise<void>;
}

// ─── Store Implementation ────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // ─── Initial State ────────────────────────────────────
      user: null,
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
      isAuthenticated: false,
      isLoading: true,
      lastActivity: null,

      // ─── Login ────────────────────────────────────────────
      login: (user: UserDto, tokens: AuthTokens) => {
        if (!tokens?.accessToken) {
          console.error('Login called without accessToken');
          return;
        }
        setAccessToken(tokens.accessToken);
        setCookie('accessToken', tokens.accessToken, tokens.expiresIn);
        if (tokens.refreshToken) {
          setCookie('refreshToken', tokens.refreshToken, 7 * 24 * 60 * 60);
        }
        set({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresIn: tokens.expiresIn,
          isAuthenticated: true,
          isLoading: false,
          lastActivity: Date.now(),
        });
      },

      // ─── Logout ───────────────────────────────────────────
      logout: () => {
        setAccessToken(null);
        removeCookie('accessToken');
        removeCookie('refreshToken');
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          expiresIn: null,
          isAuthenticated: false,
          isLoading: false,
          lastActivity: null,
        });
      },

      // ─── Set User ─────────────────────────────────────────
      setUser: (user: UserDto) => {
        set({ user });
      },

      // ─── Set Tokens ───────────────────────────────────────
      setTokens: (tokens: AuthTokens) => {
        if (!tokens?.accessToken) {
          console.error('setTokens called without accessToken');
          return;
        }
        setAccessToken(tokens.accessToken);
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresIn: tokens.expiresIn,
          lastActivity: Date.now(),
        });
      },

      // ─── Set Loading ──────────────────────────────────────
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // ─── Update Activity ──────────────────────────────────
      updateActivity: () => {
        set({ lastActivity: Date.now() });
      },

      // ─── Check Session ────────────────────────────────────
      checkSession: () => {
        const state = get();
        if (!state.isAuthenticated || !state.lastActivity) {
          return false;
        }

        const idleTime = Date.now() - state.lastActivity;
        if (idleTime > SESSION_TIMEOUT_MS) {
          get().logout();
          return false;
        }

        // Check token expiry
        if (state.expiresIn) {
          const tokenAge = Date.now() - (state.lastActivity - state.expiresIn * 1000);
          if (tokenAge > state.expiresIn * 1000) {
            get().logout();
            return false;
          }
        }

        return true;
      },

      // ─── Has Role ─────────────────────────────────────────
      hasRole: (roles: string[]) => {
        const state = get();
        if (!state.user) return false;
        return roles.includes(state.user.role);
      },

      // ─── Initialize ───────────────────────────────────────
      initialize: async () => {
        try {
          const state = get();
          if (!state?.accessToken) {
            set({ isLoading: false, isAuthenticated: false });
            return;
          }

          setAccessToken(state.accessToken);

          try {
            const user = await authService.getCurrentUser();
            set({ user, isLoading: false, isAuthenticated: true });
            return;
          } catch {
            // Token invalid — try refresh
          }

          try {
            const { accessToken: newToken } = await authService.refreshToken();
            if (newToken) {
              setAccessToken(newToken);
              const user = await authService.getCurrentUser();
              set({ user, accessToken: newToken, isLoading: false, isAuthenticated: true });
              return;
            }
          } catch {
            // Refresh failed
          }

          get().logout();
          set({ isLoading: false, isAuthenticated: false });
        } catch {
          get().logout();
          set({ isLoading: false });
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        expiresIn: state.expiresIn,
        isAuthenticated: state.isAuthenticated,
        lastActivity: state.lastActivity,
      }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state?.accessToken) {
            setAccessToken(state.accessToken);
            setCookie('accessToken', state.accessToken, state.expiresIn ?? 3600);
            if (state.refreshToken) {
              setCookie('refreshToken', state.refreshToken, 7 * 24 * 60 * 60);
            }
          }
        };
      },
    }
  )
);

// ─── Selectors ───────────────────────────────────────────────

export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
export const selectIsLoading = (state: AuthState) => state.isLoading;
export const selectUserRole = (state: AuthState) => state.user?.role;
export const selectIsBusinessOwner = (state: AuthState) =>
  state.user?.role === 'BUSINESS_OWNER';

export default useAuthStore;