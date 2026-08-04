// ============================================================
// CARTICOM SETTINGS — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { settingsRepository } from '@/features/dashboard/repositories/settings.repository';
import type { UpdateSettingsDto } from '@/features/dashboard/types/settings.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

// ─── Use Settings ─────────────────────────────────────────────

export function useSettings(storeId: string) {
  return useQuery({
    queryKey: queryKeys.settings.business(),
    queryFn: async () => {
      return settingsRepository.getByStore(storeId);
    },
    enabled: !!storeId});
}

// ─── Use Update Settings ──────────────────────────────────────

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ storeId, data }: { storeId: string; data: Partial<UpdateSettingsDto> }) => {
      return axiosInstance.put(`/api/v1/stores/${storeId}/settings`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
      showToast('success', 'Settings updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update settings', {
        description: error.message});
    }});
}