'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Button } from '@/components/ui/button';

interface Payment {
  id: string;
  transactionId: string;
  storeName: string;
  amount: number;
  status: string;
  createdAt: string;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    SUCCESS: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    FAILED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    REFUNDED: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    CANCELLED: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
  };
  return map[status] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
}

export default function SuperAdminPaymentsPage() {
  const queryClient = useQueryClient();

  const { data: payments, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'payments'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/super-admin/payments');
      return (res.data.data ?? []) as Payment[];
    },
  });

  const refundMutation = useMutation({
    mutationFn: async (paymentId: string) => {
      await axiosInstance.post('/api/v1/super-admin/payments/refund', { paymentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['super-admin', 'payments'] });
    },
  });

  if (isLoading) return <LoadingState message="Loading payments..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;
  if (!payments?.length) return <EmptyState title="No payments found" description="No payments have been processed yet." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">View all platform payments and process refunds</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Transaction ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Store</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-mono text-xs text-gray-900 dark:text-white">#{payment.transactionId}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{payment.storeName}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{formatCurrency(payment.amount)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(payment.status)}`}>{payment.status}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(payment.createdAt)}</td>
                  <td className="py-3 px-4">
                    {payment.status === 'SUCCESS' && (
                      <Button size="xs" variant="outline" onClick={() => refundMutation.mutate(payment.id)} disabled={refundMutation.isPending}>
                        Force Refund
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
