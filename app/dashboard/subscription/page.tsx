'use client';

import { useState } from 'react';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { useSubscription } from '@/features/dashboard/hooks/useSubscription';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';
import { SubscriptionPlan, SubscriptionStatus } from '@/features/dashboard/types/subscription.types';

const planLabels: Record<SubscriptionPlan, string> = {
  [SubscriptionPlan.FREE_TRIAL]: 'Free Trial',
  [SubscriptionPlan.STARTER]: 'Starter',
  [SubscriptionPlan.GROWTH]: 'Growth',
  [SubscriptionPlan.BUSINESS]: 'Business',
  [SubscriptionPlan.ENTERPRISE]: 'Enterprise',
};

const planDescriptions: Record<SubscriptionPlan, string> = {
  [SubscriptionPlan.FREE_TRIAL]: '30-day free trial with basic features',
  [SubscriptionPlan.STARTER]: 'Basic features for small businesses',
  [SubscriptionPlan.GROWTH]: 'Advanced features for growing businesses',
  [SubscriptionPlan.BUSINESS]: 'Full features for established businesses',
  [SubscriptionPlan.ENTERPRISE]: 'Enterprise-grade solution with everything included',
};

const statusColors: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.ACTIVE]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  [SubscriptionStatus.CANCELLED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  [SubscriptionStatus.EXPIRED]: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  [SubscriptionStatus.PAST_DUE]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  [SubscriptionStatus.READ_ONLY]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
};

const planOrder = [SubscriptionPlan.FREE_TRIAL, SubscriptionPlan.STARTER, SubscriptionPlan.GROWTH, SubscriptionPlan.BUSINESS, SubscriptionPlan.ENTERPRISE];

function formatStorage(bytes: number): string {
  if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(1)}GB`;
  if (bytes >= 1048576) return `${Math.round(bytes / 1048576)}MB`;
  return `${bytes}B`;
}

export default function SubscriptionPage() {
  const { storeId } = useCurrentStoreId();
  const { data: subscription, isLoading, error, refetch } = useSubscription(storeId ?? '');
  const [showPlans, setShowPlans] = useState(false);

  if (isLoading) return <LoadingState message="Loading subscription..." />;
  if (error) return <ErrorState title="Failed to load subscription" onRetry={refetch} />;
  if (!subscription) return <EmptyState title="No subscription found" description="You don't have an active subscription plan." />;

  const { plan, status, usage } = subscription;
  const currentPlanIndex = planOrder.indexOf(plan);

  const usageItems = [
    { label: 'Storage', used: usage.storage, limit: usage.storageLimit, format: formatStorage },
    { label: 'Products', used: usage.products, limit: usage.productsLimit, format: (v: number) => String(v) },
    { label: 'Staff', used: usage.staff, limit: usage.staffLimit, format: (v: number) => String(v) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your plan, billing, and usage
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{planLabels[plan]} Plan</h2>
            <p className="text-sm text-gray-500">{planDescriptions[plan]}</p>
          </div>
          <span className={`px-3 py-1 text-sm rounded-full ${statusColors[status]}`}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </span>
        </div>

        {subscription.currentPeriodEnd && (
          <p className="text-xs text-gray-500 mb-4">
            Current period ends: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {usageItems.map((item) => {
            const pct = item.limit > 0 ? Math.min((item.used / item.limit) * 100, 100) : 0;
            return (
              <div key={item.label} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {item.format(item.used)} / {item.format(item.limit)}
                </p>
                <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${pct > 90 ? 'bg-red-500' : 'bg-blue-600'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setShowPlans(!showPlans)}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showPlans ? 'Hide Plans' : 'Upgrade Plan'}
        </button>

        {showPlans && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            {planOrder.map((p, i) => {
              const isCurrent = p === plan;
              const isDowngrade = i < currentPlanIndex;
              return (
                <div
                  key={p}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                  }`}
                >
                  <p className="font-medium text-gray-900 dark:text-white">{planLabels[p]}</p>
                  <p className="text-xs text-gray-500 mt-1">{planDescriptions[p]}</p>
                  {isCurrent && <span className="text-xs text-blue-600 mt-1 block">Current Plan</span>}
                  {!isCurrent && (
                    <span className="text-xs text-gray-400 mt-1 block">
                      {isDowngrade ? 'Downgrade' : 'Upgrade'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Billing History</h2>
        <div className="text-center py-12 text-gray-500">
          No billing history yet
        </div>
      </div>
    </div>
  );
}
