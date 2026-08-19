'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersRepository } from '@/features/dashboard/repositories/orders.repository';
import type { CreateOrderDto } from '@/features/dashboard/types/orders.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

export function useOrders(storeId: string, params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: queryKeys.orders.list({ storeId, ...params }),
    queryFn: async () => {
      return ordersRepository.getByStore(storeId, params);
    },
    enabled: !!storeId});
}

export function useOrder(id: string | undefined | null) {
  return useQuery({
    queryKey: queryKeys.orders.byId(id || ''),
    queryFn: async () => {
      if (!id) throw new Error('Order ID is required');
      return ordersRepository.getById(id);
    },
    enabled: !!id});
}

export function useOrdersByStatus(storeId: string, status: string) {
  return useQuery({
    queryKey: queryKeys.orders.byStatus(status),
    queryFn: async () => {
      return ordersRepository.getByStatus(storeId, status);
    },
    enabled: !!storeId && !!status});
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateOrderDto) => {
      return ordersRepository.create({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      showToast('success', 'Order created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create order', {
        description: error.message});
    }});
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return ordersRepository.updateOrderStatus(id, status);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.byId(variables.id) });
      showToast('success', 'Order status updated');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update order', {
        description: error.message});
    }});
}
