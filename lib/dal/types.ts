// ============================================================
// CARTICOM DATA ACCESS LAYER — Generic Type Definitions
// ============================================================

// ─── API Envelope ────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiErrorDetail;
  meta?: PaginationMeta;
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// ─── Pagination ──────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ─── Generic CRUD Operations ────────────────────────────────

export interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}

export interface CreateInput<T = Record<string, unknown>> {
  data: T;
}

export interface UpdateInput<T = Record<string, unknown>> {
  id: string;
  data: Partial<T>;
}

export interface DeleteInput {
  id: string;
  permanent?: boolean;
}

export interface BulkDeleteInput {
  ids: string[];
  permanent?: boolean;
}

// ─── Endpoint Config ─────────────────────────────────────────

export interface EndpointConfig {
  base: string;
  byId?: (id: string) => string;
  create?: string;
  update?: (id: string) => string;
  delete?: (id: string) => string;
  restore?: (id: string) => string;
}

// ─── Service Options ─────────────────────────────────────────

export interface ServiceOptions {
  showToast?: boolean;
  toastMessage?: string;
  signal?: AbortSignal;
}

// ─── Cache Tags ──────────────────────────────────────────────

export interface CacheTag {
  type: string;
  id?: string;
}

// ─── Filter Operators ────────────────────────────────────────

export type FilterOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'nin'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'between';

export interface FilterClause {
  field: string;
  operator: FilterOperator;
  value: unknown;
}