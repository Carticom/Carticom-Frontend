'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { couponsRepository } from '@/features/dashboard/repositories/coupons.repository';
import type { CreateCouponDto, UpdateCouponDto, ValidateCouponDto } from '@/features/dashboard/types/coupons.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

export function useCoupons(storeId?: string | null) {
  return useQuery({
    queryKey: queryKeys.generic.list('coupons', { storeId }),
    queryFn: async () => {
      const result = await couponsRepository.list({ page: 1, limit: 100 }, { storeId: storeId ?? '' });
      return result.data;
    },
    enabled: !!storeId});
}

export function useCoupon(id: string | undefined | null) {
  return useQuery({
    queryKey: queryKeys.generic.byId('coupons', id || ''),
    queryFn: async () => {
      if (!id) throw new Error('Coupon ID is required');
      return couponsRepository.getById(id);
    },
    enabled: !!id});
}

export function useCreateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCouponDto) => {
      return couponsRepository.create({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      showToast('success', 'Coupon created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create coupon', {
        description: error.message});
    }});
}

export function useUpdateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCouponDto }) => {
      return couponsRepository.update({ id, data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      queryClient.invalidateQueries({ queryKey: ['coupons', variables.id] });
      showToast('success', 'Coupon updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update coupon', {
        description: error.message});
    }});
}

export function useDeleteCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return couponsRepository.delete({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      showToast('success', 'Coupon deleted successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to delete coupon', {
        description: error.message});
    }});
}

export function useValidateCoupon() {
  return useMutation({
    mutationFn: async (dto: ValidateCouponDto) => {
      return couponsRepository.validate(dto);
    }});
}
