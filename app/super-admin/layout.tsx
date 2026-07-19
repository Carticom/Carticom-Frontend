'use client';

import { DashboardShell } from '@/components/dashboard/layout/DashboardShell';
import { RoleGuard, SUPER_ADMIN_ONLY } from '@/features/auth/components/RoleGuard';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={SUPER_ADMIN_ONLY}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
