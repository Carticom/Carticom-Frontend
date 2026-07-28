// ============================================================
// CARTICOM REVIEWS — Domain Types
// ============================================================

export interface ReviewDto {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewDto {
  productId: string;
  rating: number;
  title?: string;
  content: string;
}

export interface UpdateReviewDto {
  rating?: number;
  title?: string;
  content?: string;
  status?: string;
}
