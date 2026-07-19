// ============================================================
// CARTICOM PAYMENTS — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentsRepository } from '@/features/dashboard/repositories/payments.repository';
import type { PaymentDto, CreatePaymentDto, UpdatePaymentDto } from '@/features/dashboard/types/payments.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

// ─── Use Payments ─────────────────────────────────────────────

export function usePayments(storeId: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.transactions.list({ storeId, ...params }),
    queryFn: async () => {
      const result = await paymentsRepository.list(params);
      return result.data;
    },
    enabled: !!storeId,
  });
}

// ─── Use Payment By ID ────────────────────────────────────────

export function usePayment(id: string | undefined | null) {
  return useQuery({
    queryKey: queryKeys.transactions.byId(id || ''),
    queryFn: async () => {
      if (!id) throw new Error('Payment ID is required');
      return paymentsRepository.getById(id);
    },
    enabled: !!id,
  });
}

// ─── Use Payments By Order ────────────────────────────────────

export function usePaymentsByOrder(orderId: string) {
  return useQuery({
    queryKey: ['payments', 'order', orderId],
    queryFn: async () => {
      return paymentsRepository.getByOrder(orderId);
    },
    enabled: !!orderId,
  });
}

// ─── Use Create Payment ───────────────────────────────────────

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePaymentDto) => {
      return paymentsRepository.create({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      showToast('success', 'Payment initiated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to initiate payment', {
        description: error.message,
      });
    },
  });
}

// ─── Use Update Payment ───────────────────────────────────────

export function useUpdatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UpdatePaymentDto> }) => {
      return paymentsRepository.update({ id, data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.byId(variables.id) });
      showToast('success', 'Payment updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update payment', {
        description: error.message,
      });
    },
  });
}