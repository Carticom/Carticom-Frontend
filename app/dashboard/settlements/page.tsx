'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { businessOwnerService } from '@/features/business-owner/services/business-owner.service';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';
import { showToast } from '@/lib/notifications/toast';
import type { SettlementDTO } from '@/features/business-owner/types';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0}).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'});
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit'});
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

export default function SettlementsPage() {
  const { storeId } = useCurrentStoreId();
  const queryClient = useQueryClient();

  const { data: settlements, isLoading, error, refetch } = useQuery({
    queryKey: ['business-owner', 'settlements', storeId],
    queryFn: () => businessOwnerService.getSettlements(storeId ?? ''),
    enabled: !!storeId});

  const releaseMutation = useMutation({
    mutationFn: (orderId: string) => businessOwnerService.releaseSettlement(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-owner', 'settlements'] });
      showToast('success', 'Settlement released', { description: 'The commission has been deducted and the seller wallet credited.'});
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to release settlement', { description: error.message});
    }});

  const refundMutation = useMutation({
    mutationFn: (orderId: string) => businessOwnerService.refundSettlement(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-owner', 'settlements'] });
      showToast('success', 'Settlement refunded', { description: 'The order and settlement have been marked as refunded.'});
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to refund settlement', { description: error.message});
    }});

  if (isLoading || !storeId) {
    return <LoadingState message="Loading settlements..." />;
  }

  if (error) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settlements</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track payouts, commissions, and refunds for your store
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Settlements</h2>
        {!settlements || settlements.length === 0 ? (
          <EmptyState
            title="No settlements yet"
            description="Settlements will appear here once orders are released for payout."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium">Order Ref</th>
                  <th className="pb-3 font-medium">Store</th>
                  <th className="pb-3 font-medium">Gross</th>
                  <th className="pb-3 font-medium">Commission</th>
                  <th className="pb-3 font-medium">Net</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {settlements.map((settlement: SettlementDTO) => (
                  <tr key={settlement.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 text-gray-900 dark:text-white font-mono text-xs">
                      {shortId(settlement.orderId)}
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400 font-mono text-xs">
                      {shortId(settlement.storeId)}
                    </td>
                    <td className="py-3 text-gray-900 dark:text-white font-medium">
                      {formatCurrency(settlement.amount)}
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">
                      {formatCurrency(settlement.commission)}
                    </td>
                    <td className="py-3 text-gray-900 dark:text-white font-medium">
                      {formatCurrency(settlement.sellerPayout)}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={settlement.status} />
                    </td>
                    <td className="py-3 text-gray-500">
                      <div>{formatDate(settlement.createdAt)}</div>
                      <div className="text-xs">{formatTime(settlement.createdAt)}</div>
                    </td>
                    <td className="py-3">
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