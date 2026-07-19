'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, Plus, MapPin, Package, Phone, Globe, Camera, MessageSquare } from 'lucide-react';
import { storefrontApi, cartApi } from '@/features/onboarding/services/onboarding.service';
import type { StoreDto, ProductDto } from '@/features/onboarding/types';
import { Button } from '@/components/ui/button';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { toast } from 'sonner';

export default function StorePage() {
  const params = useParams();
  const router = useRouter();
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
    } catch {
      setError('Failed to load store. Please try again.');
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
      toast.success('Added to cart!');
    } catch {
      toast.error('Failed to add item to cart.');
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) return <LoadingState message="Loading store..." />;
  if (error) return <ErrorState title="Error loading store" description={error} onRetry={fetchData} />;
  if (!store) return <ErrorState title="Store not found" description="We couldn't find a store with that address." />;

  const primaryColor = store.primaryColor || '#3b82f6';
  const secondaryColor = store.secondaryColor || '#06b6d4';
  const fontFamily = store.fontFamily || 'inherit';

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: store.currency || 'NGN',
      minimumFractionDigits: 2,
    }).format(price);

  return (
    <div className="space-y-8" style={{ fontFamily }}>
      <div
        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
        style={{ borderColor: primaryColor + '30' }}
      >
        <div
          className="h-32 sm:h-48 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
        >
          {store.bannerUrl && (
            <Image
              src={store.bannerUrl}
              alt={`${store.name} banner`}
              fill
              className="object-cover opacity-60"
              unoptimized
            />
          )}
          {store.whatsappNumber && (
            <a
              href={`https://wa.me/${store.whatsappNumber.replace(/\+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg hover:scale-105 transition-transform"
              style={{ backgroundColor: '#25D366' }}
            >
              <Phone className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          )}
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-4">
            <div className="w-20 h-20 rounded-xl border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg overflow-hidden shrink-0">
              {store.logoUrl ? (
                <Image
                  src={store.logoUrl}
                  alt={store.name}
                  width={80}
                  height={80}
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-2xl font-bold" style={{ color: primaryColor }}>
                  {store.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0 pt-2 sm:pt-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                {store.name}
              </h1>
              {store.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {store.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {store.country || 'Nigeria'}
                </span>
                {store.businessCategory && (
                  <span className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    {store.businessCategory}
                  </span>
                )}
              </div>
            </div>
          </div>

          {store.phone && (
            <a
              href={`tel:${store.phone}`}
              className="text-sm text-blue-600 hover:underline block mb-2"
            >
              📞 {store.phone}
            </a>
          )}

          {(store.facebookUrl || store.instagramUrl || store.twitterUrl) && (
            <div className="flex items-center gap-3 mt-3">
              {store.facebookUrl && (
                <a href={store.facebookUrl} target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 transition-colors"
                   title="Facebook">
                  <Globe className="h-4 w-4 text-blue-600" />
                </a>
              )}
              {store.instagramUrl && (
                <a href={store.instagramUrl} target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-pink-100 transition-colors"
                   title="Instagram">
                  <Camera className="h-4 w-4 text-pink-600" />
                </a>
              )}
              {store.twitterUrl && (
                <a href={store.twitterUrl} target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-sky-100 transition-colors"
                   title="Twitter/X">
                  <MessageSquare className="h-4 w-4 text-sky-600" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <section>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Products
        </h2>
        {products.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title="No products yet"
            description="This store hasn't added any products yet. Check back soon!"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-md transition-shadow group"
                style={{ borderColor: primaryColor + '20' }}
              >
                <button
                  onClick={() => router.push(`/storefront/products/${product.id}`)}
                  className="w-full text-left"
                >
                  <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <ShoppingCart className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold" style={{ color: primaryColor }}>
                      {formatPrice(product.price)}
                    </p>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <p className="text-xs text-gray-500 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </p>
                    )}
                    <p className={`text-xs font-medium ${
                      product.quantity > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                    </p>
                  </div>
                </button>
                <div className="px-4 pb-4">
                  <Button
                    size="sm"
                    className="w-full text-white"
                    style={{
                      backgroundColor: product.quantity > 0 ? primaryColor : undefined,
                    }}
                    disabled={product.quantity <= 0 || addingToCart === product.id}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    {addingToCart === product.id ? (
                      'Adding...'
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-1" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
