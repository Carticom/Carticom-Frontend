'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressesRepository } from '@/features/dashboard/repositories/addresses.repository';
import type { AddressDto, CreateAddressDto, UpdateAddressDto } from '@/features/dashboard/types/addresses.types';
import { queryKeys } from '@/lib/dal/query-keys';
import { showToast } from '@/lib/notifications/toast';

export function useAddresses() {
  return useQuery({
    queryKey: queryKeys.addresses.all,
    queryFn: async () => {
      const result = await addressesRepository.list({ page: 0, limit: 100 });
      return result.data;
    },
  });
}

export function useAddress(id: string | undefined | null) {
  return useQuery({
    queryKey: queryKeys.addresses.byId(id || ''),
    queryFn: async () => {
      if (!id) throw new Error('Address ID is required');
      return addressesRepository.getById(id);
    },
    enabled: !!id,
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAddressDto) => {
      return addressesRepository.create({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all });
      showToast('success', 'Address created successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create address', {
        description: error.message,
      });
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UpdateAddressDto> }) => {
      return addressesRepository.update({ id, data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.byId(variables.id) });
      showToast('success', 'Address updated successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update address', {
        description: error.message,
      });
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return addressesRepository.delete({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all });
      showToast('success', 'Address deleted successfully');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to delete address', {
        description: error.message,
      });
    },
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return addressesRepository.setDefault(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all });
      showToast('success', 'Default address updated');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to set default address', {
        description: error.message,
      });
    },
  });
}
