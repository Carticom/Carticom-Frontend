'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';

const statusBadge: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  EXPIRED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  PAST_DUE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function AdminSubscriptionsPage() {
  const { data: subscriptions, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'subscriptions'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/admin/subscriptions');
      return res.data.data ?? [];
    },
  });

  if (isLoading) return <LoadingState message="Loading subscriptions..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  if (!subscriptions?.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscriptions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all platform subscriptions</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <EmptyState title="No subscriptions found" description="No stores have subscribed to any plan yet." />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscriptions</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all platform subscriptions</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Store</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Renewal Date</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub: { id: string; storeName: string; plan: string; status: string; renewalDate: string }) => (
                <tr key={sub.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{sub.storeName}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white capitalize">{sub.plan}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[sub.status] ?? 'bg-gray-100 text-gray-800'}`}>
                      {sub.status === 'PAST_DUE' ? 'Past Due' : sub.status.charAt(0) + sub.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(sub.renewalDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
