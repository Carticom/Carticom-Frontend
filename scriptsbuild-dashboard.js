const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Dashboard Foundation Build...\n');

const baseDir = path.resolve('.\');

function writeFile(relativePath, content) {
  const fullPath = path.join(baseDir, relativePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('✓ Created:', relativePath);
}

// ============================
// SIDEBAR COMPONENT
// ============================

const sidebarCode = `'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Store, Package, ShoppingCart, Users, Shield,
  Wallet, Brain, BarChart3, Crown, Bell, HeadphonesIcon, Settings,
  LogOut, ChevronLeft, ChevronRight, ChevronDown, Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/hooks/useAuth';

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  {
    id: 'store', label: 'Store', icon: Store,
    children: [
      { id: 'overview', label: 'Overview', href: '/dashboard/store' },
      { id: 'settings', label: 'Settings', href: '/dashboard/settings' },
    ],
  },
  {
    id: 'products', label: 'Products', icon: Package,
    children: [
      { id: 'all', label: 'All Products', href: '/dashboard/products' },
      { id: 'categories', label: 'Categories', href: '/dashboard/products/categories' },
    ],
  },
  {
    id: 'orders', label: 'Orders', icon: ShoppingCart,
    children: [
      { id: 'pending', label: 'Pending', href: '/dashboard/orders/pending' },
      { id: 'processing', label: 'Processing', href: '/dashboard/orders/processing' },
      { id: 'completed', label: 'Completed', href: '/dashboard/orders/completed' },
      { id: 'cancelled', label: 'Cancelled', href: '/dashboard/orders/cancelled' },
    ],
  },
  { id: 'customers', label: 'Customers', icon: Users, href: '/dashboard/customers' },
  { id: 'escrow', label: 'Escrow', icon: Shield, href: '/dashboard/escrow' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, href: '/dashboard/wallet' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { id: 'subscription', label: 'Subscription', icon: Crown, href: '/dashboard/subscription' },
  { id: 'notifications', label: 'Notifications', icon: Bell, href: '/dashboard/notifications' },
  { id: 'support', label: 'Support', icon: HeadphonesIcon, href: '/dashboard/support' },
  { id: 'settings-link', label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function Sidebar({ isCollapsed, onToggleCollapse, isMobileOpen, onMobileClose }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [expanded, setExpanded] = useState(new Set());

  useEffect(() => {
    const parent = SIDEBAR_ITEMS.find(item =>
      item.children?.some(c => pathname.startsWith(c.href))
    );
    if (parent) setExpanded(prev => new Set(prev).add(parent.id));
  }, [pathname]);

  const toggle = (id) => setExpanded(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const isActive = (href) => {
    if (!href) return false;
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const content = (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/dashboard" className="flex items-center gap-3" aria-label="Dashboard">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shrink-0">
            <Store className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && <span className="font-bold text-gray-900 dark:text-white">Carticom</span>}
        </Link>
        <button onClick={onToggleCollapse} className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Toggle sidebar">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {SIDEBAR_ITEMS.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const hasKids = !!item.children?.length;
          const isExp = expanded.has(item.id);

          if (hasKids) {
            return (
              <div key={item.id}>
                <button onClick={() => { if (isCollapsed) onToggleCollapse(); else toggle(item.id); }} className={cn('flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', item.children.some(c => pathname.startsWith(c.href)) ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800')}>
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <><span className="flex-1 text-left">{item.label}</span><motion.div animate={{ rotate: isExp ? 180 : 0 }}><ChevronDown className="h-4 w-4" /></motion.div></>}
                </button>
                <AnimatePresence>
                  {!isCollapsed && isExp && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children.map(child => {
                          const childActive = pathname.startsWith(child.href);
                          return (
                            <Link key={child.id} href={child.href} onClick={onMobileClose} className={cn('flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors', childActive ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800')}>
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <Link key={item.id} href={item.href || '#'} onClick={onMobileClose} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', active ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800')}>
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800">
        <button onClick={logout} className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors">
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className={cn('hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:flex-col transition-all duration-300', isCollapsed ? 'lg:w-20' : 'lg:w-64')} aria-label="Sidebar">
        {content}
      </aside>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={onMobileClose} />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring' }} className="absolute left-0 top-0 bot
