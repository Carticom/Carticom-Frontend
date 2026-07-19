// ============================================================
// CARTICOM — Dashboard Constants and Mock Data
// ============================================================

import type {
  KpiCardData,
  RecentOrder,
  NotificationItem,
  ChartDataPoint,
  QuickAction,
  DashboardStats,
} from '@/types/dashboard';
import {
  DollarSign,
  Wallet,
  Shield,
  ShoppingCart,
  Package,
  Users,
  Crown,
  Store,
  TrendingUp,
  Bell,
  Settings,
  Headphones,
  BarChart3,
  LayoutDashboard,
} from 'lucide-react';

// ─── KPI Cards ────────────────────────────────────────────────

export const MOCK_KPI_CARDS: KpiCardData[] = [
  {
    id: 'revenue',
    label: "Today's Revenue",
    value: '24,580.50',
    change: '+20.1%',
    changeType: 'positive',
    icon: DollarSign,
    trend: 'up',
    prefix: '₦',
  },
  {
    id: 'wallet',
    label: 'Wallet Balance',
    value: '128,450.75',
    change: '+12.5%',
    changeType: 'positive',
    icon: Wallet,
    trend: 'up',
    prefix: '₦',
  },
  {
    id: 'escrow',
    label: 'Escrow Balance',
    value: '45,230.00',
    change: '-2.4%',
    changeType: 'negative',
    icon: Shield,
    trend: 'down',
    prefix: '₦',
  },
  {
    id: 'orders',
    label: 'Total Orders',
    value: '156',
    change: '+12.5%',
    changeType: 'positive',
    icon: ShoppingCart,
    trend: 'up',
  },
  {
    id: 'products',
    label: 'Products',
    value: '89',
    change: '+3.1%',
    changeType: 'positive',
    icon: Package,
    trend: 'up',
  },
  {
    id: 'customers',
    label: 'Customers',
    value: '1,234',
    change: '+8.2%',
    changeType: 'positive',
    icon: Users,
    trend: 'up',
  },
  {
    id: 'subscription',
    label: 'Subscription Plan',
    value: 'Business',
    change: 'Active',
    changeType: 'positive',
    icon: Crown,
    trend: 'up',
  },
  {
    id: 'store',
    label: 'Store Status',
    value: 'Active',
    change: 'All Good',
    changeType: 'positive',
    icon: Store,
    trend: 'up',
  },
];

// ─── Recent Orders ────────────────────────────────────────────

export const MOCK_RECENT_ORDERS: RecentOrder[] = [
  {
    id: '1',
    orderId: 'ORD-2024-001',
    customer: {
      name: 'Chioma Obi',
      email: 'chioma.obi@example.com',
    },
    amount: 45000.00,
    currency: 'NGN',
    status: 'completed',
    items: 3,
    date: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    orderId: 'ORD-2024-002',
    customer: {
      name: 'Kwame Asante',
      email: 'kwame.asante@example.com',
    },
    amount: 28500.00,
    currency: 'GHS',
    status: 'processing',
    items: 1,
    date: '2024-03-15T09:15:00Z',
  },
  {
    id: '3',
    orderId: 'ORD-2024-003',
    customer: {
      name: 'Amina Diallo',
      email: 'amina.diallo@example.com',
    },
    amount: 124500.00,
    currency: 'XOF',
    status: 'pending',
    items: 5,
    date: '2024-03-15T08:45:00Z',
  },
  {
    id: '4',
    orderId: 'ORD-2024-004',
    customer: {
      name: 'John Mwangi',
      email: 'john.mwangi@example.com',
    },
    amount: 78500.00,
    currency: 'KES',
    status: 'completed',
    items: 2,
    date: '2024-03-14T16:20:00Z',
  },
  {
    id: '5',
    orderId: 'ORD-2024-005',
    customer: {
      name: 'Fatima Hassan',
      email: 'fatima.hassan@example.com',
    },
    amount: 9200.00,
    currency: 'NGN',
    status: 'cancelled',
    items: 1,
    date: '2024-03-14T14:00:00Z',
  },
  {
    id: '6',
    orderId: 'ORD-2024-006',
    customer: {
      name: 'Thabo Mbeki',
      email: 'thabo.mbeki@example.com',
    },
    amount: 156000.00,
    currency: 'ZAR',
    status: 'processing',
    items: 4,
    date: '2024-03-14T11:30:00Z',
  },
  {
    id: '7',
    orderId: 'ORD-2024-007',
    customer: {
      name: 'Nkechi Okonkwo',
      email: 'nkechi.okonkwo@example.com',
    },
    amount: 33500.00,
    currency: 'NGN',
    status: 'completed',
    items: 2,
    date: '2024-03-13T15:45:00Z',
  },
];

