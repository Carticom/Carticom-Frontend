// ============================================================
// CARTICOM — Storefront Customer Login (store-scoped)
// ============================================================

'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import {
  loginCustomer,
  registerCustomer,
} from '@/features/storefront/services/customer-auth.service';

function CustomerAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId') ?? '';
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!storeId) {
      setError('Missing store reference in the link. Please open this page from the store.');
      return;
    }
    setSubmitting(true);
    try {
      if (mode === 'register') {
        await registerCustomer(storeId, { fullName, email, password, phone: phone || undefined });
      } else {
        await loginCustomer(storeId, { email, password });
      }
      router.push('/storefront/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {mode === 'register' ? 'Create your account' : 'Sign in to your account'}
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {mode === 'register'
            ? 'Track your orders and check out faster at this store.'
            : 'Welcome back. Enter your details to continue.'}
        </p>
      </div>

      {!storeId ? (
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            This link is missing the store reference. Please navigate here from the store you are
            shopping with.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          {error ? (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          ) : null}

          {mode === 'register' ? (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
            </>
          ) : null}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Sign in'}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {mode === 'register' ? (
              <>
                Already have an account?{' '}
                <Link
                  href={`/storefront/login?storeId=${encodeURIComponent(storeId)}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                New to this store?{' '}
                <Link
                  href={`/storefront/login?storeId=${encodeURIComponent(storeId)}&mode=register`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Create an account
                </Link>
              </>
            )}
          </p>
        </form>
      )}
    </div>
  );
}

export default function StorefrontCustomerLoginPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-gray-500">Loading…</div>}>
      <CustomerAuthContent />
    </Suspense>
  );
}
