'use client';

import { DashboardShell } from '@/components/dashboard/layout/DashboardShell';
import { RoleGuard, STAFF_AND_ABOVE } from '@/features/auth/components/RoleGuard';

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={STAFF_AND_ABOVE}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
