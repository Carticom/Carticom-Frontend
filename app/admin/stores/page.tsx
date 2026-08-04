'use client';

import { useQuery } from '@tanstack/react-query';
import { adminRepository } from '@/features/admin/repositories/admin.repository';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });
}

interface Store {
  id: string;
  name: string;
  ownerName: string;
  status: string;
  productsCount: number;
  createdAt: string;
}

export default function AdminStoresPage() {
  const { data: stores, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'stores'],
    queryFn: async () => {
      const page = await adminRepository.getStores<Store>();
      return page?.content ?? [];
    }});

  if (isLoading) return <LoadingState message="Loading stores..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  if (!stores?.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Stores</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all platform stores</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <EmptyState title="No stores found" description="No stores have been created yet." />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Stores</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all platform stores</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Store Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Owner</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Products</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Created</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store: { id: string; name: string; ownerName: string; status: string; productsCount: number; createdAt: string }) => (
                <tr key={store.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{store.name}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{store.ownerName}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      store.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {store.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{store.productsCount}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(store.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
