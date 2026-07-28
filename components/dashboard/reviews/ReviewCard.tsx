'use client';

import { useState } from 'react';
import { Star, Pencil, Trash2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ReviewDto, UpdateReviewDto } from '@/features/dashboard/types/reviews.types';

interface ReviewCardProps {
  review: ReviewDto;
  isAuthor: boolean;
  onUpdate: (id: string, data: UpdateReviewDto) => void;
  onDelete: (id: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

function StarRating({ rating, interactive = false, onChange, size = 'sm' }: {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md';
}) {
  const [hovered, setHovered] = useState(0);
  const displayRating = interactive ? (hovered || rating) : rating;
  const sizeClass = size === 'md' ? 'h-5 w-5' : 'h-4 w-4';

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onChange?.(star)}
          className={cn(
            'transition-colors',
            interactive ? 'cursor-pointer' : 'cursor-default',
            star <= displayRating
              ? 'text-amber-400 fill-amber-400'
              : 'text-muted-foreground/30'
          )}
        >
          <Star className={cn(sizeClass, 'fill-current')} />
        </button>
      ))}
    </div>
  );
}

export function ReviewCard({ review, isAuthor, onUpdate, onDelete, isUpdating, isDeleting }: ReviewCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(review.rating);
  const [editContent, setEditContent] = useState(review.content);
  const [editTitle, setEditTitle] = useState(review.title);

  const handleSave = () => {
    onUpdate(review.id, {
      rating: editRating,
      title: editTitle || undefined,
      content: editContent,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditRating(review.rating);
    setEditContent(review.content);
    setEditTitle(review.title);
    setIsEditing(false);
  };

  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (isEditing) {
    return (
      <div className="rounded-xl border bg-card p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{review.customerName}</p>
            <StarRating rating={editRating} interactive onChange={setEditRating} size="md" />
          </div>
          <div className="flex items-center gap-1">
            <Button size="icon-sm" variant="ghost" onClick={handleSave} disabled={isUpdating}>
              <Check className="h-4 w-4 text-emerald-500" />
            </Button>
            <Button size="icon-sm" variant="ghost" onClick={handleCancel} disabled={isUpdating}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Review title"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
        />
        <Textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Write your review..."
          className="min-h-[80px]"
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{review.customerName}</span>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
          <StarRating rating={review.rating} />
        </div>
        {isAuthor && (
          <div className="flex items-center gap-1">
            <Button size="icon-sm" variant="ghost" onClick={() => setIsEditing(true)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon-sm" variant="ghost" onClick={() => onDelete(review.id)} disabled={isDeleting}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        )}
      </div>
      {review.title && (
        <h4 className="text-sm font-semibold text-foreground">{review.title}</h4>
      )}
      <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
    </div>
  );
}
