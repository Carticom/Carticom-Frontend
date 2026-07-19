// ============================================================
// CARTICOM WALLET — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { WalletDto, CreateWalletDto, UpdateWalletDto, WalletTransactionDto, CreateWalletTransactionDto } from '@/features/dashboard/types/wallet.types';
import type { QueryParams } from '@/lib/dal/types';

export class WalletRepository extends BaseRepository<WalletDto, CreateWalletDto, UpdateWalletDto> {
  constructor() {
    super({
      base: '/api/v1/wallet',
      byId: (id) => `/api/v1/wallet/${id}`,
    });
  }

  async getByStore(storeId: string) {
    return this.get<WalletDto>(`/api/v1/wallet/store/${storeId}`);
  }

  async getTransactions(storeId: string, params?: QueryParams) {
    return this.get<WalletTransactionDto[]>(`/api/v1/wallet/${storeId}/transactions`, params as Record<string, string | number | boolean>);
  }

  async createTransaction(storeId: string, data: CreateWalletTransactionDto) {
    return this.post<WalletTransactionDto>(`/api/v1/wallet/${storeId}/transactions`, data);
  }
}

export const walletRepository = new WalletRepository();
