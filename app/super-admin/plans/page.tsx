'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superAdminRepository } from '@/features/admin/repositories/admin.repository';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Button } from '@/components/ui/button';
import { Dialog, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { showToast } from '@/lib/notifications/toast';

interface Plan {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  yearlyPrice: number;
  billingCycle: string;
  features: string[];
  status: string;
  maxProducts: number;
  maxStaff: number;
  customDomain: boolean;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    INACTIVE: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
    ARCHIVED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'};
  return map[status] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
}

const emptyForm = {
  name: '',
  monthlyPrice: 0,
  yearlyPrice: 0,
  maxProducts: 25,
  maxStaff: 1,
  customDomain: false,
  features: '',
  status: 'ACTIVE'};

export default function SuperAdminPlansPage() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: plans, isLoading, error, refetch } = useQuery({
    queryKey: ['super-admin', 'plans'],
    queryFn: () => superAdminRepository.getPlans<Plan>()});

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: form.name,
        monthlyPrice: form.monthlyPrice,
        yearlyPrice: form.yearlyPrice,
        maxProducts: form.maxProducts,
        maxStaff: form.maxStaff,
        customDomain: form.customDomain,
        features: form.features.split(',').map((f) => f.trim()).filter(Boolean),
        status: form.status};
      if (editingPlan) {
        await superAdminRepository.updatePlan<Plan>(editingPlan.id, payload);
      } else {
        await superAdminRepository.createPlan<Plan>(payload);
      }
    },
    onSuccess: () => {
      showToast('success', editingPlan ? 'Plan updated' : 'Plan created');
      queryClient.invalidateQueries({ queryKey: ['super-admin', 'plans'] });
      handleClose();
    },
    onError: (err) => {
      showToast('error', err instanceof Error ? err.message : 'Operation failed');
    }});

  const deleteMutation = useMutation({
    mutationFn: async (planId: string) => {
      await superAdminRepository.deletePlan(planId);
    },
    onSuccess: () => {
      showToast('success', 'Plan deleted');
      queryClient.invalidateQueries({ queryKey: ['super-admin', 'plans'] });
    },
    onError: (err) => {
      showToast('error', err instanceof Error ? err.message : 'Failed to delete plan');
    }});

  const handleClose = () => {
    setShowModal(false);
    setEditingPlan(null);
    setForm(emptyForm);
  };

  const openEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setForm({
      name: plan.name,
      monthlyPrice: plan.monthlyPrice || plan.price || 0,
      yearlyPrice: plan.yearlyPrice || 0,
      maxProducts: plan.maxProducts || 25,
      maxStaff: plan.maxStaff || 1,
      customDomain: plan.customDomain || false,
      features: (plan.features ?? []).join(', '),
      status: plan.status || 'ACTIVE'});
    setShowModal(true);
  };

  if (isLoading) return <LoadingState message="Loading plans..." />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription Plans</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">View and manage platform subscription plans</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Add Plan
        </Button>
      </div>

      {!plans?.length ? (
        <EmptyState title="No plans found" description="No subscription plans have been created yet." />
      ) : (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Plan Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Monthly Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Yearly Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Max Products</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Features</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{plan.name}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{plan.monthlyPrice ? formatCurrency(plan.monthlyPrice) : (plan.price ? formatCurrency(plan.price) : '—')}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{plan.yearlyPrice ? formatCurrency(plan.yearlyPrice) : '—'}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{plan.maxProducts ?? '—'}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(plan.features ?? []).map((f, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{f}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(plan.status ?? '')}`}>{plan.status || '—'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="xs" variant="ghost" onClick={() => openEdit(plan)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="xs" variant="ghost" onClick={() => {
                          if (confirm('Are you sure you want to delete this plan?')) {
                            deleteMutation.mutate(plan.id);
                          }
                        }} disabled={deleteMutation.isPending}>
                          <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog
        open={showModal}
        onOpenChange={(open) => { if (!open) handleClose(); }}
        title={editingPlan ? 'Edit Plan' : 'Create Plan'}
        description={editingPlan ? 'Update subscription plan details' : 'Add a new subscription plan'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="monthlyPrice">Monthly Price (NGN)</Label>
              <Input id="monthlyPrice" type="number" min={0} value={form.monthlyPrice} onChange={(e) => setForm({ ...form, monthlyPrice: Number(e.target.value) })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="yearlyPrice">Yearly Price (NGN)</Label>
              <Input id="yearlyPrice" type="number" min={0} value={form.yearlyPrice} onChange={(e) => setForm({ ...form, yearlyPrice: Number(e.target.value) })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="maxProducts">Max Products</Label>
              <Input id="maxProducts" type="number" min={1} value={form.maxProducts} onChange={(e) => setForm({ ...form, maxProducts: Number(e.target.value) })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="maxStaff">Max Staff</Label>
              <Input id="maxStaff" type="number" min={0} value={form.maxStaff} onChange={(e) => setForm({ ...form, maxStaff: Number(e.target.value) })} className="mt-1" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="features">Features (comma separated)</Label>
              <Input id="features" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="mt-1" placeholder="e.g. 100 products, 2 staff, Custom domain" />
            </div>
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.customDomain} onChange={(e) => setForm({ ...form, customDomain: e.target.checked })} className="rounded border-gray-300" />
                <span className="text-sm font-medium">Custom Domain Support</span>
              </label>
            </div>
            <div className="col-span-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm px-3 py-2"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={() => saveMutation.mutate()} disabled={!form.name || saveMutation.isPending}>
            {saveMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
            {editingPlan ? 'Update Plan' : 'Create Plan'}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
