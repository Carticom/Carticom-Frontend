'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superAdminRepository } from '@/features/admin/repositories/admin.repository';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Button } from '@/components/ui/button';
import { Dialog, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Loader2, Search } from 'lucide-react';
import { showToast } from '@/lib/notifications/toast';

interface Setting {
  id: string;
  key: string;
  value: string;
  description: string;
  dataType: string;
  updatedAt: string;
}

const emptyForm = {
  key: '',
  value: '',
  description: '',
  dataType: 'STRING',
};

export default function SuperAdminSettingsPage() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');

  const { data: settings, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'settings'],
    queryFn: () => superAdminRepository.getSettings<Setting>(),
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload: Record<string, unknown> = {
        key: form.key,
        value: form.value,
        description: form.description,
        dataType: form.dataType,
      };
      if (editingSetting) {
        await superAdminRepository.updateSetting(editingSetting.id, {
          value: form.value,
          description: form.description,
          dataType: form.dataType,
        });
      } else {
        await superAdminRepository.createSetting(payload);
      }
    },
    onSuccess: () => {
      showToast('success', editingSetting ? 'Setting updated' : 'Setting created');
      queryClient.invalidateQueries({ queryKey: ['super-admin', 'settings'] });
      handleClose();
    },
    onError: (err) => {
      showToast('error', err instanceof Error ? err.message : 'Operation failed');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (settingId: string) => {
      await superAdminRepository.deleteSetting(settingId);
    },
    onSuccess: () => {
      showToast('success', 'Setting deleted');
      queryClient.invalidateQueries({ queryKey: ['super-admin', 'settings'] });
    },
    onError: (err) => {
      showToast('error', err instanceof Error ? err.message : 'Failed to delete setting');
    },
  });

  const handleClose = () => {
    setShowModal(false);
    setEditingSetting(null);
    setForm(emptyForm);
  };

  const openEdit = (setting: Setting) => {
    setEditingSetting(setting);
    setForm({
      key: setting.key,
      value: setting.value,
      description: setting.description ?? '',
      dataType: setting.dataType ?? 'STRING',
    });
    setShowModal(true);
  };

  const filtered = (settings ?? []).filter((s) =>
    s.key.toLowerCase().includes(search.toLowerCase()) ||
    (s.description ?? '').toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <LoadingState message="Loading settings..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">System-wide configuration settings</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-1" />
          New Setting
        </Button>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by key or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title={search ? 'No settings match your search' : 'No settings found'}
            description={search ? 'Try different search terms.' : 'No platform settings have been configured yet.'}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Key</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Updated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((setting) => (
                  <tr
                    key={setting.id ?? setting.key}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-mono text-xs">{setting.key}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 max-w-xs truncate">{setting.value}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 max-w-xs truncate">{setting.description || '—'}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {setting.dataType ?? 'STRING'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-xs">
                      {setting.updatedAt ? new Date(setting.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="xs" variant="ghost" onClick={() => openEdit(setting)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this setting?')) {
                              deleteMutation.mutate(setting.id);
                            }
                          }}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog
        open={showModal}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
        title={editingSetting ? 'Edit Setting' : 'Create Setting'}
        description={editingSetting ? 'Update setting details' : 'Add a new platform setting'}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              value={form.key}
              onChange={(e) => setForm({ ...form, key: e.target.value })}
              className="mt-1"
              placeholder="e.g. maintenance_mode"
              disabled={!!editingSetting}
            />
          </div>
          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="dataType">Data Type</Label>
            <select
              id="dataType"
              value={form.dataType}
              onChange={(e) => setForm({ ...form, dataType: e.target.value })}
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm px-3 py-2"
            >
              <option value="STRING">String</option>
              <option value="NUMBER">Number</option>
              <option value="BOOLEAN">Boolean</option>
              <option value="JSON">JSON</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => saveMutation.mutate()}
            disabled={!form.key || !form.value || saveMutation.isPending}
          >
            {saveMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
            {editingSetting ? 'Update Setting' : 'Create Setting'}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
