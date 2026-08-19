'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shippingRepository } from '@/features/dashboard/repositories/shipping.repository';
import type {
  CreateShippingZoneDto,
  UpdateShippingZoneDto,
  CreateShippingMethodDto,
  UpdateShippingMethodDto,
  ShippingRateRequest} from '@/features/dashboard/types/shipping.types';
import { showToast } from '@/lib/notifications/toast';

export function useShippingZones(storeId: string | null) {
  return useQuery({
    queryKey: ['shipping', 'zones', storeId],
    queryFn: () => shippingRepository.getZones(storeId!),
    enabled: !!storeId});
}

export function useCreateZone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateShippingZoneDto) => shippingRepository.createZone(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping', 'zones'] });
      showToast('success', 'Shipping zone created');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create shipping zone', {
        description: error.message});
    }});
}

export function useUpdateZone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateShippingZoneDto }) =>
      shippingRepository.updateZone(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping', 'zones'] });
      showToast('success', 'Shipping zone updated');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update shipping zone', {
        description: error.message});
    }});
}

export function useDeleteZone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => shippingRepository.deleteZone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping', 'zones'] });
      showToast('success', 'Shipping zone deleted');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to delete shipping zone', {
        description: error.message});
    }});
}

export function useShippingMethods(storeId: string | null) {
  return useQuery({
    queryKey: ['shipping', 'methods', storeId],
    queryFn: () => shippingRepository.getMethods(storeId!),
    enabled: !!storeId});
}

export function useCreateMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateShippingMethodDto) => shippingRepository.createMethod(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping', 'methods'] });
      showToast('success', 'Shipping method created');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to create shipping method', {
        description: error.message});
    }});
}

export function useUpdateMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateShippingMethodDto }) =>
      shippingRepository.updateMethod(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping', 'methods'] });
      showToast('success', 'Shipping method updated');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to update shipping method', {
        description: error.message});
    }});
}

export function useDeleteMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => shippingRepository.deleteMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping', 'methods'] });
      showToast('success', 'Shipping method deleted');
    },
    onError: (error: Error) => {
      showToast('error', 'Failed to delete shipping method', {
        description: error.message});
    }});
}

export function useCalculateRates() {
  return useMutation({
    mutationFn: (request: ShippingRateRequest) => shippingRepository.calculateRates(request),
    onError: (error: Error) => {
      showToast('error', 'Failed to calculate rates', {
        description: error.message});
    }});
}