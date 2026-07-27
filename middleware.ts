import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decoded as Record<string, unknown>;
  } catch {
    return null;
  }
}

function getRoleFromToken(token: string | undefined): string | null {
  if (!token) return null;
  const decoded = decodeToken(token);
  return (decoded?.role as string) ?? null;
}

function getRoleRedirect(role: string): string {
  switch (role) {
    case 'CUSTOMER':
      return '/storefront';
    case 'STAFF':
      return '/staff/dashboard';
    case 'BUSINESS_OWNER':
      return '/dashboard';
    case 'ADMIN':
      return '/admin/dashboard';
    case 'SUPER_ADMIN':
      return '/super-admin/dashboard';
    default:
      return '/dashboard';
  }
}

function getBasePath(role: string): string {
  switch (role) {
    case 'CUSTOMER': return '/storefront';
    case 'STAFF': return '/staff';
    case 'BUSINESS_OWNER': return '/dashboard';
    case 'ADMIN': return '/admin';
    case 'SUPER_ADMIN': return '/super-admin';
    default: return '';
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/staff/:path*',
    '/admin/:path*',
    '/super-admin/:path*',
    '/onboarding/:path*',
    '/api/auth/:path*',
  ],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  // Redirect unauthenticated users to login when accessing protected routes
  const protectedPaths = ['/dashboard', '/staff', '/admin', '/super-admin', '/onboarding'];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !accessToken) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from landing/auth pages
  if (accessToken && (pathname === '/' || pathname === '/login' || pathname === '/register')) {
    const role = getRoleFromToken(accessToken);
    const redirect = role ? getRoleRedirect(role) : '/dashboard';
    return NextResponse.redirect(new URL(redirect, req.url));
  }

  // Role-based routing for dashboard routes
  if (accessToken) {
    const role = getRoleFromToken(accessToken);
    const basePath = role ? getBasePath(role) : '';

    // If user is on wrong role's route prefix, redirect to their correct one
    const currentBase = protectedPaths.find((p) => pathname.startsWith(p)) || '';
    if (currentBase && basePath && currentBase !== basePath) {
      const relativePath = pathname.replace(currentBase, '') || '/dashboard';
      const newPath = basePath === '/dashboard' && relativePath === '' ? '/dashboard' : `${basePath}${relativePath}`;
      // Don't redirect to unknown routes - just go to their home
      if (basePath) {
        return NextResponse.redirect(new URL(basePath === '/dashboard' ? '/dashboard' : `${basePath}/dashboard`, req.url));
      }
    }
  }

  return NextResponse.next();
}
