// ============================================================
// CARTICOM — Storefront Customer Register
// Convenience route that opens the combined auth page in
// register mode (store-scoped customer accounts).
// ============================================================

'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function StorefrontCustomerRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId') ?? '';

  useEffect(() => {
    const query = storeId ? `?storeId=${encodeURIComponent(storeId)}&mode=register` : '?mode=register';
    router.replace(`/storefront/login${query}`);
  }, [router, storeId]);

  return (
    <div className="py-12 text-center text-sm text-gray-500">Loading…</div>
  );
}
