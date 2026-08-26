'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { LoadingState, ErrorState, EmptyState } from '@/components/dashboard/shared/StateComponents';
import { customSolutionsService } from '@/features/custom-solutions/services/custom-solutions.service';
import { CustomSolutionStatus } from '@/features/custom-solutions/types';

const statusColors: Record<string, string> = {
  [CustomSolutionStatus.SUBMITTED]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  [CustomSolutionStatus.UNDER_REVIEW]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  [CustomSolutionStatus.MEETING_SCHEDULED]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  [CustomSolutionStatus.QUOTATION_SENT]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  [CustomSolutionStatus.NEGOTIATION]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  [CustomSolutionStatus.APPROVED]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  [CustomSolutionStatus.PAID]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  [CustomSolutionStatus.DEVELOPMENT]: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  [CustomSolutionStatus.TESTING]: 'bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-400',
  [CustomSolutionStatus.DEPLOYED]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  [CustomSolutionStatus.COMPLETED]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  [CustomSolutionStatus.REJECTED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'};

export default function SuperAdminCustomSolutionsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const { data: requests, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'custom-solutions', 'all'],
    queryFn: () => customSolutionsService.adminListAll()});

  if (isLoading) return <LoadingState message="Loading custom solutions..." />;
  if (error) return <ErrorState title="Failed to load custom solutions" onRetry={refetch} />;

  const filtered = (requests ?? []).filter(
    (r) =>
      (r.businessName ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (r.industry ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (r.country ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Custom Solutions</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage and track all custom solution requests.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by business name, industry, or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No custom solutions found" description={search ? 'Try a different search term.' : 'No requests have been submitted yet.'} />
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => (
            <button
              key={req.id}
              onClick={() => router.push(`/super-admin/custom-solutions/${req.id}`)}
              className="w-full text-left rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{req.businessName}</h3>
                  <p className="text-sm text-gray-500 mt-1">{req.industry} &middot; {req.country}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${statusColors[req.status]}`}>
                  {req.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                <span>{req.services.length} service{req.services.length !== 1 ? 's' : ''}</span>
                {req.budget && <span>Budget: {req.budget}</span>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
