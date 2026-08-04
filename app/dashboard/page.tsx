'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useBusinessOwnerDashboard, useBusinessOwnerAnalytics } from '@/features/business-owner/hooks/useBusinessOwner';
import { KpiGrid, type KpiCardData } from '@/components/dashboard/cards/KpiCards';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { StaggerGrid, StaggerItem, FadeIn } from '@/components/ui/motion';
import { CountUp } from '@/components/ui/count-up';
import { DollarSign, ShoppingCart, Shield, TrendingUp, Loader2, ArrowRight, BarChart3 } from 'lucide-react';
import type { RecentOrder } from '@/types/dashboard';
import type { OrderSummaryDTO } from '@/features/business-owner/types';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';

const SalesBarChart = dynamic(() => import('@/components/dashboard/charts/ChartCard').then(m => ({ default: m.SalesBarChart })), {
  loading: () => <ChartSkeleton />});

const RevenueLineChart = dynamic(() => import('@/components/dashboard/charts/ChartCard').then(m => ({ default: m.RevenueLineChart })), {
  loading: () => <ChartSkeleton />});

const TargetProgressCard = dynamic(() => import('@/components/dashboard/charts/ChartCard').then(m => ({ default: m.TargetProgressCard })), {
  loading: () => <ChartSkeleton />});

const DemographicCard = dynamic(() => import('@/components/dashboard/charts/ChartCard').then(m => ({ default: m.DemographicCard })), {
  loading: () => <ChartSkeleton />});

const RecentOrdersCard = dynamic(() => import('@/components/dashboard/charts/ChartCard').then(m => ({ default: m.RecentOrdersCard })), {
  loading: () => <ChartSkeleton />});

function ChartSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-5 h-80 flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/50" />
    </div>
  );
}

function toRecentOrder(o: OrderSummaryDTO): RecentOrder {
  return {
    id: o.id,
    orderId: o.orderId,
    customer: { name: o.customerName, email: o.customerEmail },
    amount: o.total,
    currency: o.currency || 'NGN',
    status: (o.status?.toLowerCase() ?? 'pending') as RecentOrder['status'],
    items: o.items,
    date: o.createdAt};
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-600',
  processing: 'bg-blue-50 text-blue-600',
  completed: 'bg-emerald-50 text-emerald-600',
  cancelled: 'bg-red-50 text-red-600',
  refunded: 'bg-muted text-muted-foreground'};

