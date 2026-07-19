'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function roleBadge(role: string) {
  const map: Record<string, string> = {
    SUPER_ADMIN: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    ADMIN: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    BUSINESS_OWNER: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    STAFF: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
  };
  return map[role] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    SUSPENDED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  };
  return map[status] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
}

export default function SuperAdminUsersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'users'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/super-admin/users');
      return (res.data.data ?? []) as User[];
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: 'suspend' | 'activate' }) => {
      await axiosInstance.post(`/api/v1/super-admin/users/${id}/${action}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['super-admin', 'users'] });
    },
  });

  if (isLoading) return <LoadingState message="Loading users..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  const filtered = (users ?? []).filter((u) =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all platform users</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title={search ? 'No users match your search' : 'No users found'} description={search ? 'Try a different search term.' : undefined} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{user.fullName}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge(user.role)}`}>{user.role}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(user.status)}`}>{user.status}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(user.createdAt)}</td>
                    <td className="py-3 px-4">
                      {user.status === 'SUSPENDED' ? (
                        <Button size="xs" variant="outline" onClick={() => toggleMutation.mutate({ id: user.id, action: 'activate' })} disabled={toggleMutation.isPending}>
                          Activate
                        </Button>
                      ) : (
                        <Button size="xs" variant="destructive" onClick={() => toggleMutation.mutate({ id: user.id, action: 'suspend' })} disabled={toggleMutation.isPending}>
                          Suspend
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
