// ============================================================
// CARTICOM ESCROW — Domain Types
// ============================================================

export interface EscrowTransactionDto {
  id: string;
  storeId: string;
  orderId: string;
  customerId: string;
  amount: number;
  currency: string;
  status: EscrowStatus;
  releaseDate?: string;
  disputeId?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEscrowDto {
  orderId: string;
  amount: number;
  metadata?: Record<string, unknown>;
}

export interface UpdateEscrowDto {
  status?: EscrowStatus;
  releaseDate?: string;
  disputeId?: string;
  metadata?: Record<string, unknown>;
}

export enum EscrowStatus {
  PENDING = 'PENDING',
  HELD = 'HELD',
  RELEASED = 'RELEASED',
  DISPUTED = 'DISPUTED',
  REFUNDED = 'REFUNDED',
}