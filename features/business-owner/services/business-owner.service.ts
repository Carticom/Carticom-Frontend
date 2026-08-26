import axiosInstance, { extractErrorMessage } from '@/lib/axios';
import type { BusinessOwnerDashboardDTO, AnalyticsResponseDTO } from '../types';

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
}

export const businessOwnerService = new BusinessOwnerService();
