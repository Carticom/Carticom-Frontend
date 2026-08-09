'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminRepository } from '@/features/admin/repositories/admin.repository';
import { businessOwnerService } from '@/features/business-owner/services/business-owner.service';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';
import { TrendingUp, PiggyBank, Wallet, Clock } from 'lucide-react';
import { showToast } from '@/lib/notifications/toast';

interface AdminSettlementStats {
  totalGross: number;
  totalCommission: number;
  totalNet: number;
  pendingCount: number;
}

interface AdminSettlement {
  id: string;
  orderId: string;
  storeId: string;
  sellerId: string;
  amount: number;
  commission: number;
  sellerPayout: number;
  status: string;
  settledAt?: number | null;
  createdAt: string;
}

interface AdminSettlementsOverview {
  settlements: AdminSettlement[];
  totalElements: number;
  totalPages: number;
  stats: AdminSettlementStats;
}

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

function shortId(id: string): string {
  return id.slice(0, 8).toUpperCase();
}

const STATUS_STYLES: Record<string, string> = {
  PENDING_SETTLEMENT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  SETTLED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  REFUNDED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-800'}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

export default function AdminSettlementsPage() {
  const queryClient = useQueryClient();

  const { data: overview, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'settlements'],
    queryFn: () => adminRepository.getAdminSettlements<AdminSettlementsOverview>()});

  const releaseMutation = useMutation({
    mutationFn: (orderId: string) => businessOwnerService.releaseSettlement(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'settlements'] });
      queryClient.invalidateQueries({ queryKey: ['business-owner', 'settlements'] });
      showToast('success', 'Settlement released', { description: 'The seller wallet has been credited.'});
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to release settlement', { description: error.message});
    }});

  const refundMutation = useMutation({
    mutationFn: (orderId: string) => businessOwnerService.refundSettlement(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'settlements'] });
      queryClient.invalidateQueries({ queryKey: ['business-owner', 'settlements'] });
      showToast('success', 'Settlement refunded', { description: 'The order and settlement have been marked as refunded.'});
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to refund settlement', { description: error.message});
    }});

  if (isLoading) return <LoadingState message="Loading settlements..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  const stats = overview?.stats ?? { totalGross: 0, totalCommission: 0, totalNet: 0, pendingCount: 0 };
  const settlements = overview?.settlements ?? [];

  const summaryCards = [
    { label: 'Total Gross', value: formatCurrency(stats.totalGross), icon: TrendingUp, color: 'text-green-600' },
    { label: 'Commission', value: formatCurrency(stats.totalCommission), icon: Wallet, color: 'text-purple-600' },
    { label: 'Net Payout', value: formatCurrency(stats.totalNet), icon: PiggyBank, color: 'text-blue-600' },
    { label: 'Pending', value: stats.pendingCount.toLocaleString(), icon: Clock, color: 'text-yellow-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settlements</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Platform-wide payouts, commissions, and refunds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.label}</p>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          All Settlements ({overview?.totalElements ?? 0})
        </h2>
        {settlements.length === 0 ? (
          <EmptyState title="No settlements found" description="Settlements will appear once orders are released for payout." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Order Ref</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Store</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Gross</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Commission</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Net</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {settlements.map((settlement: AdminSettlement) => (
                  <tr key={settlement.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-mono text-xs text-gray-900 dark:text-white">{shortId(settlement.orderId)}</td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-600 dark:text-gray-400">{shortId(settlement.storeId)}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{formatCurrency(settlement.amount)}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{formatCurrency(settlement.commission)}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{formatCurrency(settlement.sellerPayout)}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={settlement.status} />
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(settlement.createdAt)}</td>
                    <td className="py-3 px-4">
                      {settlement.status === 'PENDING_SETTLEMENT' && (
                        <button
                          onClick={() => releaseMutation.mutate(settlement.orderId)}
                          disabled={releaseMutation.isPending}
                          className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                          Release
                        </button>
                      )}
                      {settlement.status === 'SETTLED' && (
                        <button
                          onClick={() => refundMutation.mutate(settlement.orderId)}
                          disabled={refundMutation.isPending}
                          className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                        >
                          Refund
                        </button>
                      )}
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