'use client';

import { DashboardShell } from '@/components/dashboard/layout/DashboardShell';
import { RoleGuard, ADMIN_AND_ABOVE } from '@/features/auth/components/RoleGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={ADMIN_AND_ABOVE}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
