'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  [CustomSolutionStatus.DEVELOPMENT]: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  [CustomSolutionStatus.TESTING]: 'bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-400',
  [CustomSolutionStatus.DEPLOYED]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  [CustomSolutionStatus.COMPLETED]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  [CustomSolutionStatus.REJECTED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'};

export default function CustomSolutionsPage() {
  const { data: requests, isLoading, error, refetch } = useQuery({
    queryKey: ['custom-solutions', 'my'],
    queryFn: () => customSolutionsService.getMyRequests()});

  if (isLoading) return <LoadingState message="Loading your custom solutions..." />;
  if (error) return <ErrorState title="Failed to load custom solutions" onRetry={refetch} />;
  if (!requests || requests.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Custom Solutions</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Need something beyond our standard plans? Request a tailored solution.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/custom-solutions/new">
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Link>
          </Button>
        </div>
        <EmptyState
          icon={FileText}
          title="No custom solution requests yet"
          description="Submit a request and our team will get back to you with a tailored proposal."
          action={{ label: 'Submit Request', onClick: () => window.location.href = '/dashboard/custom-solutions/new' }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Custom Solutions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your custom solution requests.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/custom-solutions/new">
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <Link
            key={req.id}
            href={`/dashboard/custom-solutions/${req.id}`}
            className="block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:shadow-md transition-shadow"
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
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {new Date(req.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                {req.status === CustomSolutionStatus.COMPLETED ? (
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                ) : req.status === CustomSolutionStatus.REJECTED ? (
                  <XCircle className="h-3.5 w-3.5 text-red-500" />
                ) : (
                  <FileText className="h-3.5 w-3.5" />
                )}
                {req.services.slice(0, 3).join(', ')}
                {req.services.length > 3 && ` +${req.services.length - 3} more`}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
