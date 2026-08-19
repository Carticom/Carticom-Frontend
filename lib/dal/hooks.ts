// ============================================================
// CARTICOM DATA ACCESS LAYER — Generic React Query Hooks
// ============================================================

'use client';

import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  type UseQueryOptions,
  type QueryKey} from '@tanstack/react-query';
import { BaseRepository, RepositoryError } from './repository';
import { queryKeys } from './query-keys';
import { showToast } from '@/lib/notifications/toast';
import type {
  PaginationParams,
  QueryParams,
  ServiceOptions} from './types';

// ─── Mutation Toast Config ──────────────────────────────────

interface MutationToastConfig {
  success?: string;
  error?: string;
  loading?: string;
}

interface HookOptions {
  /** Whether to silence all toasts for this hook instance */
  silent?: boolean;
  /** Custom toast messages for mutations */
  toast?: MutationToastConfig;
}

// ─── Default Messages ──────────────────────────────────────

const DEFAULT_MESSAGES = {
  createSuccess: 'Created successfully',
  createError: 'Failed to create',
  updateSuccess: 'Updated successfully',
  updateError: 'Failed to update',
  deleteSuccess: 'Deleted successfully',
  deleteError: 'Failed to delete',
  fetchError: 'Failed to fetch data'} as const;

// ─── Helpers ────────────────────────────────────────────────

function getErrorMessage(error: unknown): string {
  if (error instanceof RepositoryError) return error.message;
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}

function shouldShowToast(options?: ServiceOptions & HookOptions): boolean {
  if (options?.silent) return false;
  return options?.showToast ?? true;
}

// ============================================================
// GENERIC HOOKS
// ============================================================

/**
 * Creates a set of React Query hooks for a given repository.
 *
 * @example
 * ```ts
 * const productRepo = new BaseRepository<Product>('/api/products');
 * const {
 *   useList,
 *   useGetById,
 *   useCreate,
 *   useUpdate,
 *   useDelete,
 *   useInfiniteList,
 * } = createRepositoryHooks(productRepo, 'products');
 * ```
 */
