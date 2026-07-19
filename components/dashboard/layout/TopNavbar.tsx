'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, Moon, Sun, ChevronDown, User, Settings,
  LogOut, Store, CreditCard,
} from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useTheme } from '@/components/theme/theme-provider';
import { cn } from '@/lib/utils';
import { MobileToggle } from './Sidebar';
import { SidebarCollapsedButton } from './Sidebar';

interface TopNavbarProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export function TopNavbar({ onToggleSidebar, isSidebarCollapsed }: TopNavbarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.fullName?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'BO';

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="flex h-full items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-3">
          {isSidebarCollapsed ? (
            <SidebarCollapsedButton onClick={onToggleSidebar} />
          ) : (
            <MobileToggle onClick={onToggleSidebar} />
          )}
          <nav className="hidden md:flex items-center text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
            <span className="hover:text-gray-700 dark:hover:text-gray-200">Dashboard</span>
            {pathname !== '/dashboard' && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium capitalize">
                  {pathname.split('/').pop()}
                </span>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden />
            <input
              type="search"
              placeholder="Search..."
              className={cn(
                'h-9 w-64 rounded-lg border bg-gray-50 dark:bg-gray-800 pl-9 pr-4 text-sm outline-none transition-all',
                searchFocused ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200 dark:border-gray-700'
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              aria-label="Search"
            />
          </div>

          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Notifications">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-gray-600" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-xs font-semibold">
                {initials}
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                  role="menu"
                >
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.fullName || 'Business Owner'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                  </div>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <Link
                    href="/dashboard/store"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    <Store className="h-4 w-4" /> Business Profile
                  </Link>
                  <Link
                    href="/dashboard/subscription"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    <CreditCard className="h-4 w-4" /> Subscription
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <div className="my-1 border-t border-gray-100 dark:border-gray-700" />
                  <button
                    onClick={() => logout()}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    role="menuitem"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}