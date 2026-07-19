'use client';

import { DashboardShell } from '@/components/dashboard/layout/DashboardShell';
import { RoleGuard } from '@/features/auth/components/RoleGuard';
import { BUSINESS_OWNER_ONLY } from '@/features/auth/components/RoleGuard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={BUSINESS_OWNER_ONLY}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
