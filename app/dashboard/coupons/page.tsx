'use client';

import { useState } from 'react';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { useCoupons, useCreateCoupon, useUpdateCoupon, useDeleteCoupon } from '@/features/dashboard/hooks/useCoupons';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { CouponType } from '@/features/dashboard/types/coupons.types';
import type { CouponDto, CreateCouponDto } from '@/features/dashboard/types/coupons.types';
import { X, Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const couponTypes = [CouponType.PERCENTAGE, CouponType.FIXED] as const;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function defaultForm(): CreateCouponDto {
  return {
    code: '',
    type: CouponType.PERCENTAGE,
    value: 0,
    minOrderAmount: undefined,
    maxUsageCount: undefined,
    expiresAt: undefined,
    isActive: true,
  };
}

export default function CouponsPage() {
  const { storeId } = useCurrentStoreId();
  const { data: coupons, isLoading, error, refetch } = useCoupons(storeId);
  const createCoupon = useCreateCoupon();
  const updateCoupon = useUpdateCoupon();
  const deleteCoupon = useDeleteCoupon();

  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponDto | null>(null);
  const [formData, setFormData] = useState<CreateCouponDto>(defaultForm());
  const [formError, setFormError] = useState<string | null>(null);

  function openCreate() {
    setEditingCoupon(null);
    setFormData(defaultForm());
    setFormError(null);
    setShowForm(true);
  }

  function openEdit(coupon: CouponDto) {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minOrderAmount: coupon.minOrderAmount,
      maxUsageCount: coupon.maxUsageCount,
      expiresAt: coupon.expiresAt ? coupon.expiresAt.split('T')[0] : undefined,
      isActive: coupon.isActive,
    });
    setFormError(null);
    setShowForm(true);
  }

  function handleChange(field: keyof CreateCouponDto, value: unknown) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!storeId) return;
    setFormError(null);

    try {
      if (editingCoupon) {
        await updateCoupon.mutateAsync({ id: editingCoupon.id, data: formData });
      } else {
        await createCoupon.mutateAsync(formData);
      }
      setShowForm(false);
      refetch();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Operation failed');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await deleteCoupon.mutateAsync(id);
      refetch();
    } catch {
      // handled by hook
    }
  }

  async function handleToggleActive(coupon: CouponDto) {
    try {
      await updateCoupon.mutateAsync({ id: coupon.id, data: { isActive: !coupon.isActive } });
      refetch();
    } catch {
      // handled by hook
    }
  }

  if (!storeId || isLoading) return <LoadingState message="Loading coupons..." />;
  if (error) return <ErrorState title="Failed to load coupons" onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Coupons</h1>
          <p className="text-gray-600 mt-2">Manage discount coupons for your store</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" /> Add Coupon
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingCoupon ? 'Edit Coupon' : 'New Coupon'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            {formError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{formError}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                <input
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                  placeholder="SUMMER20"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {couponTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value *</label>
                  <input
                    type="number"
                    step={formData.type === CouponType.PERCENTAGE ? '1' : '0.01'}
                    min="0"
                    value={formData.value}
                    onChange={(e) => handleChange('value', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Amount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.minOrderAmount ?? ''}
                  onChange={(e) => handleChange('minOrderAmount', e.target.value ? parseFloat(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Usage Count</label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxUsageCount ?? ''}
                  onChange={(e) => handleChange('maxUsageCount', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expires At</label>
                <input
                  type="date"
                  value={formData.expiresAt ?? ''}
                  onChange={(e) => handleChange('expiresAt', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createCoupon.isPending || updateCoupon.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  {createCoupon.isPending || updateCoupon.isPending ? 'Saving...' : editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!coupons?.length ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <EmptyState title="No coupons yet" description="Create your first coupon to offer discounts to customers." />
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Code</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Discount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Min Order</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Usage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Expires</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon: CouponDto) => (
                  <tr key={coupon.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono font-medium text-gray-900">{coupon.code}</span>
                    </td>
                    <td className="py-3 px-4">
                      {coupon.type === CouponType.PERCENTAGE ? `${coupon.value}%` : formatCurrency(coupon.value)}
                      <span className="text-xs text-gray-500 ml-1">
                        ({coupon.type === CouponType.PERCENTAGE ? '%' : '$'})
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {coupon.minOrderAmount ? formatCurrency(coupon.minOrderAmount) : '—'}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {coupon.usedCount}{coupon.maxUsageCount ? ` / ${coupon.maxUsageCount}` : ''}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {formatDate(coupon.expiresAt)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        coupon.isActive ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-100'
                      }`}>
                        {coupon.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleToggleActive(coupon)}
                          className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                          title={coupon.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {coupon.isActive ? <ToggleRight className="h-4 w-4 text-green-600" /> : <ToggleLeft className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => openEdit(coupon)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit coupon"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(coupon.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete coupon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
