// ============================================================
// CARTICOM SUBSCRIPTION — Domain Types (aligned with backend)
// ============================================================

export type BillingCycle = 'MONTHLY' | 'YEARLY';

export type SubscriptionStatus =
  | 'ACTIVE'
  | 'TRIAL'
  | 'PENDING'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'PAST_DUE';

export interface SubscriptionDto {
  id: string;
  storeId: string;
  planCode: string;
  planName: string;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  amount: number;
  startDate?: number;
  endDate?: number;
  renewalDate?: number;
  autoRenewal: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  productLimit: number;
  staffLimit: number;
  paymentsEnabled: boolean;
  customDomainEnabled: boolean;
  durationDays?: number | null;
}

export interface SubscriptionRequest {
  plan: string;
  billingCycle: BillingCycle;
  paymentGateway: 'PAYSTACK' | 'FLUTTERWAVE';
}

export interface SubscriptionPaymentResponse {
  transactionId?: string;
  status?: string;
  paymentProvider?: string;
  paymentMethod?: string;
  authorizationUrl?: string;
  providerReference?: string;
  message?: string;
}