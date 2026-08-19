// ============================================================
// CARTICOM REVIEWS — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsRepository } from '@/features/dashboard/repositories/reviews.repository';
import type { ReviewDto, CreateReviewDto, UpdateReviewDto } from '@/features/dashboard/types/reviews.types';
import { showToast } from '@/lib/notifications/toast';

// ─── Use Product Reviews ──────────────────────────────────────

export function useProductReviews(productId: string) {
  return useQuery<ReviewDto[]>({
    queryKey: ['reviews', 'product', productId],
    queryFn: async () => {
      return reviewsRepository.getByProduct(productId);
    },
    enabled: !!productId});
}

// ─── Use Create Review ─────────────────────────────────────────

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateReviewDto) => {
      return reviewsRepository.create({ data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'product', variables.productId] });
      showToast('success', 'Review submitted successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to submit review', {
        description: error.message});
    }});
}

// ─── Use Update Review ─────────────────────────────────────────

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateReviewDto }) => {
      return reviewsRepository.update({ id, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      showToast('success', 'Review updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update review', {
        description: error.message});
    }});
}

// ─── Use Delete Review ─────────────────────────────────────────

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return reviewsRepository.delete({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      showToast('success', 'Review deleted successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to delete review', {
        description: error.message});
    }});
}
