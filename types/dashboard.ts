// ============================================================
// CARTICOM — Dashboard Type Definitions
// ============================================================

// ─── KPI Card ────────────────────────────────────────────────

export interface KpiCardData {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  trend: 'up' | 'down' | 'flat';
  prefix?: string;
  suffix?: string;
}

// ─── Order ───────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export interface RecentOrder {
  id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  amount: number;
  currency: string;
  status: OrderStatus;
  items: number;
  date: string;
}

// ─── Notification ────────────────────────────────────────────

export type NotificationType =
  | 'payment'
  | 'order'
  | 'escrow'
  | 'subscription'
  | 'system'
  | 'alert';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// ─── Chart ───────────────────────────────────────────────────

export interface ChartDataPoint {
  label: string;
  value: number;
  secondary?: number;
}

export interface ChartConfig {
  id: string;
  title: string;
  description?: string;
  type: 'line' | 'bar' | 'area' | 'pie';
  data: ChartDataPoint[];
  height?: number;
}

// ─── Quick Action ────────────────────────────────────────────

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  href?: string;
  onClick?: () => void;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'cyan' | 'red';
  disabled?: boolean;
}

// ─── Sidebar ─────────────────────────────────────────────────

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  badge?: number | string;
  children?: SidebarChildItem[];
}

export interface SidebarChildItem {
  id: string;
  label: string;
  href: string;
}

// ─── Breadcrumb ──────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─── Store / Business Info ───────────────────────────────────

export interface StoreInfo {
  name: string;
  logo?: string;
  status: 'active' | 'inactive' | 'suspended';
  plan: 'free_trial' | 'starter' | 'growth' | 'business' | 'enterprise';
}

// ─── Dashboard Stats (from API eventually) ───────────────────

export interface DashboardStats {
  todayRevenue: number;
  walletBalance: number;
  escrowBalance: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  subscriptionPlan: string;
  storeStatus: string;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
}
