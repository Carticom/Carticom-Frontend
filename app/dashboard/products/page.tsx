'use client';

import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { useProductsByStore, useDeleteProduct } from '@/features/dashboard/hooks/useProducts';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { ProductStatus } from '@/features/dashboard/types/products.types';
import type { ProductDto } from '@/features/dashboard/types/products.types';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function statusBadgeClasses(status: ProductStatus) {
  const map: Record<string, string> = {
    [ProductStatus.ACTIVE]: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
    [ProductStatus.DRAFT]: 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20',
    [ProductStatus.ARCHIVED]: 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20',
    [ProductStatus.OUT_OF_STOCK]: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20',
  };
  return map[status] ?? 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20';
}

export default function ProductsPage() {
  const { storeId } = useCurrentStoreId();
  const { data: products, isLoading, error, refetch } = useProductsByStore(storeId ?? '');
  const deleteProduct = useDeleteProduct();

  if (!storeId || isLoading) return <LoadingState message="Loading products..." />;
  if (error) return <ErrorState title="Failed to load products" onRetry={refetch} />;
  if (!products?.length) return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your product catalog</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Add Product</button>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <EmptyState
          title="No products yet"
          description="Create your first product to start selling."
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your product catalog</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Add Product</button>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
              Filter
            </button>
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
              Sort
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">SKU</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Inventory</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Created</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: ProductDto) => (
                <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-gray-800" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-xs">
                          N/A
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                        {product.categoryName && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{product.categoryName}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 font-mono text-xs">{product.sku || '—'}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{formatCurrency(product.price)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClasses(product.status)}`}>
                      {product.status === ProductStatus.OUT_OF_STOCK ? 'Out of Stock' : product.status.charAt(0) + product.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{product.inventory.quantity}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(product.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
