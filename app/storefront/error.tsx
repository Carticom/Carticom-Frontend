'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function StorefrontErrorBoundary({
  error,
  reset}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Storefront error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Storefront error</h2>
      <p className="text-gray-500 mb-6">Something went wrong loading this store.</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          Try Again
        </button>
        <Link href="/" className="px-6 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  );
}
