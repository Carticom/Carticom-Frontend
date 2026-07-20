// ============================================================
// CARTICOM AI — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { AIConfigDto, CreateAIConfigDto, UpdateAIConfigDto } from '@/features/dashboard/types/ai.types';
import type { QueryParams } from '@/lib/dal/types';

export class AIRepository extends BaseRepository<AIConfigDto, CreateAIConfigDto, UpdateAIConfigDto> {
  constructor() {
    super({
      base: '/api/v1/ai',
      byId: (id) => `/api/v1/ai/${id}`,
    });
  }

  async getByStore(storeId: string) {
    return this.get<AIConfigDto>(`/api/v1/ai/status/${storeId}`);
  }

  async enable(storeId: string, enabled: boolean) {
    return this.post<AIConfigDto>(`/api/v1/ai/enable/${storeId}`, { enabled });
  }
}

export const aiRepository = new AIRepository();