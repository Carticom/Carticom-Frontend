// ============================================================
// CARTICOM NOTIFICATIONS — Repository
// ============================================================

import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/lib/dal/types';
import type { NotificationItem } from '@/types/dashboard';

export interface BackendNotification {
  id: string;
  customerId?: string | null;
  userId?: string | null;
  type: string;
  title: string;
  body?: string | null;
  isRead?: boolean;
  createdAt?: string;
}

export class NotificationsRepository {
  async getNotifications(): Promise<NotificationItem[]> {
    const response = await axiosInstance.get<ApiResponse<{ content?: BackendNotification[] }>>(
      '/api/v1/notifications'
    );
    const notifications = response.data?.data?.content ?? [];
    return notifications.map((n) => ({
      id: n.id,
      type: this.toNotificationType(n.type),
      title: n.title,
      message: n.body || '',
      timestamp: n.createdAt || new Date().toISOString(),
      read: !!n.isRead,
      actionUrl: undefined}));
  }

  async getUnreadCount(): Promise<number> {
    const response = await axiosInstance.get<ApiResponse<number>>(
      '/api/v1/notifications/unread-count'
    );
    return response.data?.data ?? 0;
  }

  async markAsRead(id: string): Promise<void> {
    await axiosInstance.patch(`/api/v1/notifications/${id}/read`);
  }

  async markAllAsRead(): Promise<void> {
    await axiosInstance.patch('/api/v1/notifications/read-all');
  }

  private toNotificationType(type: string): NotificationItem['type'] {
    const lower = (type || '').toLowerCase();
    switch (lower) {
      case 'payment':
        return 'payment';
      case 'order':
        return 'order';
      case 'subscription':
        return 'subscription';
      case 'alert':
        return 'alert';
      default:
        return 'system';
    }
  }
}

export const notificationsRepository = new NotificationsRepository();
