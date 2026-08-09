'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminRepository } from '@/features/admin/repositories/admin.repository';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';
import { TrendingUp, ShoppingCart, Users, Store } from 'lucide-react';

const PERIODS = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0}).format(amount);
}

function formatPercent(value: number): string {
  if (value === 0) return '0%';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

interface AnalyticsMetrics {
  totalRevenue?: number;
  totalOrders?: number;
  activeUsers?: number;
  activeStores?: number;
}

interface AnalyticsData {
  metrics?: AnalyticsMetrics;
  topStores?: { name: string; revenue: number; orders: number; growth: number }[];
}

export default function SuperAdminAnalyticsPage() {
  const [period, setPeriod] = useState('30d');

  const { data: analytics, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'analytics', period],
    queryFn: () => adminRepository.getAnalyticsOverview<AnalyticsData>(period)});

  if (isLoading) return <LoadingState message="Loading analytics..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;
  if (!analytics?.metrics) return <EmptyState title="No analytics data" description="Analytics will appear once there is platform activity." />;

  const { metrics = {}, topStores = [] } = analytics ?? {};

  const summaryCards = [
    { label: 'Total Revenue', value: formatCurrency(metrics.totalRevenue ?? 0), icon: TrendingUp, color: 'text-green-600' },
    { label: 'Total Orders', value: (metrics.totalOrders ?? 0).toLocaleString(), icon: ShoppingCart, color: 'text-purple-600' },
    { label: 'Active Users', value: (metrics.activeUsers ?? 0).toLocaleString(), icon: Users, color: 'text-blue-600' },
    { label: 'Active Stores', value: (metrics.activeStores ?? 0).toLocaleString(), icon: Store, color: 'text-emerald-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Company-wide performance across stores, orders and users</p>
        </div>
      </div>

      <div className="flex gap-2">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`px-4 py-2 border rounded-lg text-sm ${
              period === p.value
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.label}</p>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            </div>
          );
        })}
      </div>

      {topStores?.length > 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performing Stores</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium">Store</th>
                  <th className="pb-3 font-medium text-right">Revenue</th>
                  <th className="pb-3 font-medium text-right">Orders</th>
                  <th className="pb-3 font-medium text-right">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topStores.map((store: { name: string; revenue: number; orders: number; growth: number }) => (
                  <tr key={store.name} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2.5 text-gray-900 dark:text-white">{store.name}</td>
                    <td className="py-2.5 text-right text-gray-600 dark:text-gray-400">{formatCurrency(store.revenue)}</td>
                    <td className="py-2.5 text-right text-gray-600 dark:text-gray-400">{store.orders}</td>
                    <td className="py-2.5 text-right">
                      <span className={store.growth >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatPercent(store.growth)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}