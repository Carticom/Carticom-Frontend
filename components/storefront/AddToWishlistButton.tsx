'use client';

import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from '@/features/dashboard/hooks/useWishlist';

interface AddToWishlistButtonProps {
  productId: string;
  className?: string;
}

export default function AddToWishlistButton({ productId, className = '' }: AddToWishlistButtonProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { data: wishlist } = useWishlist();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const wishlistItem = wishlist?.find((item) => item.productId === productId);
  const isInWishlist = !!wishlistItem;
  const isPending = addToWishlist.isPending || removeFromWishlist.isPending;

  function handleToggle() {
    if (!user) {
      router.push('/login');
      return;
    }

    if (isInWishlist && wishlistItem) {
      removeFromWishlist.mutate(wishlistItem.id);
    } else {
      addToWishlist.mutate(productId);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${
        isInWishlist
          ? 'text-red-500 hover:bg-red-50'
          : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
      } disabled:opacity-50 ${className}`}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className="h-5 w-5"
        fill={isInWishlist ? 'currentColor' : 'none'}
      />
    </button>
  );
}
