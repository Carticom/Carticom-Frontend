// ============================================================
// CARTICOM SUPPORT — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { QueryParams } from '@/lib/dal/types';

export interface SupportTicketDto {
  id: string;
  subject: string;
  message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  submittedBy: string;
  contactEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupportTicketDto {
  subject: string;
  message: string;
}

export class SupportRepository extends BaseRepository<
  SupportTicketDto,
  CreateSupportTicketDto
> {
  constructor() {
    super({
      base: '/api/v1/support/tickets',
      byId: (id) => `/api/v1/support/tickets/${id}`});
  }

  async getMyTickets(params?: QueryParams): Promise<SupportTicketDto[]> {
    return this.get<SupportTicketDto[]>(
      '/api/v1/support/tickets/my',
      params as Record<string, string | number | boolean>
    );
  }
}

export const supportRepository = new SupportRepository();
