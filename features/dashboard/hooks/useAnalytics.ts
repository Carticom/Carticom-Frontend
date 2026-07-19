// ============================================================
// CARTICOM ANALYTICS — React Query Hooks
// ============================================================

'use client';

import { useQuery } from '@tanstack/react-query';
import { analyticsRepository } from '@/features/dashboard/repositories/analytics.repository';
import type { AnalyticsDto } from '@/features/dashboard/types/analytics.types';
import { queryKeys } from '@/lib/dal/query-keys';

// ─── Use Analytics ────────────────────────────────────────────

export function useAnalytics(storeId: string, period?: string) {
  return useQuery({
    queryKey: queryKeys.analytics.dashboard(),
    queryFn: async () => {
      return analyticsRepository.getByStore(storeId, period);
    },
    enabled: !!storeId,
  });
}

// ─── Use Dashboard Analytics ──────────────────────────────────

export function useDashboardAnalytics(storeId: string) {
  return useQuery({
    queryKey: queryKeys.analytics.dashboard(),
    queryFn: async () => {
      return analyticsRepository.getDashboard(storeId);
    },
    enabled: !!storeId,
  });
}