import { BaseRepository } from '@/lib/dal/repository';
import type { CouponDto, CreateCouponDto, UpdateCouponDto, ValidateCouponDto, ValidateCouponResponse } from '@/features/dashboard/types/coupons.types';

export class CouponsRepository extends BaseRepository<CouponDto, CreateCouponDto, UpdateCouponDto> {
  constructor() {
    super({
      base: '/api/v1/coupons',
      byId: (id) => `/api/v1/coupons/${id}`,
    });
  }

  async validate(dto: ValidateCouponDto): Promise<ValidateCouponResponse> {
    return this.post<ValidateCouponResponse>('/api/v1/coupons/validate', dto);
  }
}

export const couponsRepository = new CouponsRepository();
