'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { superAdminRepository } from '@/features/admin/repositories/admin.repository';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { GiftSubscriptionModal } from '@/components/dashboard/subscription/GiftSubscriptionModal';

interface Subscription {
  id: string;
  storeName: string;
  planName: string;
  status: string;
  startDate: string;
  endDate: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    EXPIRED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    CANCELLED: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
    PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    TRIAL: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'};
  return map[status] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
}

export default function SuperAdminSubscriptionsPage() {
  const [showGiftModal, setShowGiftModal] = useState(false);

  const { data: subscriptions, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'subscriptions'],
    queryFn: async () => {
      const page = await superAdminRepository.getSubscriptions<Subscription>();
      return page?.content ?? [];
    }});

  if (isLoading) return <LoadingState message="Loading subscriptions..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;
  if (!subscriptions?.length) return <EmptyState title="No subscriptions found" description="No subscriptions have been created yet." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscriptions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">View all platform subscriptions</p>
        </div>
        <Button onClick={() => setShowGiftModal(true)}>
          <Gift className="h-4 w-4 mr-1" />
          Gift Subscription
        </Button>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Store</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Start Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">End Date</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{sub.storeName}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{sub.planName}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(sub.status)}`}>{sub.status}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(sub.startDate)}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(sub.endDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <GiftSubscriptionModal open={showGiftModal} onOpenChange={setShowGiftModal} />
    </div>
  );
}
