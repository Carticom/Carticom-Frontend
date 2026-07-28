export interface ProductVariantDto {
  id: string;
  productId: string;
  name: string;
  value: string;
  price?: number;
  stock: number;
  sku: string;
  isActive: boolean;
}

export interface CreateVariantDto {
  name: string;
  value: string;
  price?: number;
  stock: number;
  sku: string;
  isActive?: boolean;
}

export interface UpdateVariantDto extends Partial<CreateVariantDto> {}
