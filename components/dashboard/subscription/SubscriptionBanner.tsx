'use client';

import { AlertTriangle, Crown, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { useSubscription } from '@/features/dashboard/hooks/useSubscription';
import { SubscriptionStatus } from '@/features/dashboard/types/subscription.types';

export function SubscriptionBanner() {
  const { storeId } = useCurrentStoreId();
  const { data: subscription } = useSubscription(storeId ?? '');

  if (!subscription) return null;

  const { status, currentPeriodEnd } = subscription;

  if (status === SubscriptionStatus.EXPIRED) {
    return (
      <div className="bg-orange-50 border-b border-orange-200 dark:bg-orange-950/40 dark:border-orange-900/50">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-orange-800 dark:text-orange-300">
              <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>
                Your subscription has expired. Your store is now in read-only mode.{' '}
                <span className="font-medium">Upgrade your plan</span> to continue selling and
                managing products.
              </span>
            </div>
            <Link
              href="/dashboard/subscription"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
            >
              <Crown className="h-4 w-4" aria-hidden="true" />
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === SubscriptionStatus.READ_ONLY) {
    return (
      <div className="bg-orange-50 border-b border-orange-200 dark:bg-orange-950/40 dark:border-orange-900/50">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-orange-800 dark:text-orange-300">
              <RefreshCw className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>
                Your store is in read-only mode. You can view data and export, but cannot create
                products, receive orders, or process payments.{' '}
                <span className="font-medium">Upgrade to restore full access.</span>
              </span>
            </div>
            <Link
              href="/dashboard/subscription"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
            >
              <Crown className="h-4 w-4" aria-hidden="true" />
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (
    status === SubscriptionStatus.ACTIVE &&
    currentPeriodEnd &&
    subscription.plan === 'FREE_TRIAL'
  ) {
    const daysLeft = Math.ceil(
      (new Date(currentPeriodEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft <= 7 && daysLeft > 0) {
      return (
        <div className="bg-blue-50 border-b border-blue-200 dark:bg-blue-950/40 dark:border-blue-900/50">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-blue-800 dark:text-blue-300">
                <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>
                  Your free trial ends in <span className="font-semibold">{daysLeft} days</span>.
                  Upgrade to keep your store active.
                </span>
              </div>
              <Link
                href="/dashboard/subscription"
                className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <Crown className="h-4 w-4" aria-hidden="true" />
                Upgrade
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  return null;
}
