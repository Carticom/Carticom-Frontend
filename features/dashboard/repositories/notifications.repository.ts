// ============================================================
// CARTICOM NOTIFICATIONS — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';

export class NotificationsRepository extends BaseRepository<never> {
  constructor() {
    super({ base: '/api/v1/notifications' });
  }

  async getNotifications<T>(): Promise<T[]> {
    return this.get<T[]>('/api/v1/notifications');
  }
}

export const notificationsRepository = new NotificationsRepository();
