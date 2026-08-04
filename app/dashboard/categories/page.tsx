'use client';

import { useState } from 'react';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { useCategoriesByStore, useCreateCategory, useDeleteCategory } from '@/features/dashboard/hooks/useCategories';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';
import { CategoryStatus, type CategoryDto } from '@/features/dashboard/types/categories.types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const statusColors: Record<CategoryStatus, string> = {
  [CategoryStatus.ACTIVE]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  [CategoryStatus.INACTIVE]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  [CategoryStatus.ARCHIVED]: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'};

export default function CategoriesPage() {
  const { storeId } = useCurrentStoreId();
  const { data: categories, isLoading, error, refetch } = useCategoriesByStore(storeId ?? '');
  const createMutation = useCreateCategory();
  const deleteMutation = useDeleteCategory();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createMutation.mutate({ name: name.trim(), description: description.trim() || undefined }, {
      onSuccess: () => {
        setName('');
        setDescription('');
        setShowForm(false);
      }});
  };

  const handleDelete = (cat: CategoryDto) => {
    if (window.confirm(`Delete category "${cat.name}"? This action cannot be undone.`)) {
      deleteMutation.mutate(cat.id);
    }
  };

  if (isLoading) return <LoadingState message="Loading categories..." />;
  if (error) return <ErrorState title="Failed to load categories" onRetry={refetch} />;

  const categoryList = Array.isArray(categories) ? categories : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Organize your products with categories
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creating...' : 'Create Category'}
            </Button>
          </div>
        </form>
      )}

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        {categoryList.length === 0 ? (
          <EmptyState
            title="No categories yet"
            description="Create your first category to organize products."
            action={{
              label: 'Add Category',
              onClick: () => setShowForm(true)}}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Description</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Products</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.map((cat) => (
                  <tr key={cat.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
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
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(cat)}
                        className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
