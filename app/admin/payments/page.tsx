'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';

const statusStyles: Record<string, string> = {
  SUCCESSFUL: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  FAILED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  REFUNDED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
}

export default function AdminPaymentsPage() {
  const { data: payments, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'payments'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/admin/payments');
      return res.data.data ?? [];
    },
  });

  if (isLoading) return <LoadingState message="Loading payments..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  if (!payments?.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">View all platform payment transactions</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <EmptyState title="No payments found" description="Payment transactions will appear here." />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">View all platform payment transactions</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Reference</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment: { id: string; reference: string; customerName: string; amount: number; method: string; status: string; createdAt: string }) => (
                <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-mono text-xs text-gray-900 dark:text-white">{payment.reference}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{payment.customerName}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{formatCurrency(payment.amount)}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 capitalize">{payment.method.replace(/_/g, ' ')}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[payment.status] ?? 'bg-gray-100 text-gray-800'}`}>
                      {payment.status === 'SUCCESSFUL' ? 'Successful' : payment.status.charAt(0) + payment.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                    <div>{formatDate(payment.createdAt)}</div>
                    <div className="text-xs">{formatTime(payment.createdAt)}</div>
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
