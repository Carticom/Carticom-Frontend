// ============================================================
// CARTICOM STAFF — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { StaffDto, CreateStaffDto, UpdateStaffDto } from '@/features/dashboard/types/staff.types';
import type { QueryParams } from '@/lib/dal/types';

export class StaffRepository extends BaseRepository<StaffDto, CreateStaffDto, UpdateStaffDto> {
  constructor() {
    super({
      base: '/api/v1/staff',
      byId: (id) => `/api/v1/staff/${id}`,
    });
  }

  async getByStore(storeId: string, params?: QueryParams) {
    return this.get<StaffDto[]>(`/api/v1/staff/store/${storeId}`, params as Record<string, string | number | boolean>);
  }

  async invite(storeId: string, email: string, role: string) {
    return this.post<StaffDto>(`/api/v1/staff/store/${storeId}/invite`, { email, role });
  }
}

export const staffRepository = new StaffRepository();