import axiosInstance, { extractErrorMessage } from '@/lib/axios';
import type { BusinessOwnerDashboardDTO, AnalyticsResponseDTO, WalletResponseDTO, WalletTransactionResponseDTO, WithdrawalResponseDTO, SettlementDTO } from '../types';

class BusinessOwnerService {
  async getDashboard(): Promise<BusinessOwnerDashboardDTO> {
    try {
      const response = await axiosInstance.get('/api/v1/business-owner/dashboard');
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getAnalyticsRevenue(period: string = 'monthly'): Promise<AnalyticsResponseDTO[]> {
    try {
      const response = await axiosInstance.get(`/api/v1/business-owner/analytics/revenue?period=${period}`);
      return response.data?.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getAnalyticsOrders(period: string = 'monthly'): Promise<AnalyticsResponseDTO[]> {
    try {
      const response = await axiosInstance.get(`/api/v1/business-owner/analytics/orders?period=${period}`);
      return response.data?.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getAnalyticsCustomers(period: string = 'monthly'): Promise<AnalyticsResponseDTO[]> {
    try {
      const response = await axiosInstance.get(`/api/v1/business-owner/analytics/customers?period=${period}`);
      return response.data?.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getAnalyticsConversion(period: string = 'monthly'): Promise<AnalyticsResponseDTO[]> {
    try {
      const response = await axiosInstance.get(`/api/v1/business-owner/analytics/conversion?period=${period}`);
      return response.data?.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getAnalyticsWeekly(): Promise<AnalyticsResponseDTO[]> {
    try { const r = await axiosInstance.get('/api/v1/business-owner/analytics/weekly'); return r.data?.data ?? r.data ?? []; } catch (error) { throw new Error(extractErrorMessage(error)); }
  }

  async getAnalyticsMonthly(): Promise<AnalyticsResponseDTO[]> {
    try { const r = await axiosInstance.get('/api/v1/business-owner/analytics/monthly'); return r.data?.data ?? r.data ?? []; } catch (error) { throw new Error(extractErrorMessage(error)); }
  }

  async getAnalyticsYearly(): Promise<AnalyticsResponseDTO[]> {
    try { const r = await axiosInstance.get('/api/v1/business-owner/analytics/yearly'); return r.data?.data ?? r.data ?? []; } catch (error) { throw new Error(extractErrorMessage(error)); }
  }

  async getWallet(): Promise<WalletResponseDTO> {
    try {
      const response = await axiosInstance.get('/api/v1/wallet');
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getWalletHistory(page = 0, size = 20): Promise<WalletTransactionResponseDTO[]> {
    try {
      const response = await axiosInstance.get(`/api/v1/wallet/history?page=${page}&size=${size}`);
      return response.data?.data?.content ?? response.data?.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getWithdrawals(page = 0, size = 20): Promise<WithdrawalResponseDTO[]> {
    try {
      const response = await axiosInstance.get(`/api/v1/wallet/withdrawals?page=${page}&size=${size}`);
      return response.data?.data?.content ?? response.data?.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async requestWithdrawal(data: { amount: number; bankName: string; accountNumber: string }): Promise<WithdrawalResponseDTO> {
    try {
      const response = await axiosInstance.post('/api/v1/wallet/withdrawals', data);
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getProfile(): Promise<Record<string, unknown>> {
    try {
      const response = await axiosInstance.get('/api/v1/business-owner/profile');
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async updateProfile(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    try {
      const response = await axiosInstance.put('/api/v1/business-owner/profile', data);
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getTrustScore(): Promise<{ trustLevel: string; trustScore: number }> {
    try {
      const response = await axiosInstance.get('/api/v1/merchant/trust');
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getSettlements(storeId: string, page = 0, size = 20): Promise<SettlementDTO[]> {
    try {
      const response = await axiosInstance.get(`/api/v1/settlements?storeId=${storeId}&page=${page}&size=${size}`);
      return response.data?.data?.content ?? response.data?.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async releaseSettlement(orderId: string): Promise<SettlementDTO> {
    try {
      const response = await axiosInstance.post(`/api/v1/settlements/release/${orderId}`);
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async refundSettlement(orderId: string): Promise<SettlementDTO | null> {
    try {
      const response = await axiosInstance.post(`/api/v1/settlements/refund/${orderId}`);
      return response.data?.data ?? response.data ?? null;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }
}

export const businessOwnerService = new BusinessOwnerService();
