// ============================================================
// CARTICOM — Google OAuth Callback
// ============================================================

'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { AccountStatus } from '@/features/auth/types';
import axiosInstance from '@/lib/axios';

const ROLE_REDIRECT_MAP: Record<string, string> = {
  SUPER_ADMIN: '/super-admin/dashboard',
  ADMIN: '/admin/dashboard',
  BUSINESS_OWNER: '/dashboard',
  STAFF: '/staff/dashboard',
  CUSTOMER: '/storefront'};

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const expectedState = sessionStorage.getItem('carticom-oauth-state');
    sessionStorage.removeItem('carticom-oauth-state');

    if (!code || !state) {
      queueMicrotask(() => setError('Google sign-in was cancelled or failed. Please try again.'));
      return;
    }

    if (expectedState && state !== expectedState) {
      queueMicrotask(() => setError('Security check failed. Please try signing in again.'));
      return;
    }

    const exchange = async () => {
      try {
        const res = await axiosInstance.post('/api/v1/auth/oauth/google', { code, state });
        const backendData = res.data?.data;

        if (!res.data?.success || !backendData?.accessToken) {
          setError(backendData?.error?.message ?? 'Google sign-in failed. Please try again.');
          return;
        }

        login(
          {
            id: backendData.userId,
            email: backendData.email,
            fullName: backendData.fullName,
            businessName: '',
            phone: '',
            role: backendData.role,
            status: AccountStatus.ACTIVE,
            emailVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()},
          {
            accessToken: backendData.accessToken,
            refreshToken: backendData.refreshToken,
            expiresIn: backendData.expiresIn,
            tokenType: backendData.tokenType || 'Bearer'}
        );

        router.replace(ROLE_REDIRECT_MAP[backendData.role] ?? '/dashboard');
      } catch {
        setError('Google sign-in failed. Please try again.');
      }
    };

    exchange();
  }, [searchParams, login, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      {error ? (
        <>
          <AlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />
          <p className="max-w-sm text-sm text-gray-600 dark:text-gray-300">{error}</p>
          <button
            type="button"
            onClick={() => router.replace('/login')}
            className="mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors hover:from-blue-700 hover:to-cyan-700"
          >
            Back to Login
          </button>
        </>
      ) : (
        <>
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" aria-hidden="true" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Signing you in with Google...
          </p>
        </>
      )}
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <AuthLayout title="Google Sign-In" subtitle="Finishing authentication...">
      <Suspense
        fallback={
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        }
      >
        <GoogleCallbackContent />
      </Suspense>
    </AuthLayout>
  );
}
