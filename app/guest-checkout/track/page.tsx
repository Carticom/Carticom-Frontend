'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { Package, Loader2, Home, Search, Check, Circle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  status: string;
  label?: string;
  description?: string;
  timestamp?: number | null;
  completed?: boolean;
}

interface TrackingData {
  orderNumber?: string;
  referenceCode?: string;
  status?: string;
  paymentStatus?: string;
  totalAmount?: number;
  total?: number;
  currency?: string;
  guestEmail?: string;
  customerName?: string;
  createdAt?: string;
  timeline?: TimelineEvent[];
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  PROCESSING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  COMPLETED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  CONFIRMED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  SHIPPED: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  DELIVERED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

function formatTimestamp(timestamp: number) {
  return new Date(timestamp).toLocaleString();
}

function TrackOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialReference = searchParams.get('reference') || '';
  const [search, setSearch] = useState(initialReference);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<TrackingData | null>(null);

  const handleTrack = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const value = search.trim();
    if (!value) {
      setError('Please enter your order number or reference code.');
      return;
    }
    setLoading(true);
    setError('');
    setData(null);

    const candidates = value.toUpperCase().startsWith('GUEST-')
      ? [`/api/v1/guest-checkout/track/${encodeURIComponent(value)}`]
      : [
          `/api/v1/guest-checkout/track/${encodeURIComponent(value)}`,
          `/api/v1/orders/track/${encodeURIComponent(value)}`,
        ];

    let lastError = '';
    for (const endpoint of candidates) {
      try {
        const res = await axiosInstance.get(endpoint);
        setData(res.data?.data as TrackingData);
        setLoading(false);
        return;
      } catch (err: unknown) {
        const status = (err as { response?: { status?: number } })?.response?.status;
        if (status === 404) {
          lastError = `No order found for "${value}". Please check the order number or reference from your confirmation email.`;
          continue;
        }
        lastError = `We couldn't look that up right now. Please try again.`;
        break;
      }
    }
    setError(lastError);
    setLoading(false);
  };

  const timeline = data?.timeline ?? [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Track Your Order
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Enter your order number (e.g. ORD-2024-001234) or guest reference
              (e.g. GUEST-ABC123) from your confirmation email or receipt.
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Order number or reference code"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto rounded-lg">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Track'}
            </Button>
          </form>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-sm text-red-600 dark:text-red-400 text-left">
              {error}
            </div>
          )}

          {data && (
            <div className="text-left space-y-4">
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {data.orderNumber || data.referenceCode || 'Order'}
                    </p>
                    {data.customerName && (
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{data.customerName}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {data.status && (
                      <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', STATUS_STYLES[data.status] ?? 'bg-gray-100 text-gray-700')}>
                        {data.status}
                      </span>
                    )}
                    {data.paymentStatus && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        {data.paymentStatus}
                      </span>
                    )}
                  </div>
                </div>
                {data.totalAmount !== undefined && (
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {data.currency ?? 'NGN'} {(Number(data.totalAmount) || 0).toLocaleString()}
                  </p>
                )}
                {data.createdAt && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Placed on {new Date(data.createdAt).toLocaleString()}
                  </p>
                )}
              </div>

              {timeline.length > 0 && (
                <ol className="space-y-4">
                  {timeline.map((event, index) => {
                    const isDone = event.completed ?? timeline.length - 1 === index;
                    return (
                      <li key={`${event.status}-${index}`} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          {isDone ? (
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                          )}
                          {index < timeline.length - 1 && (
                            <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700" />
                          )}
                        </div>
                        <div className="pb-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {event.label || event.status}
                          </p>
                          {event.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{event.description}</p>
                          )}
                          {event.timestamp ? (
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {formatTimestamp(event.timestamp)}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => router.push('/storefront')}
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}