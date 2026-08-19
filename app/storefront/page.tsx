'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Store, ShoppingBag, Search, MapPin, Package } from 'lucide-react';
import { storefrontApi } from '@/features/onboarding/services/onboarding.service';
import type { StoreDto } from '@/features/onboarding/types';

import { Input } from '@/components/ui/input';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';

export default function MarketplacePage() {
  const [stores, setStores] = useState<StoreDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await storefrontApi.getStores();
        if (cancelled) return;
        setStores(res.data.data || []);
      } catch {
        if (cancelled) return;
        setError('Unable to load stores. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [retryKey]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRetryKey((k) => k + 1);
  };

  const filteredStores = searchQuery
    ? stores.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.businessCategory && s.businessCategory.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : stores;

  if (loading) return <LoadingState message="Loading marketplace..." />;

  if (error) return <ErrorState title="Marketplace unavailable" description={error} onRetry={handleRetry} />;

  return (
    <div className="space-y-8 py-8">
      <section className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mb-2">
          <Store className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Carticom Marketplace
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover amazing products from stores across Africa. Shop with confidence with secure payments.
        </p>
      </section>

      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search stores by name, category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-base rounded-xl border-gray-200 dark:border-gray-700"
        />
      </div>

      {filteredStores.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title={searchQuery ? 'No stores found' : 'No stores yet'}
          description={
            searchQuery
              ? `No stores match "${searchQuery}". Try a different search.`
              : 'There are no stores on the marketplace yet. Check back soon!'
          }
          action={
            searchQuery ? {
              label: 'Clear search',
              onClick: () => setSearchQuery('')} : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStores.map((store) => (
            <Link
              key={store.id}
              href={`/store/${store.slug}`}
              className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="h-32 relative overflow-hidden"
                style={{
                  backgroundColor: store.primaryColor || '#3b82f6'}}
              >
                {store.bannerUrl ? (
                  <Image
                    src={store.bannerUrl}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full opacity-20">
                    <Store className="h-16 w-16 text-white" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl border-2 border-white dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm overflow-hidden shrink-0 -mt-8 relative z-10">
                    {store.logoUrl ? (
                      <Image
                        src={store.logoUrl}
                        alt={store.name}
                        width={48}
                        height={48}
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-lg font-bold text-blue-600">
                        {store.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                      {store.name}
                    </h3>
                    {store.businessCategory && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {store.businessCategory}
                      </span>
                    )}
                  </div>
                </div>
                {store.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {store.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {store.country || 'Nigeria'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    {store.currency || 'NGN'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
