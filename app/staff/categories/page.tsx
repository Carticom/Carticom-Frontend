'use client';

import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { useCategoriesByStore } from '@/features/dashboard/hooks/useCategories';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { CategoryStatus } from '@/features/dashboard/types/categories.types';
import type { CategoryDto } from '@/features/dashboard/types/categories.types';
import { motion } from 'framer-motion';

const statusColors: Record<CategoryStatus, string> = {
  [CategoryStatus.ACTIVE]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  [CategoryStatus.INACTIVE]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  [CategoryStatus.ARCHIVED]: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'};

export default function StaffCategoriesPage() {
  const { storeId } = useCurrentStoreId();
  const { data: categories, isLoading, error, refetch } = useCategoriesByStore(storeId ?? '');

  if (!storeId || isLoading) return <LoadingState message="Loading categories..." />;
  if (error) return <ErrorState title="Failed to load categories" onRetry={refetch} />;

  const categoryList = Array.isArray(categories) ? categories : [];

  if (!categoryList.length) return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Browse product categories</p>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <EmptyState
          title="No categories yet"
          description="Categories will appear here once created by the store owner."
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Browse product categories</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Name</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Description</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Products</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((cat: CategoryDto, idx: number) => (
                <motion.tr
                  key={cat.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{cat.name}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 max-w-xs truncate">
                    {cat.description || '—'}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{cat.productCount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[cat.status]}`}>
                      {cat.status.charAt(0) + cat.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
