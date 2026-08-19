'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { guestCheckoutRepository } from '@/features/dashboard/repositories/guest-checkout.repository';
import type { GuestCheckoutRequest, GuestPayRequest } from '@/features/dashboard/types/guest-checkout.types';
import { showToast } from '@/lib/notifications/toast';

export function useGuestCheckout() {
  return useMutation({
    mutationFn: async (data: GuestCheckoutRequest) => {
      return guestCheckoutRepository.create(data);
    },
    onError: (error: Error) => {
      showToast('error', 'Checkout failed', {
        description: error.message});
    }});
}

export function useGuestCheckoutPay() {
  return useMutation({
    mutationFn: async (data: GuestPayRequest) => {
      return guestCheckoutRepository.pay(data);
    },
    onError: (error: Error) => {
      showToast('error', 'Payment initiation failed', {
        description: error.message});
    }});
}

export function useTrackGuestOrder(reference: string | undefined | null) {
  return useQuery({
    queryKey: ['guest-checkout', 'track', reference],
    queryFn: async () => {
      if (!reference) throw new Error('Reference is required');
      return guestCheckoutRepository.track(reference);
    },
    enabled: !!reference,
    retry: 1});
}
