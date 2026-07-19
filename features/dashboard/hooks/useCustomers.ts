// ============================================================
// CARTICOM CUSTOMERS — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customersRepository } from '@/features/dashboard/repositories/customers.repository';
import type { CustomerDto, CreateCustomerDto, UpdateCustomerDto } from '@/features/dashboard/types/customers.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

// ─── Use Customers ────────────────────────────────────────────

export function useCustomers(storeId: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.customers.list({ storeId, ...params }),
    queryFn: async () => {
      const result = await customersRepository.list(params);
      return result.data;
    },
    enabled: !!storeId,
  });
}

// ─── Use Customer By ID ───────────────────────────────────────

export function useCustomer(id: string | undefined | null) {
  return useQuery({
    queryKey: queryKeys.customers.byId(id || ''),
    queryFn: async () => {
      if (!id) throw new Error('Customer ID is required');
      return customersRepository.getById(id);
    },
    enabled: !!id,
  });
}

// ─── Use Create Customer ──────────────────────────────────────

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCustomerDto) => {
      return customersRepository.create({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
      showToast('success', 'Customer created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create customer', {
        description: error.message,
      });
    },
  });
}

// ─── Use Update Customer ──────────────────────────────────────

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UpdateCustomerDto> }) => {
      return customersRepository.update({ id, data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.byId(variables.id) });
      showToast('success', 'Customer updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update customer', {
        description: error.message,
      });
    },
  });
}

// ─── Use Delete Customer ──────────────────────────────────────

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return customersRepository.delete({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
      showToast('success', 'Customer deleted successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to delete customer', {
        description: error.message,
      });
    },
  });
}