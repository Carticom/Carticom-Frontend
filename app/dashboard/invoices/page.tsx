'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { FileText, Printer, ArrowRight } from 'lucide-react';
import { usePayments } from '@/features/dashboard/hooks/usePayments';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { PaymentStatus } from '@/features/dashboard/types/payments.types';
import type { PaymentDto } from '@/features/dashboard/types/payments.types';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getInvoiceNumber(payment: PaymentDto): string {
  return `INV-${(payment.transactionId ?? payment.reference ?? payment.id).slice(0, 10).toUpperCase()}`;
}

export default function InvoicesPage() {
  const { storeId } = useCurrentStoreId();
  const { data: payments, isLoading, error, refetch } = usePayments(storeId ?? '');

  const invoices = useMemo(() => {
    if (!payments) return [];
    return payments.filter(
      (p) =>
        p.status === PaymentStatus.COMPLETED ||
        p.status === PaymentStatus.SUCCESSFUL ||
        p.status === PaymentStatus.REFUNDED
    );
  }, [payments]);

  if (isLoading || !storeId) return <LoadingState message="Loading invoices..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invoices</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View and print invoices for completed payments.
        </p>
      </div>

      {invoices.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No invoices yet"
          description="Invoices are generated for completed payments."
        />
      ) : (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 font-medium">Invoice</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {getInvoiceNumber(payment)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        {payment.id.slice(0, 8)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.status === PaymentStatus.REFUNDED
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        }`}
                      >
                        {payment.status === PaymentStatus.REFUNDED ? 'Refunded' : 'Paid'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/invoices/${payment.id}`}
                          className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-500"
                        >
                          View
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
