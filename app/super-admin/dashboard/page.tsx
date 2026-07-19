'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { ErrorState, SkeletonCardGrid } from '@/components/dashboard/shared/StateComponents';
import { Users, Store, ShoppingCart, DollarSign, Crown, TrendingUp, Package } from 'lucide-react';

interface DashboardMetrics {
  totalUsers: number;
  totalStores: number;
  totalOrders: number;
  totalRevenue: number;
  activeSubscriptions: number;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

export default function SuperAdminDashboardPage() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'dashboard'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/super-admin/dashboard');
      return res.data.data as DashboardMetrics;
    },
  });

  if (isLoading) return <SkeletonCardGrid count={5} />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  const cards = [
    { label: 'Total Users', value: data?.totalUsers ?? 0, icon: Users, color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20' },
    { label: 'Total Stores', value: data?.totalStores ?? 0, icon: Store, color: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20' },
    { label: 'Total Orders', value: data?.totalOrders ?? 0, icon: ShoppingCart, color: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20' },
    { label: 'Total Revenue', value: formatCurrency(data?.totalRevenue ?? 0), icon: DollarSign, color: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20' },
    { label: 'Active Subscriptions', value: data?.activeSubscriptions ?? 0, icon: Crown, color: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-900/20' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Super Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Platform-wide overview and KPIs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.label}</span>
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
