'use client';

import { useState } from 'react';
import { Sidebar, MobileToggle, SidebarCollapsedButton } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { DashboardFooter } from './DashboardFooter';
import { SubscriptionBanner } from '@/components/dashboard/subscription/SubscriptionBanner';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        isMobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}>
        <TopNavbar onToggleSidebar={() => setMobileOpen(true)} isSidebarCollapsed={sidebarCollapsed} />
        <SubscriptionBanner />
        <main className="p-6 md:p-8 lg:p-10">{children}</main>
        <DashboardFooter />
      </div>
      {sidebarCollapsed && (
        <div className="hidden lg:fixed left-[72px] top-1/2 -translate-y-1/2 z-40">
          <div
            onClick={() => setSidebarCollapsed(false)}
            className="flex items-center justify-center w-6 h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-r-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
          >
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
