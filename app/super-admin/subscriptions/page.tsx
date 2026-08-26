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

interface PageData {
  content: Subscription[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
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
    TRIAL: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  };
  return map[status] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
}

const PAGE_SIZE = 20;

export default function SuperAdminSubscriptionsPage() {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [page, setPage] = useState(0);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'subscriptions', page],
    queryFn: () => superAdminRepository.getSubscriptions<Subscription>(page, PAGE_SIZE),
  });

  const subscriptions = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;

  if (isLoading) return <LoadingState message="Loading subscriptions..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

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
        {subscriptions.length === 0 ? (
          <EmptyState title="No subscriptions found" description="No subscriptions have been created yet." />
        ) : (
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
        )}

        {totalElements > 0 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {totalElements} total subscription{totalElements !== 1 ? 's' : ''} &middot; Page {page + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Previous</Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const start = Math.max(0, Math.min(page - 2, totalPages - 5));
                const pageNum = start + i;
                if (pageNum >= totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      pageNum === page
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
              <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>Next</Button>
            </div>
          </div>
        )}
      </div>

      <GiftSubscriptionModal open={showGiftModal} onOpenChange={setShowGiftModal} />
    </div>
  );
}
