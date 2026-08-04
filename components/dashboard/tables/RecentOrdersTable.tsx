'use client';


import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import type { RecentOrder } from '@/types/dashboard';
import { cn } from '@/lib/utils';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  processing: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  completed: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  cancelled: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  refunded: 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400'};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

interface RecentOrdersTableProps {
  orders: RecentOrder[];
  isLoading?: boolean;
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className="px-4 py-3"><div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" /></td>
      ))}
    </tr>
  );
}

export function RecentOrdersTable({ orders, isLoading }: RecentOrdersTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800"><div className="h-5 w-32 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" /></div>
        <table className="w-full"><tbody>{Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}</tbody></table>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Customer</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Order ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Amount</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Date</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{order.customer.name}</div>
                    <div className="text-xs text-gray-500">{order.customer.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{order.orderId}</td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{formatCurrency(order.amount, order.currency)}</td>
                <td className="px-4 py-3">
                  <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize', STATUS_STYLES[order.status] || STATUS_STYLES.pending)}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{formatDate(order.date)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={"/dashboard/orders/" + order.orderId} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors" aria-label="View order">
                    <Eye className="h-3.5 w-3.5" /> View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
