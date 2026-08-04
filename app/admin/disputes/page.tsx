'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminRepository } from '@/features/admin/repositories/admin.repository';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const statusBadge: Record<string, string> = {
  OPEN: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  RESOLVED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  DISMISSED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0}).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });
}

interface Dispute {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function AdminDisputesPage() {
  const queryClient = useQueryClient();
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  const { data: disputes, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'disputes'],
    queryFn: async () => {
      const page = await adminRepository.getDisputes<Dispute>();
      return page?.content ?? [];
    }});

  const resolveMutation = useMutation({
    mutationFn: async (id: string) => {
      await adminRepository.resolveDispute(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'disputes'] });
      setResolvingId(null);
    },
    onError: () => {
      setResolvingId(null);
    }});

  if (isLoading) return <LoadingState message="Loading disputes..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  if (!disputes?.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Disputes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and resolve platform disputes</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <EmptyState title="No disputes found" description="All disputes are resolved. No open disputes at this time." />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Disputes</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and resolve platform disputes</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Dispute ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {disputes.map((dispute: { id: string; orderId: string; customerName: string; amount: number; status: string; createdAt: string }) => (
                <tr key={dispute.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-mono text-xs text-gray-900 dark:text-white">#{dispute.id.slice(0, 8)}</td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-600 dark:text-gray-400">#{dispute.orderId.slice(0, 8)}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{dispute.customerName}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{formatCurrency(dispute.amount)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[dispute.status] ?? 'bg-gray-100 text-gray-800'}`}>
                      {dispute.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(dispute.createdAt)}</td>
                  <td className="py-3 px-4">
                    {dispute.status === 'OPEN' && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={resolveMutation.isPending && resolvingId === dispute.id}
                        onClick={() => {
                          setResolvingId(dispute.id);
                          resolveMutation.mutate(dispute.id);
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {resolveMutation.isPending && resolvingId === dispute.id ? 'Resolving...' : 'Resolve'}
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