function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function greetingForHour(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { data: dashboard, isLoading, error, refetch } = useBusinessOwnerDashboard();
  const { data: analytics } = useBusinessOwnerAnalytics('monthly');
  const [greeting] = useState(greetingForHour);

  const orders = useMemo(() => (dashboard?.recentOrders ?? []).map(toRecentOrder), [dashboard?.recentOrders]);

  if (isLoading) {
    return <LoadingState message="Loading your dashboard..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load dashboard"
        description={error instanceof Error ? error.message : 'We encountered an error loading your data. Please try again.'}
        onRetry={refetch}
      />
    );
  }

  if (!dashboard) return null;

  const firstName = user?.fullName?.split(' ')[0] || 'User';
  const businessName = user?.businessName || 'Welcome to Carticom';

  const kpiCards: KpiCardData[] = [
    {
      id: 'available-revenue',
      label: 'Available Revenue',
      value: `₦${formatCurrency(dashboard.availableRevenue)}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign},
    {
      id: 'pending-orders',
      label: 'Pending Orders',
      value: String(dashboard.pendingOrders ?? 0),
      change: dashboard.pendingOrders > 0 ? '+3 this week' : 'No change',
      changeType: 'neutral',
      icon: ShoppingCart},
    {
      id: 'lifetime-revenue',
      label: 'Lifetime Revenue',
      value: `₦${formatCurrency(dashboard.lifetimeRevenue)}`,
      change: '+8.1%',
      changeType: 'positive',
      icon: TrendingUp},
    {
      id: 'trust-score',
      label: 'Trust Score',
      value: String(dashboard.trustScore ?? 0),
      change: dashboard.activeDisputes > 0 ? `${dashboard.activeDisputes} active disputes` : 'No disputes',
      changeType: dashboard.activeDisputes === 0 ? 'positive' : 'negative',
      icon: Shield},
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              {greeting}, {firstName}
            </h1>
            <p className="text-sm text-muted-foreground">{businessName}</p>
          </div>
        </div>
      </FadeIn>

      <KpiGrid cards={kpiCards} isLoading={isLoading} />

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            {analytics?.length ? (
              <SalesBarChart data={analytics.map((a) => ({
                name: a.period,
                sales: a.orders,
                revenue: a.revenue}))} />
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white p-8 flex flex-col items-center justify-center text-center">
                <BarChart3 className="h-10 w-10 text-gray-300 mb-3" />
                <p className="text-sm text-gray-500 font-medium">No sales yet</p>
                <p className="text-xs text-gray-400 mt-1 mb-4">Your monthly sales chart will appear here after your first order</p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/storefront">View your storefront</Link>
                </Button>
              </div>
            )}
          </div>
          <div>
            <TargetProgressCard percentage={dashboard.trustScore ?? 0} target="₦20M" revenue={`₦${formatCurrency(dashboard.lifetimeRevenue ?? 0)}`} today="₦0" />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            {analytics?.length ? (
              <RevenueLineChart data={analytics.map((a) => ({
                name: a.period,
                revenue: a.revenue,
                orders: a.orders}))} />
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white p-8 flex flex-col items-center justify-center text-center">
                <BarChart3 className="h-10 w-10 text-gray-300 mb-3" />
                <p className="text-sm text-gray-500 font-medium">No revenue yet</p>
                <p className="text-xs text-gray-400 mt-1 mb-4">Revenue trends will appear here once your first payment is completed</p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/products">Add your first product</Link>
                </Button>
              </div>
            )}
          </div>
          <div>
            <DemographicCard data={[{ country: 'Nigeria', flag: '🇳🇬', customers: dashboard.recentOrders?.length ?? 0, percentage: 100 }]} />
          </div>
        </div>
      </FadeIn>

      <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Pending Revenue', value: dashboard.pendingRevenue, prefix: '₦', format: (v: number) => formatCurrency(v) },
          { label: 'Total Withdrawn', value: dashboard.totalWithdrawn, prefix: '₦', format: (v: number) => formatCurrency(v) },
          { label: 'Avg Delivery Time', value: dashboard.averageDeliveryTime ?? 0, suffix: ' days', format: (v: number) => v?.toFixed(1) ?? '—' },
        ].map((stat) => (
          <StaggerItem key={stat.label}>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="rounded-xl border bg-card p-4"
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <p className="text-lg font-semibold text-foreground mt-1.5">
                {stat.prefix}<CountUp from={0} to={stat.value} duration={1.5} decimals={0} />{stat.suffix ?? ''}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {dashboard.activeDisputes > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="rounded-xl border border-amber-200 bg-amber-50 p-4"
        >
          <p className="text-sm text-amber-800 font-medium">
            You have <strong>{dashboard.activeDisputes}</strong> active dispute{dashboard.activeDisputes !== 1 ? 's' : ''}.
            {' '}Please resolve them to maintain your trust score.
          </p>
        </motion.div>
      )}

      <RecentOrdersCard>
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">Customer</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">Order</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">Amount</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">Items</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-right font-medium text-muted-foreground text-xs uppercase tracking-wider" />
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-semibold">
                          {order.customer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm">{order.customer.name}</div>
                          <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">#{order.orderId}</td>
                    <td className="px-5 py-3.5 font-semibold text-foreground text-sm">
                      {new Intl.NumberFormat('en-NG', { style: 'currency', currency: order.currency, minimumFractionDigits: 0 }).format(order.amount)}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground text-sm">{order.items} item{order.items !== 1 ? 's' : ''}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize', STATUS_STYLES[order.status] || STATUS_STYLES.pending)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/dashboard/orders/${order.orderId}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={<ShoppingCart className="h-6 w-6 text-muted-foreground" />}
            title="No orders yet"
            description="Start by adding products to your store."
            action={
              <Link href="/dashboard/products">
                <Button size="sm">Add Product</Button>
              </Link>
            }
          />
        )}
      </RecentOrdersCard>
    </div>
  );
}
