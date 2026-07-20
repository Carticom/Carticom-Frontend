// ============================================================
// CARTICOM STAFF — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { staffRepository } from '@/features/dashboard/repositories/staff.repository';
import type { StaffDto, CreateStaffDto, UpdateStaffDto } from '@/features/dashboard/types/staff.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

// ─── Use Staff ────────────────────────────────────────────────

export function useStaff(storeId: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.staff.list({ storeId, ...params }),
    queryFn: async () => {
      return staffRepository.getByStore(storeId, params);
    },
    enabled: !!storeId,
  });
}

// ─── Use Staff By ID ──────────────────────────────────────────

export function useStaffMember(id: string | undefined | null) {
  return useQuery({
    queryKey: queryKeys.staff.byId(id || ''),
    queryFn: async () => {
      if (!id) throw new Error('Staff ID is required');
      return staffRepository.getById(id);
    },
    enabled: !!id,
  });
}

// ─── Use Invite Staff ─────────────────────────────────────────

export function useInviteStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ storeId, email, role }: { storeId: string; email: string; role: string }) => {
      return staffRepository.invite(storeId, email, role);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.list({ storeId: variables.storeId }) });
      showToast('success', 'Staff invitation sent successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to send invitation', {
        description: error.message,
      });
    },
  });
}

// ─── Use Update Staff ─────────────────────────────────────────

export function useUpdateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UpdateStaffDto> }) => {
      return staffRepository.updatePermissions(id, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.byId(variables.id) });
      showToast('success', 'Staff updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update staff', {
        description: error.message,
      });
    },
  });
}

// ─── Use Delete Staff ─────────────────────────────────────────

export function useDeleteStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return staffRepository.delete({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.all });
      showToast('success', 'Staff removed successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to remove staff', {
        description: error.message,
      });
    },
  });
}