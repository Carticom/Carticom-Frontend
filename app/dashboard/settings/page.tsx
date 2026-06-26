// ============================================================
// CARTICOM — Dashboard Settings
// ============================================================

import { Metadata } from 'next';
import { RoleGuard } from '@/features/auth/components/RoleGuard';
import { AUTHENTICATED_USERS } from '@/features/auth/components/RoleGuard';

export const metadata: Metadata = {
  title: 'Settings | Carticom',
  description: 'Manage your Carticom account settings',
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account preferences and security settings.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Security Settings */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Security
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your password and authentication preferences.
            </p>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Security settings form will be implemented here.
            </p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Configure how you receive notifications.
            </p>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Notification settings will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}