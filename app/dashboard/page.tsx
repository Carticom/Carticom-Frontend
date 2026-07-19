'use client';

import { useMemo, useState, useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useBusinessOwnerDashboard } from '@/features/business-owner/hooks/useBusinessOwner';
import { KpiGrid } from '@/components/dashboard/cards/KpiCards';
import { RecentOrdersTable } from '@/components/dashboard/tables/RecentOrdersTable';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';
import { DollarSign, ShoppingCart, Wallet, Shield, Users } from 'lucide-react';
import type { KpiCardData, RecentOrder } from '@/types/dashboard';
import type { OrderSummaryDTO } from '@/features/business-owner/types';

function toRecentOrder(o: OrderSummaryDTO): RecentOrder {
  return {
    id: o.id,
    orderId: o.orderId,
    customer: { name: o.customerName, email: o.customerEmail },
    amount: o.total,
    currency: o.currency || 'NGN',
    status: (o.status?.toLowerCase() ?? 'pending') as RecentOrder['status'],
    items: o.items,
    date: o.createdAt,
  };
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { data: dashboard, isLoading, error, refetch } = useBusinessOwnerDashboard();
  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

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
  const orders = useMemo(() => (dashboard.recentOrders ?? []).map(toRecentOrder), [dashboard.recentOrders]);

  const kpiCards: KpiCardData[] = [
    {
      id: 'available-revenue',
      label: 'Available Revenue',
      value: formatCurrency(dashboard.availableRevenue),
      prefix: '₦',
      change: '',
      trend: 'up',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      id: 'pending-orders',
      label: 'Pending Orders',
      value: String(dashboard.pendingOrders ?? 0),
      change: '',
      trend: dashboard.pendingOrders > 0 ? 'up' : 'flat',
      changeType: dashboard.pendingOrders > 0 ? 'neutral' : 'neutral',
      icon: ShoppingCart,
    },
    {
      id: 'wallet',
      label: 'Lifetime Revenue',
      value: formatCurrency(dashboard.lifetimeRevenue),
      prefix: '₦',
      change: '',
      trend: 'up',
      changeType: 'positive',
      icon: Wallet,
    },
    {
      id: 'trust',
      label: `Trust Score (${dashboard.trustLevel})`,
      value: String(dashboard.trustScore ?? 0),
      change: `Active Disputes: ${dashboard.activeDisputes ?? 0}`,
      trend: (dashboard.activeDisputes ?? 0) === 0 ? 'up' : 'down',
      changeType: (dashboard.activeDisputes ?? 0) === 0 ? 'positive' : 'negative',
      icon: Shield,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {greeting}, {firstName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{businessName}</p>
      </div>

      <KpiGrid cards={kpiCards} isLoading={isLoading} />

      {dashboard.activeDisputes > 0 && (
        <div className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 p-4">
          <p className="text-sm text-red-700 dark:text-red-400">
            You have <strong>{dashboard.activeDisputes}</strong> active dispute{dashboard.activeDisputes !== 1 ? 's' : ''}.
            {' '}Please resolve them to maintain your trust score.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Pending Revenue</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            ₦{formatCurrency(dashboard.pendingRevenue)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Withdrawn</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            ₦{formatCurrency(dashboard.totalWithdrawn)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Delivery</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {dashboard.averageDeliveryTime?.toFixed(1) ?? '—'} days
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
        {orders.length > 0 ? (
          <RecentOrdersTable orders={orders} />
        ) : (
          <EmptyState
            title="No orders yet"
            description="Start by adding products to your store."
            action={{
              label: 'Add Product',
              onClick: () => { window.location.href = '/dashboard/products'; },
            }}
          />
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <QuickAction label="Add Product" href="/dashboard/products" />
        <QuickAction label="Invite Staff" href="/dashboard/team" />
        <QuickAction label="Connect AI" href="/dashboard/ai" />
        <QuickAction label="Withdraw Funds" href="/dashboard/wallet" />
        <QuickAction label="Share Store" href="/dashboard/store" />
      </div>
    </div>
  );
}

function QuickAction({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
    >
      <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
    </a>
  );
}
