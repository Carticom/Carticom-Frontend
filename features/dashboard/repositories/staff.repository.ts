// ============================================================
// CARTICOM STAFF — Repository
// ============================================================

import axiosInstance from '@/lib/axios';
import { BaseRepository } from '@/lib/dal/repository';
import type { StaffDto, CreateStaffDto, UpdateStaffDto } from '@/features/dashboard/types/staff.types';
import type { ApiResponse, QueryParams } from '@/lib/dal/types';

export class StaffRepository extends BaseRepository<StaffDto, CreateStaffDto, UpdateStaffDto> {
  constructor() {
    super({
      base: '/api/v1/staff',
      byId: (id) => `/api/v1/staff/${id}`});
  }

  async getByStore(storeId: string, params?: QueryParams) {
    return this.get<StaffDto[]>(`/api/v1/staff/${storeId}/list`, params as Record<string, string | number | boolean>);
  }

  async invite(storeId: string, email: string, role: string) {
    return this.post<StaffDto>(`/api/v1/staff/invite?storeId=${storeId}`, { email, role });
  }

  async updatePermissions(staffId: string, data: Partial<UpdateStaffDto>) {
    return this.put<StaffDto>(`/api/v1/staff/${staffId}/permissions`, data);
  }

  private async put<TResponse = unknown>(path: string, body?: unknown): Promise<TResponse> {
    const response = await axiosInstance.put<ApiResponse<TResponse>>(path, body);
    return response.data?.data as TResponse;
  }
}

export const staffRepository = new StaffRepository();