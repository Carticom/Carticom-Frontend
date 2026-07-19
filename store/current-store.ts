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
      },
    }),
    {
      name: 'carticom-current-store',
      partialize: (state) => ({
        storeId: state.storeId,
        storeName: state.storeName,
      }),
    }
  )
);

export default useCurrentStore;
