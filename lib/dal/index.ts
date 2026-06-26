// ============================================================
// CARTICOM DATA ACCESS LAYER — Barrel Exports
// ============================================================

// ─── Types ───────────────────────────────────────────────────

export type {
  ApiResponse,
  ApiErrorDetail,
  PaginationMeta,
  PaginationParams,
  QueryParams,
  CreateInput,
  UpdateInput,
  DeleteInput,
  BulkDeleteInput,
  EndpointConfig,
  ServiceOptions,
  CacheTag,
  FilterClause,
  FilterOperator,
} from './types';

// ─── Repository ─────────────────────────────────────────────

export { BaseRepository, RepositoryError } from './repository';

// ─── Query Keys ─────────────────────────────────────────────

export { queryKeys } from './query-keys';

// ─── React Query Hooks ─────────────────────────────────────

export {
  createRepositoryHooks,
  prefetchEntity,
  prefetchEntityList,
  createOptimisticUpdate,
} from './hooks';