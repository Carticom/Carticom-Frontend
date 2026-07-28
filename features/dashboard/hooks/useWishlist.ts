'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistRepository } from '@/features/dashboard/repositories/wishlist.repository';
import { showToast } from '@/lib/notifications/toast';

export function useWishlist() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistRepository.getAll(),
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      return wishlistRepository.add(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      showToast('success', 'Added to wishlist');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to add to wishlist', {
        description: error.message,
      });
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      return wishlistRepository.remove(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      showToast('success', 'Removed from wishlist');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to remove from wishlist', {
        description: error.message,
      });
    },
  });
}
