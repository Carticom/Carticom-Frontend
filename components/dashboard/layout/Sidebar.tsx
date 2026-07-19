'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Store, Package, ShoppingCart, Users,
  Wallet, Brain, BarChart3, Crown,
  Headphones, Settings, LogOut, DollarSign,
  ChevronLeft, ChevronRight, Menu, X,
  Tags, CreditCard, UserPlus, Shield,
} from 'lucide-react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { UserRole } from '@/features/auth/types';
import { cn } from '@/lib/utils';

interface Child { id: string; label: string; href: string; }

const OWNER_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'store', label: 'Store', icon: Store, href: '/dashboard/store' },
  { id: 'products', label: 'Products', icon: Package, href: '/dashboard/products' },
  { id: 'categories', label: 'Categories', icon: Tags, href: '/dashboard/categories' },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, href: '/dashboard/orders' },
  { id: 'customers', label: 'Customers', icon: Users, href: '/dashboard/customers' },
  { id: 'payments', label: 'Payments', icon: DollarSign, href: '/dashboard/payments' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, href: '/dashboard/wallet' },
  { id: 'subscription', label: 'Subscription', icon: Crown, href: '/dashboard/subscription' },
  { id: 'staff', label: 'Staff', icon: UserPlus, href: '/dashboard/team' },
  { id: 'custom-solutions', label: 'Custom Solutions', icon: Package, href: '/dashboard/custom-solutions' },
  { id: 'ai', label: 'Carticom AI', icon: Brain, href: '/dashboard/ai' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' },
  { id: 'support', label: 'Support', icon: Headphones, href: '/dashboard/support' },
];

const STAFF_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/staff/dashboard' },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, href: '/staff/orders' },
  { id: 'products', label: 'Products', icon: Package, href: '/staff/products' },
  { id: 'customers', label: 'Customers', icon: Users, href: '/staff/customers' },
  { id: 'categories', label: 'Categories', icon: Tags, href: '/staff/categories' },
];

const ADMIN_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
  { id: 'stores', label: 'Stores', icon: Store, href: '/admin/stores' },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
  { id: 'payments', label: 'Payments', icon: DollarSign, href: '/admin/payments' },
  { id: 'disputes', label: 'Disputes', icon: Shield, href: '/admin/disputes' },
  { id: 'settlements', label: 'Settlements', icon: CreditCard, href: '/admin/settlements' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { id: 'subscriptions', label: 'Subscriptions', icon: Crown, href: '/admin/subscriptions' },
  { id: 'wallets', label: 'Wallets', icon: Wallet, href: '/admin/wallets' },
  { id: 'audit', label: 'Audit Logs', icon: Headphones, href: '/admin/audit-logs' },
];

const SUPER_ADMIN_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/super-admin/dashboard' },
  { id: 'users', label: 'Users', icon: Users, href: '/super-admin/users' },
  { id: 'stores', label: 'Stores', icon: Store, href: '/super-admin/stores' },
  { id: 'plans', label: 'Plans', icon: Crown, href: '/super-admin/plans' },
  { id: 'subscriptions', label: 'Subscriptions', icon: DollarSign, href: '/super-admin/subscriptions' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/super-admin/settings' },
  { id: 'custom-solutions', label: 'Custom Solutions', icon: Package, href: '/super-admin/custom-solutions' },
  { id: 'waitlist', label: 'Waitlist', icon: Users, href: '/super-admin/waitlist' },
  { id: 'payments', label: 'Payments', icon: CreditCard, href: '/super-admin/payments' },
  { id: 'audit', label: 'Audit Logs', icon: Headphones, href: '/super-admin/audit-logs' },
];

function getRoleItems(role: string | undefined) {
  switch (role) {
    case UserRole.STAFF:
      return STAFF_ITEMS;
    case UserRole.ADMIN:
      return ADMIN_ITEMS;
    case UserRole.SUPER_ADMIN:
      return SUPER_ADMIN_ITEMS;
    case UserRole.BUSINESS_OWNER:
    default:
      return OWNER_ITEMS;
  }
}

function isActive(href: string | undefined, pathname: string) {
  if (!href) return false;
  if (href === '/dashboard' && pathname === '/dashboard') return true;
  if (href === '/staff/dashboard' && pathname === '/staff/dashboard') return true;
  if (href === '/admin/dashboard' && pathname === '/admin/dashboard') return true;
  if (href === '/super-admin/dashboard' && pathname === '/super-admin/dashboard') return true;
  return pathname.startsWith(href);
}

function getLogoHref(role: string | undefined): string {
  switch (role) {
    case UserRole.STAFF: return '/staff/dashboard';
    case UserRole.ADMIN: return '/admin/dashboard';
    case UserRole.SUPER_ADMIN: return '/super-admin/dashboard';
    default: return '/dashboard';
  }
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ isCollapsed, onToggleCollapse, isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const role = user?.role;

  const items = useMemo(() => getRoleItems(role), [role]);
  const logoHref = useMemo(() => getLogoHref(role), [role]);

  const nav = items.map((item) => {
    const Icon = item.icon;
    const active = isActive(item.href, pathname);

    return (
      <Link
        key={item.id}
        href={item.href || '#'}
        onClick={onMobileClose}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
          active
            ? 'bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-900/30 dark:text-blue-400'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
          isCollapsed && 'justify-center px-2'
        )}
        title={isCollapsed ? item.label : undefined}
        aria-current={active ? 'page' : undefined}
      >
        <Icon className="h-5 w-5 shrink-0" aria-hidden />
        {!isCollapsed && <span>{item.label}</span>}
      </Link>
    );
  });

  return (
    <>
      <aside
        className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:flex-col transition-all duration-300 ease-in-out"
        style={{ width: isCollapsed ? 72 : 256 }}
        aria-label="Sidebar navigation"
      >
        <div className="flex h-full flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
            <Link href={logoHref} className="flex items-center gap-3 min-w-0" aria-label="Dashboard home">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
                <Store className="h-5 w-5 text-white" />
              </div>
              {!isCollapsed && (
                <span className="font-semibold text-gray-900 dark:text-white truncate">Carticom</span>
              )}
            </Link>
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5 scrollbar-thin">
            {nav}
          </nav>

          <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={logout}
              className={cn(
                'flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                'text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20',
                isCollapsed && 'justify-center px-2'
              )}
              aria-label="Logout"
              title={isCollapsed ? 'Logout' : undefined}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onMobileClose} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl"
            >
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
                  <span className="font-semibold text-gray-900 dark:text-white">Menu</span>
                  <button
                    onClick={onMobileClose}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5">
                  {nav}
                </nav>
                <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => { logout(); onMobileClose(); }}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-5 w-5 shrink-0" /> Logout
                  </button>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Open menu"
    >
      <Menu className="h-5 w-5" aria-hidden />
    </button>
  );
}

export function SidebarCollapsedButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Expand sidebar"
    >
      <ChevronRight className="h-4 w-4 text-gray-500" />
    </button>
  );
}
