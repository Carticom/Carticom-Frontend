'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superAdminRepository } from '@/features/admin/repositories/admin.repository';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Button } from '@/components/ui/button';

interface StoreEntry {
  id: string;
  name: string;
  ownerName: string;
  status: string;
  productsCount: number;
  revenue: number;
  createdAt: string;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    SUSPENDED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    INACTIVE: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'};
  return map[status] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
}

export default function SuperAdminStoresPage() {
  const queryClient = useQueryClient();

  const { data: stores, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'stores'],
    queryFn: async () => {
      const page = await superAdminRepository.getStores<StoreEntry>();
      return page?.content ?? [];
    }});

  const toggleMutation = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: 'suspend' | 'activate' }) => {
      await superAdminRepository.updateStoreStatus(id, action);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['super-admin', 'stores'] });
    }});

  if (isLoading) return <LoadingState message="Loading stores..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;
  if (!stores?.length) return <EmptyState title="No stores found" description="No stores have been created yet." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Stores</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all stores on the platform</p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Store Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Owner</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Products</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Created</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{store.name}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{store.ownerName}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(store.status)}`}>{store.status}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{store.productsCount}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{formatCurrency(store.revenue)}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(store.createdAt)}</td>
                  <td className="py-3 px-4">
                    {store.status === 'SUSPENDED' ? (
                      <Button size="xs" variant="outline" onClick={() => toggleMutation.mutate({ id: store.id, action: 'activate' })} disabled={toggleMutation.isPending}>
                        Activate
                      </Button>
                    ) : (
                      <Button size="xs" variant="destructive" onClick={() => toggleMutation.mutate({ id: store.id, action: 'suspend' })} disabled={toggleMutation.isPending}>
                        Suspend
                      </Button>
                    )}
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
