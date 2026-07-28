'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {
  useProductVariants,
  useCreateVariant,
  useUpdateVariant,
  useDeleteVariant,
} from '@/features/dashboard/hooks/useVariants';
import type { ProductVariantDto, CreateVariantDto, UpdateVariantDto } from '@/features/dashboard/types/variants.types';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Breadcrumb } from '@/components/dashboard/shared/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogFooter } from '@/components/ui/dialog';
import { showToast } from '@/lib/notifications/toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface VariantFormData {
  name: string;
  value: string;
  price: string;
  stock: string;
  sku: string;
}

const emptyForm: VariantFormData = { name: '', value: '', price: '', stock: '0', sku: '' };

function toDto(data: VariantFormData): CreateVariantDto {
  return {
    name: data.name.trim(),
    value: data.value.trim(),
    price: data.price ? Number(data.price) : undefined,
    stock: Number(data.stock),
    sku: data.sku.trim(),
  };
}

export default function ProductVariantsPage() {
  const params = useParams<{ id: string }>();
  const productId = params?.id ?? '';

  const { data: variants, isLoading, error, refetch } = useProductVariants(productId);
  const createVariant = useCreateVariant();
  const updateVariant = useUpdateVariant();
  const deleteVariant = useDeleteVariant();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariantDto | null>(null);
  const [form, setForm] = useState<VariantFormData>(emptyForm);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const openCreate = useCallback(() => {
    setEditingVariant(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((variant: ProductVariantDto) => {
    setEditingVariant(variant);
    setForm({
      name: variant.name,
      value: variant.value,
      price: variant.price?.toString() ?? '',
      stock: variant.stock.toString(),
      sku: variant.sku,
    });
    setDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    setEditingVariant(null);
    setForm(emptyForm);
  }, []);

  const handleSave = useCallback(async () => {
    if (!productId) return;
    if (!form.name.trim() || !form.value.trim()) {
      showToast('error', 'Name and value are required');
      return;
    }
    setSaving(true);
    try {
      if (editingVariant) {
        await updateVariant.mutateAsync({
          productId,
          id: editingVariant.id,
          data: toDto(form) as UpdateVariantDto,
        });
      } else {
        await createVariant.mutateAsync({ productId, data: toDto(form) });
      }
      closeDialog();
      refetch();
    } catch {
    } finally {
      setSaving(false);
    }
  }, [productId, form, editingVariant, createVariant, updateVariant, closeDialog, refetch]);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!productId) return;
      setDeletingId(id);
      try {
        await deleteVariant.mutateAsync({ productId, id });
        refetch();
      } catch {
      } finally {
        setDeletingId(null);
      }
    },
    [productId, deleteVariant, refetch]
  );

  if (!productId || isLoading) return <LoadingState message="Loading variants..." />;
  if (error) return <ErrorState title="Failed to load variants" onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Products', href: '/dashboard/products' },
          { label: 'Product' },
          { label: 'Variants' },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Variants</h1>
          <p className="text-gray-600 mt-2">Manage size, color, and other variant options</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-1.5" />
          Add Variant
        </Button>
      </div>

      {!variants?.length ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <EmptyState
            title="No variants yet"
            description="Add size, color, or other options to this product."
            action={{ label: 'Add Variant', onClick: openCreate }}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Price Override</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((variant: ProductVariantDto) => (
                  <tr key={variant.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{variant.name}</td>
                    <td className="py-3 px-4 text-gray-700">{variant.value}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono text-xs">{variant.sku || '—'}</td>
                    <td className="py-3 px-4 text-gray-900">
                      {variant.price != null ? `$${variant.price.toFixed(2)}` : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={variant.stock <= 0 ? 'text-red-600 font-medium' : 'text-gray-700'}>
                        {variant.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          variant.isActive
                            ? 'text-green-700 bg-green-50'
                            : 'text-gray-600 bg-gray-50'
                        }`}
                      >
                        {variant.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(variant)}
                          title="Edit variant"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDelete(variant.id)}
                          disabled={deletingId === variant.id}
                          title="Delete variant"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
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
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        title={editingVariant ? 'Edit Variant' : 'Add Variant'}
        description={editingVariant ? 'Update the variant details below.' : 'Create a new product variant.'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="variant-name">Name *</Label>
              <Input
                id="variant-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Size, Color"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="variant-value">Value *</Label>
              <Input
                id="variant-value"
                value={form.value}
                onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                placeholder="e.g. Large, Red"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="variant-sku">SKU</Label>
            <Input
              id="variant-sku"
              value={form.sku}
              onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
              placeholder="Optional unique SKU"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="variant-price">Price Override</Label>
              <Input
                id="variant-price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="Leave empty to use base price"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="variant-stock">Stock *</Label>
              <Input
                id="variant-stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : editingVariant ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
