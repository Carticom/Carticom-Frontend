import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrentStoreState {
  storeId: string | null;
  storeName: string | null;
  setCurrentStore: (storeId: string, storeName: string) => void;
  clearCurrentStore: () => void;
}

export const useCurrentStore = create<CurrentStoreState>()(
  persist(
    (set) => ({
      storeId: null,
      storeName: null,
      setCurrentStore: (storeId: string, storeName: string) => {
        set({ storeId, storeName });
      },
      clearCurrentStore: () => {
        set({ storeId: null, storeName: null });
      }}),
    {
      name: 'carticom-current-store',
      partialize: (state) => ({
        storeId: state.storeId,
        storeName: state.storeName})}
  )
);

// Clear current store when auth state changes
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useEffect } from 'react';

export function useClearStoreOnLogout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearCurrentStore = useCurrentStore((s) => s.clearCurrentStore);
  useEffect(() => {
    if (!isAuthenticated) clearCurrentStore();
  }, [isAuthenticated, clearCurrentStore]);
}

export default useCurrentStore;
