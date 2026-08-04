// ============================================================
// CARTICOM ANALYTICS — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { AnalyticsDto, CreateAnalyticsDto } from '@/features/dashboard/types/analytics.types';


export class AnalyticsRepository extends BaseRepository<AnalyticsDto, CreateAnalyticsDto, never> {
  constructor() {
    super({
      base: '/api/v1/analytics',
      byId: (id) => `/api/v1/analytics/${id}`});
  }

  async getByStore(storeId: string, period?: string) {
    const url = period 
      ? `/api/v1/analytics/store/${storeId}?period=${period}`
      : `/api/v1/analytics/store/${storeId}`;
    return this.get<AnalyticsDto>(url);
  }

  async getDashboard(storeId: string) {
    return this.get<AnalyticsDto>(`/api/v1/analytics/store/${storeId}/dashboard`);
  }
}

export const analyticsRepository = new AnalyticsRepository();