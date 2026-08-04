'use client';

import { useQuery } from '@tanstack/react-query';
import { superAdminRepository } from '@/features/admin/repositories/admin.repository';
import { ErrorState } from '@/components/dashboard/shared/StateComponents';
import { KpiGrid, type KpiCardData } from '@/components/dashboard/cards/KpiCards';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { Users, Store, ShoppingCart, DollarSign, Crown, TrendingUp, Loader2 } from 'lucide-react';

interface DashboardMetrics {
  totalBusinesses: number;
  totalStores: number;
  totalOrders: number;
  totalRevenue: number;
  activeSubscriptions: number;
  totalUsers: number;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

export default function SuperAdminDashboardPage() {
  const { data: metrics, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'dashboard'],
    queryFn: () => superAdminRepository.getDashboard<DashboardMetrics>()});

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
      icon: Users},
    {
      id: 'total-stores',
      label: 'Total Stores',
      value: (metrics?.totalStores ?? 0).toLocaleString(),
      icon: Store},
    {
      id: 'total-orders',
      label: 'Total Orders',
      value: (metrics?.totalOrders ?? 0).toLocaleString(),
      icon: ShoppingCart},
    {
      id: 'total-revenue',
      label: 'Total Revenue',
      value: formatCurrency(metrics?.totalRevenue ?? 0),
      icon: DollarSign},
  ];

  const derivedStats = [
    {
      label: 'Total Businesses',
      value: (metrics?.totalBusinesses ?? 0).toLocaleString()},
    {
      label: 'Active Subscriptions',
      value: (metrics?.activeSubscriptions ?? 0).toLocaleString(),
      icon: Crown},
    {
      label: 'Avg Revenue/Store',
      value: formatCurrency(metrics?.totalStores ? (metrics.totalRevenue ?? 0) / metrics.totalStores : 0)},
    {
      label: 'Avg Orders/Store',
      value: Math.round(metrics?.totalStores ? (metrics.totalOrders ?? 0) / metrics.totalStores : 0).toLocaleString()},
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
          {derivedStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="rounded-xl border bg-card p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                  {'icon' in stat && stat.icon ? (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <stat.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <p className="text-2xl font-semibold text-foreground tracking-tight mt-1.5">{stat.value}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </FadeIn>
    </div>
  );
}
