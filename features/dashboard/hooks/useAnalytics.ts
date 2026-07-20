'use client';

import { useQuery } from '@tanstack/react-query';
import { businessOwnerService } from '@/features/business-owner/services/business-owner.service';
import type { AnalyticsDto } from '@/features/dashboard/types/analytics.types';
import { queryKeys } from '@/lib/dal/query-keys';

export function useAnalytics(storeId: string, period?: string) {
  return useQuery({
    queryKey: queryKeys.analytics.dashboard(),
    queryFn: async (): Promise<AnalyticsDto> => {
      const [revenueData, ordersData, customersData, conversionData] = await Promise.all([
        businessOwnerService.getAnalyticsRevenue(period),
        businessOwnerService.getAnalyticsOrders(period),
        businessOwnerService.getAnalyticsCustomers(period),
        businessOwnerService.getAnalyticsConversion(period),
      ]);

      const totalRevenue = revenueData.reduce((s, r) => s + (r.revenue || 0), 0);
      const totalOrders = ordersData.reduce((s, r) => s + (r.orders || 0), 0);
      const totalCustomers = customersData.reduce((s, r) => s + (r.customers || 0), 0);
      const avgConversion = conversionData.length > 0
        ? conversionData.reduce((s, r) => s + (r.conversionRate || 0), 0) / conversionData.length
        : 0;

      const trendPoints = (data: { period: string; value?: number }[], key: string) =>
        data.map((d) => ({ date: d.period, value: d[key as keyof typeof d] as number || 0 }));

      return {
        id: '',
        storeId,
        period: period || '30d',
        metrics: {
          revenue: totalRevenue,
          orders: totalOrders,
          customers: totalCustomers,
          products: 0,
          conversionRate: avgConversion,
          averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
        },
        trends: {
          revenue: revenueData.map((r) => ({ date: r.period, value: r.revenue || 0 })),
          orders: ordersData.map((r) => ({ date: r.period, value: r.orders || 0 })),
          customers: customersData.map((r) => ({ date: r.period, value: r.customers || 0 })),
        },
        topProducts: [],
        topCategories: [],
        metadata: {},
        createdAt: new Date().toISOString(),
      };
    },
    enabled: !!storeId,
  });
}

export function useDashboardAnalytics(storeId: string) {
  return useAnalytics(storeId, '7d');
}
