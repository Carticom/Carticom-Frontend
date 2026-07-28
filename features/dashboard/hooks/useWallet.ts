'use client';

import { useQuery } from '@tanstack/react-query';
import { walletRepository } from '@/features/dashboard/repositories/wallet.repository';
import type { WalletDto, WalletTransactionDto } from '@/features/dashboard/types/wallet.types';
import { queryKeys } from '@/lib/dal/query-keys';

export function useWallet() {
  return useQuery({
    queryKey: queryKeys.wallet.all,
    queryFn: async () => {
      return walletRepository.getWallet();
    },
  });
}

export function useWalletTransactions(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.wallet.transactions('self', params),
    queryFn: async () => {
      return walletRepository.getTransactions(params);
    },
  });
}
