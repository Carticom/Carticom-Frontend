'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';

interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  features: string[];
  status: string;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    INACTIVE: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
    ARCHIVED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };
  return map[status] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
}

export default function SuperAdminPlansPage() {
  const { data: plans, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'plans'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/super-admin/plans');
      return (res.data.data ?? []) as Plan[];
    },
  });

  if (isLoading) return <LoadingState message="Loading plans..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;
  if (!plans?.length) return <EmptyState title="No plans found" description="No subscription plans have been created yet." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription Plans</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">View and manage platform subscription plans</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Plan Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Billing Cycle</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Features</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{plan.name}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{plan.price ? formatCurrency(plan.price) : '—'}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 capitalize">{(plan.billingCycle ?? '').toLowerCase() || '—'}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {(plan.features ?? []).map((f, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{f}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(plan.status ?? '')}`}>{plan.status || '—'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
