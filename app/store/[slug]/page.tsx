'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { storefrontApi, cartApi } from '@/features/onboarding/services/onboarding.service';
import type { StoreDto, ProductDto } from '@/features/onboarding/types';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { getTemplateComponent, getTemplateByCategory } from '@/components/templates';
import { extractErrorMessage } from '@/lib/axios';
import { showToast } from '@/lib/notifications/toast';
import { ShareButton } from '@/components/store/ShareButton';

export default function StorePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [store, setStore] = useState<StoreDto | null>(null);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const storeRes = await storefrontApi.getStoreBySlug(slug);
      if (!storeRes.data.data) throw new Error('Store not found');
      const storeData = storeRes.data.data;
      setStore(storeData);

      const productsRes = await storefrontApi.getStoreProducts(slug);
      if (productsRes.data.data) {
        setProducts(Array.isArray(productsRes.data.data) ? productsRes.data.data : []);
      }
    } catch (err) {
      const msg = extractErrorMessage(err);
      if (msg.includes('not found')) {
        setError('Store not found. The link may be incorrect.');
      } else if (msg.includes('permission')) {
        setError('You do not have permission to view this store.');
      } else {
        setError(msg || 'Failed to load store. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddToCart = async (productId: string) => {
    if (!store) return;
    setAddingToCart(productId);
    try {
      await cartApi.add({ storeId: store.id, productId, quantity: 1 });
      showToast('success', 'Added to cart!');
    } catch (err) {
      const msg = extractErrorMessage(err);
      showToast('error', msg || 'Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) return <LoadingState message="Loading store..." />;
  if (error) return <ErrorState title="Error loading store" description={error} onRetry={fetchData} />;
  if (!store) return <ErrorState title="Store not found" description="We couldn't find a store with that address." />;

  const templateSlug = store.template || getTemplateByCategory(store.businessCategory || '');
  const TemplateComponent = getTemplateComponent(templateSlug);
  const storeUrl = typeof window !== 'undefined' ? window.location.href : `https://carticom.vercel.app/store/${slug}`;

  return (
    <>
      <TemplateComponent
        store={store}
        products={products}
        onAddToCart={handleAddToCart}
        addingToCart={addingToCart}
      />
      <ShareButton
        url={storeUrl}
        title={store.name}
      />
    </>
  );
}
