// ============================================================
// CARTICOM AI — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiRepository } from '@/features/dashboard/repositories/ai.repository';

import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

// ─── Use AI Config ────────────────────────────────────────────

export function useAIConfig(storeId: string) {
  return useQuery({
    queryKey: queryKeys.ai.byStore(storeId),
    queryFn: async () => {
      return aiRepository.getByStore(storeId);
    },
    enabled: !!storeId});
}

// ─── Use Toggle AI Config ─────────────────────────────────────

export function useToggleAI() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ storeId, enabled }: { storeId: string; enabled: boolean }) => {
      return aiRepository.enable(storeId, enabled);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.all });
      showToast('success', 'AI configuration updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update AI configuration', {
        description: error.message});
    }});
}