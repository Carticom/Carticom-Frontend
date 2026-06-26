// ============================================================
// CARTICOM — Dashboard Layout (Protected)
// ============================================================

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Store,
} from 'lucide-react';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { useAuth, useSessionMonitor } from '@/features/auth/hooks/useAuth';

const sidebarLinks = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: User,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  // Monitor session
  useSessionMonitor();

  // Close mobile sidebar on route change
  useEffect(() => {
    const closeMobileMenu = () => {
      const sidebar = document.getElementById('mobile-sidebar');
      if (sidebar) {
        sidebar.classList.add('hidden');
      }
    };
    closeMobileMenu();
  }, [pathname]);

  const toggleMobileSidebar = () => {
    const sidebar = document.getElementById('mobile-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('hidden');
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-1 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 h-16 border-b border-gray-200 dark:border-gray-800">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
                <Store className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                Carticom
              </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* User & Logout */}
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-sm font-semibold">
                  {user?.fullName?.charAt(0)?.toUpperCase() ?? 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.fullName ?? 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email ?? ''}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors mt-1"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
                <Store className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                Carticom
              </span>
            </div>
            <button
              onClick={toggleMobileSidebar}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div
          id="mobile-sidebar"
          className="hidden fixed inset-0 z-50 lg:hidden"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleMobileSidebar}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-xl">
            <div className="flex items-center justify-between px-6 h-16 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
                  <Store className="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  Carticom
                </span>
              </div>
              <button
                onClick={toggleMobileSidebar}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="px-4 py-6 space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={toggleMobileSidebar}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="pt-16 lg:pt-0">
            <div className="px-4 sm:px-6 lg:px-8 py-8">{children}</div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}