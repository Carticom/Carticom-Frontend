'use client';

import { useState, useMemo } from 'react';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import Image from 'next/image';
import { useCustomers } from '@/features/dashboard/hooks/useCustomers';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import type { CustomerDto } from '@/features/dashboard/types/customers.types';
import { Download } from 'lucide-react';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function exportCustomersCsv(customers: CustomerDto[]) {
  const headers = ['Name', 'Email', 'Phone', 'Orders', 'Total Spent', 'Joined'];
  const rows = customers.map(c => [
    `${c.firstName} ${c.lastName}`,
    c.email,
    c.phone || '',
    c.totalOrders?.toString() || '0',
    c.totalSpent?.toString() || '0',
    c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'customers.csv'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}

export default function CustomersPage() {
  const { storeId } = useCurrentStoreId();
  const [search, setSearch] = useState('');
  const { data: customers, isLoading, error, refetch } = useCustomers(storeId ?? '', { page: 0, limit: 50 });

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];
    if (!search.trim()) return customers;
    const q = search.toLowerCase();
    return customers.filter((c: CustomerDto) =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.phone && c.phone.toLowerCase().includes(q))
    );
  }, [customers, search]);

  if (!storeId || isLoading) return <LoadingState message="Loading customers..." />;
  if (error) return <ErrorState title="Failed to load customers" onRetry={refetch} />;
  if (!customers?.length) return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your customer relationships</p>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <EmptyState
          title="No customers yet"
          description="Customers will appear here after their first purchase."
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your customer relationships</p>
        </div>
        <button
          onClick={() => exportCustomersCsv(filteredCustomers)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Orders</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Total Spent</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer: CustomerDto) => (
                <tr key={customer.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {customer.avatarUrl ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden"><Image src={customer.avatarUrl} alt={`${customer.firstName} ${customer.lastName}`} fill unoptimized className="object-cover bg-gray-100 dark:bg-gray-800" /></div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-medium">
                          {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                        </div>
                      )}
                      <span className="font-medium text-gray-900 dark:text-white">{customer.firstName} {customer.lastName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{customer.email}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{customer.phone || '—'}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{customer.totalOrders}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{formatCurrency(customer.totalSpent)}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(customer.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
