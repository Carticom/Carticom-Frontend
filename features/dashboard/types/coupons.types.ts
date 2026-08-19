export interface CouponDto {
  id: string;
  storeId: string;
  code: string;
  type: CouponType;
  value: number;
  minOrderAmount?: number;
  maxUsageCount?: number;
  usedCount: number;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCouponDto {
  code: string;
  type: CouponType;
  value: number;
  minOrderAmount?: number;
  maxUsageCount?: number;
  expiresAt?: string;
  isActive?: boolean;
}

export interface UpdateCouponDto extends Partial<CreateCouponDto> {
  isActive?: boolean;
}

export interface ValidateCouponDto {
  code: string;
  storeId: string;
  cartTotal: number;
}

export interface ValidateCouponResponse {
  valid: boolean;
  coupon?: CouponDto;
  discountAmount?: number;
  message?: string;
}

export enum CouponType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED'}
