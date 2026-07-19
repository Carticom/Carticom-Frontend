'use client';

import { useMemo } from 'react';
import { usePayments } from '@/features/dashboard/hooks/usePayments';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';
import type { PaymentDto } from '@/features/dashboard/types/payments.types';
import { PaymentStatus } from '@/features/dashboard/types/payments.types';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const STATUS_STYLES: Record<string, string> = {
  [PaymentStatus.SUCCESSFUL]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  [PaymentStatus.FAILED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  [PaymentStatus.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  [PaymentStatus.PROCESSING]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  [PaymentStatus.REFUNDED]: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  [PaymentStatus.PARTIALLY_REFUNDED]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-800'}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

function sumByStatus(payments: PaymentDto[], ...statuses: PaymentStatus[]): number {
  return payments
    .filter((p) => statuses.includes(p.status))
    .reduce((sum, p) => sum + p.amount, 0);
}

export default function PaymentsPage() {
  const { storeId } = useCurrentStoreId();
  const { data: payments, isLoading, error, refetch } = usePayments(storeId ?? '');

  const stats = useMemo(() => {
    if (!payments) return { successful: 0, failed: 0, pending: 0, refunded: 0 };
    return {
      successful: sumByStatus(payments, PaymentStatus.SUCCESSFUL),
      failed: sumByStatus(payments, PaymentStatus.FAILED),
      pending: sumByStatus(payments, PaymentStatus.PENDING, PaymentStatus.PROCESSING),
      refunded: sumByStatus(payments, PaymentStatus.REFUNDED, PaymentStatus.PARTIALLY_REFUNDED),
    };
  }, [payments]);

  if (isLoading || !storeId) {
    return <LoadingState message="Loading payments..." />;
  }

  if (error) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage payment methods, transactions, and settlements
        </p>
      </div>

      {/* Payment Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Successful" value={formatCurrency(stats.successful)} color="text-green-600" />
        <StatCard label="Failed" value={formatCurrency(stats.failed)} color="text-red-600" />
        <StatCard label="Pending" value={formatCurrency(stats.pending)} color="text-yellow-600" />
        <StatCard label="Refunded" value={formatCurrency(stats.refunded)} color="text-gray-600" />
      </div>

      {/* Payment Methods */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Methods</h2>
        <div className="space-y-3">
          {['Paystack', 'Flutterwave'].map((method) => (
            <div key={method} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{method}</span>
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Not Connected</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>
        {!payments || payments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No transactions yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium">Reference</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Method</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 text-gray-900 dark:text-white font-mono text-xs">
                      {payment.reference}
                    </td>
                    <td className="py-3 text-gray-900 dark:text-white font-medium">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400 capitalize">
                      {payment.method.replace(/_/g, ' ')}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={payment.status} />
                    </td>
                    <td className="py-3 text-gray-500">
                      <div>{formatDate(payment.createdAt)}</div>
                      <div className="text-xs">{formatTime(payment.createdAt)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}
