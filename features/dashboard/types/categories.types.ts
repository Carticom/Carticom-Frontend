// ============================================================
// CARTICOM CATEGORIES — Domain Types
// ============================================================

export interface CategoryDto {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  parentName?: string;
  productCount: number;
  status: CategoryStatus;
  seoTitle?: string;
  seoDescription?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  seoTitle?: string;
  seoDescription?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  status?: CategoryStatus;
}

export enum CategoryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}