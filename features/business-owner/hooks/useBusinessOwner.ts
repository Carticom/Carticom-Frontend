'use client';

import { useQuery } from '@tanstack/react-query';
import { businessOwnerService } from '../services/business-owner.service';

export function useBusinessOwnerDashboard() {
  return useQuery({
    queryKey: ['business-owner', 'dashboard'],
    queryFn: () => businessOwnerService.getDashboard()});
}

export function useBusinessOwnerAnalytics(period: string = 'monthly') {
  return useQuery({
    queryKey: ['business-owner', 'analytics', period],
    queryFn: () => businessOwnerService.getAnalyticsRevenue(period)});
}

export function useBusinessOwnerProfile() {
  return useQuery({
    queryKey: ['business-owner', 'profile'],
    queryFn: () => businessOwnerService.getProfile()});
}
