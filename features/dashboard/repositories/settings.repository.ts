// ============================================================
// CARTICOM SETTINGS — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { SettingsDto, UpdateSettingsDto } from '@/features/dashboard/types/settings.types';


export class SettingsRepository extends BaseRepository<SettingsDto, never, UpdateSettingsDto> {
  constructor() {
    super({
      base: '/api/v1/settings',
      byId: (id) => `/api/v1/settings/${id}`});
  }

  async getByStore(storeId: string) {
    return this.get<SettingsDto>(`/api/v1/stores/${storeId}/settings`);
  }
}

export const settingsRepository = new SettingsRepository();