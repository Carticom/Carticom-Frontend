'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, PackageOpen, LogIn, Search } from 'lucide-react';
import { checkoutApi } from '@/features/onboarding/services/onboarding.service';
import type { OrderDto } from '@/features/onboarding/types';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { Button } from '@/components/ui/button';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';

const ORDER_STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
  PROCESSING: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
  SHIPPED: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800',
  DELIVERED: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
  CANCELLED: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'};

const PAYMENT_STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
  PROCESSING: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
  COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
  FAILED: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
  REFUNDED: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'};

function SignedOutPanel() {
  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Orders</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sign in to view your order history. Placed an order as a guest? Use the
          reference from your confirmation email to track it.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/login?redirect=/storefront/orders">
              <LogIn className="h-5 w-5 mr-2" />
              Sign in
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/guest-checkout/track">
              <Search className="h-5 w-5 mr-2" />
              Track a guest order
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const authLoading = useAuthStore((s) => s.isLoading);
  const [orders, setOrders] = useState<OrderDto[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    const load = async () => {
      try {
        const res = await checkoutApi.getMyOrders();
        if (cancelled) return;
        setOrders(res.data.data ?? []);
        setError(null);
      } catch {
        if (cancelled) return;
        setError('Failed to load your orders. Please try again.');
      }
    };
    load();
    return () => { cancelled = true; };
  }, [isAuthenticated, retryKey]);

  if (authLoading) return <LoadingState message="Checking your account..." />;
  if (!isAuthenticated) return <SignedOutPanel />;
  if (error) return <ErrorState title="Error loading orders" description={error} onRetry={() => setRetryKey((k) => k + 1)} />;
  if (!orders) return <LoadingState message="Loading your orders..." />;
  if (orders.length === 0) {
    return (
      <div className="max-w-md mx-auto">
        <EmptyState
          title="No orders yet"
          description="When you place an order, it will appear here so you can track its status."
          icon={PackageOpen}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Orders</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track the status of the orders you&apos;ve placed across stores.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/storefront/orders/${order.id}`}
            className="block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-sm transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {order.orderNumber}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString('en-NG', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${ORDER_STATUS_STYLES[order.status] ?? ''}`}>
                  {order.status}
                </span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${PAYMENT_STATUS_STYLES[order.paymentStatus] ?? ''}`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {order.deliveryAddress || order.customerEmail || 'Delivery details pending'}
              </p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {new Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: order.currency || 'NGN',
                  minimumFractionDigits: 2,
                }).format(order.total)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
