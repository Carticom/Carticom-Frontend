// ============================================================
// CARTICOM SUBSCRIPTION — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionRepository } from '@/features/dashboard/repositories/subscription.repository';
import type { SubscriptionDto, UpdateSubscriptionDto } from '@/features/dashboard/types/subscription.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

// ─── Use Subscription ─────────────────────────────────────────

export function useSubscription(storeId: string) {
  return useQuery({
    queryKey: queryKeys.subscription.byStore(storeId),
    queryFn: async () => {
      return subscriptionRepository.getByStore(storeId);
    },
    enabled: !!storeId,
  });
}

// ─── Use Update Subscription ──────────────────────────────────

export function useUpdateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UpdateSubscriptionDto> }) => {
      return subscriptionRepository.update({ id, data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.all });
      showToast('success', 'Subscription updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update subscription', {
        description: error.message,
      });
    },
  });
}