'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { NotificationItem } from '@/types/dashboard';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Bell, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const TYPE_STYLES: Record<string, string> = {
  payment: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  order: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  escrow: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  subscription: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  system: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  alert: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

function formatTimeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function NotificationRow({ item }: { item: NotificationItem }) {
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
        {item.read && <Check className="h-4 w-4 text-green-500" />}
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
  const { data: notifications, isLoading, error, refetch } = useQuery<NotificationItem[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/notifications');
      return res.data.data ?? [];
    },
  });

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Stay updated with the latest activity</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        {!notifications || notifications.length === 0 ? (
          <EmptyState
            title="No notifications yet"
            description="We'll notify you when something important happens."
          />
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {notifications.map((item) => (
              <NotificationRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