export function createRepositoryHooks<TEntity, TCreateDto = TEntity, TUpdateDto = TEntity>(
  repository: BaseRepository<TEntity, TCreateDto, TUpdateDto>,
  domainKey: string
) {
  const keys = queryKeys.generic;

  // ─── useList ──────────────────────────────────────────────

  function useList(
    pagination?: PaginationParams,
    queryParams?: QueryParams,
    options?: HookOptions & Omit<UseQueryOptions<TEntity[]>, 'queryKey' | 'queryFn'>
  ) {
    return useQuery<TEntity[]>({
      queryKey: keys.list(domainKey, {
        ...pagination,
        ...queryParams}),
      queryFn: async () => {
        const result = await repository.list(pagination, queryParams, {
          showToast: shouldShowToast(options)});
        return result.data;
      },
      ...options});
  }

  // ─── useGetById ───────────────────────────────────────────

  function useGetById(
    id: string | undefined | null,
    options?: HookOptions & Omit<UseQueryOptions<TEntity>, 'queryKey' | 'queryFn'>
  ) {
    return useQuery<TEntity>({
      queryKey: keys.byId(domainKey, id ?? ''),
      queryFn: async () => {
        if (!id) throw new Error('ID is required');
        return repository.getById(id, {
          showToast: shouldShowToast(options)});
      },
      enabled: !!id,
      ...options});
  }

  // ─── useCreate ────────────────────────────────────────────

  function useCreate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationOptions?: Record<string, any> & HookOptions
  ) {
    const queryClient = useQueryClient();
    const toastConfig = mutationOptions?.toast;

    return useMutation({
      mutationFn: async (data: TCreateDto) => {
        return repository.create({ data }, { showToast: false });
      },
      onSuccess: (data: TEntity, variables: TCreateDto, context: unknown) => {
        queryClient.invalidateQueries({ queryKey: keys.lists(domainKey) });

        if (shouldShowToast(mutationOptions)) {
          showToast('success', toastConfig?.success ?? DEFAULT_MESSAGES.createSuccess);
        }

        mutationOptions?.onSuccess?.(data, variables, context);
      },
      onError: (error: Error, variables: TCreateDto, context: unknown) => {
        if (shouldShowToast(mutationOptions)) {
          showToast('error', toastConfig?.error ?? DEFAULT_MESSAGES.createError, {
            description: getErrorMessage(error)});
        }

        mutationOptions?.onError?.(error, variables, context);
      },
      ...(mutationOptions ?? {})});
  }

  // ─── useUpdate ────────────────────────────────────────────

  type UpdateVariables = { id: string; data: Partial<TUpdateDto> };

  function useUpdate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationOptions?: Record<string, any> & HookOptions
  ) {
    const queryClient = useQueryClient();
    const toastConfig = mutationOptions?.toast;

    return useMutation({
      mutationFn: async ({ id, data }: UpdateVariables) => {
        return repository.update({ id, data }, { showToast: false });
      },
      onSuccess: (data: TEntity, variables: UpdateVariables, context: unknown) => {
        queryClient.invalidateQueries({ queryKey: keys.lists(domainKey) });
        queryClient.invalidateQueries({ queryKey: keys.byId(domainKey, variables.id) });

        if (shouldShowToast(mutationOptions)) {
          showToast('success', toastConfig?.success ?? DEFAULT_MESSAGES.updateSuccess);
        }

        mutationOptions?.onSuccess?.(data, variables, context);
      },
      onError: (error: Error, variables: UpdateVariables, context: unknown) => {
        if (shouldShowToast(mutationOptions)) {
          showToast('error', toastConfig?.error ?? DEFAULT_MESSAGES.updateError, {
            description: getErrorMessage(error)});
        }

        mutationOptions?.onError?.(error, variables, context);
      },
      ...(mutationOptions ?? {})});
  }

  // ─── useDelete ────────────────────────────────────────────

  function useDelete(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationOptions?: Record<string, any> & HookOptions
  ) {
    const queryClient = useQueryClient();
    const toastConfig = mutationOptions?.toast;

    return useMutation({
      mutationFn: async (id: string) => {
        return repository.delete({ id }, { showToast: false });
      },
      onSuccess: (_data: void, id: string, context: unknown) => {
        queryClient.invalidateQueries({ queryKey: keys.lists(domainKey) });
        queryClient.removeQueries({ queryKey: keys.byId(domainKey, id) });

        if (shouldShowToast(mutationOptions)) {
          showToast('success', toastConfig?.success ?? DEFAULT_MESSAGES.deleteSuccess);
        }

        mutationOptions?.onSuccess?.(_data, id, context);
      },
      onError: (error: Error, id: string, context: unknown) => {
        if (shouldShowToast(mutationOptions)) {
          showToast('error', toastConfig?.error ?? DEFAULT_MESSAGES.deleteError, {
            description: getErrorMessage(error)});
        }

        mutationOptions?.onError?.(error, id, context);
      },
      ...(mutationOptions ?? {})});
  }

  // ─── useInfiniteList ──────────────────────────────────────

  function useInfiniteList(
    queryParams?: QueryParams,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: HookOptions & Record<string, any>,
    pageSize: number = 20
  ) {
    return useInfiniteQuery({
      queryKey: [...keys.lists(domainKey), 'infinite', queryParams],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await repository.list(
          { page: pageParam as number, limit: pageSize },
          queryParams,
          { showToast: shouldShowToast(options) }
        );
        return result.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage: TEntity[], _allPages: unknown, lastPageParam: number) => {
        if (lastPage.length < pageSize) return undefined;
        return lastPageParam + 1;
      },
      ...(options ?? {})});
  }

  return {
    useList,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
    useInfiniteList};
}

// ============================================================
// PREFETCH HELPERS
// ============================================================

/**
 * Utility for prefetching data (e.g., in server components or route handlers).
 */
export async function prefetchEntity<TEntity>(
  repository: BaseRepository<TEntity>,
  id: string
): Promise<TEntity | null> {
  try {
    return await repository.getById(id);
  } catch {
    return null;
  }
}

export async function prefetchEntityList<TEntity>(
  repository: BaseRepository<TEntity>,
  pagination?: PaginationParams,
  queryParams?: QueryParams
): Promise<TEntity[]> {
  try {
    const result = await repository.list(pagination, queryParams);
    return result.data;
  } catch {
    return [];
  }
}

// ============================================================
// MUTATION HELPERS
// ============================================================

/**
 * Creates optimistic update handlers for use with useMutation.
 * Automatically rolls back on error.
 */
export function createOptimisticUpdate<TEntity>(
  queryClient: ReturnType<typeof useQueryClient>,
  queryKey: QueryKey
) {
  return {
    onMutate: async (updatedEntity: Partial<TEntity>) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<TEntity[]>(queryKey);

      queryClient.setQueryData<TEntity[]>(queryKey, (old) =>
        old?.map((item) =>
          (item as Record<string, unknown>).id ===
          (updatedEntity as Record<string, unknown>).id
            ? { ...item, ...updatedEntity }
            : item
        ) ?? []
      );

      return { previousData };
    },
    onError: (
      _err: Error,
      _newEntity: Partial<TEntity>,
      context: { previousData?: TEntity[] }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    }};
}