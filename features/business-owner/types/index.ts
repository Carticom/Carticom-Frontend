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
  lifetimeRevenue: number;
  pendingOrders: number;
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

export interface RefundResponse {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  reason: string;
}
