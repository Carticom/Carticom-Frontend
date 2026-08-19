// ============================================================
// CARTICOM CATEGORIES — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '@/features/dashboard/types/categories.types';
import type { QueryParams } from '@/lib/dal/types';

export class CategoriesRepository extends BaseRepository<CategoryDto, CreateCategoryDto, UpdateCategoryDto> {
  constructor() {
    super({
      base: '/api/v1/categories',
      byId: (id) => `/api/v1/categories/${id}`});
  }

  async getByStore(storeId: string, params?: QueryParams) {
    return this.get<CategoryDto[]>(`/api/v1/categories/store/${storeId}`, params as Record<string, string | number | boolean>);
  }
}

export const categoriesRepository = new CategoriesRepository();