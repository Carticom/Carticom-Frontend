// ============================================================
// CARTICOM ADMIN — Repository (H4: pages must go through the DAL)
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { QueryParams } from '@/lib/dal/types';

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

// ─── Super Admin Repository ──────────────────────────────────

class SuperAdminRepository extends BaseRepository<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>
> {
  constructor() {
    super({
      base: '/api/v1/super-admin',
      byId: (id) => `/api/v1/super-admin/plans/${id}`,
    });
  }

  async getDashboard<T>(): Promise<T> {
    return this.get<T>('/api/v1/super-admin/dashboard');
  }

  async getUsers<T>(page = 0, size = 20, search?: string, role?: string): Promise<PageResponse<T>> {
    const params: Record<string, string | number> = { page, size };
    if (search) params.search = search;
    if (role) params.role = role;
    return this.get<PageResponse<T>>('/api/v1/super-admin/users', params);
  }

  async createUser<T>(data: Record<string, unknown>): Promise<T> {
    return this.post<T>('/api/v1/super-admin/users', data);
  }

  async updateUser<T>(id: string, data: Record<string, unknown>): Promise<T> {
    return this.update({ id: '/api/v1/super-admin/users/' + id, data }) as Promise<T>;
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete({ id: '/api/v1/super-admin/users/' + id });
  }

  async resetUserPassword(id: string): Promise<{ tempPassword: string }> {
    return this.post<{ tempPassword: string }>('/api/v1/super-admin/users/' + id + '/reset-password', {});
  }

  async updateUserStatus(id: string, action: string): Promise<void> {
    await this.post<void>(`/api/v1/super-admin/users/${id}/${action}`);
  }

  async getSubscriptions<T>(page = 0, size = 20): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/super-admin/subscriptions', { page, size });
  }

  async getStores<T>(page = 0, size = 20, search?: string, status?: string): Promise<PageResponse<T>> {
    const params: Record<string, string | number> = { page, size };
    if (search) params.search = search;
    if (status) params.status = status;
    return this.get<PageResponse<T>>('/api/v1/super-admin/stores', params);
  }

  async updateStoreStatus(id: string, action: string): Promise<void> {
    await this.post<void>(`/api/v1/super-admin/stores/${id}/${action}`);
  }

  async getSettings<T>(): Promise<T[]> {
    return this.get<T[]>('/api/v1/super-admin/settings');
  }

  async createSetting<T>(data: Record<string, unknown>): Promise<T> {
    return this.post<T>('/api/v1/super-admin/settings', data);
  }

  async updateSetting<T>(id: string, data: Record<string, unknown>): Promise<T> {
    return this.update({ id: '/api/v1/super-admin/settings/' + id, data }) as Promise<T>;
  }

  async deleteSetting(id: string): Promise<void> {
    await this.delete({ id: '/api/v1/super-admin/settings/' + id });
  }

  async getPlans<T>(): Promise<T[]> {
    return this.get<T[]>('/api/v1/super-admin/plans');
  }

  async createPlan<T>(payload: Record<string, unknown>): Promise<T> {
    return this.post<T>('/api/v1/super-admin/plans', payload);
  }

  async updatePlan<T>(id: string, payload: Record<string, unknown>): Promise<T> {
    return this.update({ id, data: payload }) as Promise<T>;
  }

  async deletePlan(id: string): Promise<void> {
    await this.delete({ id });
  }

  async getPayments<T>(page = 0, size = 20): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/super-admin/payments', { page, size });
  }

  async processRefund(payload: Record<string, unknown>): Promise<void> {
    await this.post<void>('/api/v1/super-admin/payments/refund', payload);
  }

  async getAuditLogs<T>(page = 0, size = 20): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/super-admin/audit-logs', { page, size });
  }
}

// ─── Admin Repository ────────────────────────────────────────

class AdminRepository extends BaseRepository<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>
> {
  constructor() {
    super({ base: '/api/v1/admin' });
  }

  async getDashboard<T>(): Promise<T> {
    return this.get<T>('/api/v1/admin/dashboard');
  }

  async getUsers<T>(page = 0, size = 20): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/admin/users', { page, size });
  }

  async getSubscriptions<T>(page = 0, size = 20): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/admin/subscriptions', { page, size });
  }

  async getStores<T>(page = 0, size = 20): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/admin/stores', { page, size });
  }

  async getPayments<T>(page = 0, size = 20): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/admin/payments', { page, size });
  }

  async getOrders<T>(params?: QueryParams): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/admin/orders', params as Record<string, string | number | boolean>);
  }

  async getDisputes<T>(): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/admin/disputes');
  }

  async resolveDispute(id: string): Promise<void> {
    await this.post<void>(`/api/v1/admin/disputes/${id}/resolve`);
  }

  async getAnalyticsOverview<T>(period: string): Promise<T> {
    return this.get<T>('/api/v1/admin/analytics/overview', { period });
  }

}

export const superAdminRepository = new SuperAdminRepository();
export const adminRepository = new AdminRepository();

export type { PageResponse };
