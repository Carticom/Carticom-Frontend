const fs = require("fs");
const p = require("path");
const base = p.join("c:\Users\User\Desktop\Technology Development\CartiCom Start Up Development\carticom-frontend");
const target = p.join(base, "components", "dashboard", "layout", "Sidebar.tsx");
const h = [];
h.push("// ============================================================");
h.push("// CARTICOM - Dashboard Sidebar Component");
h.push("// ============================================================");
h.push("");
h.push("'use client';");
h.push("");
h.push("import React, { useState, useEffect } from 'react';",);
h.push("import Link from 'next/link';",);
h.push("import { usePathname } from 'next/navigation';",);
h.push("import { motion, AnimatePresence } from 'framer-motion';",);
h.push("import {",);
h.push("  LayoutDashboard, Store, Package, ShoppingCart, Users,",);
h.push("  Shield, Wallet, Brain, BarChart3, Crown, Bell,",);
h.push("  HeadphonesIcon, Settings, LogOut,",);
h.push("  ChevronLeft, ChevronRight, ChevronDown, Menu, X",);
h.push("} from 'lucide-react';",);
h.push("import { cn } from '@/lib/utils';",);
h.push("import { useAuth } from '@/features/auth/hooks/useAuth';",);
h.push("");
h.push("const SIDEBAR_ITEMS = [");
h.push("  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },",);
h.push("  { id: 'store', label: 'Store', icon: 'Store',");
h.push("    children: [{ id: 'overview', label: 'Overview', href: '/dashboard/store' },",);
h.push("               { id: 'store-settings', label: 'Settings', href: '/dashboard/settings' }] },",);
h.push("  { id: 'products', label: 'Products', icon: 'Package',");
h.push("    children: [{ id: 'all', label: 'All Products', href: '/dashboard/products' },",);
h.push("               { id: 'categories', label: 'Categories', href: '/dashboard/products/categories' }] },",);
h.push("  { id: 'orders', label: 'Orders', icon: 'ShoppingCart',");
h.push("    children: [{ id: 'pending', label: 'Pending', href: '/dashboard/orders/pending' },",);
h.push("               { id: 'processing', label: 'Processing', href: '/dashboard/orders/processing' },",);
h.push("               { id: 'completed', label: 'Completed', href: '/dashboard/orders/completed' },",);
h.push("               { id: 'cancelled', label: 'Cancelled', href: '/dashboard/orders/cancelled' }] },",);
h.push("  { id: 'customers', label: 'Customers', icon: 'Users', href: '/dashboard/customers' },",);
h.push("  { id: 'escrow', label: 'Escrow', icon: 'Shield', href: '/dashboard/escrow' },",);
h.push("  { id: 'wallet', label: 'Wallet', icon: 'Wallet', href: '/dashboard/wallet' },",);
h.push("  { id: 'ai', label: 'Carticom AI', icon: 'Brain', href: '/dashboard/analytics' },",);
h.push("  { id: 'analytics', label: 'Analytics', icon: 'BarChart3', href: '/dashboard/analytics' },",);
h.push("  { id: 'subscription', label: 'Subscription', icon: 'Crown', href: '/dashboard/subscription' },",);
h.push("  { id: 'notifications', label: 'Notifications', icon: 'Bell', href: '/dashboard/notifications' },",);
h.push("  { id: 'support', label: 'Support', icon: 'HeadphonesIcon', href: '/dashboard/support' },",);
h.push("  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/dashboard/settings' }",);
h.push("];");
h.push("");
h.push("function isActive(href, pathname) {");
h.push("  if (!href) return false;");
h.push("  if (href === '/dashboard') return pathname === '/dashboard';",);
h.push("  return pathname.startsWith(href);");
h.push("}");
h.push("function childActive(children, pathname) {",);
h.push("  return children.some((c) => pathname.startsWith(c.href));");
h.push("}",);
h.push("");
const ITEM_CLASS = "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors";
const LINK_CLASS = (active) => cn(
  ITEM_CLASS,
  active ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
);

export function Sidebar({ isCollapsed, onToggleCollapse, isMobileOpen, onMobileClose }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [expanded, setExpanded] = useState(() => new Set());

  useEffect(() => {
    const parent = SIDEBAR_ITEMS.find((item) => item.children && childActive(item.children, pathname));
    if (parent) setExpanded((prev) => new Set(prev).add(parent.id));
  }, [pathname]);

  const toggle = (id) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const nav = SIDEBAR_ITEMS.map((item) => {
    const Icon = item.icon;
    const active = isActive(item.href, pathname);
    const cActive = item.children ? childActive(item.children, pathname) : false;

    if (item.children && item.children.length) {
      return (
        <div key={item.id}>
          <button
            onClick={() => {
              if (isCollapsed) onToggleCollapse();
              else toggle(item.id);
            }}
            className={cn(ITEM_CLASS, cActive ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800")}
            aria-expanded={expanded.has(item.id)}
          >
            <Icon className="h-5 w-5" />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                <motion.div animate={{ rotate: expanded.has(item.id) ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </>
            )}
          </button>
          <AnimatePresence>
            {!isCollapsed && expanded.has(item.id) && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="ml-8 space-y-1 py-1">
                  {item.children.map((child) => {
                    const active = pathname.startsWith(child.href);
                    return (
                      <Link key={child.id} href={child.href} onClick={onMobileClose} className={cn("flex items-center gap-2 px-2 py-1.5 rounded-md text-sm", active ? "text-blue-700 dark:text-blue-400" : "text-gray-500 dark:text-gray-400")}>
                        <span className="h-1 w-1 rounded-full bg-current" />
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
      <Link key={item.id} href={item.href || "#"} onClick={onMobileClose} className={LINK_CLASS(active)}>
        <Icon className="h-5 w-5" />
        {!isCollapsed && <span>{item.label}</span>}
      </Link>
    );
  });

  return (
    <>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex transition-all duration-300" aria-label="Sidebar">
        <div className="flex h-full flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
            <Link href="/dashboard" className="flex items-center gap-3" aria-label="Home">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
                <Store className="h-5 w-5 text-white" />
              </div>
              {isCollapsed ? (
                <span className="sr-only">Carticom</span>
              ) : (
                <span className="font-semibold text-gray-900 dark:text-white">Carticom</span>
              )}
            </Link>
            {!isCollapsed && (
              <button onClick={onToggleCollapse} className="hidden lg:flex p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Collapse">
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">{nav}</nav>
          <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800">
            <button onClick={logout} className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20" aria-label="Logout">
              <LogOut className="h-5 w-5" />
              {isCollapsed ? null : <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={onMobileClose} />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 24, stiffness: 260 }} className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl">
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
                  <span className="font-semibold text-gray-900 dark:text-white">Menu</span>
                  <button onClick={onMobileClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">{nav}</nav>
                <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800">
                  <button onClick={() => { logout(); onMobileClose(); }} className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20">
                    <LogOut className="h-5 w-5" /> Logout
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

export function MobileToggle({ onClick }) {
  return (
    <button onClick={onClick} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Open menu">
      <Menu className="h-5 w-5" />
    </button>
  );
}
