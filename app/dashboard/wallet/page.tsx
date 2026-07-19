'use client';

import { useWallet, useWalletTransactions } from '@/features/dashboard/hooks/useWallet';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';
import { WalletTransactionType } from '@/features/dashboard/types/wallet.types';
import type { WalletTransactionDto } from '@/features/dashboard/types/wallet.types';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const TYPE_STYLES: Record<string, string> = {
  [WalletTransactionType.CREDIT]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  [WalletTransactionType.DEBIT]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  [WalletTransactionType.WITHDRAWAL]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  [WalletTransactionType.REFUND]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  [WalletTransactionType.FEE]: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

const TYPE_ICON: Record<string, string> = {
  [WalletTransactionType.CREDIT]: '+',
  [WalletTransactionType.DEBIT]: '-',
  [WalletTransactionType.WITHDRAWAL]: '-',
  [WalletTransactionType.REFUND]: '+',
  [WalletTransactionType.FEE]: '-',
};

function TypeBadge({ type }: { type: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${TYPE_STYLES[type] || 'bg-gray-100 text-gray-800'}`}>
      {type}
    </span>
  );
}

export default function WalletPage() {
  const { storeId } = useCurrentStoreId();

  const {
    data: wallet,
    isLoading: walletLoading,
    error: walletError,
    refetch: refetchWallet,
  } = useWallet(storeId ?? '');

  const {
    data: transactions,
    isLoading: txLoading,
    error: txError,
    refetch: refetchTx,
  } = useWalletTransactions(storeId ?? '');

  const isLoading = walletLoading || txLoading || !storeId;
  const error = walletError || txError;

  if (isLoading) {
    return <LoadingState message="Loading wallet..." />;
  }

  if (error) {
    return <ErrorState onRetry={() => { refetchWallet(); refetchTx(); }} />;
  }

  if (!wallet) {
    return <EmptyState title="No wallet found" description="Your wallet will be created automatically once you start selling." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wallet</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your funds, withdrawals, and transaction history
        </p>
      </div>

      {/* Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Available Balance</p>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {formatCurrency(wallet.balance)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          <p className="text-3xl font-bold mt-2 text-yellow-600">₦0</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Locked</p>
          <p className="text-3xl font-bold mt-2 text-gray-600">₦0</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Withdraw</button>
        <button className="px-6 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">Transfer</button>
        <button className="px-6 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">Download Statement</button>
      </div>

      {/* History */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transaction History</h2>
        {!transactions || transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No transactions yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {(transactions as WalletTransactionDto[]).map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3">
                      <TypeBadge type={tx.type} />
                    </td>
                    <td className={`py-3 font-medium ${
                      tx.type === WalletTransactionType.CREDIT || tx.type === WalletTransactionType.REFUND
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {TYPE_ICON[tx.type]}{formatCurrency(tx.amount)}
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400 max-w-xs truncate">
                      {tx.description}
                    </td>
                    <td className="py-3 text-gray-500">
                      <div>{formatDate(tx.createdAt)}</div>
                      <div className="text-xs">{formatTime(tx.createdAt)}</div>
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
