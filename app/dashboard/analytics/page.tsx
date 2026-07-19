'use client';

import { useState } from 'react';
import { useAnalytics } from '@/features/dashboard/hooks/useAnalytics';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';

const PERIOD_MAP: Record<string, string> = {
  'Today': 'today',
  '7 Days': '7d',
  '30 Days': '30d',
  '12 Months': '12m',
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatPercent(value: number): string {
  if (value === 0) return '0%';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

function computeGrowth(trend: { value: number }[]): number | null {
  if (trend.length < 2) return null;
  const first = trend[0].value;
  const last = trend[trend.length - 1].value;
  if (first === 0) return null;
  return ((last - first) / first) * 100;
}

export default function AnalyticsPage() {
  const { storeId } = useCurrentStoreId();
  const [activePeriod, setActivePeriod] = useState('7 Days');

  const periodParam = PERIOD_MAP[activePeriod];
  const { data: analytics, isLoading, error, refetch } = useAnalytics(storeId ?? '', periodParam);

  if (isLoading || !storeId) {
    return <LoadingState message="Loading analytics..." />;
  }

  if (error) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  if (!analytics) {
    return <EmptyState title="No analytics data" description="Analytics will appear once your store has activity." />;
  }

  const { metrics, trends, topProducts, topCategories } = analytics;
  const revenueGrowth = computeGrowth(trends.revenue);
  const ordersGrowth = computeGrowth(trends.orders);
  const customersGrowth = computeGrowth(trends.customers);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Business intelligence and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm">Export CSV</button>
          <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm">Export PDF</button>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="flex gap-2">
        {Object.keys(PERIOD_MAP).map((range) => (
          <button
            key={range}
            onClick={() => setActivePeriod(range)}
            className={`px-4 py-2 border rounded-lg text-sm ${
              activePeriod === range
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Revenue"
          value={formatCurrency(metrics.revenue)}
          change={revenueGrowth !== null ? formatPercent(revenueGrowth) : '—'}
        />
        <StatCard
          label="Orders"
          value={metrics.orders.toLocaleString()}
          change={ordersGrowth !== null ? formatPercent(ordersGrowth) : '—'}
        />
        <StatCard
          label="Products"
          value={metrics.products.toLocaleString()}
          change="—"
        />
        <StatCard
          label="Customers"
          value={metrics.customers.toLocaleString()}
          change={customersGrowth !== null ? formatPercent(customersGrowth) : '—'}
        />
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GrowthCard
          label="Growth Rate"
          value={revenueGrowth !== null ? formatPercent(revenueGrowth) : '0%'}
        />
        <GrowthCard
          label="Retention Rate"
          value={metrics.conversionRate > 0 ? `${(metrics.conversionRate * 100).toFixed(1)}%` : '0%'}
        />
        <GrowthCard
          label="Conversion Rate"
          value={metrics.conversionRate > 0 ? `${(metrics.conversionRate * 100).toFixed(1)}%` : '0%'}
        />
      </div>

      {/* Top Products & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Products</h2>
          {topProducts.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No products data yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-2 font-medium">Product</th>
                  <th className="pb-2 font-medium text-right">Revenue</th>
                  <th className="pb-2 font-medium text-right">Orders</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.productId} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2.5 text-gray-900 dark:text-white">{p.productName}</td>
                    <td className="py-2.5 text-right text-gray-600 dark:text-gray-400">{formatCurrency(p.revenue)}</td>
                    <td className="py-2.5 text-right text-gray-600 dark:text-gray-400">{p.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Categories</h2>
          {topCategories.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No categories data yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium text-right">Revenue</th>
                  <th className="pb-2 font-medium text-right">Orders</th>
                </tr>
              </thead>
              <tbody>
                {topCategories.map((c) => (
                  <tr key={c.categoryId} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2.5 text-gray-900 dark:text-white">{c.categoryName}</td>
                    <td className="py-2.5 text-right text-gray-600 dark:text-gray-400">{formatCurrency(c.revenue)}</td>
                    <td className="py-2.5 text-right text-gray-600 dark:text-gray-400">{c.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : change.startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>
        {change}
      </p>
    </div>
  );
}

function GrowthCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
    </div>
  );
}
