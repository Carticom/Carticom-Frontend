'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Building2, Globe, Users, Package, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';
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
  [CustomSolutionStatus.TESTING]: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
  [CustomSolutionStatus.DEPLOYED]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  [CustomSolutionStatus.COMPLETED]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  [CustomSolutionStatus.REJECTED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'};

export default function CustomSolutionDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: req, isLoading, error, refetch } = useQuery({
    queryKey: ['custom-solutions', id],
    queryFn: () => customSolutionsService.getById(id),
    enabled: !!id});

  if (isLoading) return <LoadingState message="Loading custom solution..." />;
  if (error) return <ErrorState title="Failed to load custom solution" onRetry={refetch} />;
  if (!req) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link
          href="/dashboard/custom-solutions"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Custom Solutions
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{req.businessName}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Custom Solution Request</p>
          </div>
          <span className={`px-3 py-1 text-sm rounded-full font-medium ${statusColors[req.status]}`}>
            {req.status.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Business Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Industry</p>
              <p className="font-medium text-gray-900 dark:text-white">{req.industry}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Globe className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Country</p>
              <p className="font-medium text-gray-900 dark:text-white">{req.country}</p>
            </div>
          </div>
          {req.currentWebsite && (
            <div className="flex items-center gap-3 text-sm">
              <Globe className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-500">Website</p>
                <p className="font-medium text-gray-900 dark:text-white">{req.currentWebsite}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm">
            <Users className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Employees</p>
              <p className="font-medium text-gray-900 dark:text-white">{req.employees}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Package className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Monthly Orders</p>
              <p className="font-medium text-gray-900 dark:text-white">{req.monthlyOrders}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Budget</p>
              <p className="font-medium text-gray-900 dark:text-white">{req.budget}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Timeline</p>
              <p className="font-medium text-gray-900 dark:text-white">{req.timeline}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Submitted</p>
              <p className="font-medium text-gray-900 dark:text-white">{new Date(req.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services Required</h2>
        <div className="flex flex-wrap gap-2">
          {req.services.map((service) => (
            <span
              key={service}
              className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {req.additionalRequirements && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Requirements</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{req.additionalRequirements}</p>
        </div>
      )}

      {req.quotationUrl && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quotation</h2>
          <div className="flex items-center justify-between">
            <div>
              {req.quotationAmount && (
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₦{req.quotationAmount.toLocaleString()}
                </p>
              )}
              {req.quotationNote && (
                <p className="text-sm text-gray-500 mt-1">{req.quotationNote}</p>
              )}
            </div>
            <a
              href={req.quotationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              View Quotation
            </a>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status Timeline</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {req.status === CustomSolutionStatus.COMPLETED ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : req.status === CustomSolutionStatus.REJECTED ? (
            <XCircle className="h-5 w-5 text-red-500" />
          ) : (
            <Clock className="h-5 w-5 text-blue-500" />
          )}
          <span>Current status: <strong className="text-gray-900 dark:text-white">{req.status.replace(/_/g, ' ')}</strong></span>
        </div>
      </div>
    </div>
  );
}
