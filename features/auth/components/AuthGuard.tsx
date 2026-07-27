// ============================================================
// CARTICOM AUTHENTICATION — Auth Guard Component
// ============================================================

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';
import type { GuardProps } from '../types';

interface AuthGuardProps extends GuardProps {
  /** Fallback URL to redirect unauthenticated users */
  redirectTo?: string;
}

export function AuthGuard({
  children,
  redirectTo = '/login',
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirecting(true);
      const returnUrl = encodeURIComponent(pathname);
      router.push(`${redirectTo}?returnUrl=${returnUrl}`);
    }
  }, [isAuthenticated, redirectTo, router, pathname]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-200">
            <span className="text-lg font-bold text-white">C</span>
          </div>
          <div className="h-1 w-32 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/2 rounded-full bg-blue-600 animate-[loading_1s_ease-in-out_infinite]" />
          </div>
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// ─── Public Only Guard ───────────────────────────────────────
// Redirects authenticated users away from public pages (login, register, etc.)

interface PublicOnlyGuardProps extends GuardProps {
  redirectTo?: string;
}

export function PublicOnlyGuard({
  children,
  redirectTo = '/dashboard',
}: PublicOnlyGuardProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
