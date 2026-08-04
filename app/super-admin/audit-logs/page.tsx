'use client';

import { useQuery } from '@tanstack/react-query';
import { superAdminRepository } from '@/features/admin/repositories/admin.repository';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';

interface AuditLog {
  id: string;
  userName: string;
  action: string;
  entity: string;
  timestamp: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function SuperAdminAuditLogsPage() {
  const { data: logs, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'audit-logs'],
    queryFn: async () => {
      const page = await superAdminRepository.getAuditLogs<AuditLog>();
      return page?.content ?? [];
    }});

  if (isLoading) return <LoadingState message="Loading audit logs..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;
  if (!logs?.length) return <EmptyState title="No audit logs found" description="No audit log entries have been recorded yet." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Audit Logs</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Track all administrative actions on the platform</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Entity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{log.userName}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{log.action}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{log.entity}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(log.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
