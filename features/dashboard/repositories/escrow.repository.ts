// ============================================================
// CARTICOM ESCROW — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { EscrowTransactionDto, CreateEscrowDto, UpdateEscrowDto } from '@/features/dashboard/types/escrow.types';
import type { QueryParams } from '@/lib/dal/types';

export class EscrowRepository extends BaseRepository<EscrowTransactionDto, CreateEscrowDto, UpdateEscrowDto> {
  constructor() {
    super({
      base: '/api/v1/escrow',
      byId: (id) => `/api/v1/escrow/${id}`,
    });
  }

  async getByStore(storeId: string, params?: QueryParams) {
    return this.get<EscrowTransactionDto[]>(`/api/v1/escrow/store/${storeId}`, params as Record<string, string | number | boolean>);
  }

  async getByOrder(orderId: string) {
    return this.get<EscrowTransactionDto>(`/api/v1/escrow/order/${orderId}`);
  }
}

export const escrowRepository = new EscrowRepository();