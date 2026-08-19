// ============================================================
// CARTICOM DATA ACCESS LAYER — React Query Key Factory
// ============================================================

// ─── Key Factory Pattern ────────────────────────────────────
// Provides a consistent, type-safe way to generate cache keys
// for React Query. Each domain gets a scoped key factory.
//
// Usage:
//   queryKeys.products.all
//   queryKeys.products.byId('123')
//   queryKeys.products.list({ page: 1, limit: 10 })

export const queryKeys = {
  // ─── Auth ─────────────────────────────────────────────────
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const},

  // ─── Products ─────────────────────────────────────────────
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.products.lists(), filters] as const,
    byId: (id: string) => [...queryKeys.products.all, id] as const,
    byCategory: (categoryId: string) =>
      [...queryKeys.products.all, 'category', categoryId] as const},

  // ─── Orders ────────────────────────────────────────────────
  orders: {
    all: ['orders'] as const,
    lists: () => [...queryKeys.orders.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.orders.lists(), filters] as const,
    byId: (id: string) => [...queryKeys.orders.all, id] as const,
    byStatus: (status: string) =>
      [...queryKeys.orders.all, 'status', status] as const},

  // ─── Customers ────────────────────────────────────────────
  customers: {
    all: ['customers'] as const,
    lists: () => [...queryKeys.customers.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.customers.lists(), filters] as const,
    byId: (id: string) => [...queryKeys.customers.all, id] as const},

  // ─── Inventory ────────────────────────────────────────────
  inventory: {
    all: ['inventory'] as const,
    lists: () => [...queryKeys.inventory.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.inventory.lists(), filters] as const,
    byId: (id: string) => [...queryKeys.inventory.all, id] as const,
    lowStock: () => [...queryKeys.inventory.all, 'low-stock'] as const},

  // ─── Payments / Transactions ──────────────────────────────
  transactions: {
    all: ['transactions'] as const,
    lists: () => [...queryKeys.transactions.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.transactions.lists(), filters] as const,
    byId: (id: string) => [...queryKeys.transactions.all, id] as const},

  // ─── Escrow ───────────────────────────────────────────────
  escrow: {
    all: ['escrow'] as const,
    lists: () => [...queryKeys.escrow.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.escrow.lists(), filters] as const,
    byId: (id: string) => [...queryKeys.escrow.all, id] as const,
    balance: () => [...queryKeys.escrow.all, 'balance'] as const,
    transactions: (escrowId: string) =>
      [...queryKeys.escrow.byId(escrowId), 'transactions'] as const},

  // ─── Disputes ──────────────────────────────────────────────
  disputes: {
    all: ['disputes'] as const,
    lists: () => [...queryKeys.disputes.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.disputes.lists(), filters] as const,
    byId: (id: string) => [...queryKeys.disputes.all, id] as const},

  // ─── Analytics ─────────────────────────────────────────────
  analytics: {
    all: ['analytics'] as const,
    dashboard: () => [...queryKeys.analytics.all, 'dashboard'] as const,
    sales: (period: string) =>
      [...queryKeys.analytics.all, 'sales', period] as const,
    orders: (period: string) =>
      [...queryKeys.analytics.all, 'orders', period] as const,
    customers: (period: string) =>
      [...queryKeys.analytics.all, 'customers', period] as const,
    revenue: (period: string) =>
      [...queryKeys.analytics.all, 'revenue', period] as const},

  // ─── Notifications ─────────────────────────────────────────
  notifications: {
    all: ['notifications'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.notifications.all, 'list', filters] as const,
    unreadCount: () => [...queryKeys.notifications.all, 'unread-count'] as const},

  // ─── Settings ─────────────────────────────────────────────
  settings: {
    all: ['settings'] as const,
    business: () => [...queryKeys.settings.all, 'business'] as const,
    preferences: () => [...queryKeys.settings.all, 'preferences'] as const,
    team: () => [...queryKeys.settings.all, 'team'] as const},

  // ─── Files / Uploads ──────────────────────────────────────
  files: {
    all: ['files'] as const,
    byId: (id: string) => [...queryKeys.files.all, id] as const,
    byEntity: (entityType: string, entityId: string) =>
      [...queryKeys.files.all, entityType, entityId] as const},

  // ─── Staff / Team ─────────────────────────────────────────
  staff: {
    all: ['staff'] as const,
    lists: () => [...queryKeys.staff.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.staff.lists(), filters] as const,
    byId: (id: string) => [...queryKeys.staff.all, id] as const,
    roles: () => [...queryKeys.staff.all, 'roles'] as const},

  // ─── AI ────────────────────────────────────────────────────
  ai: {
    all: ['ai'] as const,
    byStore: (storeId: string) => [...queryKeys.ai.all, 'store', storeId] as const},

  // ─── Subscription ─────────────────────────────────────────
  subscription: {
    all: ['subscription'] as const,
    byStore: (storeId: string) => ['subscription', 'store', storeId] as const},

  // ─── Wallet ───────────────────────────────────────────────
  wallet: {
    all: ['wallet'] as const,
    byStore: (storeId: string) => ['wallet', 'store', storeId] as const,
    transactions: (storeId: string, params?: Record<string, unknown>) =>
      ['wallet', storeId, 'transactions', params] as const},

  // ─── Addresses ───────────────────────────────────────────
  addresses: {
    all: ['addresses'] as const,
    lists: () => [...queryKeys.addresses.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.addresses.lists(), filters] as const,
    byId: (id: string) => [...queryKeys.addresses.all, id] as const},

  // ─── Generic Helper ──────────────────────────────────────
  // Use for any domain not yet covered by the above factories
  generic: {
    all: (domain: string) => [domain] as const,
    lists: (domain: string) => [domain, 'list'] as const,
    list: (domain: string, filters: Record<string, unknown>) =>
      [domain, 'list', filters] as const,
    byId: (domain: string, id: string) => [domain, id] as const}} as const;

export default queryKeys;