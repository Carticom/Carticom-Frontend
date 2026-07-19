// ============================================================
// CARTICOM PRODUCTS — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { ProductDto, CreateProductDto, UpdateProductDto } from '@/features/dashboard/types/products.types';
import type { QueryParams } from '@/lib/dal/types';

export class ProductsRepository extends BaseRepository<ProductDto, CreateProductDto, UpdateProductDto> {
  constructor() {
    super({
      base: '/api/v1/products',
      byId: (id) => `/api/v1/products/${id}`,
    });
  }

  async getByStore(storeId: string, params?: QueryParams) {
    return this.get<ProductDto[]>(`/api/v1/products/store/${storeId}`, params as Record<string, string | number | boolean>);
  }

  async getActiveByStore(storeId: string, params?: QueryParams) {
    return this.get<ProductDto[]>(`/api/v1/products/store/${storeId}/active`, params as Record<string, string | number | boolean>);
  }

  async search(query: string) {
    return this.get<ProductDto[]>(`/api/v1/products/search?q=${encodeURIComponent(query)}`);
  }

  async getByCategory(categoryId: string, params?: QueryParams) {
    return this.get<ProductDto[]>(`/api/v1/products/category/${categoryId}`, params as Record<string, string | number | boolean>);
  }

  async updateInventory(id: string, quantityDelta: number) {
    return this.patch(id, { quantityDelta } as unknown as UpdateProductDto);
  }
}

export const productsRepository = new ProductsRepository();