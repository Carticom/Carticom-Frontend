// ============================================================
// CARTICOM SUPPORT — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supportRepository } from '@/features/dashboard/repositories/support.repository';
import type { SupportTicketDto, CreateSupportTicketDto, UpdateSupportTicketDto } from '@/features/dashboard/types/support.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

// ─── Use Support Tickets ──────────────────────────────────────

export function useSupportTickets(storeId: string, params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: queryKeys.generic.list('support', { storeId, ...params }),
    queryFn: async () => {
      const result = await supportRepository.list(params);
      return result.data;
    },
    enabled: !!storeId,
  });
}

// ─── Use Support Ticket By ID ─────────────────────────────────

export function useSupportTicket(id: string | undefined | null) {
  return useQuery({
    queryKey: queryKeys.generic.byId('support', id || ''),
    queryFn: async () => {
      if (!id) throw new Error('Support ticket ID is required');
      return supportRepository.getById(id);
    },
    enabled: !!id,
  });
}

// ─── Use Create Support Ticket ────────────────────────────────

export function useCreateSupportTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSupportTicketDto) => {
      return supportRepository.create({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.generic.all('support') });
      showToast('success', 'Support ticket created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create support ticket', {
        description: error.message,
      });
    },
  });
}

// ─── Use Update Support Ticket ────────────────────────────────

export function useUpdateSupportTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UpdateSupportTicketDto> }) => {
      return supportRepository.update({ id, data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.generic.all('support') });
      queryClient.invalidateQueries({ queryKey: queryKeys.generic.byId('support', variables.id) });
      showToast('success', 'Support ticket updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update support ticket', {
        description: error.message,
      });
    },
  });
}