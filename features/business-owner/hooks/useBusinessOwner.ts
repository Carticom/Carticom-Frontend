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

export function useBusinessOwnerWallet() {
  return useQuery({
    queryKey: ['business-owner', 'wallet'],
    queryFn: () => businessOwnerService.getWallet()});
}

export function useBusinessOwnerWalletHistory(page = 0, size = 20) {
  return useQuery({
    queryKey: ['business-owner', 'wallet-history', page, size],
    queryFn: () => businessOwnerService.getWalletHistory(page, size)});
}

export function useBusinessOwnerProfile() {
  return useQuery({
    queryKey: ['business-owner', 'profile'],
    queryFn: () => businessOwnerService.getProfile()});
}

export function useBusinessOwnerTrustScore() {
  return useQuery({
    queryKey: ['business-owner', 'trust-score'],
    queryFn: () => businessOwnerService.getTrustScore()});
}
