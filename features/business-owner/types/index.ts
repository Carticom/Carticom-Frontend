export interface OrderSummaryDTO {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  currency: string;
  status: string;
  items: number;
  createdAt: string;
}

export interface BusinessOwnerDashboardDTO {
  pendingRevenue: number;
  availableRevenue: number;
  totalWithdrawn: number;
  lifetimeRevenue: number;
  trustLevel: 'BRONZE' | 'SILVER' | 'GOLD';
  trustScore: number;
  disputeRate: number;
  averageDeliveryTime: number;
  settlementSchedule: string;
  pendingOrders: number;
  activeDisputes: number;
  recentOrders: OrderSummaryDTO[];
}

export interface AnalyticsResponseDTO {
  period: string;
  revenue: number;
  orders: number;
  customers: number;
  conversionRate: number;
  changes: Record<string, unknown>;
}

export interface WalletResponseDTO {
  balance: number;
  currency: string;
}

export interface WalletTransactionResponseDTO {
  id: string;
  amount: number;
  type: string;
  status: string;
  reference: string;
  createdAt: string;
}

export interface WithdrawalResponseDTO {
  id: string;
  amount: number;
  status: string;
  bankName: string;
  accountNumber: string;
  createdAt: string;
}

export interface SettlementResponseDTO {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  releasedAt: string;
}

export interface RefundResponse {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  reason: string;
}
