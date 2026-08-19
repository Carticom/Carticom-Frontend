// ============================================================
// CARTICOM PRODUCTS — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsRepository } from '@/features/dashboard/repositories/products.repository';
import type { CreateProductDto, UpdateProductDto } from '@/features/dashboard/types/products.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

// ─── Use Products ──────────────────────────────────────────────

export function useProducts(storeId: string, params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: queryKeys.products.list({ storeId, ...params }),
    queryFn: async () => {
      const result = await productsRepository.list(params);
      return result.data;
    },
    enabled: !!storeId});
}

// ─── Use Product By ID ─────────────────────────────────────────

export function useProduct(id: string | undefined | null) {
  return useQuery({
    queryKey: queryKeys.products.byId(id || ''),
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');
      return productsRepository.getById(id);
    },
    enabled: !!id});
}

// ─── Use Products By Store ─────────────────────────────────────

export function useProductsByStore(storeId: string, activeOnly = false) {
  return useQuery({
    queryKey: activeOnly ? ['products', 'store', storeId, 'active'] : ['products', 'store', storeId],
    queryFn: async () => {
      return activeOnly 
        ? productsRepository.getActiveByStore(storeId)
        : productsRepository.getByStore(storeId);
    },
    enabled: !!storeId});
}

// ─── Use Search Products ───────────────────────────────────────

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: async () => {
      if (!query.trim()) return [];
      return productsRepository.search(query);
    },
    enabled: query.trim().length > 0});
}

// ─── Use Create Product ────────────────────────────────────────

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProductDto) => {
      return productsRepository.create({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      showToast('success', 'Product created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create product', {
        description: error.message});
    }});
}

// ─── Use Update Product ────────────────────────────────────────

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UpdateProductDto> }) => {
      return productsRepository.update({ id, data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byId(variables.id) });
      showToast('success', 'Product updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update product', {
        description: error.message});
    }});
}

// ─── Use Delete Product ────────────────────────────────────────

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return productsRepository.delete({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      showToast('success', 'Product deleted successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to delete product', {
        description: error.message});
    }});
}

// ─── Use Update Inventory ──────────────────────────────────────

export function useUpdateInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, quantityDelta }: { id: string; quantityDelta: number }) => {
      return productsRepository.updateInventory(id, quantityDelta);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byId(variables.id) });
      showToast('success', 'Inventory updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update inventory', {
        description: error.message});
    }});
}