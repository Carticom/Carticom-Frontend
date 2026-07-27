'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { Loader2 } from 'lucide-react';

const ROLE_DASHBOARD_MAP: Record<string, string> = {
  SUPER_ADMIN: '/super-admin/dashboard',
  ADMIN: '/admin/dashboard',
  BUSINESS_OWNER: '/dashboard',
  STAFF: '/staff/dashboard',
  CUSTOMER: '/storefront',
};

const PUBLIC_ROUTES = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-email'];

function getDashboardForRole(role?: string): string {
  return ROLE_DASHBOARD_MAP[role ?? ''] || '/dashboard';
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const initialize = useAuthStore((s) => s.initialize);
  const [ready, setReady] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    if (!accessToken) {
      setReady(true);
      return;
    }
    initialize().finally(() => setReady(true));
  }, [initialize, accessToken]);

  useEffect(() => {
    if (!ready) return;
    if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
      router.replace(getDashboardForRole(user?.role));
    }
  }, [ready, isAuthenticated, pathname, router, user?.role]);

  if (!ready) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
