// ============================================================
// CARTICOM DATA ACCESS LAYER — Base Repository Pattern
// ============================================================

import axiosInstance, { extractErrorMessage } from '@/lib/axios';
import type {
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  QueryParams,
  CreateInput,
  UpdateInput,
  DeleteInput,
  BulkDeleteInput,
  EndpointConfig,
  ServiceOptions} from './types';

// ─── Error Class ─────────────────────────────────────────────

export class RepositoryError extends Error {
  public code: string;
  public statusCode?: number;
  public details?: Record<string, string[]>;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode?: number,
    details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'RepositoryError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

// ─── Build Query String ──────────────────────────────────────

function buildQueryString(params?: QueryParams & PaginationParams): string {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  }

  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

// ─── Build Pagination Params ─────────────────────────────────

function buildPaginationParams(
  pagination?: PaginationParams
): Record<string, string> {
  if (!pagination) return {};

  const params: Record<string, string> = {};
  if (pagination.page !== undefined) params.page = String(pagination.page);
  if (pagination.limit !== undefined) params.limit = String(pagination.limit);
  if (pagination.sortBy) params.sortBy = pagination.sortBy;
  if (pagination.sortOrder) params.sortOrder = pagination.sortOrder;
  return params;
}

// ─── Base Repository ─────────────────────────────────────────

export class BaseRepository<TEntity, TCreateDto = TEntity, TUpdateDto = TEntity> {
  protected readonly config: EndpointConfig;

  constructor(config: EndpointConfig) {
    this.config = config;
  }

  // ─── List (Paginated) ──────────────────────────────────────

  async list(
    pagination?: PaginationParams,
    queryParams?: QueryParams,
    options?: ServiceOptions
  ): Promise<{
    data: TEntity[];
    meta?: PaginationMeta;
  }> {
    try {
      const paginationParams = buildPaginationParams(pagination);
      const allParams = { ...paginationParams, ...queryParams } as QueryParams &
        PaginationParams;
      const qs = buildQueryString(allParams);
      const url = `${this.config.base}${qs}`;

      const response = await axiosInstance.get<ApiResponse<TEntity[]>>(url, {
        signal: options?.signal});

      return {
        data: (response.data.data ?? []) as TEntity[],
        meta: response.data.meta};
    } catch (error) {
      this.handleError(error, options);
    }
  }

  // ─── Get By ID ─────────────────────────────────────────────

  async getById(
    id: string,
    options?: ServiceOptions
  ): Promise<TEntity> {
    try {
      const url = this.config.byId?.(id) ?? `${this.config.base}/${id}`;
      const response = await axiosInstance.get<ApiResponse<TEntity>>(url, {
        signal: options?.signal});
      return response.data.data as TEntity;
    } catch (error) {
      this.handleError(error, options);
    }
  }

  // ─── Create ────────────────────────────────────────────────

  async create(
    input: CreateInput<TCreateDto>,
    options?: ServiceOptions
  ): Promise<TEntity> {
    try {
      const url = this.config.create ?? this.config.base;
      const response = await axiosInstance.post<ApiResponse<TEntity>>(
        url,
        input.data,
        { signal: options?.signal }
      );
      return response.data.data as TEntity;
    } catch (error) {
      this.handleError(error, options);
    }
  }

  // ─── Update ────────────────────────────────────────────────

  async update(
    input: UpdateInput<TUpdateDto>,
    options?: ServiceOptions
  ): Promise<TEntity> {
    try {
      const url =
        this.config.update?.(input.id) ?? `${this.config.base}/${input.id}`;
      const response = await axiosInstance.put<ApiResponse<TEntity>>(
        url,
        input.data,
        { signal: options?.signal }
      );
      return response.data.data as TEntity;
    } catch (error) {
      this.handleError(error, options);
    }
  }

  // ─── Patch (Partial Update) ────────────────────────────────

  async patch(
    id: string,
    data: Partial<TUpdateDto>,
    options?: ServiceOptions
  ): Promise<TEntity> {
    try {
      const url = this.config.update?.(id) ?? `${this.config.base}/${id}`;
      const response = await axiosInstance.patch<ApiResponse<TEntity>>(
        url,
        data,
        { signal: options?.signal }
      );
      return response.data.data as TEntity;
    } catch (error) {
      this.handleError(error, options);
    }
  }

  // ─── Delete (Soft) ─────────────────────────────────────────

  async delete(
    input: DeleteInput,
    options?: ServiceOptions
  ): Promise<void> {
    try {
      const url =
        this.config.delete?.(input.id) ?? `${this.config.base}/${input.id}`;
      const params = input.permanent ? { permanent: 'true' } : undefined;
      await axiosInstance.delete(url, { params, signal: options?.signal });
    } catch (error) {
      this.handleError(error, options);
    }
  }

  // ─── Bulk Delete ───────────────────────────────────────────

  async bulkDelete(
    input: BulkDeleteInput,
    options?: ServiceOptions
  ): Promise<void> {
    try {
      await axiosInstance.delete(this.config.base, {
        data: { ids: input.ids, permanent: input.permanent },
        signal: options?.signal});
    } catch (error) {
      this.handleError(error, options);
    }
  }

  // ─── Restore (Soft-delete reversal) ────────────────────────

  async restore(
    id: string,
    options?: ServiceOptions
  ): Promise<TEntity> {
    try {
      const url =
        this.config.restore?.(id) ?? `${this.config.base}/${id}/restore`;
      const response = await axiosInstance.post<ApiResponse<TEntity>>(
        url,
        undefined,
        { signal: options?.signal }
      );
      return response.data.data as TEntity;
    } catch (error) {
      this.handleError(error, options);
    }
  }

  // ─── Custom GET ────────────────────────────────────────────

  protected async get<TResponse = unknown>(
    path: string,
    params?: Record<string, string | number | boolean>,
    options?: ServiceOptions
  ): Promise<TResponse> {
    try {
      const qs = params ? buildQueryString(params as QueryParams) : '';
      const response = await axiosInstance.get<ApiResponse<TResponse>>(
        `${path}${qs}`,
        { signal: options?.signal }
      );
      return response.data.data as TResponse;
    } catch (error) {
      this.handleError(error, options);
    }
  }

  // ─── Custom POST ───────────────────────────────────────────

  protected async post<TResponse = unknown>(
    path: string,
    body?: unknown,
    options?: ServiceOptions
  ): Promise<TResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<TResponse>>(
        path,
        body,
        { signal: options?.signal }
      );
      return response.data.data as TResponse;
    } catch (error) {
      this.handleError(error, options);
    }
  }

  // ─── Error Handler ─────────────────────────────────────────

  private handleError(error: unknown, _options?: ServiceOptions): never {
    const message = extractErrorMessage(error);
    const code =
      (error as { code?: string }).code ?? 'UNKNOWN_ERROR';
    const statusCode = (error as { status?: number }).status;
    const details = (
      error as { response?: { data?: { error?: { details?: Record<string, string[]> } } } }
    ).response?.data?.error?.details;

    throw new RepositoryError(message, code, statusCode, details);
  }
}

export default BaseRepository;