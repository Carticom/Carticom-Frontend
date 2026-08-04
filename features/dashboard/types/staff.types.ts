// ============================================================
// CARTICOM STAFF — Domain Types
// ============================================================

export interface StaffDto {
  id: string;
  storeId: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: StaffRole;
  permissions: string[];
  status: StaffStatus;
  lastLoginAt?: string;
  invitedAt: string;
  joinedAt?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaffDto {
  email: string;
  firstName: string;
  lastName: string;
  role: StaffRole;
  permissions?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateStaffDto {
  role?: StaffRole;
  permissions?: string[];
  status?: StaffStatus;
  metadata?: Record<string, unknown>;
}

export enum StaffRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
  VIEWER = 'VIEWER'}

export enum StaffStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DEACTIVATED = 'DEACTIVATED'}