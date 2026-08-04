// ============================================================
// CARTICOM SUBSCRIPTION — Domain Types
// ============================================================

export interface SubscriptionDto {
  id: string;
  storeId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  usage: SubscriptionUsage;
  features: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionUsage {
  products: number;
  productsLimit: number;
  staff: number;
  staffLimit: number;
  customers: number;
  orders: number;
  storage: number;
  storageLimit: number;
}

export interface CreateSubscriptionDto {
  plan: SubscriptionPlan;
  metadata?: Record<string, unknown>;
}

export interface UpdateSubscriptionDto {
  status?: SubscriptionStatus;
  cancelAtPeriodEnd?: boolean;
  metadata?: Record<string, unknown>;
}

export enum SubscriptionPlan {
  FREE_TRIAL = 'FREE_TRIAL',
  STARTER = 'STARTER',
  GROWTH = 'GROWTH',
  BUSINESS = 'BUSINESS',
  ENTERPRISE = 'ENTERPRISE'}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  PAST_DUE = 'PAST_DUE',
  READ_ONLY = 'READ_ONLY'}