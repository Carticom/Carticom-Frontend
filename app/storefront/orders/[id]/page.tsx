'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Package, LogIn, MapPin, Mail, Phone, CreditCard, RefreshCw } from 'lucide-react';
import { checkoutApi } from '@/features/onboarding/services/onboarding.service';
import type { OrderDto } from '@/features/onboarding/types';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { getCustomerToken } from '@/features/storefront/services/customer-auth.service';
import { Button } from '@/components/ui/button';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { showToast } from '@/lib/notifications/toast';
import { extractErrorMessage } from '@/lib/axios';
import { cn } from '@/lib/utils';

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

function formatPrice(order: OrderDto, value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: order.currency || 'NGN',
    minimumFractionDigits: 2,
  }).format(value || 0);
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const authLoading = useAuthStore((s) => s.isLoading);
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [refundSubmitting, setRefundSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !orderId) return;
    let cancelled = false;
    checkoutApi.getOrderById(orderId)
      .then((res) => {
        if (cancelled) return;
        if (res.data.data) setOrder(res.data.data);
        else setError('Order not found');
      })
      .catch((err) => {
        if (cancelled) return;
        const msg = extractErrorMessage(err);
        setError(msg || 'Failed to load order details. Please try again.');
      });
    return () => { cancelled = true; };
  }, [isAuthenticated, orderId]);

  const handleCancel = async () => {
    if (!order) return;
    setCancelling(true);
    try {
      const res = await checkoutApi.cancelOrder(order.id);
      if (res.data.data) setOrder(res.data.data);
      showToast('success', 'Order cancelled.');
    } catch (err) {
      showToast('error', extractErrorMessage(err) || 'Failed to cancel order. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  const handleRefundRequest = async () => {
    if (!order || !refundReason.trim()) return;
    const token = getCustomerToken();
    if (!token) { showToast('error', 'Please sign in to request a refund.'); return; }
    setRefundSubmitting(true);
    try {
      const res = await fetch('/api/v1/support/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: `Refund request — Order ${order.orderNumber}`,
          message: `Order ID: ${order.id}\nOrder Number: ${order.orderNumber}\nReason: ${refundReason.trim()}\nAmount: ${order.total} ${order.currency}`,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit refund request');
      showToast('success', 'Refund request submitted. Our team will review it shortly.');
      setRefundOpen(false);
      setRefundReason('');
    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Failed to submit refund request.');
    } finally {
      setRefundSubmitting(false);
    }
  };

  if (authLoading) return <LoadingState message="Checking your account..." />;
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to view the full details of this order.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link href={`/login?redirect=/storefront/orders/${orderId}`}>
              <LogIn className="h-5 w-5 mr-2" />
              Sign in
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <ErrorState
        title="Error loading order"
        description={error}
        onRetry={() => window.location.reload()}
      />
    );
  }
  if (!order) return <LoadingState message="Loading order details..." />;

  const cancellable = ['PENDING', 'PROCESSING'].includes(order.status);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/storefront/orders"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to orders
      </Link>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Order Number</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{order.orderNumber}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', ORDER_STATUS_STYLES[order.status] ?? '')}>
                {order.status}
              </span>
              <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', PAYMENT_STATUS_STYLES[order.paymentStatus] ?? '')}>
                {order.paymentStatus}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
            <span className="inline-flex items-center gap-1.5">
              <CreditCard className="h-4 w-4" />
              Placed {new Date(order.createdAt).toLocaleString('en-NG')}
            </span>
            {order.customerEmail && (
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                {order.customerEmail}
              </span>
            )}
            {order.customerPhoneNumber && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                {order.customerPhoneNumber}
              </span>
            )}
          </div>
        </div>
      </div>

      {order.items && order.items.length > 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-semibold text-gray-900 dark:text-white">Items</h2>
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 px-5 py-4">
                {item.productImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="h-14 w-14 rounded-lg object-cover border border-gray-100 dark:border-gray-800"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.productName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.quantity} x {formatPrice(order, item.unitPrice)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatPrice(order, item.lineTotal)}
                </p>
              </li>
            ))}
          </ul>

          <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900 dark:text-white">{formatPrice(order, order.subtotal)}</span>
            </div>
            {order.shipping > 0 && (
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Shipping</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatPrice(order, order.shipping)}</span>
              </div>
            )}
            {order.tax > 0 && (
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Tax</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatPrice(order, order.tax)}</span>
              </div>
            )}
            {order.discount > 0 && (
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Discount</span>
                <span className="font-medium text-green-600 dark:text-green-400">-{formatPrice(order, order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-2">
              <span className="font-semibold text-gray-900 dark:text-white">Total</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatPrice(order, order.total)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <EmptyState
            title="No items to display"
            description="This order does not have any line items available."
          />
        </div>
      )}

      {(order.deliveryAddress || order.notes) && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <h2 className="font-semibold text-gray-900 dark:text-white">Delivery</h2>
          {order.deliveryAddress && (
            <p className="text-sm text-gray-600 dark:text-gray-300 inline-flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
              {order.deliveryAddress}
            </p>
          )}
          {order.notes && (
            <p className="text-sm text-gray-500 dark:text-gray-400">Note: {order.notes}</p>
          )}
        </div>
      )}

      {cancellable && (
        <div className="flex justify-end">
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={cancelling}
          >
            {cancelling ? 'Cancelling...' : 'Cancel Order'}
          </Button>
        </div>
      )}

      {order.status === 'DELIVERED' && order.paymentStatus === 'COMPLETED' && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          {refundOpen ? (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Request a refund</h3>
              <textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                rows={3}
                placeholder="Tell us why you'd like a refund…"
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setRefundOpen(false); setRefundReason(''); }} disabled={refundSubmitting}>Cancel</Button>
                <Button size="sm" onClick={handleRefundRequest} disabled={refundSubmitting || !refundReason.trim()}>
                  {refundSubmitting ? 'Submitting…' : 'Submit refund request'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Need a refund?</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">If something wasn't right with your order, we can help.</p>
              </div>
              {getCustomerToken() ? (
                <Button variant="outline" size="sm" onClick={() => setRefundOpen(true)}>
                  <RefreshCw className="h-4 w-4 mr-1.5" />
                  Request refund
                </Button>
              ) : (
                <p className="text-xs text-gray-400">Sign in to request a refund.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}