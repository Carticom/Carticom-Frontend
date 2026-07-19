// ============================================================
// CARTICOM ONBOARDING — React Query Hooks (aligned with backend)
// ============================================================

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  storeApi,
  productApi,
  walletApi,
} from '@/features/onboarding/services/onboarding.service';
import { showToast } from '@/lib/notifications/toast';
import type {
  CreateStoreDto,
  UpdateStoreDto,
  CreateProductDto,
  StoreDto,
  ProductDto,
} from '@/features/onboarding/types';

// ─── Query Keys ──────────────────────────────────────────────

export const onboardingKeys = {
  stores: ['stores'] as const,
  storeById: (id: string) => ['stores', id] as const,
  products: ['products'] as const,
  productsByStore: (storeId: string) => ['products', 'store', storeId] as const,
  wallet: ['wallet'] as const,
};

// ─── Create Store ─────────────────────────────────────────────

export function useCreateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStoreDto) =>
      storeApi.create(data).then((res) => res.data.data as StoreDto),
    onSuccess: (store) => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.stores });
      showToast('success', 'Store created successfully');
      return store;
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create store', {
        description: error.message,
      });
    },
  });
}

// ─── Update Store ─────────────────────────────────────────────

export function useUpdateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStoreDto }) =>
      storeApi.update(id, data).then((res) => res.data.data as StoreDto),
    onSuccess: (store) => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.stores });
      queryClient.invalidateQueries({ queryKey: onboardingKeys.storeById(store.id) });
      showToast('success', 'Store updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update store', {
        description: error.message,
      });
    },
  });
}

// ─── Get My Stores ────────────────────────────────────────────

export function useMyStores() {
  return useQuery({
    queryKey: onboardingKeys.stores,
    queryFn: () => storeApi.getMyStores().then((res) => res.data.data ?? []),
  });
}

// ─── Create Product ───────────────────────────────────────────

export function useCreateProduct() {
  return useMutation({
    mutationFn: (data: CreateProductDto) =>
      productApi.create(data).then((res) => res.data.data as ProductDto),
    onSuccess: () => {
      showToast('success', 'Product created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create product', {
        description: error.message,
      });
    },
  });
}

// ─── Get Products by Store ────────────────────────────────────

export function useStoreProducts(storeId: string | undefined) {
  return useQuery({
    queryKey: onboardingKeys.productsByStore(storeId ?? ''),
    queryFn: () =>
      productApi.getByStore(storeId!).then((res) => res.data.data ?? []),
    enabled: !!storeId,
  });
}

// ─── Wallet Balance ───────────────────────────────────────────

export function useWalletBalance() {
  return useQuery({
    queryKey: onboardingKeys.wallet,
    queryFn: () => walletApi.getBalance().then((res) => res.data.data),
    retry: false,
  });
}