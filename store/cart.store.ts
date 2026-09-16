// ============================================================
// CARTICOM — Shopping Cart State (Zustand)
// Reactive cart with optimistic updates and server sync.
// ============================================================

import { create } from 'zustand';
import { cartApi } from '@/features/onboarding/services/onboarding.service';
import type { CartItemDto } from '@/features/onboarding/types';

interface CartState {
  items: CartItemDto[];
  storeId: string | null;
  isLoading: boolean;
  isAdding: boolean;

  // Computed
  totalItems: () => number;
  subtotal: () => number;

  // Actions
  setStoreId: (storeId: string) => void;
  fetchCart: (storeId: string) => Promise<void>;
  addItem: (productId: string, quantity: number, variantId?: string) => Promise<boolean>;
  updateItem: (productId: string, quantity: number) => Promise<boolean>;
  removeItem: (productId: string) => Promise<boolean>;
  clearCart: () => Promise<void>;
  reset: () => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  storeId: null,
  isLoading: false,
  isAdding: false,

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  subtotal: () => get().items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0),

  setStoreId: (storeId: string) => set({ storeId }),

  fetchCart: async (storeId: string) => {
    set({ isLoading: true });
    try {
      const res = await cartApi.get(storeId);
      const cart = res.data?.data;
      set({
        items: cart?.items || [],
        storeId,
        isLoading: false,
      });
    } catch {
      set({ items: [], isLoading: false });
    }
  },

  addItem: async (productId, quantity, variantId) => {
    const { storeId, items } = get();
    if (!storeId) return false;

    // Optimistic update
    const existing = items.find(i => i.productId === productId && i.variantId === variantId);
    const optimisticItems = existing
      ? items.map(i => i.productId === productId && i.variantId === variantId ? { ...i, quantity: i.quantity + quantity } : i)
      : items;

    set({ items: optimisticItems, isAdding: true });

    try {
      const res = await cartApi.add({ storeId, productId, quantity, variantId });
      const cart = res.data?.data;
      set({ items: cart?.items || optimisticItems, isAdding: false });
      return true;
    } catch {
      // Revert on failure
      set({ items, isAdding: false });
      return false;
    }
  },

  updateItem: async (productId, quantity) => {
    const { storeId, items } = get();
    if (!storeId) return false;

    const previousItems = items;
    set({ items: items.map(i => i.productId === productId ? { ...i, quantity } : i) });

    try {
      const res = await cartApi.updateItem(storeId, productId, quantity);
      const cart = res.data?.data;
      set({ items: cart?.items || items });
      return true;
    } catch {
      set({ items: previousItems });
      return false;
    }
  },

  removeItem: async (productId) => {
    const { storeId, items } = get();
    if (!storeId) return false;

    const previousItems = items;
    set({ items: items.filter(i => i.productId !== productId) });

    try {
      const res = await cartApi.removeItem(storeId, productId);
      const cart = res.data?.data;
      set({ items: cart?.items || items.filter(i => i.productId !== productId) });
      return true;
    } catch {
      set({ items: previousItems });
      return false;
    }
  },

  clearCart: async () => {
    const { storeId } = get();
    if (!storeId) return;

    try {
      await cartApi.clear(storeId);
      set({ items: [] });
    } catch {
      // Silently fail — cart clear is best-effort
    }
  },

  reset: () => set({ items: [], storeId: null, isLoading: false, isAdding: false }),
}));
