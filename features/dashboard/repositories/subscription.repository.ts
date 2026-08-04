// ============================================================
// CARTICOM SUBSCRIPTION — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { SubscriptionDto, CreateSubscriptionDto, UpdateSubscriptionDto } from '@/features/dashboard/types/subscription.types';


export class SubscriptionRepository extends BaseRepository<SubscriptionDto, CreateSubscriptionDto, UpdateSubscriptionDto> {
  constructor() {
    super({
      base: '/api/v1/subscriptions',
      byId: (id) => `/api/v1/subscriptions/${id}`});
  }

  async getByStore(storeId: string) {
    return this.get<SubscriptionDto>(`/api/v1/subscriptions/store/${storeId}`);
  }

  async cancel(subscriptionId: string) {
    return this.delete({ id: subscriptionId });
  }
}

export const subscriptionRepository = new SubscriptionRepository();