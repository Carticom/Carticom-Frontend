'use client';

import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { useOrdersByStatus } from '@/features/dashboard/hooks/useOrders';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { OrderStatus } from '@/features/dashboard/types/orders.types';
import { Package, ShoppingCart, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const quickLinks = [
  { label: 'View Orders', href: '/staff/orders', description: 'Manage and track orders' },
  { label: 'View Products', href: '/staff/products', description: 'Browse product catalog' },
  { label: 'View Customers', href: '/staff/customers', description: 'View customer list' },
  { label: 'View Categories', href: '/staff/categories', description: 'Browse categories' },
];

export default function StaffDashboardPage() {
  const { storeId } = useCurrentStoreId();

  const { data: todayOrders, isLoading: todayLoading, error: todayError, refetch: refetchToday } = useOrdersByStatus(storeId ?? '', OrderStatus.PAID);
  const { data: pendingOrders, isLoading: pendingLoading, error: pendingError, refetch: refetchPending } = useOrdersByStatus(storeId ?? '', OrderStatus.PENDING);
  const { data: processingOrders, isLoading: processingLoading, error: processingError, refetch: refetchProcessing } = useOrdersByStatus(storeId ?? '', OrderStatus.PROCESSING);

  if (!storeId) return <LoadingState message="Loading store..." />;

  const isLoading = todayLoading || pendingLoading || processingLoading;
  const hasError = todayError || pendingError || processingError;

  if (hasError) {
    return (
      <ErrorState
        title="Failed to load dashboard data"
        onRetry={() => { refetchToday(); refetchPending(); refetchProcessing(); }}
      />
    );
  }

  const kpis = [
    { label: 'Paid Orders Today', value: Array.isArray(todayOrders) ? todayOrders.length : 0, icon: ShoppingCart, color: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20' },
    { label: 'Pending Orders', value: Array.isArray(pendingOrders) ? pendingOrders.length : 0, icon: Clock, color: 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20' },
    { label: 'Processing Orders', value: Array.isArray(processingOrders) ? processingOrders.length : 0, icon: Package, color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Staff Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor store operations at a glance</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi, idx) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{kpi.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{kpi.value}</p>
                </div>
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{link.label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
