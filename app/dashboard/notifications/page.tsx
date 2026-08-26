'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { notificationsRepository } from '@/features/dashboard/repositories/notifications.repository';
import type { NotificationItem } from '@/types/dashboard';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const TYPE_STYLES: Record<string, string> = {
  payment: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  order: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  subscription: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  system: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  alert: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'};

function formatTimeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function NotificationRow({ item, onMarkRead }: { item: NotificationItem; onMarkRead: () => void }) {
  const style = TYPE_STYLES[item.type] || TYPE_STYLES.system;

  return (
    <div className={cn(
      'flex items-start gap-4 p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors',
      !item.read && 'bg-blue-50/50 dark:bg-blue-900/10'
    )}>
      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', style)}>
        <Bell className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
          {!item.read && <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.message}</p>
        <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(item.timestamp)}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={cn(
          'px-2 py-0.5 rounded text-xs font-medium capitalize',
          style
        )}>
          {item.type}
        </span>
        {item.read ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <button
            type="button"
            onClick={onMarkRead}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Mark read
          </button>
        )}
        {item.actionUrl && (
          <a href={item.actionUrl} className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
            View
          </a>
        )}
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const queryClient = useQueryClient();
  const [markingAll, setMarkingAll] = useState(false);

  const { data: notifications, isLoading, error, refetch } = useQuery<NotificationItem[]>({
    queryKey: ['notifications'],
    queryFn: () => notificationsRepository.getNotifications()});

  const hasUnread = !!notifications?.some((n) => !n.read);

  const markAsRead = async (id: string) => {
    await notificationsRepository.markAsRead(id);
    queryClient.setQueryData<NotificationItem[]>(['notifications'], (prev) =>
      prev?.map((n) => (n.id === id ? { ...n, read: true } : n)) ?? []);
  };

  const markAllAsRead = async () => {
    if (!hasUnread) return;
    setMarkingAll(true);
    try {
      await notificationsRepository.markAllAsRead();
      queryClient.setQueryData<NotificationItem[]>(['notifications'], (prev) =>
        prev?.map((n) => ({ ...n, read: true })) ?? []);
    } finally {
      setMarkingAll(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Stay updated with the latest activity</p>
        </div>
        <LoadingState message="Loading notifications..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Stay updated with the latest activity</p>
        </div>
        <ErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        {hasUnread && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={markingAll}
          >
            {markingAll ? (
              <span className="animate-pulse">Marking...</span>
            ) : (
              <>
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark all as read
              </>
            )}
          </Button>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-2">Stay updated with the latest activity</p>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        {!notifications || notifications.length === 0 ? (
          <EmptyState
            title="No notifications yet"
            description="We'll notify you when something important happens."
          />
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {notifications.map((item) => (
              <NotificationRow
                key={item.id}
                item={item}
                onMarkRead={() => markAsRead(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
