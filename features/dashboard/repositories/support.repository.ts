// ============================================================
// CARTICOM SUPPORT — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { SupportTicketDto, CreateSupportTicketDto, UpdateSupportTicketDto } from '@/features/dashboard/types/support.types';
import type { QueryParams } from '@/lib/dal/types';

export class SupportRepository extends BaseRepository<SupportTicketDto, CreateSupportTicketDto, UpdateSupportTicketDto> {
  constructor() {
    super({
      base: '/api/v1/support',
      byId: (id) => `/api/v1/support/${id}`,
    });
  }

  async getByStore(storeId: string, params?: QueryParams) {
    return this.get<SupportTicketDto[]>(`/api/v1/support/store/${storeId}`, params as Record<string, string | number | boolean>);
  }
}

export const supportRepository = new SupportRepository();