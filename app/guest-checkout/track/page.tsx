'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Package, Loader2, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

function TrackOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference') || '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Track Your Order
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {reference
                ? 'Your order is being processed. Live tracking is available through the store or the email confirmation you received.'
                : 'We couldn\u2019t find an order reference. Please use the link from your checkout confirmation.'}
            </p>
          </div>

          {reference ? (
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Search className="h-4 w-4" />
                Order Reference
              </div>
              <p className="font-mono text-lg font-semibold text-gray-900 dark:text-white break-all">
                {reference}
              </p>
            </div>
          ) : null}

          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>
              Keep your reference handy — you may need it when contacting the store
              or confirming delivery.
            </p>
            <p>
              You can also check your email inbox for the order confirmation and
              updates from the store.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => router.push('/storefront')}
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
