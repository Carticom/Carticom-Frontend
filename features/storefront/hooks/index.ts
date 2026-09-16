// ============================================================
// CARTICOM — Storefront React Query Hooks
// Cached, background-refetching data fetching for storefront.
// ============================================================

'use client';

import { useQuery } from '@tanstack/react-query';
import { storefrontApi, productApi, cartApi } from '@/features/onboarding/services/onboarding.service';

// ─── Store Hooks ──────────────────────────────────────────────

export function useStoreBySlug(slug: string) {
  return useQuery({
    queryKey: ['storefront', 'store', slug],
    queryFn: async () => {
      const res = await storefrontApi.getStoreBySlug(slug);
      return res.data?.data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useStoreProducts(slug: string) {
  return useQuery({
    queryKey: ['storefront', 'products', slug],
    queryFn: async () => {
      const res = await storefrontApi.getStoreProducts(slug);
      return res.data?.data || [];
    },
    enabled: !!slug,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useStoreCategories(slug: string) {
  return useQuery({
    queryKey: ['storefront', 'categories', slug],
    queryFn: async () => {
      const res = await storefrontApi.getStoreCategories(slug);
      return res.data?.data || [];
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// ─── Marketplace Hooks ────────────────────────────────────────

export function useMarketplaceStores(query?: string) {
  return useQuery({
    queryKey: ['storefront', 'marketplace', query],
    queryFn: async () => {
      const res = await storefrontApi.getStores(query);
      return res.data?.data || [];
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
}

// ─── Product Hooks ────────────────────────────────────────────

export function useProductById(id: string) {
  return useQuery({
    queryKey: ['storefront', 'product', id],
    queryFn: async () => {
      const res = await productApi.getById(id);
      return res.data?.data;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

// ─── Cart Hooks ───────────────────────────────────────────────

export function useCart(storeId: string) {
  return useQuery({
    queryKey: ['storefront', 'cart', storeId],
    queryFn: async () => {
      const res = await cartApi.get(storeId);
      return res.data?.data;
    },
    enabled: !!storeId,
    staleTime: 30 * 1000, // 30 seconds — cart changes frequently
  });
}
