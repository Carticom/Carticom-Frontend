// ============================================================
// CARTICOM DASHBOARD — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/features/auth/services/auth.service';
import type { UserDto } from '@/features/auth/types';

// ─── Dashboard Stats ───────────────────────────────────────────

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const user = await authService.getCurrentUser();
      return {
        user,
      };
    },
  });
}

// ─── Onboarding Status ─────────────────────────────────────────

export function useOnboardingStatus() {
  return useQuery({
    queryKey: ['onboarding', 'status'],
    queryFn: async () => {
      // Will be implemented when backend endpoint is ready
      return {
        isComplete: false,
        currentStep: 0,
        completedSteps: [],
      };
    },
  });
}

// ─── Complete Onboarding ───────────────────────────────────────

export function useCompleteOnboarding() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { step: number; data: Record<string, unknown> }) => {
      // Will be implemented when backend endpoint is ready
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding'] });
    },
  });
}

// ─── Business Profile ──────────────────────────────────────────

export function useBusinessProfile() {
  return useQuery({
    queryKey: ['business', 'profile'],
    queryFn: async () => {
      const user = await authService.getCurrentUser();
      return {
        id: user.id,
        businessName: user.businessName,
        email: user.email,
        phone: user.phone,
      };
    },
  });
}

// ─── Update Business Profile ───────────────────────────────────

export function useUpdateBusinessProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<UserDto>) => {
      const updatedUser = await authService.updateProfile(data);
      return updatedUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business'] });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}