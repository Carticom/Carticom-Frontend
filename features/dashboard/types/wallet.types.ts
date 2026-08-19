// ============================================================
// CARTICOM WALLET — Domain Types
// ============================================================

export interface WalletDto {
  id: string;
  storeId: string;
  balance: number;
  currency: string;
  status: WalletStatus;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransactionDto {
  id: string;
  walletId: string;
  storeId: string;
  type: WalletTransactionType;
  amount: number;
  currency: string;
  balanceBefore: number;
  balanceAfter: number;
  reference?: string;
  description: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface CreateWalletDto {
  currency: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateWalletDto {
  status?: WalletStatus;
  metadata?: Record<string, unknown>;
}

export interface CreateWalletTransactionDto {
  type: WalletTransactionType;
  amount: number;
  reference?: string;
  description: string;
  metadata?: Record<string, unknown>;
}

export enum WalletStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED'}

export enum WalletTransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  WITHDRAWAL = 'WITHDRAWAL',
  REFUND = 'REFUND',
  FEE = 'FEE'}