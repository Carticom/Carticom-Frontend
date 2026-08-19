'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { variantsRepository } from '@/features/dashboard/repositories/variants.repository';
import type { CreateVariantDto, UpdateVariantDto } from '@/features/dashboard/types/variants.types';
import { showToast } from '@/lib/notifications/toast';

// ─── Query Keys ────────────────────────────────────────────────

const variantsKeys = {
  all: (productId: string) => ['variants', productId] as const};

// ─── Use Product Variants ───────────────────────────────────────

export function useProductVariants(productId: string | undefined | null) {
  return useQuery({
    queryKey: variantsKeys.all(productId ?? ''),
    queryFn: async () => {
      if (!productId) throw new Error('Product ID is required');
      return variantsRepository.getByProduct(productId);
    },
    enabled: !!productId});
}

// ─── Use Create Variant ─────────────────────────────────────────

export function useCreateVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, data }: { productId: string; data: CreateVariantDto }) => {
      return variantsRepository.create(productId, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: variantsKeys.all(variables.productId) });
      showToast('success', 'Variant created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create variant', {
        description: error.message});
    }});
}

// ─── Use Update Variant ─────────────────────────────────────────

export function useUpdateVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, id, data }: { productId: string; id: string; data: UpdateVariantDto }) => {
      return variantsRepository.update(productId, id, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: variantsKeys.all(variables.productId) });
      showToast('success', 'Variant updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update variant', {
        description: error.message});
    }});
}

// ─── Use Delete Variant ─────────────────────────────────────────

export function useDeleteVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, id }: { productId: string; id: string }) => {
      return variantsRepository.delete(productId, id);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: variantsKeys.all(variables.productId) });
      showToast('success', 'Variant deleted successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to delete variant', {
        description: error.message});
    }});
}
