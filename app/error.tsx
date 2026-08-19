'use client';

import { useEffect } from 'react';

export default function RootErrorBoundary({
  error,
  reset}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="flex justify-center mb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-200">
            <span className="text-3xl font-bold text-white">C</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        <p className="text-sm text-gray-500 mb-8">An unexpected error occurred. Please try again.</p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
