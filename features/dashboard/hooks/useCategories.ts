// ============================================================
// CARTICOM CATEGORIES — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesRepository } from '@/features/dashboard/repositories/categories.repository';
import type { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '@/features/dashboard/types/categories.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

// ─── Use Categories ────────────────────────────────────────────

export function useCategories(storeId: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.generic.list('categories', { storeId, ...params }),
    queryFn: async () => {
      const result = await categoriesRepository.list(params);
      return result.data;
    },
    enabled: !!storeId,
  });
}

// ─── Use Category By ID ────────────────────────────────────────

export function useCategory(id: string | undefined | null) {
  return useQuery({
    queryKey: queryKeys.generic.byId('categories', id || ''),
    queryFn: async () => {
      if (!id) throw new Error('Category ID is required');
      return categoriesRepository.getById(id);
    },
    enabled: !!id,
  });
}

// ─── Use Categories By Store ───────────────────────────────────

export function useCategoriesByStore(storeId: string) {
  return useQuery({
    queryKey: ['categories', 'store', storeId],
    queryFn: async () => {
      return categoriesRepository.getByStore(storeId);
    },
    enabled: !!storeId,
  });
}

// ─── Use Create Category ───────────────────────────────────────

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoryDto) => {
      return categoriesRepository.create({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.generic.all('categories') });
      showToast('success', 'Category created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create category', {
        description: error.message,
      });
    },
  });
}

// ─── Use Update Category ───────────────────────────────────────

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UpdateCategoryDto> }) => {
      return categoriesRepository.update({ id, data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.generic.all('categories') });
      queryClient.invalidateQueries({ queryKey: queryKeys.generic.byId('categories', variables.id) });
      showToast('success', 'Category updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update category', {
        description: error.message,
      });
    },
  });
}

// ─── Use Delete Category ───────────────────────────────────────

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return categoriesRepository.delete({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.generic.all('categories') });
      showToast('success', 'Category deleted successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to delete category', {
        description: error.message,
      });
    },
  });
}