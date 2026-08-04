'use client';

import { useQuery } from '@tanstack/react-query';
import { superAdminRepository } from '@/features/admin/repositories/admin.repository';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';

interface Setting {
  key: string;
  value: string;
}

export default function SuperAdminSettingsPage() {
  const { data: settings, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'settings'],
    queryFn: () => superAdminRepository.getSettings<Setting>()});

  if (isLoading) return <LoadingState message="Loading settings..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;
  if (!settings?.length) return <EmptyState title="No settings found" description="No platform settings have been configured yet." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">System-wide configuration settings</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Key</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Value</th>
              </tr>
            </thead>
            <tbody>
              {settings.map((setting) => (
                <tr key={setting.key} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-mono text-xs">{setting.key}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{setting.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
