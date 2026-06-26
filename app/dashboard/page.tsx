// ============================================================
// CARTICOM — Dashboard Home
// ============================================================

import { Metadata } from 'next';
import { RoleGuard } from '@/features/auth/components/RoleGuard';
import { BUSINESS_OWNER_ONLY, AUTHENTICATED_USERS } from '@/features/auth/components/RoleGuard';

export const metadata: Metadata = {
  title: 'Dashboard | Carticom',
  description: 'Your Carticom business dashboard',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%' },
          { label: 'Orders', value: '1,234', change: '+12.5%' },
          { label: 'Customers', value: '5,678', change: '+8.2%' },
          { label: 'Products', value: '89', change: '+3.1%' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-green-600 dark:text-green-400">
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No recent activity to display.
          </p>
        </div>
      </div>
    </div>
  );
}