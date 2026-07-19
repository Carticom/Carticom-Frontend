// ============================================================
// CARTICOM PAYMENTS — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { PaymentDto, CreatePaymentDto, UpdatePaymentDto } from '@/features/dashboard/types/payments.types';
import type { QueryParams } from '@/lib/dal/types';

export class PaymentsRepository extends BaseRepository<PaymentDto, CreatePaymentDto, UpdatePaymentDto> {
  constructor() {
    super({
      base: '/api/v1/payments',
      byId: (id) => `/api/v1/payments/${id}`,
    });
  }

  async getByStore(storeId: string, params?: QueryParams) {
    return this.get<PaymentDto[]>(`/api/v1/payments/store/${storeId}`, params as Record<string, string | number | boolean>);
  }

  async getByOrder(orderId: string) {
    return this.get<PaymentDto[]>(`/api/v1/payments/order/${orderId}`);
  }
}

export const paymentsRepository = new PaymentsRepository();