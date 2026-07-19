// ============================================================
// CARTICOM ESCROW — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { escrowRepository } from '@/features/dashboard/repositories/escrow.repository';
import type { EscrowTransactionDto, CreateEscrowDto, UpdateEscrowDto } from '@/features/dashboard/types/escrow.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

// ─── Use Escrow Transactions ──────────────────────────────────

export function useEscrowTransactions(storeId: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.escrow.list({ storeId, ...params }),
    queryFn: async () => {
      const result = await escrowRepository.list(params);
      return result.data;
    },
    enabled: !!storeId,
  });
}

// ─── Use Escrow By Order ──────────────────────────────────────

export function useEscrowByOrder(orderId: string) {
  return useQuery({
    queryKey: ['escrow', 'order', orderId],
    queryFn: async () => {
      return escrowRepository.getByOrder(orderId);
    },
    enabled: !!orderId,
  });
}

// ─── Use Create Escrow ────────────────────────────────────────

export function useCreateEscrow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateEscrowDto) => {
      return escrowRepository.create({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.escrow.all });
      showToast('success', 'Escrow created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create escrow', {
        description: error.message,
      });
    },
  });
}

// ─── Use Update Escrow ────────────────────────────────────────

export function useUpdateEscrow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UpdateEscrowDto> }) => {
      return escrowRepository.update({ id, data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.escrow.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.escrow.byId(variables.id) });
      showToast('success', 'Escrow updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update escrow', {
        description: error.message,
      });
    },
  });
}