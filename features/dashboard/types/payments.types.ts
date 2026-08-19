// ============================================================
// CARTICOM PAYMENTS — Domain Types
// ============================================================

export interface PaymentDto {
  id: string;
  storeId: string;
  orderId: string;
  customerId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  provider: string;
  reference: string;
  providerReference?: string;
  transactionId?: string;
  paymentMethod?: string;
  paymentProvider?: string;
  authorizationUrl?: string;
  message?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentDto {
  orderId: string;
  amount: number;
  method: string;
  provider: string;
  metadata?: Record<string, unknown>;
}

export interface UpdatePaymentDto {
  status?: PaymentStatus;
  providerReference?: string;
  metadata?: Record<string, unknown>;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED'}