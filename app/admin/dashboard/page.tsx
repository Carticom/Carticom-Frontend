'use client';

import { useQuery } from '@tanstack/react-query';
import { adminRepository } from '@/features/admin/repositories/admin.repository';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Users, Store, ShoppingCart, TrendingUp } from 'lucide-react';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0}).format(amount);
}

export default function AdminDashboardPage() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => adminRepository.getDashboard<Record<string, number>>()});

  if (isLoading) return <LoadingState message="Loading dashboard..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  const kpis = [
    { label: 'Total Users', value: data?.totalUsers?.toLocaleString() ?? '0', icon: Users, color: 'text-blue-600' },
    { label: 'Total Stores', value: data?.totalStores?.toLocaleString() ?? '0', icon: Store, color: 'text-emerald-600' },
    { label: 'Total Orders', value: data?.totalOrders?.toLocaleString() ?? '0', icon: ShoppingCart, color: 'text-purple-600' },
    { label: 'Total Revenue', value: formatCurrency(data?.totalRevenue ?? 0), icon: TrendingUp, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Platform overview and key metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">{kpi.label}</p>
                <Icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