// ─── Notifications ────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'payment',
    title: 'Payment Received',
    message: 'You received N45,000 from Chioma Obi for order ORD-2024-001.',
    timestamp: '2024-03-15T10:35:00Z',
    read: false,
    actionUrl: '/dashboard/orders/ORD-2024-001',
  },
  {
    id: 'n2',
    type: 'order',
    title: 'New Order Received',
    message: 'Order ORD-2024-003 from Amina Diallo is pending review.',
    timestamp: '2024-03-15T08:50:00Z',
    read: false,
    actionUrl: '/dashboard/orders/ORD-2024-003',
  },
  {
    id: 'n3',
    type: 'escrow',
    title: 'Escrow Released',
    message: 'N78,500 has been released from escrow for order ORD-2024-004.',
    timestamp: '2024-03-14T16:25:00Z',
    read: true,
    actionUrl: '/dashboard/escrow',
  },
  {
    id: 'n4',
    type: 'subscription',
    title: 'Subscription Renewal',
    message: 'Your Business plan will renew in 7 days. Upgrade to save 20%.',
    timestamp: '2024-03-14T10:00:00Z',
    read: true,
    actionUrl: '/dashboard/subscription',
  },
  {
    id: 'n5',
    type: 'system',
    title: 'System Update',
    message: 'Carticom AI analytics dashboard is now available.',
    timestamp: '2024-03-13T08:00:00Z',
    read: true,
  },
  {
    id: 'n6',
    type: 'alert',
    title: 'Low Stock Alert',
    message: 'Premium Wireless Headphones is running low on stock (3 remaining).',
    timestamp: '2024-03-12T14:30:00Z',
    read: false,
    actionUrl: '/dashboard/products',
  },
  {
    id: 'n7',
    type: 'payment',
    title: 'Withdrawal Complete',
    message: 'Your withdrawal of N250,000 to GTBank has been processed successfully.',
    timestamp: '2024-03-12T09:00:00Z',
    read: true,
    actionUrl: '/dashboard/wallet',
  },
];

// ─── Chart Data ───────────────────────────────────────────────

export const MOCK_REVENUE_CHART: ChartDataPoint[] = [
  { label: 'Jan', value: 45000, secondary: 38000 },
  { label: 'Feb', value: 52000, secondary: 42000 },
  { label: 'Mar', value: 48000, secondary: 45000 },
  { label: 'Apr', value: 61000, secondary: 48000 },
  { label: 'May', value: 55000, secondary: 52000 },
  { label: 'Jun', value: 67000, secondary: 55000 },
  { label: 'Jul', value: 72000, secondary: 58000 },
  { label: 'Aug', value: 58000, secondary: 54000 },
  { label: 'Sep', value: 78000, secondary: 60000 },
  { label: 'Oct', value: 85000, secondary: 65000 },
  { label: 'Nov', value: 92000, secondary: 70000 },
  { label: 'Dec', value: 105000, secondary: 78000 },
];

export const MOCK_MONTHLY_SALES: ChartDataPoint[] = [
  { label: 'Week 1', value: 28500 },
  { label: 'Week 2', value: 34200 },
  { label: 'Week 3', value: 29800 },
  { label: 'Week 4', value: 41500 },
];

export const MOCK_ORDERS_TREND: ChartDataPoint[] = [
  { label: 'Mon', value: 12, secondary: 8 },
  { label: 'Tue', value: 18, secondary: 14 },
  { label: 'Wed', value: 15, secondary: 11 },
  { label: 'Thu', value: 22, secondary: 16 },
  { label: 'Fri', value: 20, secondary: 13 },
  { label: 'Sat', value: 8, secondary: 5 },
  { label: 'Sun', value: 5, secondary: 3 },
];

export const MOCK_TOP_PRODUCTS: ChartDataPoint[] = [
  { label: 'Wireless Headphones', value: 145 },
  { label: 'Smart Watch Pro', value: 98 },
  { label: 'Leather Backpack', value: 76 },
  { label: 'Coffee Maker', value: 54 },
  { label: 'Running Shoes', value: 42 },
];

// ─── Quick Actions ────────────────────────────────────────────

export const MOCK_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'add-product',
    label: 'Add Product',
    description: 'Create a new product listing',
    icon: Package,
    href: '/dashboard/products/new',
    color: 'blue',
  },
  {
    id: 'view-store',
    label: 'View Store',
    description: 'Preview your online store',
    icon: Store,
    href: '/dashboard/store',
    color: 'green',
  },
  {
    id: 'invite-staff',
    label: 'Invite Staff',
    description: 'Add team members',
    icon: Users,
    href: '/dashboard/settings/team',
    color: 'purple',
  },
  {
    id: 'create-discount',
    label: 'Create Discount',
    description: 'Set up promotional pricing',
    icon: ShoppingCart,
    href: '/dashboard/products/discounts',
    color: 'orange',
  },
  {
    id: 'enable-ai',
    label: 'Enable Carticom AI',
    description: 'Activate AI-powered insights',
    icon: Crown,
    href: '/dashboard/settings/ai',
    color: 'cyan',
  },
  {
    id: 'upgrade-plan',
    label: 'Upgrade Plan',
    description: 'Unlock premium features',
    icon: TrendingUp,
    href: '/dashboard/subscription',
    color: 'red',
  },
];

// ─── Greeting ─────────────────────────────────────────────────

export const BUSINESS_NAME = "Badmus' Electronics";
export const OWNER_NAME = 'Badmus';

// ─── Dashboard Stats ──────────────────────────────────────────

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  todayRevenue: 24580.50,
  walletBalance: 128450.75,
  escrowBalance: 45230.00,
  totalOrders: 156,
  totalProducts: 89,
  totalCustomers: 1234,
  subscriptionPlan: 'Business',
  storeStatus: 'Active',
  revenueGrowth: 20.1,
  ordersGrowth: 12.5,
  customersGrowth: 8.2,
  productsGrowth: 3.1,
};