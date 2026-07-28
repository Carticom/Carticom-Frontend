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

  async getWallet() {
    return this.get<WalletDto>('/api/v1/wallet');
  }

  async getTransactions(params?: QueryParams) {
    return this.get<WalletTransactionDto[]>('/api/v1/wallet/history', params as Record<string, string | number | boolean>);
  }
}

export const walletRepository = new WalletRepository();
