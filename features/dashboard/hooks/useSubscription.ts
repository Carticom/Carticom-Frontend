// ============================================================
// CARTICOM SUBSCRIPTION — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionRepository } from '@/features/dashboard/repositories/subscription.repository';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';
import type {
  SubscriptionRequest,
  SubscriptionPaymentResponse} from '@/features/dashboard/types/subscription.types';

// ─── Current Subscription ─────────────────────────────────────

export function useSubscription(storeId: string) {
  return useQuery({
    queryKey: queryKeys.subscription.byStore(storeId),
    queryFn: () => subscriptionRepository.getByStore(storeId),
    enabled: !!storeId,
    retry: false});
}

// ─── Available Plans ──────────────────────────────────────────

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ['subscription', 'plans'],
    queryFn: () => subscriptionRepository.getPlans()});
}

// ─── Create Subscription ──────────────────────────────────────

export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, data }: { storeId: string; data: SubscriptionRequest }) =>
      subscriptionRepository.create(storeId, data),
    onSuccess: (subscription) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.all });
      queryClient.setQueryData(queryKeys.subscription.byStore(subscription.storeId), subscription);
      showToast('success', 'Subscription created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create subscription', {
        description: error.message});
    }});
}

// ─── Pay for Subscription ─────────────────────────────────────

export function usePaySubscription() {
  return useMutation({
    mutationFn: ({
      subscriptionId,
      data,
    }: {
      subscriptionId: string;
      data: SubscriptionRequest;
    }): Promise<SubscriptionPaymentResponse> =>
      subscriptionRepository.pay(subscriptionId, data),
    onSuccess: (payment) => {
      if (payment?.authorizationUrl) {
        window.location.href = payment.authorizationUrl;
      } else {
        showToast('success', 'Payment initiated. Complete the payment to activate your plan.');
      }
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to initiate payment', {
        description: error.message});
    }});
}

// ─── Upgrade / Downgrade ─────────────────────────────────────

export function useChangeSubscriptionPlan() {
  return useMutation({
    mutationFn: ({
      subscriptionId,
      data,
      direction,
    }: {
      subscriptionId: string;
      data: SubscriptionRequest;
      direction: 'upgrade' | 'downgrade';
    }): Promise<SubscriptionPaymentResponse> =>
      direction === 'upgrade'
        ? subscriptionRepository.upgrade(subscriptionId, data)
        : subscriptionRepository.downgrade(subscriptionId, data),
    onSuccess: (payment) => {
      if (payment?.authorizationUrl) {
        window.location.href = payment.authorizationUrl;
      } else {
        showToast('success', 'Payment initiated. Complete the payment to change your plan.');
      }
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to initiate plan change', {
        description: error.message});
    }});
}

// ─── Cancel Subscription ──────────────────────────────────────

export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionId: string) =>
      subscriptionRepository.cancel(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.all });
      showToast('success', 'Subscription cancelled successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to cancel subscription', {
        description: error.message});
    }});
}