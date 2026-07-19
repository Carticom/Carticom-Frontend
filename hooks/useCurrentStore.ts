import { useEffect } from 'react';
import { useCurrentStore as useCurrentStoreStore } from '@/store/current-store';
import { useMyStores } from '@/features/onboarding/hooks/useOnboarding';

export function useCurrentStoreId() {
  const storeId = useCurrentStoreStore((state) => state.storeId);
  const storeName = useCurrentStoreStore((state) => state.storeName);
  const setCurrentStore = useCurrentStoreStore((state) => state.setCurrentStore);
  const { data: stores, isLoading } = useMyStores();

  useEffect(() => {
    if (!storeId && stores && stores.length > 0) {
      const first = stores[0];
      setCurrentStore(first.id, first.name);
    }
  }, [storeId, stores, setCurrentStore]);

  return {
    storeId: storeId ?? stores?.[0]?.id ?? null,
    storeName: storeName ?? stores?.[0]?.name ?? null,
    isLoading: isLoading && !storeId,
  };
}
