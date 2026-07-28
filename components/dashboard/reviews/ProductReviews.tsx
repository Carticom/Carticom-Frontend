'use client';

import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { UserRole } from '@/features/auth/types';
import { useProductReviews, useCreateReview, useUpdateReview, useDeleteReview } from '@/features/dashboard/hooks/useReviews';
import { ReviewCard } from '@/components/dashboard/reviews/ReviewCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { cn } from '@/lib/utils';
import type { UpdateReviewDto } from '@/features/dashboard/types/reviews.types';

interface ProductReviewsProps {
  productId: string;
  productName?: string;
}

function StarInput({ rating, onChange }: { rating: number; onChange: (rating: number) => void }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className={cn(
            'transition-all',
            star <= (hovered || rating)
              ? 'text-amber-400 scale-110'
              : 'text-muted-foreground/30 hover:text-amber-300'
          )}
        >
          <Star className="h-6 w-6 fill-current" />
        </button>
      ))}
    </div>
  );
}

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const { user, isAuthenticated } = useAuth();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const { data: reviews, isLoading, isError, error, refetch } = useProductReviews(productId);
  const createReview = useCreateReview();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();

  const handleSubmit = () => {
    if (rating === 0 || !content.trim()) return;
    createReview.mutate(
      { productId, rating, title: title.trim() || undefined, content: content.trim() },
      {
        onSuccess: () => {
          setRating(0);
          setContent('');
          setTitle('');
        },
      }
    );
  };

  const handleUpdate = (id: string, data: UpdateReviewDto) => {
    updateReview.mutate({ id, data });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview.mutate(id);
    }
  };

  const isCustomer = isAuthenticated && user?.role === UserRole.CUSTOMER;
  const isSubmitting = createReview.isPending;

  if (isLoading) {
    return <LoadingState message="Loading reviews..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load reviews"
        description={error instanceof Error ? error.message : 'An error occurred'}
        onRetry={() => refetch()}
      />
    );
  }

  const reviewList = reviews ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">
          Reviews {reviewList.length > 0 && `(${reviewList.length})`}
        </h3>
      </div>

      {isCustomer ? (
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Write a Review</h4>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Rating</label>
            <StarInput rating={rating} onChange={setRating} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Title (optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your review"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Review</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience with this product..."
              className="min-h-[100px]"
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || !content.trim() || isSubmitting}
              size="sm"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </div>
      ) : isAuthenticated ? (
        <div className="rounded-xl border bg-muted/30 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Reviews can only be submitted by customers.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border bg-muted/30 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            <a href="/login" className="text-primary hover:underline">Sign in</a> to leave a review.
          </p>
        </div>
      )}

      {reviewList.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No reviews yet"
          description={productName ? `Be the first to review ${productName}` : 'No reviews have been submitted yet.'}
        />
      ) : (
        <div className="space-y-3">
          {reviewList.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isAuthor={isAuthenticated && user?.id === review.customerId}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              isUpdating={updateReview.isPending}
              isDeleting={deleteReview.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}
