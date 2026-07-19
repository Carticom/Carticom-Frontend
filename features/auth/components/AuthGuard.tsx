// ============================================================
// CARTICOM AUTHENTICATION — Auth Guard Component
// ============================================================

'use client';

import { useEffect } from 'react';
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

  useEffect(() => {
    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(pathname);
      router.push(`${redirectTo}?returnUrl=${returnUrl}`);
    }
  }, [isAuthenticated, redirectTo, router, pathname]);

  if (!isAuthenticated) {
    return null;
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
