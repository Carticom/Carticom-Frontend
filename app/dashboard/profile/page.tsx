// ============================================================
// CARTICOM — Dashboard Profile
// ============================================================

import { Metadata } from 'next';
import { RoleGuard } from '@/features/auth/components/RoleGuard';
import { AUTHENTICATED_USERS } from '@/features/auth/components/RoleGuard';

export const metadata: Metadata = {
  title: 'Profile | Carticom',
  description: 'Manage your Carticom profile',
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your personal information and business details.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Personal Information
          </h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Profile management form will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
}