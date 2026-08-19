'use client';

import { useQuery } from '@tanstack/react-query';
import { FileText, CheckCircle, XCircle } from 'lucide-react';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { customSolutionsService } from '@/features/custom-solutions/services/custom-solutions.service';
import { CustomSolutionStatus } from '@/features/custom-solutions/types';

const statusConfig: { key: keyof typeof CustomSolutionStatus; label: string; color: string }[] = [
  { key: 'SUBMITTED' as const, label: 'Submitted', color: 'bg-blue-500' },
  { key: 'UNDER_REVIEW' as const, label: 'Under Review', color: 'bg-yellow-500' },
  { key: 'MEETING_SCHEDULED' as const, label: 'Meeting Scheduled', color: 'bg-purple-500' },
  { key: 'QUOTATION_SENT' as const, label: 'Quotation Sent', color: 'bg-indigo-500' },
  { key: 'NEGOTIATION' as const, label: 'Negotiation', color: 'bg-orange-500' },
  { key: 'APPROVED' as const, label: 'Approved', color: 'bg-green-500' },
  { key: 'DEVELOPMENT' as const, label: 'Development', color: 'bg-blue-500' },
  { key: 'TESTING' as const, label: 'Testing', color: 'bg-brand-500' },
  { key: 'DEPLOYED' as const, label: 'Deployed', color: 'bg-emerald-500' },
  { key: 'COMPLETED' as const, label: 'Completed', color: 'bg-green-600' },
  { key: 'REJECTED' as const, label: 'Rejected', color: 'bg-red-500' },
];

export default function CustomSolutionsStatisticsPage() {
  const { data: stats, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'custom-solutions', 'statistics'],
    queryFn: () => customSolutionsService.adminGetStatistics()});

  if (isLoading) return <LoadingState message="Loading statistics..." />;
  if (error) return <ErrorState title="Failed to load statistics" onRetry={refetch} />;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Custom Solutions Statistics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Overview of all custom solution requests.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {statusConfig.map(({ key, label, color }) => {
          const count = stats[key.toLowerCase() as keyof typeof stats] as number ?? 0;
          return (
            <div
              key={key}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`h-3 w-3 rounded-full ${color}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{count}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Requests</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <XCircle className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.rejected}</p>
              <p className="text-sm text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
