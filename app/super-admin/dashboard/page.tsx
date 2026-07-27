'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { ErrorState, LoadingState } from '@/components/dashboard/shared/StateComponents';
import { KpiGrid, type KpiCardData } from '@/components/dashboard/cards/KpiCards';
import { SalesBarChart, RevenueLineChart, TargetProgressCard, DemographicCard } from '@/components/dashboard/charts/ChartCard';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { Users, Store, ShoppingCart, DollarSign, Crown, TrendingUp, Loader2 } from 'lucide-react';

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

const MONTHLY_SALES_DATA = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
];

const REVENUE_DATA = [
  { name: 'Jan', revenue: 5000, orders: 40 },
  { name: 'Feb', revenue: 3500, orders: 30 },
  { name: 'Mar', revenue: 8200, orders: 65 },
  { name: 'Apr', revenue: 4200, orders: 35 },
  { name: 'May', revenue: 6100, orders: 50 },
  { name: 'Jun', revenue: 7800, orders: 62 },
  { name: 'Jul', revenue: 9300, orders: 75 },
];

const DEMOGRAPHIC_DATA = [
  { country: 'Nigeria', flag: '🇳🇬', customers: 4821, percentage: 79 },
  { country: 'Ghana', flag: '🇬🇭', customers: 1056, percentage: 23 },
  { country: 'Kenya', flag: '🇰🇪', customers: 843, percentage: 16 },
  { country: 'South Africa', flag: '🇿🇦', customers: 612, percentage: 13 },
];

export default function SuperAdminDashboardPage() {
  const { data: metrics, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'dashboard'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/super-admin/dashboard');
      return res.data.data as DashboardMetrics;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/50" />
      </div>
    );
  }
  if (error) return <ErrorState onRetry={() => refetch()} />;

  const kpiCards: KpiCardData[] = [
    {
      id: 'total-users',
      label: 'Total Users',
      value: (metrics?.totalUsers ?? 0).toLocaleString(),
      change: '+11.01%',
      changeType: 'positive',
      icon: Users,
    },
    {
      id: 'total-stores',
      label: 'Total Stores',
      value: (metrics?.totalStores ?? 0).toLocaleString(),
      change: '+9.05%',
      changeType: 'positive',
      icon: Store,
    },
    {
      id: 'total-orders',
      label: 'Total Orders',
      value: (metrics?.totalOrders ?? 0).toLocaleString(),
      change: '+5.2%',
      changeType: 'positive',
      icon: ShoppingCart,
    },
    {
      id: 'total-revenue',
      label: 'Total Revenue',
      value: formatCurrency(metrics?.totalRevenue ?? 0),
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Platform Overview</h1>
          <p className="text-sm text-muted-foreground">Platform-wide KPIs and metrics</p>
        </div>
      </FadeIn>

      <KpiGrid cards={kpiCards} />

      <FadeIn delay={0.1}>
        <StaggerGrid className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          <StaggerItem>
            <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="rounded-xl border bg-card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Active Subscriptions</p>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Crown className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground tracking-tight">{metrics?.activeSubscriptions ?? 0}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-600">+3.2%</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </motion.div>
          </StaggerItem>

          {[
            { label: 'Avg Revenue/Store', value: formatCurrency(metrics?.totalStores ? (metrics.totalRevenue / metrics.totalStores) : 0) },
            { label: 'Avg Orders/Store', value: Math.round(metrics?.totalStores ? (metrics.totalOrders / metrics.totalStores) : 0).toLocaleString() },
            { label: 'Conversion Rate', value: '3.24%', change: '+0.8%' },
          ].map((stat) => (
            <StaggerItem key={stat.label}>
              <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="rounded-xl border bg-card p-5"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold text-foreground tracking-tight mt-1.5">{stat.value}</p>
                {'change' in stat && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <SalesBarChart data={MONTHLY_SALES_DATA} />
          </div>
          <div>
            <TargetProgressCard percentage={55} target="₦50M" revenue="₦27.5M" today="₦1.2M" />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RevenueLineChart data={REVENUE_DATA} />
          </div>
          <div>
            <DemographicCard data={DEMOGRAPHIC_DATA} />
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
