import axiosInstance, { extractErrorMessage } from '@/lib/axios';
import type {
  CustomSolutionDto,
  CreateCustomSolutionDto,
  CustomSolutionStatistics,
  UpdateStatusDto,
  QuotationDto,
  AssignDto,
  AdminNotesDto} from '../types';

const ENDPOINTS = {
  SUBMIT: '/api/v1/custom-solutions',
  MY_REQUESTS: '/api/v1/custom-solutions/my',
  DETAIL: (id: string) => `/api/v1/custom-solutions/${id}`,
  ADMIN_LIST: '/api/v1/admin/custom-solutions',
  ADMIN_STATISTICS: '/api/v1/admin/custom-solutions/statistics',
  ADMIN_STATUS: (id: string) => `/api/v1/admin/custom-solutions/${id}/status`,
  ADMIN_QUOTATION: (id: string) => `/api/v1/admin/custom-solutions/${id}/quotation`,
  ADMIN_ASSIGN: (id: string) => `/api/v1/admin/custom-solutions/${id}/assign`,
  ADMIN_NOTES: (id: string) => `/api/v1/admin/custom-solutions/${id}/notes`} as const;

class CustomSolutionsService {
  async submit(dto: CreateCustomSolutionDto): Promise<CustomSolutionDto> {
    try {
      const response = await axiosInstance.post(ENDPOINTS.SUBMIT, dto);
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getMyRequests(): Promise<CustomSolutionDto[]> {
    try {
      const response = await axiosInstance.get(ENDPOINTS.MY_REQUESTS);
      return response.data?.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getById(id: string): Promise<CustomSolutionDto> {
    try {
      const response = await axiosInstance.get(ENDPOINTS.DETAIL(id));
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async adminListAll(): Promise<CustomSolutionDto[]> {
    try {
      const response = await axiosInstance.get(ENDPOINTS.ADMIN_LIST);
      return response.data?.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async adminGetStatistics(): Promise<CustomSolutionStatistics> {
    try {
      const response = await axiosInstance.get(ENDPOINTS.ADMIN_STATISTICS);
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async adminUpdateStatus(id: string, dto: UpdateStatusDto): Promise<CustomSolutionDto> {
    try {
      const response = await axiosInstance.patch(ENDPOINTS.ADMIN_STATUS(id), dto);
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async adminUploadQuotation(id: string, dto: QuotationDto): Promise<CustomSolutionDto> {
    try {
      const formData = new FormData();
      formData.append('amount', String(dto.amount));
      formData.append('note', dto.note);
      if (dto.file) {
        formData.append('file', dto.file);
      }
      const response = await axiosInstance.post(ENDPOINTS.ADMIN_QUOTATION(id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' }});
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async adminAssign(id: string, dto: AssignDto): Promise<CustomSolutionDto> {
    try {
      const response = await axiosInstance.patch(ENDPOINTS.ADMIN_ASSIGN(id), dto);
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async adminAddNotes(id: string, dto: AdminNotesDto): Promise<CustomSolutionDto> {
    try {
      const response = await axiosInstance.patch(ENDPOINTS.ADMIN_NOTES(id), dto);
      return response.data?.data ?? response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }
}

export const customSolutionsService = new CustomSolutionsService();
