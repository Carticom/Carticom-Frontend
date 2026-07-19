// ============================================================
// CARTICOM WALLET — React Query Hooks
// ============================================================

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { walletRepository } from '@/features/dashboard/repositories/wallet.repository';
import type { WalletDto, WalletTransactionDto, CreateWalletTransactionDto } from '@/features/dashboard/types/wallet.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

// ─── Use Wallet ───────────────────────────────────────────────

export function useWallet(storeId: string) {
  return useQuery({
    queryKey: queryKeys.wallet.byStore(storeId),
    queryFn: async () => {
      return walletRepository.getByStore(storeId);
    },
    enabled: !!storeId,
  });
}

// ─── Use Wallet Transactions ──────────────────────────────────

export function useWalletTransactions(storeId: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.wallet.transactions(storeId, params),
    queryFn: async () => {
      return walletRepository.getTransactions(storeId, params);
    },
    enabled: !!storeId,
  });
}

// ─── Use Create Wallet Transaction ────────────────────────────

export function useCreateWalletTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ storeId, data }: { storeId: string; data: CreateWalletTransactionDto }) => {
      return walletRepository.createTransaction(storeId, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.transactions(variables.storeId) });
      showToast('success', 'Transaction created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create transaction', {
        description: error.message,
      });
    },
  });
}