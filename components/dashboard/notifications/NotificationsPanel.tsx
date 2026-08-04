'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, BellRing } from 'lucide-react';
import type { NotificationItem } from '@/types/dashboard';


interface NotificationsPanelProps {
  notifications: NotificationItem[];
  isLoading?: boolean;
}

const TYPE_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  payment: { icon: () => null, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  order: { icon: () => null, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  escrow: { icon: () => null, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  subscription: { icon: () => null, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  system: { icon: () => null, color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
  alert: { icon: () => null, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }};

function formatTimeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins + 'm ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + 'h ago';
  return Math.floor(hrs / 24) + 'd ago';
}

function NotificationItem({ data }: { data: NotificationItem }) {
  const [dismissed, setDismissed] = useState(false);
  const typeConfig = TYPE_ICONS[data.type] || TYPE_ICONS.system;

  if (dismissed) return null;

  return (
    <motion.div layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={"flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors " + (!data.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : '')}>
      <div className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-full " + typeConfig.color}>
        <Bell className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 dark:text-white"><span className="font-medium">{data.title}</span></p>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{data.message}</p>
        <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(data.timestamp)}</p>
      </div>
      {data.actionUrl ? (
        <Link href={data.actionUrl} className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">View</Link>
      ) : (
        <button onClick={() => setDismissed(true)} className="shrink-0 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Dismiss"><X className="h-3.5 w-3.5 text-gray-400" /></button>
      )}
    </motion.div>
  );
}

export function NotificationsPanel({ notifications, isLoading }: NotificationsPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="h-5 w-32 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-4" />
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />)}</div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Notifications</h2>
          {unreadCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
              <BellRing className="h-3 w-3" /> {unreadCount}
            </span>
          )}
        </div>
        <Link href="/dashboard/notifications" className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">View all</Link>
      </div>
      <div className="p-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">No notifications yet</p>
          ) : (
            notifications.map((n) => <NotificationItem key={n.id} data={n} />)
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
