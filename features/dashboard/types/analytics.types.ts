// ============================================================
// CARTICOM ANALYTICS — Domain Types
// ============================================================

export interface AnalyticsDto {
  id: string;
  storeId: string;
  period: string;
  metrics: AnalyticsMetrics;
  trends: AnalyticsTrends;
  topProducts: TopProduct[];
  topCategories: TopCategory[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AnalyticsMetrics {
  revenue: number;
  orders: number;
  customers: number;
  products: number;
  conversionRate: number;
  averageOrderValue: number;
}

export interface AnalyticsTrends {
  revenue: TrendPoint[];
  orders: TrendPoint[];
  customers: TrendPoint[];
}

export interface TrendPoint {
  date: string;
  value: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  revenue: number;
  orders: number;
}

export interface TopCategory {
  categoryId: string;
  categoryName: string;
  revenue: number;
  orders: number;
}

export interface CreateAnalyticsDto {
  period: string;
  metrics: AnalyticsMetrics;
  trends: AnalyticsTrends;
  metadata?: Record<string, unknown>;
}