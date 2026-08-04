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
    super({ base: '/api/v1/super-admin' });
  }

  async getDashboard<T>(): Promise<T> {
    return this.get<T>('/api/v1/super-admin/dashboard');
  }

  async getUsers<T>(page = 0, size = 20): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/super-admin/users', { page, size });
  }

  async updateUserStatus(id: string, action: string): Promise<void> {
    await this.post<void>(`/api/v1/super-admin/users/${id}/${action}`);
  }

  async getSubscriptions<T>(page = 0, size = 20): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/super-admin/subscriptions', { page, size });
  }

  async getStores<T>(page = 0, size = 20): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>('/api/v1/super-admin/stores', { page, size });
  }

  async updateStoreStatus(id: string, action: string): Promise<void> {
    await this.post<void>(`/api/v1/super-admin/stores/${id}/${action}`);
  }

  async getSettings<T>(): Promise<T[]> {
    return this.get<T[]>('/api/v1/super-admin/settings');
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
