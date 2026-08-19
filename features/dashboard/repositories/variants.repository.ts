import axiosInstance, { extractErrorMessage } from '@/lib/axios';
import type { ProductVariantDto, CreateVariantDto, UpdateVariantDto } from '@/features/dashboard/types/variants.types';

export class VariantsRepository {
  private buildPath(productId: string, id?: string): string {
    let path = `/api/v1/products/${productId}/variants`;
    if (id) path += `/${id}`;
    return path;
  }

  async getByProduct(productId: string): Promise<ProductVariantDto[]> {
    try {
      const response = await axiosInstance.get(this.buildPath(productId));
      return (response.data?.data ?? []) as ProductVariantDto[];
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async create(productId: string, data: CreateVariantDto): Promise<ProductVariantDto> {
    try {
      const response = await axiosInstance.post(this.buildPath(productId), data);
      return response.data?.data as ProductVariantDto;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async update(productId: string, id: string, data: UpdateVariantDto): Promise<ProductVariantDto> {
    try {
      const response = await axiosInstance.put(this.buildPath(productId, id), data);
      return response.data?.data as ProductVariantDto;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async delete(productId: string, id: string): Promise<void> {
    try {
      await axiosInstance.delete(this.buildPath(productId, id));
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }
}

export const variantsRepository = new VariantsRepository();
