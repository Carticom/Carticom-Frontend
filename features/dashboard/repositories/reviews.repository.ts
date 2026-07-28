// ============================================================
// CARTICOM REVIEWS — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { ReviewDto, CreateReviewDto, UpdateReviewDto } from '@/features/dashboard/types/reviews.types';
import type { CreateInput, QueryParams } from '@/lib/dal/types';

export class ReviewsRepository extends BaseRepository<ReviewDto, CreateReviewDto, UpdateReviewDto> {
  constructor() {
    super({
      base: '/api/v1/reviews',
      update: (id) => `/api/v1/reviews/${id}`,
      delete: (id) => `/api/v1/reviews/${id}`,
    });
  }

  async getByProduct(productId: string, params?: QueryParams) {
    return this.get<ReviewDto[]>(
      `/api/v1/products/${productId}/reviews`,
      params as Record<string, string | number | boolean>
    );
  }

  async create(input: CreateInput<CreateReviewDto>): Promise<ReviewDto> {
    return this.post<ReviewDto>(`/api/v1/products/${input.data.productId}/reviews`, input.data);
  }
}

export const reviewsRepository = new ReviewsRepository();
