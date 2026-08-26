'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { axiosInstance } from '@/lib/axios';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import type { PaymentDto } from '@/features/dashboard/types/payments.types';
import { PaymentStatus } from '@/features/dashboard/types/payments.types';
import { Button } from '@/components/ui/button';

function formatCurrency(amount: number, currency = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-NG', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { storeId } = useCurrentStoreId();
  const invoiceId = params?.id as string;
  const [payment, setPayment] = useState<PaymentDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!invoiceId || !storeId) return;
    let cancelled = false;
    axiosInstance
      .get(`/api/v1/payments/${invoiceId}`)
      .then((res) => {
        if (cancelled) return;
        const data = res.data?.data ?? res.data;
        setPayment(data);
      })
      .catch(() => {
        if (cancelled) return;
        setError('Failed to load invoice');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [invoiceId, storeId]);

  if (loading) return <LoadingState message="Loading invoice..." />;
  if (error) return <ErrorState title="Invoice Error" description={error} onRetry={() => router.refresh()} />;
  if (!payment) return null;

  const invoiceNumber = `INV-${(payment.transactionId ?? payment.reference ?? payment.id).slice(0, 10).toUpperCase()}`;
  const isRefunded = payment.status === PaymentStatus.REFUNDED;

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .invoice-print, .invoice-print * { visibility: visible; }
          .invoice-print { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto space-y-6 no-print">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/invoices"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to invoices
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="no-print"
          >
            <Printer className="h-4 w-4 mr-1.5" />
            Print
          </Button>
        </div>

        <div className="invoice-print rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Carticom</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Commerce OS for Africa</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">INVOICE</h2>
              <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mt-1">{invoiceNumber}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(payment.createdAt)}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isRefunded
                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              }`}
            >
              {isRefunded ? 'REFUNDED' : 'PAID'}
            </span>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Invoice To</p>
              <p className="font-medium text-gray-900 dark:text-white">Store Owner</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
              <p className="font-medium text-gray-900 dark:text-white capitalize">
                {payment.paymentMethod ?? payment.method ?? 'Card'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Provider</p>
              <p className="font-medium text-gray-900 dark:text-white capitalize">
                {payment.paymentProvider ?? payment.provider ?? 'Paystack'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Reference</p>
              <p className="font-medium text-gray-900 dark:text-white font-mono text-xs break-all">
                {payment.transactionId ?? payment.reference ?? '—'}
              </p>
            </div>
          </div>

          {/* Amount */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900 dark:text-white">Total Paid</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(payment.amount, payment.currency)}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-xs text-gray-400 dark:text-gray-500">
            <p>Thank you for your payment. This invoice was generated automatically.</p>
            <p className="mt-1">Carticom — Commerce OS for Africa</p>
          </div>
        </div>
      </div>
    </>
  );
}
