'use client';

import { useMemo, useState } from 'react';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import {
  useSubscription,
  useSubscriptionPlans,
  useCreateSubscription,
  useChangeSubscriptionPlan,
  useCancelSubscription,
} from '@/features/dashboard/hooks/useSubscription';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import type {
  SubscriptionPlan,
  BillingCycle,
  SubscriptionStatus,
  SubscriptionRequest} from '@/features/dashboard/types/subscription.types';
import { Check, Loader2, Crown, Zap, Building2, Rocket, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/notifications/toast';

const PLAN_ICONS = [Crown, Zap, Building2, Rocket, Sparkles];

const STATUS_STYLES: Record<SubscriptionStatus, string> = {
  ACTIVE: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  TRIAL: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  EXPIRED: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  PAST_DUE: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'};

function formatNgn(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0}).format(amount);
}

function formatDate(epochMs?: number): string {
  if (!epochMs) return '—';
  return new Date(epochMs).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'});
}

export default function SubscriptionPage() {
  const { storeId } = useCurrentStoreId();
  const {
    data: subscription,
    isLoading: subLoading,
    error: subError,
    refetch: refetchSub,
  } = useSubscription(storeId ?? '');
  const { data: plans, isLoading: plansLoading, error: plansError, refetch: refetchPlans } = useSubscriptionPlans();

  const createSubscription = useCreateSubscription();
  const changePlan = useChangeSubscriptionPlan();
  const cancelSubscription = useCancelSubscription();

  const [billingCycle, setBillingCycle] = useState<BillingCycle>('MONTHLY');
  const [submittingPlan, setSubmittingPlan] = useState<string | null>(null);

  const noSubscription = !!subError;

  const plansSorted = useMemo(
    () =>
      (plans ?? []).slice().sort((a, b) => a.monthlyPrice - b.monthlyPrice),
    [plans]
  );

  const handleSelectPlan = async (plan: SubscriptionPlan) => {
    if (!storeId) return;
    setSubmittingPlan(plan.name);
    try {
      const data: SubscriptionRequest = {
        plan: plan.name,
        billingCycle,
        paymentGateway: 'PAYSTACK'};

      if (noSubscription) {
        const created = await createSubscription.mutateAsync({ storeId, data });
        if (!created) {
          showToast('error', 'Failed to create subscription');
          return;
        }
        if (plan.monthlyPrice > 0) {
          await changePlan.mutateAsync({
            subscriptionId: created.id,
            data,
            direction: 'upgrade'});
        } else {
          refetchSub();
        }
      } else if (subscription) {
        const currentPlan = plansSorted.find((p) => p.name === subscription.planName);
        const direction =
          !currentPlan || plan.monthlyPrice > currentPlan.monthlyPrice
            ? 'upgrade'
            : 'downgrade';
        await changePlan.mutateAsync({
          subscriptionId: subscription.id,
          data,
          direction});
      }
    } finally {
      setSubmittingPlan(null);
    }
  };

  if (plansLoading) return <LoadingState message="Loading plans..." />;
  if (plansError) return <ErrorState title="Failed to load plans" onRetry={refetchPlans} />;

  const currentPlan = subscription
    ? plansSorted.find((p) => p.name === subscription.planName) ?? null
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your plan, billing cycle, and renewals
        </p>
      </div>

      {subscription && !noSubscription && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30">
                <Crown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {subscription.planName || subscription.planCode} Plan
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', STATUS_STYLES[subscription.status])}>
                    {subscription.status.charAt(0) + subscription.status.slice(1).toLowerCase()}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {subscription.billingCycle.toLowerCase()} billing
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNgn(Number(subscription.amount))}
              </p>
              <p className="text-xs text-gray-500">
                Renews {formatDate(subscription.renewalDate ?? subscription.endDate)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 dark:border-gray-800 pt-4">
            <span className="text-xs text-gray-500">
              {subscription.autoRenewal ? 'Auto-renewal on' : 'Auto-renewal off'}
            </span>
            {subscription.status !== 'CANCELLED' && subscription.status !== 'EXPIRED' && (
              <Button
                variant="outline"
                size="sm"
                className="ml-auto"
                disabled={cancelSubscription.isPending}
                onClick={() => cancelSubscription.mutate(subscription.id)}
              >
                {cancelSubscription.isPending ? 'Cancelling...' : 'Cancel Subscription'}
              </Button>
            )}
          </div>
        </div>
      )}

      {noSubscription && (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Start with the Free Trial
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Choose a plan to get started. Every new store starts with a 30-day free trial.
          </p>
        </div>
      )}

      <div className="flex items-center gap-2">
        {(['MONTHLY', 'YEARLY'] as BillingCycle[]).map((cycle) => (
          <button
            key={cycle}
            onClick={() => setBillingCycle(cycle)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              billingCycle === cycle
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            )}
          >
            {cycle === 'MONTHLY' ? 'Monthly' : 'Yearly (save 2 months)'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {plansSorted.map((plan, index) => {
          const Icon = PLAN_ICONS[index % PLAN_ICONS.length];
          const price = billingCycle === 'MONTHLY' ? plan.monthlyPrice : plan.yearlyPrice;
          const isFree = plan.monthlyPrice <= 0;
          const isCurrent = currentPlan?.name === plan.name;
          const isPending = submittingPlan === plan.name;

          return (
            <div
              key={plan.id}
              className={cn(
                'flex flex-col rounded-2xl border bg-white dark:bg-gray-900 p-6 transition-all',
                isCurrent
                  ? 'border-blue-500 ring-1 ring-blue-200 dark:ring-blue-900 shadow-lg shadow-blue-100/50'
                  : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', isFree ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600')}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                  {isFree && <span className="text-xs text-green-600">Free Trial · {plan.durationDays ?? 30} days</span>}
                </div>
                {isCurrent && (
                  <span className="ml-auto px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-xs font-medium text-blue-700 dark:text-blue-300">
                    Current
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 min-h-[2.5rem] leading-relaxed">{plan.description}</p>

              <p className="mt-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {isFree ? '₦0' : formatNgn(Number(price))}
                </span>
                <span className="text-sm text-gray-500">/{billingCycle.toLowerCase()}</span>
              </p>

              <ul className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 shrink-0" />
                  Up to {plan.productLimit} products
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 shrink-0" />
                  {plan.staffLimit} staff members
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 shrink-0" />
                  {plan.paymentsEnabled ? 'Online payments' : 'Storefront only'}
                </li>
                {plan.customDomainEnabled && (
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600 shrink-0" />
                    Custom domain support
                  </li>
                )}
              </ul>

              <Button
                className={cn(
                  'mt-auto w-full',
                  isCurrent
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                )}
                disabled={isCurrent || isPending || !!submittingPlan}
                onClick={() => handleSelectPlan(plan)}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Redirecting...
                  </>
                ) : isCurrent ? (
                  'Current Plan'
                ) : (
                  isFree ? 'Choose Free Trial' : 'Choose Plan'
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}